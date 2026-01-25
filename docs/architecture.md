# Wallchemy Website Architecture

## Project Structure

```
app/
  layout.tsx
  globals.css
  page.tsx
  about/page.tsx
  textures/page.tsx
  process/page.tsx
  projects/page.tsx
  contact/page.tsx
components/
  animations/
    PageTransition.tsx
    ParallaxImage.tsx
    ScrollReveal.tsx
    SmoothScroll.tsx
  layout/
    SiteFooter.tsx
    SiteHeader.tsx
  sections/
    AboutNarrative.tsx
    ContactPanel.tsx
    HomeCtas.tsx
    HomePhilosophy.tsx
    ProcessNarrative.tsx
    ProjectsGallery.tsx
    SelectedProjects.tsx
    StudioValues.tsx
    TextureCollections.tsx
    TextureHighlights.tsx
  ui/
    MaskedText.tsx
    PrimaryCta.tsx
    SectionHeading.tsx
    VideoHero.tsx
lib/
  cms.ts
  mock-data.ts
  queries.ts
  sanity.client.ts
  sanity.image.ts
  seo.ts
sanity/
  schema.ts
  schemas/
    aboutPage.ts
    collection.ts
    contactPage.ts
    homePage.ts
    processPage.ts
    project.ts
    projectsPage.ts
    seo.ts
    texturesPage.ts
docs/
  architecture.md
```

## CMS Strategy

- Server-only Sanity queries live in `lib/cms.ts` and are fetched in server
  components for each page.
- Every page includes a `seo` field so metadata can be controlled by the CMS.
- Textures and projects are separate documents so collections can be updated or
  reordered without code changes.

## Animation Strategy (GSAP)

- **Global**: `components/animations/PageTransition.tsx` for page transitions,
  `SmoothScroll.tsx` for Lenis smoothing.
- **Scroll reveals**: `ScrollReveal.tsx` uses ScrollTrigger to stagger editorial
  text and image entrances.
- **Masked transitions**: `MaskedText.tsx` uses clip-path to reveal key lines.
- **Parallax**: `ParallaxImage.tsx` for texture collection imagery.
- **Pinned narrative**: `ProcessNarrative.tsx` pins the process intro while the
  steps scroll.

## GSAP Timeline Map (per page)

- **Home**: hero fade-in on load, `MaskedText` clip reveal, `ScrollReveal` on
  philosophy + texture cards, parallax on collections, staggered project reveal,
  CTA underline entrance.
- **About**: masked intro copy, staggered value pillars, subtle scroll reveals
  for narrative blocks.
- **Textures**: parallax on macro imagery, staggered collection titles and
  descriptors, subtle scale-in on hero image.
- **Process**: pinned narrative column with sequential step entrances.
- **Projects**: large image reveal with staggered metadata, light parallax on
  hero imagery where needed.
- **Contact**: form fields reveal, CTA button highlight on entry.

## Example CMS Queries

See `lib/queries.ts` for GROQ queries used by the server-side fetchers:

- `homePageQuery` for hero video, philosophy, texture highlights, CTAs
- `texturesPageQuery` for collections and macro imagery
- `projectsPageQuery` for project metadata + atmosphere notes

## Performance & SEO

- Server components fetch content at build time with revalidation.
- Videos are set to muted autoplay with metadata preloading.
- SEO metadata is pulled from CMS via `generateMetadata()` in each page.
