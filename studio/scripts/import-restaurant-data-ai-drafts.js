/**
 * Draft-only import for the restaurant data for AI trilogy.
 * Creates drafts.* documents only — does NOT publish.
 *
 * Run: npx sanity exec scripts/import-restaurant-data-ai-drafts.js --with-user-token
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "../../docs/content");

const POST_FILES = [
  "2026-09-23-restaurant-data-needed-for-ai-en.md",
  "2026-09-23-restaurant-data-needed-for-ai-fr.md",
  "2026-09-23-restaurant-data-needed-for-ai-ar.md",
];

const AUTHOR_ID = "author-kitchflow-team";

function key() {
  return Math.random().toString(36).slice(2, 11);
}

function parseMetadata(raw) {
  const meta = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^\|\s\*\*(.+?)\*\*\s\|\s(.+?)\s\|$/);
    if (!match) continue;
    let value = match[2].trim();
    if (value.startsWith("`") && value.endsWith("`")) {
      value = value.slice(1, -1);
    }
    meta[match[1].trim().toLowerCase()] = value;
  }
  return meta;
}

function extractBody(raw) {
  const sections = raw.split("\n---\n");
  if (sections.length < 2) return "";

  let body = sections.slice(1).join("\n---\n");
  body = body.replace(/^# .+\n+/, "");

  const handoffIndex = body.search(/\n## Handoff summary|\n## Handoff Summary/);
  if (handoffIndex >= 0) {
    body = body.slice(0, handoffIndex);
  }

  return body.trim();
}

function parseInline(text) {
  const markDefs = [];
  const children = [];
  let remaining = text;

  while (remaining.length > 0) {
    let match;

    if ((match = remaining.match(/^\*\*(.+?)\*\*/))) {
      children.push({ _type: "span", _key: key(), text: match[1], marks: ["strong"] });
      remaining = remaining.slice(match[0].length);
    } else if ((match = remaining.match(/^`([^`]+)`/))) {
      children.push({ _type: "span", _key: key(), text: match[1], marks: ["code"] });
      remaining = remaining.slice(match[0].length);
    } else if ((match = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/))) {
      const linkKey = key();
      markDefs.push({ _key: linkKey, _type: "link", href: match[2] });
      children.push({ _type: "span", _key: key(), text: match[1], marks: [linkKey] });
      remaining = remaining.slice(match[0].length);
    } else if ((match = remaining.match(/^([^*`[\n]+)/))) {
      children.push({ _type: "span", _key: key(), text: match[1], marks: [] });
      remaining = remaining.slice(match[0].length);
    } else {
      children.push({ _type: "span", _key: key(), text: remaining[0], marks: [] });
      remaining = remaining.slice(1);
    }
  }

  if (children.length === 0) {
    children.push({ _type: "span", _key: key(), text: "", marks: [] });
  }

  return { children, markDefs };
}

function makeBlock(style, text, listItem) {
  const { children, markDefs } = parseInline(text);
  const block = {
    _type: "block",
    _key: key(),
    style,
    markDefs,
    children,
  };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}

function isTableRow(line) {
  return line.trim().startsWith("|");
}

function isTableSeparator(line) {
  return /^\|\s*[-:| ]+\|\s*$/.test(line.trim());
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function tableToBlocks(lines) {
  const blocks = [];
  const rows = lines.filter((line) => !isTableSeparator(line)).map(parseTableRow);
  if (rows.length === 0) return blocks;

  const headers = rows[0];
  for (const row of rows.slice(1)) {
    const parts = headers.map((header, index) => `${header}: ${row[index] ?? ""}`);
    blocks.push(makeBlock("normal", parts.join(" · ")));
  }
  return blocks;
}

function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  let index = 0;
  let paragraph = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push(makeBlock("normal", text));
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      blocks.push(makeBlock("h2", trimmed.slice(3).trim()));
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      blocks.push(makeBlock("h3", trimmed.slice(4).trim()));
      index += 1;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      index += 1;
      continue;
    }

    if (isTableRow(trimmed)) {
      flushParagraph();
      const tableLines = [];
      while (index < lines.length && isTableRow(lines[index].trim())) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      blocks.push(...tableToBlocks(tableLines));
      continue;
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(?:\[.\]\s+)?(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      blocks.push(makeBlock("normal", bulletMatch[1], "bullet"));
      index += 1;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      blocks.push(makeBlock("normal", orderedMatch[1], "number"));
      index += 1;
      continue;
    }

    paragraph.push(trimmed);
    index += 1;
  }

  flushParagraph();
  return blocks;
}

async function importDraft(client, filename) {
  const raw = readFileSync(join(CONTENT_DIR, filename), "utf8");
  const meta = parseMetadata(raw);
  const language = meta.language;
  const translationKey = meta.translationkey;
  const slug = meta.slug;
  const publishedId = `post-${translationKey}-${language}`;
  const draftId = `drafts.${publishedId}`;

  const body = markdownToPortableText(extractBody(raw));

  const doc = {
    _id: draftId,
    _type: "post",
    language,
    translationKey,
    title: meta.title,
    slug: { _type: "slug", current: slug },
    excerpt: meta.excerpt,
    seoTitle: meta.seotitle,
    seoDescription: meta.seodescription,
    category: meta.category,
    publishedAt: new Date(`${meta.publishedat}T09:00:00.000Z`).toISOString(),
    readTime: Number(meta.readtime),
    body,
    author: { _type: "reference", _ref: AUTHOR_ID },
  };

  // Intentionally omit coverImage — pending manual review before publish.

  await client.createOrReplace(doc);

  // Safety: ensure no published twin was created
  const published = await client.fetch(`*[_id == $id][0]._id`, { id: publishedId });
  if (published) {
    throw new Error(`Published document unexpectedly exists: ${publishedId}`);
  }

  console.log(`DRAFT ONLY: [${language}] ${meta.title}`);
  console.log(`  id: ${draftId}`);
  console.log(`  slug: /blog/${slug}`);
  console.log(`  translationKey: ${translationKey}`);
  return doc;
}

export default async function importRestaurantDataAiDrafts() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  console.log("Creating DRAFT-ONLY posts (will not publish)…\n");

  const results = [];
  for (const filename of POST_FILES) {
    console.log(`Importing ${filename}…`);
    results.push(await importDraft(client, filename));
  }

  console.log("\nDone. Drafts only — open kitchflow.sanity.studio to preview.");
  console.log("Do NOT click Publish until images and copy are reviewed.");
  return results;
}

importRestaurantDataAiDrafts().catch((error) => {
  console.error("Draft import failed:", error);
  process.exit(1);
});
