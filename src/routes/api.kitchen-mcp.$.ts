import { createFileRoute } from "@tanstack/react-router";
import { proxyKitchenMcp } from "@/lib/kitchen-mcp-proxy";

// Nested paths, e.g. /api/kitchen-mcp/oauth-protected-resource
export const Route = createFileRoute("/api/kitchen-mcp/$")({
  server: {
    handlers: {
      ANY: ({ request }: { request: Request }) => proxyKitchenMcp(request),
    },
  },
});
