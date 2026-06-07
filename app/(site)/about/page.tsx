import { getAboutPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import AboutNarrative from "@/components/sections/AboutNarrative";
import StudioValues from "@/components/sections/StudioValues";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import { hexToRgbChannels } from "@/lib/color";
import { getFieldStyle } from "@/lib/field-typography";

export async function generateMetadata() {
  const about = await getAboutPage();
  return buildMetadata(about.seo);
}

export default async function AboutPage() {
  const about = await getAboutPage();
  const pageStyle = {
    ["--color-ink" as any]: hexToRgbChannels(about.backgroundColor, "11 10 9")
  };
  const fs = (key: string) => getFieldStyle(about, key);

  return (
    <div style={pageStyle}>
      <VideoHero
        headline="About Wallchemy"
        subheadline={about.intro}
        videoSrc={about.heroVideo}
        mobileVideoSrc={about.heroVideoMobile}
        poster={about.heroPoster}
        subheadlineStyle={fs("intro")}
      />
      <CinematicDivider
        image={resolveImage(about.studioDividerImage, about.heroPoster)}
        eyebrow={about.studioDivider?.eyebrow}
        title={about.studioDivider?.title}
        subtitle={about.studioDivider?.subtitle}
        eyebrowStyle={fs("studioDivider.eyebrow")}
        titleStyle={fs("studioDivider.title")}
        subtitleStyle={fs("studioDivider.subtitle")}
      />
      <AboutNarrative
        eyebrow={about.narrativeHeading?.eyebrow}
        title={about.narrativeHeading?.title}
        subtitle={about.narrativeHeading?.subtitle}
        narrative={about.narrative}
        founderNote={about.founderNote}
        eyebrowStyle={fs("narrativeHeading.eyebrow")}
        titleStyle={fs("narrativeHeading.title")}
        subtitleStyle={fs("narrativeHeading.subtitle")}
      />
      <CinematicDivider
        image={resolveImage(about.valuesDividerImage, about.heroPoster)}
        eyebrow={about.valuesDivider?.eyebrow}
        title={about.valuesDivider?.title}
        subtitle={about.valuesDivider?.subtitle}
        eyebrowStyle={fs("valuesDivider.eyebrow")}
        titleStyle={fs("valuesDivider.title")}
        subtitleStyle={fs("valuesDivider.subtitle")}
      />
      <StudioValues
        eyebrow={about.valuesHeading?.eyebrow}
        title={about.valuesHeading?.title}
        values={about.studioValues}
        eyebrowStyle={fs("valuesHeading.eyebrow")}
        titleStyle={fs("valuesHeading.title")}
      />
    </div>
  );
}
