"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  slug: string;
  location: string;
  areaSqFt: number;
  heroImage: string;
};

type SelectedProjectsProps = {
  projects: Project[];
};

export default function SelectedProjects({ projects }: SelectedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(".project-card")
      );

      cards.forEach((card) => {
        const image = card.querySelector(".project-image");
        const text = card.querySelector(".project-text");

        if (image) {
          gsap.fromTo(
            image,
            { y: 40, opacity: 0, scale: 1.06 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            }
          );

          gsap.to(image, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6
            }
          });
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ink py-24">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected Projects"
          title="Spaces shaped by light, scale, and surface."
          subtitle="Minimal metadata, maximum atmosphere."
        />
      </div>
      <div ref={containerRef} className="mt-16 space-y-24">
        {projects.map((project, index) => (
            <article
              key={project.slug}
            className="project-card relative min-h-[420px] overflow-hidden md:min-h-[640px]"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                width={2000}
                height={1200}
                sizes="100vw"
                quality={70}
                className="project-image absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/80" />
            <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10 md:pb-14">
              <div
                className={`project-text max-w-xl space-y-6 ${
                  index % 2 === 0
                    ? "text-left md:mr-auto"
                    : "text-right md:ml-auto"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.32em] text-brass/90 sm:text-xs sm:tracking-[0.42em]">
                    {project.location}
                  </p>
                <h3 className="font-display text-2xl uppercase tracking-[0.18em] sm:text-3xl md:text-6xl">
                    {project.title}
                  </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-alabaster/70 sm:text-sm md:text-base md:tracking-[0.28em]">
                    {project.areaSqFt.toLocaleString()} sq. ft. · Crafted
                    atmosphere at scale.
                  </p>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
