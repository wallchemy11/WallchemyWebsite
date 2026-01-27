import { getProjectsPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
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
        videoSrc={projects.heroVideo}
        mobileVideoSrc={projects.heroVideoMobile}
        poster={projects.heroPoster}
      />
      <CinematicDivider
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Selected Work"
        title="Surface, scale, and atmosphere."
        subtitle="Large-format projects shaped by light, finish, and spatial narrative."
      />
      <ProjectsGallery
        title={projects.title}
        projects={projects.projects}
      />
    </>
  );
}
