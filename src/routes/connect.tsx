import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Check, Copy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/KFButton";
import { SITE_URL, DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";

const TITLE = "Connect AI to Your Kitchen | KitchFlow MCP";
const SOCIAL_TITLE = "Connect ChatGPT and Claude to your KitchFlow kitchen";
const DESCRIPTION =
  "Ask ChatGPT or Claude about your inventory, tasks, shifts, and waste. Connect with the KitchFlow MCP server and sign in with your KitchFlow account. Read-only.";
const URL = `${SITE_URL}/connect`;
const MCP_URL = `${SITE_URL}/api/kitchen-mcp`;
const PUBLIC_MCP_URL = `${SITE_URL}/mcp`;

const TOOLS = [
  { name: "whoami", summary: "Which account and kitchen you are connected as." },
  { name: "get_kitchen_overview", summary: "A snapshot of your kitchen: stock, tasks, and shifts." },
  { name: "list_inventory", summary: "Inventory items with quantities and low-stock status." },
  { name: "get_inventory_item", summary: "Full detail for one inventory item." },
  { name: "list_tasks", summary: "Kitchen tasks, with status and assignee." },
  { name: "get_task", summary: "Full detail for one task." },
  { name: "list_shifts", summary: "Scheduled shifts and who is on them." },
  { name: "list_staff", summary: "Your team members and roles." },
  { name: "list_shopping_list", summary: "What is on your shopping list right now." },
  { name: "list_waste_events", summary: "Logged waste events and reasons." },
  { name: "search", summary: "Search across your kitchen data in one query." },
] as const;

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need a KitchFlow account?",
    a: "Yes. The server only works after you sign in with your KitchFlow account and approve access. Without an account there is nothing to connect to.",
  },
  {
    q: "Who can see my kitchen data?",
    a: "Only you. Every request runs as your signed-in user, and row-level security in our database limits results to your own kitchen. Other kitchens are never visible.",
  },
  {
    q: "Can the AI change anything?",
    a: "No. All tools are read-only. Your assistant can look things up and summarize them, but it cannot edit stock, tasks, or shifts.",
  },
  {
    q: "How do I disconnect?",
    a: "Remove the KitchFlow connector in your AI app's settings. You can also sign out of KitchFlow to end the session.",
  },
  {
    q: "Something broken?",
    a: (
      <>
        Email{" "}
        <a href="mailto:hello@kitchflow.app" className="text-primary hover:underline">
          hello@kitchflow.app
        </a>{" "}
        with the app you used and what you asked.
      </>
    ),
  },
];

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "Connect AI assistants to your KitchFlow kitchen",
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
      <code className="block min-w-0 flex-1 overflow-x-auto whitespace-pre rounded-xl border border-border bg-muted/60 px-3.5 py-3 text-sm">
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
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  );
}

function StepList({ steps }: { steps: { title: string; body: ReactNode }[] }) {
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
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-foreground/85">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight sm:text-2xl">
      {children}
    </h2>
  );
}

function ConnectPage() {
  const chatgptSteps = [
    {
      title: "Turn on developer mode",
      body: "In ChatGPT on the web, open Settings → Apps & Connectors → Advanced settings and enable developer mode. Your plan or workspace must allow custom MCP connectors.",
    },
    {
      title: "Add KitchFlow as a connector",
      body: "Back in Apps & Connectors, create a new connector. Name it KitchFlow, paste the server URL above, and choose OAuth for authentication.",
    },
    {
      title: "Sign in and approve",
      body: "ChatGPT opens KitchFlow. Sign in with your KitchFlow account, then approve access on the consent screen.",
    },
    {
      title: "Ask about your kitchen",
      body: "In a new chat, enable the KitchFlow connector and try “What is low on stock today?”",
    },
  ];

  const claudeSteps = [
    {
      title: "Add a custom connector",
      body: "In Claude, open Settings → Connectors and add a custom connector. Paste the server URL above. Team and Enterprise workspaces may need an owner to enable custom connectors first.",
    },
    {
      title: "Sign in and approve",
      body: "Claude sends you to KitchFlow. Sign in with your KitchFlow account and approve access on the consent screen.",
    },
    {
      title: "Ask about your kitchen",
      body: "Enable the connector in a chat and ask about inventory, tomorrow’s shifts, or recent waste.",
    },
  ];

  const claudeCodeCommand = `claude mcp add --transport http kitchflow ${MCP_URL}`;
  const codexCommand = `codex mcp add kitchflow --url ${MCP_URL}`;

  return (
    <section className="py-16 lg:py-24">
      <article className="mx-auto max-w-2xl px-5 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          Connect AI
        </p>
        <h1 className="mb-5 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          Ask your AI about your kitchen
        </h1>
        <p className="text-lg leading-relaxed text-foreground/85">
          Connect ChatGPT or Claude to KitchFlow and ask in plain language: what is running low,
          who is on tomorrow, what got wasted this week. Your assistant reads your live kitchen
          data and answers from it.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            KitchFlow MCP server URL
          </h2>
          <CopyField value={MCP_URL} label="MCP server URL" />
          <div className="mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p>
              Sign in with OAuth. You log in with your KitchFlow account on the login page, then
              approve access on a consent screen. Read-only, and limited to your own kitchen.
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-12">
          <section>
            <SectionHeading>Connect with ChatGPT</SectionHeading>
            <StepList steps={chatgptSteps} />
            <p className="mt-5 text-sm text-muted-foreground">
              Menu names change as ChatGPT updates. If you do not see custom connectors, check your
              plan and workspace settings.
            </p>
          </section>

          <section>
            <SectionHeading>Connect with Claude</SectionHeading>
            <StepList steps={claudeSteps} />
          </section>

          <section>
            <SectionHeading>Claude Code and Codex</SectionHeading>
            <p className="mb-4 text-[15px] leading-relaxed text-foreground/85">
              Register the server from your terminal. Your client opens a browser for the same
              KitchFlow sign-in and approval.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Claude Code</p>
                <CopyField value={claudeCodeCommand} label="Claude Code command" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Codex</p>
                <CopyField value={codexCommand} label="Codex command" />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-14">
          <SectionHeading>What your assistant can read</SectionHeading>
          <p className="mb-6 text-[15px] leading-relaxed text-foreground/85">
            Eleven read-only tools. None of them can change your data.
          </p>
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {TOOLS.map((tool) => (
              <li
                key={tool.name}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <code className="shrink-0 font-mono text-sm font-semibold sm:w-52">{tool.name}</code>
                <span className="text-[15px] leading-relaxed text-foreground/85">
                  {tool.summary}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 space-y-6 border-t border-border pt-10">
          <SectionHeading>FAQ</SectionHeading>
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3 className="text-base font-semibold">{item.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{item.a}</p>
            </div>
          ))}
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          Looking for our blog and feature list instead? A separate public website server lives at{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{PUBLIC_MCP_URL}</code>. It has
          no kitchen data and needs no sign-in.
        </p>
      </article>
    </section>
  );
}
