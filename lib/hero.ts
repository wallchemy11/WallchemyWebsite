export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80";

export type HeroVideoSource = {
  heroVideo?: string;
  heroVideoMobile?: string;
};

export function resolveHeroVideo(source: HeroVideoSource) {
  return source.heroVideo || source.heroVideoMobile || "";
}

export function resolveImage(primary?: string, fallback?: string) {
  return primary || fallback || FALLBACK_IMAGE;
}

export type HeroVideoPage = {
  heroVideo: string;
  heroVideoMobile?: string;
  heroPoster?: string;
  [key: string]: any;
};

export function ensureHeroMedia<T extends HeroVideoSource & { heroPoster?: string }>(page: T) {
  return {
    ...page,
    heroVideo: resolveHeroVideo(page),
    heroPoster: page.heroPoster || FALLBACK_IMAGE
  };
}
