import { getProjectsPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import CinematicDivider from "@/components/sections/CinematicDivider";
import SelectedProjects from "@/components/sections/SelectedProjects";
import { buildMetadata } from "@/lib/seo";
import type { ProjectsPageData } from "@/lib/types/projects";

export async function generateMetadata() {
  const projects = await getProjectsPage();
  return buildMetadata(projects.seo);
}

export default async function ProjectsPage() {
  const projects = (await getProjectsPage()) as ProjectsPageData;
  const featuredSlugs = (projects.featuredProjects || []).map((project) => project.slug);
  const remainingProjects = (projects.projects || []).filter(
    (project) => !featuredSlugs.includes(project.slug)
  );

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
        image={projects.featuredProjects?.[0]?.heroImage || projects.projects?.[0]?.heroImage}
        eyebrow={projects.selectedDivider?.eyebrow}
        title={projects.selectedDivider?.title}
        subtitle={projects.selectedDivider?.subtitle}
      />
      {projects.featuredProjects?.length ? (
        <SelectedProjects
          projects={projects.featuredProjects}
          eyebrow={projects.selectedHeading?.eyebrow}
          title={projects.selectedHeading?.title}
          subtitle={projects.selectedHeading?.subtitle}
        />
      ) : null}
      {remainingProjects.length ? (
        <ProjectsGallery title={projects.title} projects={remainingProjects} />
      ) : null}
    </>
  );
}

