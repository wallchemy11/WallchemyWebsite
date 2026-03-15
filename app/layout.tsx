import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  DM_Serif_Display,
  Inter,
  Lora,
  Manrope,
  Montserrat,
  Nunito,
  Playfair_Display,
  Poppins,
  Source_Sans_3,
  Work_Sans
} from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms";
import { hexToRgbChannels } from "@/lib/color";

const displayPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-playfair"
});

const displayCormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-cormorant"
});

const displayDmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display-dmserif"
});

const displayLora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-lora"
});

const displayCinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-cinzel"
});

const sansInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-inter"
});

const sansManrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-manrope"
});

const sansMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-montserrat"
});

const sansPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-poppins"
});

const sansSourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-sourcesans"
});

const sansWorkSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-worksans"
});

const sansNunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-nunito"
});

export const metadata: Metadata = {
  title: "Wallchemy — Turning Walls into Experiences",
  description:
    "Luxury texture and surface studio crafting immersive, tactile environments."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const palette = settings?.palette || {};
  const typography = settings?.typography || {};
  const heroOverlay = settings?.heroOverlay || {};

  const displayFontMap: Record<string, string> = {
    playfair: "var(--font-display-playfair)",
    cormorant: "var(--font-display-cormorant)",
    dmserif: "var(--font-display-dmserif)",
    lora: "var(--font-display-lora)",
    cinzel: "var(--font-display-cinzel)"
  };
  const bodyFontMap: Record<string, string> = {
    inter: "var(--font-sans-inter)",
    manrope: "var(--font-sans-manrope)",
    montserrat: "var(--font-sans-montserrat)",
    poppins: "var(--font-sans-poppins)",
    sourcesans: "var(--font-sans-sourcesans)",
    worksans: "var(--font-sans-worksans)",
    nunito: "var(--font-sans-nunito)"
  };
  const overlayOpacityRaw = Number(heroOverlay.opacity);
  const overlayOpacity = Number.isFinite(overlayOpacityRaw)
    ? Math.min(Math.max(overlayOpacityRaw, 0), 1)
    : 0.55;

  const bodyStyle = {
    "--color-ink": hexToRgbChannels(palette.ink, "11 10 9"),
    "--color-alabaster": hexToRgbChannels(
      typography.textColor || palette.alabaster,
      "242 237 228"
    ),
    "--color-brass": hexToRgbChannels(palette.brass, "201 166 107"),
    "--color-smoke": hexToRgbChannels(palette.smoke, "140 135 127"),
    "--color-ember": hexToRgbChannels(palette.ember, "165 116 79"),
    "--font-display":
      displayFontMap[String(typography.displayFont || "").toLowerCase()] ||
      "var(--font-display-playfair)",
    "--font-sans":
      bodyFontMap[String(typography.bodyFont || "").toLowerCase()] ||
      "var(--font-sans-inter)",
    "--hero-overlay-rgb": hexToRgbChannels(heroOverlay.color, "11 10 9"),
    "--hero-overlay-opacity": String(overlayOpacity)
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${displayPlayfair.variable} ${displayCormorant.variable} ${displayDmSerif.variable} ${displayLora.variable} ${displayCinzel.variable} ${sansInter.variable} ${sansManrope.variable} ${sansMontserrat.variable} ${sansPoppins.variable} ${sansSourceSans.variable} ${sansWorkSans.variable} ${sansNunito.variable}`}
    >
      <body className="bg-ink text-alabaster antialiased" style={bodyStyle}>
        {children}
      </body>
    </html>
  );
}
