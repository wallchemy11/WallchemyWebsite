"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function FeaturedContentPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [homePage, setHomePage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [projRes, collRes, homeRes] = await Promise.all([
        fetch("/api/admin/data?page=projects-list"),
        fetch("/api/admin/data?page=collections-list"),
        fetch("/api/admin/data?page=home")
      ]);
      
      if (projRes.status === 401 || collRes.status === 401 || homeRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(Array.isArray(projData) ? projData : []);
      }
      if (collRes.ok) {
        const collData = await collRes.json();
        setCollections(Array.isArray(collData) ? collData : []);
      }
      if (homeRes.ok) {
        const homeData = await homeRes.json();
        setHomePage(homeData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/data?page=home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homePage)
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving");
      }
    } catch (error) {
      setMessage("Error saving");
    } finally {
      setSaving(false);
    }
  }

  function toggleProject(slug: string) {
    const slugs = homePage.selectedProjectSlugs || [];
    const newSlugs = slugs.includes(slug)
      ? slugs.filter((s: string) => s !== slug)
      : [...slugs, slug];
    setHomePage({ ...homePage, selectedProjectSlugs: newSlugs });
  }

  function toggleCollection(slug: string) {
    const slugs = homePage.textureHighlightSlugs || [];
    const newSlugs = slugs.includes(slug)
      ? slugs.filter((s: string) => s !== slug)
      : [...slugs, slug];
    setHomePage({ ...homePage, textureHighlightSlugs: newSlugs });
  }

  if (loading || !homePage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>Loading...</p>
      </div>
    );
  }

  const selectedProjectSlugs = homePage.selectedProjectSlugs || [];
  const selectedCollectionSlugs = homePage.textureHighlightSlugs || [];

  return (
    <div className="text-alabaster">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Featured Content on Homepage
            </h1>
            <p className="mt-2 text-sm text-alabaster/60">
              This selection powers "Selected Work" on both the homepage and projects page.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
          >
            ← Dashboard
          </button>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border border-alabaster/10 bg-alabaster/5 p-6">
            <h2 className="mb-4 text-xl font-semibold">Featured Projects</h2>
            <p className="mb-4 text-sm text-alabaster/60">
              Selected projects appear on the homepage and the projects page.
            </p>
            <div className="space-y-2">
              {projects.map((project) => (
                <label
                  key={project.slug}
                  className="flex cursor-pointer items-center gap-3 rounded border border-alabaster/10 bg-ink p-3 hover:bg-alabaster/5"
                >
                  <input
                    type="checkbox"
                    checked={selectedProjectSlugs.includes(project.slug)}
                    onChange={() => toggleProject(project.slug)}
                    className="h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm text-alabaster/60">
                      {project.location} • {project.area_sq_ft} sq ft
                    </p>
                  </div>
                </label>
              ))}
              {projects.length === 0 && (
                <p className="text-center text-alabaster/60">
                  No projects yet.{" "}
                  <button
                    onClick={() => router.push("/admin/projects")}
                    className="underline hover:text-brass"
                  >
                    Create your first project
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-alabaster/10 bg-alabaster/5 p-6">
            <h2 className="mb-4 text-xl font-semibold">Featured Collections</h2>
            <p className="mb-4 text-sm text-alabaster/60">
              Selected collections appear in panels, ribbon, and dividers on the homepage
            </p>
            <div className="space-y-2">
              {collections.map((collection) => (
                <label
                  key={collection.slug}
                  className="flex cursor-pointer items-center gap-3 rounded border border-alabaster/10 bg-ink p-3 hover:bg-alabaster/5"
                >
                  <input
                    type="checkbox"
                    checked={selectedCollectionSlugs.includes(collection.slug)}
                    onChange={() => toggleCollection(collection.slug)}
                    className="h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{collection.title}</p>
                    <p className="text-sm text-alabaster/60">{collection.short_description}</p>
                  </div>
                </label>
              ))}
              {collections.length === 0 && (
                <p className="text-center text-alabaster/60">
                  No collections yet.{" "}
                  <button
                    onClick={() => router.push("/admin/collections")}
                    className="underline hover:text-brass"
                  >
                    Create your first collection
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-brass px-6 py-3 text-sm font-semibold text-ink hover:bg-brass/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Featured Content"}
          </button>
          {message && (
            <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
