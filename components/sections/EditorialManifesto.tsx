"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";
import { resolveText } from "@/lib/text";

type ManifestoItem = {
  eyebrow: string;
  text: string;
};

type EditorialManifestoProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: ManifestoItem[];
};

export default function EditorialManifesto({
  eyebrow,
  title,
  subtitle,
  items
}: EditorialManifestoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  const safeEyebrow  = resolveText(eyebrow);
  const safeTitle    = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  // The big heading is whichever field has content — eyebrow is used as section label
  // in many CMS setups, so fall back to it if title is empty
  const heading = safeTitle || safeEyebrow;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          container.querySelector(".manifesto-heading"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: container, start: "top 80%" }
          }
        );

        const rows = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll(".manifesto-row")
        );
        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              delay: i * 0.08,
              scrollTrigger: { trigger: row, start: "top 90%" }
            }
          );
        });
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <section ref={containerRef} className="bg-transparent py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Big heading ── */}
        <div className="manifesto-heading mb-16 md:mb-20">
          <h2
            className="font-display text-5xl font-bold leading-[0.92] text-alabaster sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {heading}
          </h2>

          {safeSubtitle ? (
            <p className="mt-6 max-w-sm text-[11px] uppercase tracking-[0.26em] text-alabaster/45 sm:text-xs">
              {safeSubtitle}
            </p>
          ) : null}
        </div>

        {/* ── Principle rows ── */}
        <div>
          {items.map((item, i) => (
            <div
              key={item.eyebrow}
              className="manifesto-row group relative overflow-hidden py-4 md:py-5"
            >
              <div className="relative grid grid-cols-[2rem_1fr] gap-x-6 sm:grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_1fr] md:gap-x-10">
                {/* Number accent */}
                <span className="mt-1 text-xs font-semibold tabular-nums text-brass/60">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Principle name */}
                <h3 className="font-display text-2xl font-bold leading-snug text-alabaster sm:text-3xl md:text-4xl">
                  {item.eyebrow}
                </h3>

                {/* Body copy — below on mobile, right column on desktop */}
                <p className="col-start-2 mt-3 text-base leading-relaxed text-alabaster/65 sm:text-lg md:col-start-3 md:mt-1">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
