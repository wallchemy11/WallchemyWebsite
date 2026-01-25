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
  return buildMetadata(home.seo);
}

export default async function HomePage() {
  const home = await getHomePage();

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
            text="Wallchemy crafts mineral-rich finishes for spaces that are felt before they are seen."
            className="font-display max-w-4xl text-2xl leading-relaxed text-alabaster/90 sm:text-3xl md:text-5xl"
          />
        </div>
      </section>
      <EditorialManifesto
        philosophy={home.philosophy}
        whyWallchemy={home.whyWallchemy}
      />
      <CinematicDivider
        image={home.textureHighlights[0]?.heroImage}
        eyebrow="Studio Craft"
        title="Surfaces shaped by light, silence, and touch."
        subtitle="A refined collaboration with designers, architects, and hospitality leaders."
      />
      <HomeCinematicPanels panels={home.textureHighlights} />
      <HomeCtas ctas={home.primaryCtas} />
      <TextureRibbon items={home.textureHighlights} />
      <CinematicDivider
        image={home.selectedProjects[0]?.heroImage}
        eyebrow="Selected Work"
        title="Spaces where surface becomes atmosphere."
        subtitle="Minimal metadata, maximal emotion, and a tactile sense of scale."
      />
      <SelectedProjects projects={home.selectedProjects} />
    </>
  );
}
