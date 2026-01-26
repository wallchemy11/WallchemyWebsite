import { getProcessPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProcessNarrative from "@/components/sections/ProcessNarrative";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const processPage = await getProcessPage();
  return buildMetadata(processPage.seo);
}

export default async function ProcessPage() {
  const processPage = await getProcessPage();

  return (
    <>
      <VideoHero
        headline="How We Work"
        subheadline={processPage.intro}
        videoSrc={processPage.heroVideo}
        mobileVideoSrc={processPage.heroVideoMobile}
        poster={processPage.heroPoster}
      />
      <CinematicDivider
        image={processPage.dividerImage}
        eyebrow={processPage.divider?.eyebrow}
        title={processPage.divider?.title}
        subtitle={processPage.divider?.subtitle}
      />
      <ProcessNarrative
        eyebrow={processPage.narrativeHeading?.eyebrow}
        title={processPage.narrativeHeading?.title}
        subtitle={processPage.narrativeHeading?.subtitle}
        steps={processPage.steps}
      />
    </>
  );
}

