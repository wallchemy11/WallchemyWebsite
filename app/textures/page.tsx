import { getTexturesPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import TextureCollections from "@/components/sections/TextureCollections";
import CinematicDivider from "@/components/sections/CinematicDivider";
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
        image="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Material Library"
        title="Curated finishes with mineral depth."
        subtitle="Macro textures and architectural visuals designed for immersive interiors."
      />
      <TextureCollections
        title={textures.title}
        collections={textures.collections}
      />
    </>
  );
}
