import PageTransition from "@/components/animations/PageTransition";
import SmoothScroll from "@/components/animations/SmoothScroll";
import SiteHeaderServer from "@/components/layout/SiteHeaderServer";
import SiteFooterServer from "@/components/layout/SiteFooterServer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <PageTransition />
      <SiteHeaderServer />
      <main className="min-h-screen">{children}</main>
      <SiteFooterServer />
    </>
  );
}

