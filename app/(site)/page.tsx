import VideoHero from "@/components/ui/VideoHero";
import EditorialManifesto from "@/components/sections/EditorialManifesto";
import SelectedProjects from "@/components/sections/SelectedProjects";
import HomeCtas from "@/components/sections/HomeCtas";
import MaskedText from "@/components/ui/MaskedText";
import SplitText from "@/components/ui/SplitText";
import TextureRibbon from "@/components/sections/TextureRibbon";
import CinematicDivider from "@/components/sections/CinematicDivider";
import HomeCinematicPanels from "@/components/sections/HomeCinematicPanels";
import { getHomePage } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

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
  const home = await getHomePage();
  
  if (!home) {
    return <div className="min-h-screen bg-ink text-alabaster p-8">Loading...</div>;
  }

  const studioCraftImage = home.textureHighlights?.[0]?.heroImage;
  const selectedWorkImage = home.selectedProjects?.[0]?.heroImage;
  const manifestoItems = home.manifesto?.items || [];

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
      <HomeCtas intro={home.ctaIntro} ctas={home.primaryCtas || []} />
      <TextureRibbon
        items={home.textureHighlights || []}
        eyebrow={home.ribbonHeading?.eyebrow}
        title={home.ribbonHeading?.title}
      />
      {selectedWorkImage ? (
        <CinematicDivider
          image={selectedWorkImage}
          eyebrow={home.selectedDivider?.eyebrow}
          title={home.selectedDivider?.title}
          subtitle={home.selectedDivider?.subtitle}
        />
      ) : null}
      <SelectedProjects
        projects={home.selectedProjects}
        eyebrow={home.selectedHeading?.eyebrow}
        title={home.selectedHeading?.title}
        subtitle={home.selectedHeading?.subtitle}
      />
    </>
  );
}
