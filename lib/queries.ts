export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  philosophy,
  textureHighlights[]->{
    title,
    slug,
    "heroImage": heroImage.asset->url,
    shortDescription
  },
  whyWallchemy,
  selectedProjects[]->{
    title,
    slug,
    location,
    areaSqFt,
    "heroImage": heroImage.asset->url
  },
  primaryCtas,
  seo
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title,
  intro,
  narrative,
  founderNote,
  studioValues,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  seo
}`;

export const texturesPageQuery = `*[_type == "texturesPage"][0]{
  title,
  intro,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  collections[]->{
    title,
    slug,
    category,
    "heroImage": heroImage.asset->url,
    shortDescription,
    gallery
  },
  seo
}`;

export const processPageQuery = `*[_type == "processPage"][0]{
  title,
  intro,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  steps,
  seo
}`;

export const projectsPageQuery = `*[_type == "projectsPage"][0]{
  title,
  intro,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  projects[]->{
    title,
    slug,
    location,
    areaSqFt,
    "heroImage": heroImage.asset->url,
    atmosphereNote
  },
  seo
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  intro,
  enquiryCta,
  whatsappNumber,
  studioAddress,
  email,
  "heroVideo": hero.video.asset->url,
  "heroVideoMobile": hero.videoMobile.asset->url,
  "heroPoster": hero.poster.asset->url,
  seo
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  whatsappNumber,
  whatsappMessage,
  social{
    instagram,
    behance,
    linkedin,
    youtube
  }
}`;
