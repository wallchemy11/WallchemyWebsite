import { getTexturesPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import TextureCollections from "@/components/sections/TextureCollections";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const textures = await getTexturesPage();
  return buildMetadata(textures.seo);
}

export default async function TexturesPage() {
  const textures = await getTexturesPage();

  return (
    <>
      <VideoHero
        headline="Textures / Collections"
        subheadline={textures.intro}
        videoSrc={textures.heroVideo}
        mobileVideoSrc={textures.heroVideoMobile}
        poster={textures.heroPoster}
      />
      <CinematicDivider
        image={resolveImage(textures.dividerImage, textures.heroPoster)}
        eyebrow={textures.divider?.eyebrow}
        title={textures.divider?.title}
        subtitle={textures.divider?.subtitle}
      />
      <TextureCollections
        eyebrow={textures.collectionsHeading?.eyebrow}
        title={textures.title}
        intro={textures.collectionsHeading?.subtitle}
        collections={textures.collections}
      />
    </>
  );
}

