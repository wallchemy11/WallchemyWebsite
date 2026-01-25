import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Project = {
  title: string;
  slug: string;
  location: string;
  areaSqFt: number;
  heroImage: string;
  atmosphereNote: string;
};

type ProjectsGalleryProps = {
  title: string;
  intro?: string;
  projects: Project[];
};

export default function ProjectsGallery({
  title,
  intro,
  projects
}: ProjectsGalleryProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Portfolio"
            title={title}
            subtitle={intro}
          />
          <div className="mt-12 grid gap-12">
            {projects.map((project) => (
              <article key={project.slug}>
                <div data-reveal="image">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    width={1200}
                    height={800}
                  sizes="(max-width: 768px) 100vw, 70vw"
                  quality={70}
                    className="h-[260px] w-full object-cover sm:h-[360px] md:h-[420px]"
                  />
                </div>
                <div data-reveal className="mt-5 flex flex-col gap-2 md:mt-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brass sm:text-xs sm:tracking-[0.35em]">
                      {project.location}
                    </p>
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] sm:text-2xl md:tracking-[0.18em]">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs text-alabaster/70 sm:text-sm">
                    {project.areaSqFt.toLocaleString()} sq. ft.
                  </p>
                </div>
                <p
                  data-reveal
                  className="mt-3 max-w-3xl text-xs uppercase tracking-[0.18em] text-alabaster/70 sm:text-sm md:tracking-[0.2em]"
                >
                  {project.atmosphereNote}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
