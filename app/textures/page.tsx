import { getTexturesPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import TextureCollections from "@/components/sections/TextureCollections";
import SplitText from "@/components/ui/SplitText";
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
        videoSrc="https://media.w3.org/2010/05/bunny/trailer.mp4"
        poster="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SplitText
            text={textures.intro}
            className="font-display max-w-4xl text-3xl leading-relaxed text-alabaster/90 md:text-5xl"
          />
        </div>
      </section>
      <CinematicDivider
        image="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Material Library"
        title="Curated finishes with mineral depth."
        subtitle="Macro textures and architectural visuals designed for immersive interiors."
      />
      <TextureCollections
        title={textures.title}
        intro={textures.intro}
        collections={textures.collections}
      />
    </>
  );
}
