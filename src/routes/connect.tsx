import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/KFButton";
import { SITE_URL, DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";

const TITLE = "Connect AI to KitchFlow | MCP";
const SOCIAL_TITLE = "Connect AI to KitchFlow";
const DESCRIPTION =
  "Connect Claude, ChatGPT, Codex, or Claude Code to KitchFlow’s public MCP server for features and kitchen ops articles.";
const URL = `${SITE_URL}/connect`;
const MCP_URL = `${SITE_URL}/mcp`;

const TOOLS = [
  {
    name: "list_features",
    summary: "List product features with short descriptions and page URLs.",
    args: "None.",
    example: "{}",
  },
  {
    name: "list_blog_posts",
    summary: "Browse published articles with title, slug, excerpt, category, and date.",
    args: "`language` (en, fr, or ar; default en). `limit` (1–50; default 20).",
    example: '{ "language": "en", "limit": 10 }',
  },
  {
    name: "get_blog_post",
    summary: "Read the full text of one published article by slug.",
    args: "`slug` (required), e.g. reduce-coffee-shop-waste.",
    example: '{ "slug": "reduce-coffee-shop-waste" }',
  },
] as const;

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "Connect AI assistants to KitchFlow",
      type: "website",
    }),
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ConnectPage,
});

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can fail in insecure contexts; leave the text selectable.
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <code className="block min-w-0 flex-1 overflow-x-auto rounded-md border border-border bg-muted/60 px-3 py-2.5 text-sm">
        {value}
      </code>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0 gap-1.5"
        onClick={() => void copy()}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-foreground/85">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ConnectPage() {
  const chatgptSteps = [
    {
      title: "Open Plugins",
      body: "In ChatGPT on the web, open Plugins, select +, then Add custom MCP server. Your account or workspace must allow custom MCP connections.",
    },
    {
      title: "Add KitchFlow",
      body: "Name it KitchFlow, paste the server URL below, and choose No authentication. Acknowledge the connection warning.",
    },
    {
      title: "Install and use",
      body: "Create the plugin, install it, then type @KitchFlow in a new chat and ask about features or kitchen ops articles.",
    },
  ];

  const codexCommands = `codex mcp add kitchflow --url ${MCP_URL}`;

  const claudeCodeSnippet = `{
  "mcpServers": {
    "kitchflow": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`;

  return (
    <section className="py-16 lg:py-24">
      <article className="mx-auto max-w-2xl px-5 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase text-primary">MCP</p>
        <h1 className="mb-5 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          Connect AI to KitchFlow
        </h1>
        <p className="text-lg leading-relaxed text-foreground/85">
          Point Claude, ChatGPT, Codex, or Claude Code at our public MCP server. It can list
          product features and read published kitchen ops articles. No account sign-in is required
          for these tools.
        </p>

        <div className="mt-10 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            MCP server URL
          </h2>
          <CopyField value={MCP_URL} label="MCP server URL" />
          <p className="text-sm text-muted-foreground">
            Public read-only tools. Kitchen account data is not exposed here.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <section>
            <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
              Connect with ChatGPT
            </h2>
            <StepList steps={chatgptSteps} />
            <p className="mt-5 text-sm text-muted-foreground">
              Using the older Apps interface? Open Settings → Apps → Create, enter the same URL, pick
              No authentication, then Scan Tools. Availability depends on your plan and workspace
              settings.
            </p>
          </section>

          <section>
            <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
              Connect with Codex
            </h2>
            <StepList
              steps={[
                {
                  title: "Register the server",
                  body: "Run the command below in your terminal to add KitchFlow to Codex.",
                },
                {
                  title: "Ask about the product",
                  body: "Start a new Codex session and ask for KitchFlow features or a blog article on waste, inventory, or staffing.",
                },
              ]}
            />
            <div className="mt-5 space-y-2">
              <p className="text-sm font-medium">Run in your terminal</p>
              <CopyField value={codexCommands} label="Codex command" />
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
              Connect with Claude Code
            </h2>
            <p className="mb-4 text-[15px] leading-relaxed text-foreground/85">
              Add a remote HTTP server to your Claude Code MCP config, then restart the session.
            </p>
            <CopyField value={claudeCodeSnippet} label="Claude Code config" />
          </section>
        </div>

        <section className="mt-14">
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            Tools
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-foreground/85">
            Each tool returns structured JSON your assistant can cite. Content mirrors what is
            already public on the website.
          </p>
          <div className="space-y-8">
            {TOOLS.map((tool) => (
              <div key={tool.name}>
                <h3 className="font-mono text-base font-semibold">{tool.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{tool.summary}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/70">Arguments. </span>
                  {tool.args}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/60 p-3 text-sm">
                  <code>{tool.example}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-6 border-t border-border pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            FAQ
          </h2>
          <div>
            <h3 className="text-base font-semibold">Do I need a KitchFlow account?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
              Not for this server. Features and blog tools are public. Signed-in kitchen data is not
              available over MCP yet.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold">Which apps work?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
              Any client that speaks MCP over HTTPS, including ChatGPT custom MCP plugins, Codex,
              Claude Code, and Cursor. Workspace policies may block custom servers.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold">Something broken?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
              Email{" "}
              <a href="mailto:hello@kitchflow.app" className="text-primary hover:underline">
                hello@kitchflow.app
              </a>{" "}
              with the client you used and what you asked for.
            </p>
          </div>
        </section>
      </article>
    </section>
  );
}
