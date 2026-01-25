"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type EditorialManifestoProps = {
  philosophy: string;
  whyWallchemy: string;
};

export default function EditorialManifesto({
  philosophy,
  whyWallchemy
}: EditorialManifestoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin,
        pinSpacing: true
      });

      const items = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(".manifesto-item")
      );
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: container,
            start: "top 80%"
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-ink py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="space-y-6 self-start">
          <p className="text-xs uppercase tracking-[0.45em] text-brass">
            Manifesto
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight md:text-6xl">
            A cinematic approach to surface craft.
          </h2>
          <p className="text-base uppercase tracking-[0.18em] text-alabaster/80">
            Editorial, architectural, and quietly bold.
          </p>
        </div>
        <div className="space-y-12">
          <div className="manifesto-item border-l border-alabaster/10 pl-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brass">
              Material Poetics
            </p>
            <p className="mt-4 text-xl text-alabaster/85">{philosophy}</p>
          </div>
          <div className="manifesto-item border-l border-alabaster/10 pl-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brass">
              Studio Method
            </p>
            <p className="mt-4 text-xl text-alabaster/85">{whyWallchemy}</p>
          </div>
          <div className="manifesto-item border-l border-alabaster/10 pl-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brass">
              Signature Touch
            </p>
            <p className="mt-4 text-xl text-alabaster/85">
              Each finish is bespoke, calibrated to light, scale, and the
              emotional pacing of the room.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
