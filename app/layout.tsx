import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/animations/PageTransition";
import SmoothScroll from "@/components/animations/SmoothScroll";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeaderServer from "@/components/layout/SiteHeaderServer";

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="bg-ink text-alabaster antialiased">
        <SmoothScroll />
        <PageTransition />
        <SiteHeaderServer />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
