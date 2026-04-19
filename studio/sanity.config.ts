import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "kitchflow",
  title: "KitchFlow CMS",

  projectId: "oigasmdp",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
