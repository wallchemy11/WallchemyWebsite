import { getTexturesPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import TextureCollections from "@/components/sections/TextureCollections";
import CinematicDivider from "@/components/sections/CinematicDivider";
import CraftsmanshipSection from "@/components/sections/CraftsmanshipSection";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import { hexToRgbChannels } from "@/lib/color";
import { getFieldStyle } from "@/lib/field-typography";

export async function generateMetadata() {
  const textures = await getTexturesPage();
  return buildMetadata(textures.seo);
}

export default async function TexturesPage() {
  const textures = await getTexturesPage();
  const pageStyle = {
    ["--color-ink" as any]: hexToRgbChannels(textures.backgroundColor, "11 10 9")
  };

  const fs = (key: string) => getFieldStyle(textures, key);

  return (
    <div style={pageStyle}>
      <VideoHero
        headline="Textures"
        subheadline={textures.intro}
        videoSrc={textures.heroVideo}
        mobileVideoSrc={textures.heroVideoMobile}
        poster={textures.heroPoster}
        subheadlineStyle={fs("intro")}
      />
      <CinematicDivider
        image={resolveImage(textures.dividerImage, textures.heroPoster)}
        eyebrow={textures.divider?.eyebrow}
        title={textures.divider?.title}
        subtitle={textures.divider?.subtitle}
        eyebrowStyle={fs("divider.eyebrow")}
        titleStyle={fs("divider.title")}
        subtitleStyle={fs("divider.subtitle")}
      />
      <CraftsmanshipSection
        title={textures.craftsmanship?.title}
        body={textures.craftsmanship?.body}
        titleStyle={fs("craftsmanship.title")}
        bodyStyle={fs("craftsmanship.body")}
      />
      <TextureCollections
        eyebrow={textures.collectionsHeading?.eyebrow}
        title={textures.title}
        intro={textures.collectionsHeading?.subtitle}
        supportText={textures.collectionsHeading?.supportText}
        collections={textures.collections}
        eyebrowStyle={fs("collectionsHeading.eyebrow")}
        titleStyle={fs("title")}
        subtitleStyle={fs("collectionsHeading.subtitle")}
      />
    </div>
  );
}

