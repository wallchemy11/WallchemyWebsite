import type { CSSProperties } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";

type AboutNarrativeProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  narrative?: string;
  founderNote?: string;
  eyebrowStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  subtitleStyle?: CSSProperties;
  narrativeStyle?: CSSProperties;
  founderNoteStyle?: CSSProperties;
};

export default function AboutNarrative({
  eyebrow,
  title,
  subtitle,
  narrative,
  founderNote,
  eyebrowStyle,
  titleStyle,
  subtitleStyle,
  narrativeStyle,
  founderNoteStyle,
}: AboutNarrativeProps) {
  const safeEyebrow    = resolveText(eyebrow);
  const safeTitle      = resolveText(title);
  const safeSubtitle   = resolveText(subtitle);
  const safeNarrative  = resolveText(narrative);
  const safeFounderNote = resolveText(founderNote);
  return (
    <section className="bg-transparent py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            subtitle={safeSubtitle}
            eyebrowStyle={eyebrowStyle}
            titleStyle={titleStyle}
            subtitleStyle={subtitleStyle}
          />
          <p
            data-reveal
            style={founderNoteStyle}
            className="mt-6 text-[11px] uppercase tracking-[0.12em] text-alabaster/60 sm:text-sm sm:tracking-[0.16em] md:tracking-[0.2em]"
          >
            {safeFounderNote}
          </p>
          <p
            data-reveal
            style={narrativeStyle}
            className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-alabaster/75 sm:text-lg"
          >
            {safeNarrative}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
