import { getAboutPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import AboutNarrative from "@/components/sections/AboutNarrative";
import StudioValues from "@/components/sections/StudioValues";
import CinematicDivider from "@/components/sections/CinematicDivider";
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
        image="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Studio Ethos"
        title="Material intelligence over trend."
        subtitle={about.founderNote}
      />
      <AboutNarrative
        narrative={about.narrative}
        founderNote={about.founderNote}
      />
      <CinematicDivider
        image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Values"
        title="Tactile luxury with restraint."
        subtitle="A quiet confidence in every layer, finish, and reflection."
      />
      <StudioValues values={about.studioValues} />
    </>
  );
}
