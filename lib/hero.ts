export type HeroVideoSource = {
  heroVideo?: string;
  heroVideoMobile?: string;
};

export function resolveHeroVideo(source: HeroVideoSource) {
  return source.heroVideo || source.heroVideoMobile || "";
}

export type HeroVideoPage = {
  heroVideo: string;
  heroVideoMobile?: string;
  heroPoster?: string;
  [key: string]: any;
};

export function ensureHeroVideo<T extends HeroVideoSource>(page: T) {
  return {
    ...page,
    heroVideo: resolveHeroVideo(page)
  };
}
