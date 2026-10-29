import { SITE_URL } from "@/lib/seo";

/**
 * Reverse proxy for the KitchFlow kitchen MCP server (Supabase edge function).
 *
 *   https://kitchflowapp.com/api/kitchen-mcp[/suffix]  ->  <upstream>[/suffix]
 *
 * The OAuth discovery pieces are rewritten so that MCP clients discover the
 * *public* resource URL, while the authorization server stays on Supabase Auth.
 */

export const KITCHEN_MCP_PUBLIC_PATH = "/api/kitchen-mcp";
export const KITCHEN_MCP_PUBLIC_URL = `${SITE_URL}${KITCHEN_MCP_PUBLIC_PATH}`;
export const KITCHEN_MCP_METADATA_SUFFIX = "/oauth-protected-resource";

const DEFAULT_UPSTREAM = "https://wdradmkeipedkpdjztux.supabase.co/functions/v1/mcp";

/** Request headers (besides `mcp-*`) that are forwarded upstream. */
const FORWARDED_REQUEST_HEADERS = ["authorization", "content-type", "accept", "last-event-id"];

/** Response headers that must not be copied back to the client. */
const STRIPPED_RESPONSE_HEADERS = [
  "set-cookie", // upstream cookies are scoped to supabase.co, never useful here
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
];

function getUpstreamBase(): URL {
  const raw = process.env.KITCHFLOW_MCP_UPSTREAM?.trim() || DEFAULT_UPSTREAM;
  const url = new URL(raw);
  url.pathname = url.pathname.replace(/\/+$/, "");
  url.search = "";
  url.hash = "";
  return url;
}

/** Path after `/api/kitchen-mcp` (e.g. `""` or `/oauth-protected-resource`). */
function getSuffix(requestUrl: URL): string {
  const { pathname } = requestUrl;
  if (!pathname.startsWith(KITCHEN_MCP_PUBLIC_PATH)) return "";
  return pathname.slice(KITCHEN_MCP_PUBLIC_PATH.length).replace(/\/+$/, "");
}

function buildUpstreamUrl(requestUrl: URL, upstream: URL): URL {
  const target = new URL(upstream.toString());
  target.pathname = `${upstream.pathname}${getSuffix(requestUrl)}`;
  target.search = requestUrl.search;
  return target;
}

function buildUpstreamHeaders(request: Request): Headers {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const name = key.toLowerCase();
    if (FORWARDED_REQUEST_HEADERS.includes(name) || name.startsWith("mcp-")) {
      headers.set(key, value);
    }
  });
  // Ask for an unencoded body: we may rewrite it, and runtimes that transparently
  // decode would otherwise leave a stale Content-Encoding header behind.
  headers.set("accept-encoding", "identity");
  return headers;
}

/**
 * Point `resource_metadata="..."` in a WWW-Authenticate challenge at the public
 * proxy URL. Upstream URLs under the upstream base keep their suffix.
 */
export function rewriteWwwAuthenticate(value: string, upstream: URL): string {
  const upstreamBase = `${upstream.origin}${upstream.pathname}`;
  return value.replace(/resource_metadata=(?:"([^"]*)"|([^\s,]+))/gi, (_match, quoted, bare) => {
    const original: string = quoted ?? bare;
    let target = `${KITCHEN_MCP_PUBLIC_URL}${KITCHEN_MCP_METADATA_SUFFIX}`;
    if (original.startsWith(upstreamBase)) {
      const rest = original.slice(upstreamBase.length);
      if (rest === "" || rest.startsWith("/") || rest.startsWith("?")) {
        target = `${KITCHEN_MCP_PUBLIC_URL}${rest}`;
      }
    }
    return `resource_metadata="${target}"`;
  });
}

function buildResponseHeaders(upstreamResponse: Response, upstream: URL): Headers {
  const headers = new Headers();
  upstreamResponse.headers.forEach((value, key) => {
    if (STRIPPED_RESPONSE_HEADERS.includes(key.toLowerCase())) return;
    headers.set(key, value);
  });
  const challenge = upstreamResponse.headers.get("www-authenticate");
  if (challenge) headers.set("www-authenticate", rewriteWwwAuthenticate(challenge, upstream));
  return headers;
}

function isProtectedResourceMetadata(requestUrl: URL): boolean {
  return getSuffix(requestUrl).endsWith(KITCHEN_MCP_METADATA_SUFFIX);
}

export async function proxyKitchenMcp(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);

  let upstream: URL;
  try {
    upstream = getUpstreamBase();
  } catch {
    return Response.json({ error: "kitchen_mcp_upstream_misconfigured" }, { status: 500 });
  }

  const method = request.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";

  const init: RequestInit & { duplex?: "half" } = {
    method,
    headers: buildUpstreamHeaders(request),
    redirect: "manual",
    signal: request.signal,
  };
  if (hasBody && request.body) {
    init.body = request.body;
    init.duplex = "half";
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(buildUpstreamUrl(requestUrl, upstream), init);
  } catch {
    return Response.json({ error: "kitchen_mcp_upstream_unreachable" }, { status: 502 });
  }

  const headers = buildResponseHeaders(upstreamResponse, upstream);

  // OAuth protected-resource metadata: rewrite `resource` to the public URL.
  // `authorization_servers` is intentionally left pointing at Supabase Auth.
  const contentType = upstreamResponse.headers.get("content-type") ?? "";
  if (
    method === "GET" &&
    upstreamResponse.ok &&
    isProtectedResourceMetadata(requestUrl) &&
    contentType.includes("json")
  ) {
    try {
      const metadata = (await upstreamResponse.json()) as Record<string, unknown>;
      metadata.resource = KITCHEN_MCP_PUBLIC_URL;
      headers.delete("content-length");
      headers.delete("content-encoding");
      headers.set("content-type", "application/json");
      return new Response(JSON.stringify(metadata), {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers,
      });
    } catch {
      return Response.json({ error: "kitchen_mcp_invalid_metadata" }, { status: 502 });
    }
  }

  // Everything else (including SSE) is streamed straight through.
  return new Response(method === "HEAD" ? null : upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}
