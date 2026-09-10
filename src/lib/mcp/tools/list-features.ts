import { defineTool } from "@lovable.dev/mcp-js";
import { FEATURE_PAGES } from "@/lib/feature-pages";
import { APP_STORE_URL, SITE_URL } from "@/lib/seo";

export default defineTool({
  name: "list_features",
  title: "List KitchFlow features",
  description:
    "List KitchFlow's product features (inventory, food waste, staff scheduling, kitchen tasks, suppliers) with descriptions and page URLs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const features = FEATURE_PAGES.map((page) => ({
      id: page.id,
      name: page.socialTitle,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
    }));

    const result = { appStoreUrl: APP_STORE_URL, website: SITE_URL, features };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
