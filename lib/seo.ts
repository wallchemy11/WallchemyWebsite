import type { Metadata } from "next";

type SeoInput = {
  title?: string;
  description?: string;
  ogImage?: string;
};

export function buildMetadata(seo?: SeoInput): Metadata {
  if (!seo) return {};

  const images = seo.ogImage
    ? [{ url: seo.ogImage }]
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: images ? { images } : undefined
  };
}
