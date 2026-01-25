import { getProcessPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProcessNarrative from "@/components/sections/ProcessNarrative";
import SplitText from "@/components/ui/SplitText";
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
        videoSrc="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        poster="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SplitText
            text={processPage.intro}
            className="font-display max-w-4xl text-3xl leading-relaxed text-alabaster/90 md:text-5xl"
          />
        </div>
      </section>
      <CinematicDivider
        image="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Process"
        title="A slow, considered sequence of craft."
        subtitle="From consultation to execution, each step is guided by material integrity."
      />
      <ProcessNarrative
        title={processPage.title}
        intro={processPage.intro}
        steps={processPage.steps}
      />
    </>
  );
}
