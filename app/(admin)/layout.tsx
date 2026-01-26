export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Intentionally minimal: the Studio/login should be full-screen without the site chrome.
  return children;
}

