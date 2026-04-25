import { createClient } from "@sanity/client";

// Server-only Sanity client with write token. Never import from client code.
export const sanityWriteClient = createClient({
  projectId: "oigasmdp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});
