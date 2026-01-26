"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/admin/api/data?page=home");
      if (res.ok) {
        setAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const pages = [
    { slug: "home", label: "Home Page", description: "Hero, philosophy, featured content", href: "/admin/edit?page=home" },
    { slug: "about", label: "About Page", description: "Studio narrative, values, founder note", href: "/admin/edit?page=about" },
    { slug: "textures", label: "Textures Page", description: "Collections and texture library", href: "/admin/edit?page=textures" },
    { slug: "process", label: "Process Page", description: "How we work, steps", href: "/admin/edit?page=process" },
    { slug: "projects", label: "Projects Page", description: "Featured projects and gallery", href: "/admin/edit?page=projects" },
    { slug: "contact", label: "Contact Page", description: "Contact information and form", href: "/admin/edit?page=contact" },
    { slug: "settings", label: "Site Settings", description: "WhatsApp, social links", href: "/admin/edit?page=settings" }
  ];

  const managementPages = [
    { slug: "featured", label: "Featured Content", description: "Select which projects & collections appear on homepage + projects", href: "/admin/featured" }
  ];

  return (
      <div className="space-y-12 text-alabaster">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">Content Management</h1>
        <p className="mt-2 text-sm text-alabaster/70 sm:text-base">
          Edit pages and site settings
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Page Content</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <button
              key={page.slug}
              onClick={() => router.push(page.href)}
              className="group rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 text-left transition-colors hover:bg-alabaster/10 sm:p-6"
            >
              <h3 className="text-lg font-semibold sm:text-xl">{page.label}</h3>
              <p className="mt-2 text-sm text-alabaster/60">{page.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Content Management</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {managementPages.map((page) => (
            <button
              key={page.slug}
              onClick={() => router.push(page.href)}
              className="group rounded-lg border border-brass/20 bg-brass/10 p-5 text-left transition-colors hover:bg-brass/20 sm:p-6"
            >
              <h3 className="text-lg font-semibold sm:text-xl">{page.label}</h3>
              <p className="mt-2 text-sm text-alabaster/70">{page.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">How Content Works</h2>
        <p className="text-sm text-alabaster/70">
          Manage projects inside the Projects page, and collections inside the Textures page.
          Featured selection controls both homepage and projects page.
        </p>
      </div>
    </div>
  );
}
