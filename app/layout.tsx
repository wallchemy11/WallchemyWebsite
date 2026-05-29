import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms";
import { hexToRgbChannels } from "@/lib/color";

const displayLancea = localFont({
  src: "../public/fonts/Lancea.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display-lancea"
});

const sansKindSans = localFont({
  src: [
    { path: "../public/fonts/KindSans-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/KindSans-Medium.ttf", weight: "500", style: "normal" }
  ],
  display: "swap",
  variable: "--font-sans-kindsans"
});

export const metadata: Metadata = {
  title: "Wallchemy: Turning Walls into Experiences",
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
    "--hero-overlay-rgb": hexToRgbChannels(heroOverlay.color, "11 10 9"),
    "--hero-overlay-opacity": String(overlayOpacity)
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${displayLancea.variable} ${sansKindSans.variable}`}
    >
      <body className="text-alabaster antialiased" style={bodyStyle}>
        {children}
      </body>
    </html>
  );
}
