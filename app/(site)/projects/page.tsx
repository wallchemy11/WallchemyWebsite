import { getProjectsPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import CinematicDivider from "@/components/sections/CinematicDivider";
import SelectedWorkGallery from "@/components/sections/SelectedWorkGallery";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import type { ProjectsPageData } from "@/lib/types/projects";

export async function generateMetadata() {
  const projects = await getProjectsPage();
  return buildMetadata(projects.seo);
}

export default async function ProjectsPage() {
  const projects = (await getProjectsPage()) as ProjectsPageData;
  const selectedWorkItems = projects.selectedWorkItems || [];
  const dividerImage = resolveImage(
    selectedWorkItems?.[0]?.heroImage || projects.projects?.[0]?.heroImage,
    projects.heroPoster
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
        image={dividerImage}
        eyebrow={projects.selectedDivider?.eyebrow}
        title={projects.selectedDivider?.title}
        subtitle={projects.selectedDivider?.subtitle}
      />
      <SelectedWorkGallery
        items={selectedWorkItems}
        eyebrow={projects.selectedHeading?.eyebrow}
        title={projects.selectedHeading?.title}
        subtitle={projects.selectedHeading?.subtitle}
      />
      {projects.projects?.length ? (
        <ProjectsGallery title={projects.title} projects={projects.projects} />
      ) : null}
    </>
  );
}

