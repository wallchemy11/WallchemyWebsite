import PageTransition from "@/components/animations/PageTransition";
import LogoIntro from "@/components/animations/LogoIntro";
import SmoothScroll from "@/components/animations/SmoothScroll";
import SiteHeaderServer from "@/components/layout/SiteHeaderServer";
import SiteFooterServer from "@/components/layout/SiteFooterServer";
import FixedStar from "@/components/ui/FixedStar";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LogoIntro />
      <SmoothScroll />
      <PageTransition />
      <SiteHeaderServer />
      <main className="min-h-screen">{children}</main>
      <SiteFooterServer />
      <FixedStar />
    </>
  );
}

