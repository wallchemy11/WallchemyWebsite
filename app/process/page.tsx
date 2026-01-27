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
        image="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Process"
        title="A slow, considered sequence of craft."
        subtitle="From consultation to execution, each step is guided by material integrity."
      />
      <ProcessNarrative
        title={processPage.title}
        steps={processPage.steps}
      />
    </>
  );
}
