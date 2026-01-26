import type { SelectedWorkItem } from "./content";

export type Project = {
  title: string;
  slug: string;
  location: string;
  areaSqFt: number;
  heroImage: string;
  atmosphereNote?: string;
};

export type ProjectsPageData = {
  title: string;
  intro?: string;
  heroVideo: string;
  heroVideoMobile?: string;
  heroPoster?: string;
  selectedDivider?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
  selectedHeading?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
  featuredProjects?: Project[];
  projects?: Project[];
  selectedWorkItems?: SelectedWorkItem[];
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
};
