import { getProjectsPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import SplitText from "@/components/ui/SplitText";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const projects = await getProjectsPage();
  return buildMetadata(projects.seo);
}

export default async function ProjectsPage() {
  const projects = await getProjectsPage();

  return (
    <>
      <VideoHero
        headline="Projects / Portfolio"
        subheadline={projects.intro}
        videoSrc="https://media.w3.org/2010/05/video/movie_300.mp4"
        poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SplitText
            text={projects.intro}
            className="font-display max-w-4xl text-3xl leading-relaxed text-alabaster/90 md:text-5xl"
          />
        </div>
      </section>
      <CinematicDivider
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Selected Work"
        title="Surface, scale, and atmosphere."
        subtitle="Large-format projects shaped by light, finish, and spatial narrative."
      />
      <ProjectsGallery
        title={projects.title}
        intro={projects.intro}
        projects={projects.projects}
      />
    </>
  );
}
