import "server-only";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "unset-project-id";
const dataset = process.env.SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true
});

export const isSanityConfigured = Boolean(
  process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET
);
