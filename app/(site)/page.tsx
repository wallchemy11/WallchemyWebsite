import VideoHero from "@/components/ui/VideoHero";
import EditorialManifesto from "@/components/sections/EditorialManifesto";
import SelectedProjects from "@/components/sections/SelectedProjects";
import SelectedWorkGallery from "@/components/sections/SelectedWorkGallery";
import HomeCtas from "@/components/sections/HomeCtas";
import SplitText from "@/components/ui/SplitText";
import TextureRibbon from "@/components/sections/TextureRibbon";
import CinematicDivider from "@/components/sections/CinematicDivider";
import HomeCinematicPanels from "@/components/sections/HomeCinematicPanels";
import { getContactPage, getHomePage } from "@/lib/cms";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import { toWhatsAppHref } from "@/lib/whatsapp";

export async function generateMetadata() {
  const home = await getHomePage();
  if (!home || !home.seo) {
    return {
      title: "Wallchemy — Turning Walls into Experiences",
      description: "Luxury texture and surface studio crafting immersive, tactile environments."
    };
  }
  return buildMetadata(home.seo);
}

export default async function HomePage() {
  const [home, contact] = await Promise.all([getHomePage(), getContactPage()]);
  
  if (!home) {
    return <div className="min-h-screen bg-ink text-alabaster p-8">Loading...</div>;
  }

  const hasTextureHighlights = (home.textureHighlights || []).length > 0;
  const hasSelectedWork = (home.selectedWork || []).length > 0;
  const hasMaterialLibrary = (home.materialLibrary || []).length > 0;
  const hasFeaturedProjects = (home.selectedProjects || []).length > 0;
  const studioCraftImage = hasTextureHighlights
    ? resolveImage(home.textureHighlights?.[0]?.heroImage, home.heroPoster)
    : "";
  const selectedWorkImage = hasSelectedWork
    ? resolveImage(home.selectedWork?.[0]?.heroImage, home.heroPoster)
    : "";
  const manifestoItems = home.manifesto?.items || [];
  const selectedWorkDivider = home.selectedWorkDivider || home.selectedDivider;
  const selectedWorkHeading = home.selectedWorkHeading || home.selectedHeading;
  const featuredProjectsHeading = home.featuredProjectsHeading || home.selectedHeading;

  const whatsappHref = toWhatsAppHref(
    contact?.whatsappNumber || "+91 00000 00000",
    contact?.whatsappMessage ||
      "Hi Wallchemy, I'd like to connect about textures and finishes."
  );

  const normalizedCtas = (home.primaryCtas || []).map((cta: any) => {
    const label = String(cta?.label || "");
    const href = String(cta?.href || "");
    const isWhatsapp =
      label.toLowerCase().includes("whatsapp") ||
      href.toLowerCase().includes("wa.me") ||
      href.toLowerCase().includes("whatsapp");
    return {
      ...cta,
      href: isWhatsapp ? whatsappHref : href
    };
  });

  return (
    <>
      <VideoHero
        headline={home.heroHeadline}
        subheadline={home.heroSubheadline}
        videoSrc={home.heroVideo}
        mobileVideoSrc={home.heroVideoMobile}
        poster={home.heroPoster}
      />
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SplitText
            text={home.introText}
            className="font-display max-w-4xl text-2xl leading-relaxed text-alabaster/90 sm:text-3xl md:text-5xl"
          />
        </div>
      </section>
      <EditorialManifesto
        eyebrow={home.manifesto?.eyebrow}
        title={home.manifesto?.title}
        subtitle={home.manifesto?.subtitle}
        items={manifestoItems}
      />
      {studioCraftImage ? (
        <CinematicDivider
          image={studioCraftImage}
          eyebrow={home.studioDivider?.eyebrow}
          title={home.studioDivider?.title}
          subtitle={home.studioDivider?.subtitle}
        />
      ) : null}
      <HomeCinematicPanels panels={home.textureHighlights || []} />
      <HomeCtas intro={home.ctaIntro} ctas={normalizedCtas} />
      {hasMaterialLibrary ? (
        <TextureRibbon
          items={home.materialLibrary || []}
          eyebrow={home.ribbonHeading?.eyebrow}
          title={home.ribbonHeading?.title}
        />
      ) : null}
      {selectedWorkImage ? (
        <CinematicDivider
          image={selectedWorkImage}
          eyebrow={selectedWorkDivider?.eyebrow}
          title={selectedWorkDivider?.title}
          subtitle={selectedWorkDivider?.subtitle}
        />
      ) : null}
      <SelectedWorkGallery
        items={home.selectedWork || []}
        eyebrow={selectedWorkHeading?.eyebrow}
        title={selectedWorkHeading?.title}
        subtitle={selectedWorkHeading?.subtitle}
      />
      {hasFeaturedProjects ? (
        <SelectedProjects
          projects={home.selectedProjects}
          eyebrow={featuredProjectsHeading?.eyebrow}
          title={featuredProjectsHeading?.title}
          subtitle={featuredProjectsHeading?.subtitle}
        />
      ) : null}
    </>
  );
}
