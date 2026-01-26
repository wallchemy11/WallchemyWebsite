import PageTransition from "@/components/animations/PageTransition";
import SmoothScroll from "@/components/animations/SmoothScroll";
import SiteHeaderServer from "@/components/layout/SiteHeaderServer";
import SiteFooterServer from "@/components/layout/SiteFooterServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

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

