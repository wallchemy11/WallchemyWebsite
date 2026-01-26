import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms";
import { hexToRgbChannels } from "@/lib/color";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display"
});

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
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
  const bodyStyle = {
    "--color-ink": hexToRgbChannels(palette.ink, "11 10 9"),
    "--color-alabaster": hexToRgbChannels(palette.alabaster, "242 237 228"),
    "--color-brass": hexToRgbChannels(palette.brass, "201 166 107"),
    "--color-smoke": hexToRgbChannels(palette.smoke, "140 135 127"),
    "--color-ember": hexToRgbChannels(palette.ember, "165 116 79")
  } as React.CSSProperties;

  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="bg-ink text-alabaster antialiased" style={bodyStyle}>
        {children}
      </body>
    </html>
  );
}
