import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "oigasmdp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];
export const urlFor = (source: SanityImageSource) => builder.image(source);
