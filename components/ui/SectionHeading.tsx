import type { CSSProperties } from "react";
import { resolveText } from "@/lib/text";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  eyebrowStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  subtitleStyle?: CSSProperties;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  eyebrowStyle,
  titleStyle,
  subtitleStyle,
}: SectionHeadingProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle   = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  return (
    <div data-reveal className="space-y-4">
      {safeEyebrow ? (
        <p style={eyebrowStyle} className="whitespace-pre-line text-[10px] uppercase tracking-[0.26em] text-brass/90 [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.42em]">
          {safeEyebrow}
        </p>
      ) : null}
      <h2 style={titleStyle} className="font-display whitespace-pre-line break-words text-4xl font-bold leading-[1.05] [overflow-wrap:anywhere] sm:text-5xl md:text-7xl">
        {safeTitle}
      </h2>
      {safeSubtitle ? (
        <p style={subtitleStyle} className="max-w-2xl whitespace-pre-line text-[11px] uppercase tracking-[0.14em] text-alabaster/70 [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.22em]">
          {safeSubtitle}
        </p>
      ) : null}
    </div>
  );
}
