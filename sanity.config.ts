import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "wallchemy",
  title: "Wallchemy Studio",
  projectId: process.env.SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_DATASET || "production",
  schema: {
    types: schemaTypes
  }
});
