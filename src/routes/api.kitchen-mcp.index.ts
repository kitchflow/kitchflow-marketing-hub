import { createFileRoute } from "@tanstack/react-router";
import { proxyKitchenMcp } from "@/lib/kitchen-mcp-proxy";

// Public: https://kitchflowapp.com/api/kitchen-mcp  ->  KITCHFLOW_MCP_UPSTREAM
export const Route = createFileRoute("/api/kitchen-mcp/")({
  server: {
    handlers: {
      ANY: ({ request }: { request: Request }) => proxyKitchenMcp(request),
    },
  },
});
