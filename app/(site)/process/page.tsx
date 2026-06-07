import { getProcessPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProcessNarrative from "@/components/sections/ProcessNarrative";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import { hexToRgbChannels } from "@/lib/color";
import { getFieldStyle } from "@/lib/field-typography";

export async function generateMetadata() {
  const processPage = await getProcessPage();
  return buildMetadata(processPage.seo);
}

export default async function ProcessPage() {
  const processPage = await getProcessPage();
  const pageStyle = {
    ["--color-ink" as any]: hexToRgbChannels(processPage.backgroundColor, "11 10 9")
  };
  const fs = (key: string) => getFieldStyle(processPage, key);

  return (
    <div style={pageStyle}>
      <VideoHero
        headline="How We Work"
        subheadline={processPage.intro}
        videoSrc={processPage.heroVideo}
        mobileVideoSrc={processPage.heroVideoMobile}
        poster={processPage.heroPoster}
        subheadlineStyle={fs("intro")}
      />
      <CinematicDivider
        image={resolveImage(processPage.dividerImage, processPage.heroPoster)}
        eyebrow={processPage.divider?.eyebrow}
        title={processPage.divider?.title}
        subtitle={processPage.divider?.subtitle}
        eyebrowStyle={fs("divider.eyebrow")}
        titleStyle={fs("divider.title")}
        subtitleStyle={fs("divider.subtitle")}
      />
      <ProcessNarrative
        eyebrow={processPage.narrativeHeading?.eyebrow}
        title={processPage.narrativeHeading?.title}
        subtitle={processPage.narrativeHeading?.subtitle}
        steps={processPage.steps}
        eyebrowStyle={fs("narrativeHeading.eyebrow")}
        titleStyle={fs("narrativeHeading.title")}
        subtitleStyle={fs("narrativeHeading.subtitle")}
      />
    </div>
  );
}
