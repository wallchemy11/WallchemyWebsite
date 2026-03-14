"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";
import { resolveText } from "@/lib/text";

type ProcessNarrativeProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: { title: string; body: string }[];
};

type StepKind =
  | "consultation"
  | "siteVisit"
  | "sampling"
  | "customisation"
  | "execution"
  | "quality";

function getStepKind(stepTitle: string, index: number): StepKind {
  const t = stepTitle.toLowerCase();
  if (/(consult|brief|discuss|strategy|intent)/.test(t)) return "consultation";
  if (/(site|visit|survey|on-site|onsite|location)/.test(t)) return "siteVisit";
  if (/(sample|board|mock|swatch|prototype)/.test(t)) return "sampling";
  if (/(custom|tune|adjust|colour|tone|palette)/.test(t)) return "customisation";
  if (/(execute|execution|apply|application|install|craft|layer)/.test(t)) return "execution";
  if (/(quality|supervision|review|handover|inspection|control)/.test(t)) return "quality";
  const fallback: StepKind[] = [
    "consultation",
    "siteVisit",
    "sampling",
    "customisation",
    "execution",
    "quality"
  ];
  return fallback[index % fallback.length];
}

function StepIcon({ kind }: { kind: StepKind }) {
  if (kind === "consultation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
        <path
          d="M5 6.5h10a2.5 2.5 0 012.5 2.5v4A2.5 2.5 0 0115 15.5H10l-3.5 3v-3H5A2.5 2.5 0 012.5 13V9A2.5 2.5 0 015 6.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 10h6M7 12.8h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "siteVisit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
        <path
          d="M12 20s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === "sampling") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
        <path
          d="M4 7h7v6H4V7zm9 0h7v4h-7V7zm0 6h7v4h-7v-4zm-9 2h7v2H4v-2z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "customisation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="1.8" fill="#0b0a09" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15" cy="12" r="1.8" fill="#0b0a09" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7" cy="17" r="1.8" fill="#0b0a09" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === "execution") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
        <path
          d="M4 18h16M8 18l2.6-7.4a2 2 0 011.9-1.3h6.7L16.8 18H8z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brass/95" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12l2.2 2.2 4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProcessNarrative({
  eyebrow,
  title,
  subtitle,
  steps
}: ProcessNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pinned = pinRef.current;
    if (!container || !pinned) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px) and (pointer: fine)": () => {
            ScrollTrigger.create({
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              pin: pinned,
              pinSpacing: true
            });
          }
        });

        const stepEls = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll(".process-step")
        );
        stepEls.forEach((stepEl, index) => {
          gsap.fromTo(
            stepEl,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: stepEl,
                start: "top 85%"
              }
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
    <section ref={containerRef} className="bg-ink py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-9 px-6 md:gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="self-start space-y-8">
          <p className="text-[10px] tracking-[0.2em] text-brass/90 sm:text-xs sm:tracking-[0.3em]">
            {safeEyebrow}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">
            {safeTitle}
          </h2>
          <p className="text-xs tracking-[0.06em] text-alabaster/70 sm:text-sm md:tracking-[0.1em]">
            {safeSubtitle}
          </p>
        </div>
        <div className="relative pl-3 sm:pl-4">
          <div className="pointer-events-none absolute bottom-4 left-0 top-2 w-px bg-gradient-to-b from-brass/45 via-alabaster/20 to-transparent" />
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="process-step relative pb-8 pl-3 last:pb-0 sm:pl-5"
            >
              <div className="grid grid-cols-[44px_1fr] items-start gap-3 sm:grid-cols-[48px_1fr] sm:gap-5">
                <div className="relative z-10 mt-0.5 flex h-11 w-11 items-center justify-center rounded-full border border-brass/45 bg-[#17120f] shadow-[0_10px_22px_rgba(0,0,0,0.22)] sm:h-12 sm:w-12">
                  <StepIcon kind={getStepKind(step.title, index)} />
                </div>
                <div className="relative pl-1">
                  <p className="text-[10px] tracking-[0.2em] text-brass/90 sm:text-xs sm:tracking-[0.28em]">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-2 text-xl tracking-[0.035em] text-alabaster sm:text-2xl md:text-[1.65rem] md:tracking-[0.045em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-alabaster/75 sm:text-base">
                    {step.body}
                  </p>
                  {index < steps.length - 1 ? (
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-alabaster/20 to-transparent" />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
