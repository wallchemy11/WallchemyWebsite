"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Home", href: "/admin/edit?page=home" },
  { label: "Selected Work", href: "/admin/selected-work" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Collections", href: "/admin/collections" },
  { label: "Material Library", href: "/admin/material-library" },
  { label: "Textures", href: "/admin/edit?page=textures" },
  { label: "About", href: "/admin/edit?page=about" },
  { label: "Process", href: "/admin/edit?page=process" },
  { label: "Contact", href: "/admin/edit?page=contact" },
  { label: "Settings", href: "/admin/edit?page=settings" }
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLogin = pathname?.startsWith("/admin/login");
  const navItems = useMemo(() => NAV_ITEMS, []);
  const currentEditPage = searchParams.get("page");

  function isActive(href: string) {
    if (href.startsWith("/admin/edit")) {
      const page = new URLSearchParams(href.split("?")[1]).get("page");
      return pathname === "/admin/edit" && page === currentEditPage;
    }
    return pathname === href;
  }

  useEffect(() => {
    if (isLogin) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/data?page=home");
        if (!active) return;
        if (res.ok) {
          setAuthorized(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        if (active) router.push("/admin/login");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (loading || !authorized) {
    return (
      <div className="admin-light flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-light min-h-screen bg-ink text-alabaster">
      <header className="sticky top-0 z-40 border-b border-alabaster/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-brass">
              Wallchemy CMS
            </p>
            <p className="text-sm text-alabaster/70">Content Studio</p>
          </div>
          <button
            type="button"
            className="rounded border border-alabaster/15 px-3 py-2 text-xs uppercase tracking-[0.3em] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <nav className="hidden flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-alabaster/70 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`transition-colors hover:text-brass ${
                  isActive(item.href) ? "text-brass" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => router.push("/api/admin/auth/logout")}
              className="rounded border border-alabaster/20 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-alabaster/70 hover:text-brass"
            >
              Logout
            </button>
          </nav>
        </div>
        {menuOpen ? (
          <div className="border-t border-alabaster/10 px-4 py-4 sm:px-6 md:hidden">
            <div className="grid gap-2 text-sm text-alabaster/80">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(item.href);
                  }}
                  className="rounded border border-alabaster/10 px-3 py-2 text-left hover:bg-alabaster/10"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/api/admin/auth/logout");
                }}
                className="rounded border border-alabaster/10 px-3 py-2 text-left hover:bg-alabaster/10"
              >
                Logout
              </button>
            </div>
          </div>
        ) : null}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
