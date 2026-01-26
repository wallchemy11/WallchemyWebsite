import { getAboutPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import AboutNarrative from "@/components/sections/AboutNarrative";
import StudioValues from "@/components/sections/StudioValues";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const about = await getAboutPage();
  return buildMetadata(about.seo);
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <VideoHero
        headline="About Wallchemy"
        subheadline={about.intro}
        videoSrc={about.heroVideo}
        mobileVideoSrc={about.heroVideoMobile}
        poster={about.heroPoster}
      />
      <CinematicDivider
        image={resolveImage(about.studioDividerImage, about.heroPoster)}
        eyebrow={about.studioDivider?.eyebrow}
        title={about.studioDivider?.title}
        subtitle={about.studioDivider?.subtitle}
      />
      <AboutNarrative
        eyebrow={about.narrativeHeading?.eyebrow}
        title={about.narrativeHeading?.title}
        subtitle={about.narrativeHeading?.subtitle}
        narrative={about.narrative}
        founderNote={about.founderNote}
      />
      <CinematicDivider
        image={resolveImage(about.valuesDividerImage, about.heroPoster)}
        eyebrow={about.valuesDivider?.eyebrow}
        title={about.valuesDivider?.title}
        subtitle={about.valuesDivider?.subtitle}
      />
      <StudioValues
        eyebrow={about.valuesHeading?.eyebrow}
        title={about.valuesHeading?.title}
        values={about.studioValues}
      />
    </>
  );
}

