import type { CSSProperties } from "react";

// ── Font family options ────────────────────────────────────────────────────
// Mirrors the font variables injected in app/layout.tsx.
export const FONT_FAMILY_OPTIONS = [
  { label: "Inherit (global default)", value: "" },
  { label: "Lancea", value: "lancea" },
  { label: "Playfair Display", value: "playfair" },
  { label: "Cormorant Garamond", value: "cormorant" },
  { label: "DM Serif Display", value: "dmserif" },
  { label: "Lora", value: "lora" },
  { label: "Cinzel", value: "cinzel" },
  { label: "KindSans", value: "kindsans" },
  { label: "Inter", value: "inter" },
  { label: "Manrope", value: "manrope" },
] as const;

// ── Font size options ──────────────────────────────────────────────────────
export const FONT_SIZE_OPTIONS = [
  { label: "Inherit (global default)", value: "" },
  { label: "xs  — 0.75 rem", value: "xs" },
  { label: "sm  — 0.875 rem", value: "sm" },
  { label: "base — 1 rem", value: "base" },
  { label: "lg  — 1.125 rem", value: "lg" },
  { label: "xl  — 1.25 rem", value: "xl" },
  { label: "2xl — 1.5 rem", value: "2xl" },
  { label: "3xl — 1.875 rem", value: "3xl" },
  { label: "4xl — 2.25 rem", value: "4xl" },
  { label: "5xl — 3 rem", value: "5xl" },
  { label: "6xl — 3.75 rem", value: "6xl" },
  { label: "7xl — 4.5 rem", value: "7xl" },
] as const;

// ── Internal lookup maps ───────────────────────────────────────────────────
const FONT_VAR_MAP: Record<string, string> = {
  lancea:    "var(--font-display-lancea)",
  playfair:  "var(--font-display-playfair)",
  cormorant: "var(--font-display-cormorant)",
  dmserif:   "var(--font-display-dmserif)",
  lora:      "var(--font-display-lora)",
  cinzel:    "var(--font-display-cinzel)",
  kindsans:  "var(--font-sans-kindsans)",
  inter:     "var(--font-sans-inter)",
  manrope:   "var(--font-sans-manrope)",
};

const FONT_SIZE_REM_MAP: Record<string, string> = {
  xs:    "0.75rem",
  sm:    "0.875rem",
  base:  "1rem",
  lg:    "1.125rem",
  xl:    "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
};

// ── Public types ───────────────────────────────────────────────────────────
export type FieldTypography = {
  fontFamily?: string;
  fontSize?: string;
};

export type TypographyMap = Record<string, FieldTypography>;

/**
 * Returns a CSSProperties style object for a specific field based on its
 * per-field typography override stored in `content._typography`.
 *
 * Returns {} when no override is set so the element inherits from global CSS vars.
 *
 * Usage in page components:
 *   <h1 style={getFieldStyle(content, "heroHeadline")} className="font-display ...">
 *     {content.heroHeadline}
 *   </h1>
 */
export function getFieldStyle(content: any, fieldKey: string): CSSProperties {
  const override: FieldTypography | undefined = content?._typography?.[fieldKey];
  if (!override) return {};

  const style: CSSProperties = {};

  if (override.fontFamily && FONT_VAR_MAP[override.fontFamily]) {
    style.fontFamily = FONT_VAR_MAP[override.fontFamily];
  }
  if (override.fontSize && FONT_SIZE_REM_MAP[override.fontSize]) {
    style.fontSize = FONT_SIZE_REM_MAP[override.fontSize];
  }

  return style;
}

/** True when the field has at least one active override. */
export function hasFieldTypography(content: any, fieldKey: string): boolean {
  const t = content?._typography?.[fieldKey];
  return !!(t?.fontFamily || t?.fontSize);
}
