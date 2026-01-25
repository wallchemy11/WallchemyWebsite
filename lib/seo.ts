import type { Metadata } from "next";
import { urlFor } from "./sanity.image";

type SeoInput = {
  title?: string;
  description?: string;
  ogImage?: unknown;
};

export function buildMetadata(seo?: SeoInput): Metadata {
  if (!seo) return {};

  const images = seo.ogImage
    ? [{ url: urlFor(seo.ogImage).width(1200).height(630).url() }]
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: images ? { images } : undefined
  };
}
