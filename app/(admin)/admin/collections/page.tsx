"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

const MAX_IMAGES = 4;
const PORTRAIT_PLACEHOLDER = "Portrait (3:4)";

function normalizeImageUrls(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .filter((u): u is string => typeof u === "string")
      .map((u) => u.trim())
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      return normalizeImageUrls(JSON.parse(trimmed));
    } catch {
      return trimmed
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
    }
  }
  if (raw && typeof raw === "object") {
    return Object.values(raw)
      .filter((u): u is string => typeof u === "string")
      .map((u) => u.trim())
      .filter(Boolean);
  }
  return [];
}

export default function CollectionsPage() {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({ imageUrls: [] });
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data?page=collections-list");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setCollections(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error loading collections:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveCollection() {
    try {
      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditing(null);
        setFormData({});
        loadCollections();
      }
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  }

  async function uploadMedia(file: File, index: number) {
    setUploadError("");
    setUploadingIndex(index);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "collections");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Upload failed");
      }
      const json = await res.json();
      const urls = [...(formData.imageUrls || [])];
      while (urls.length <= index) urls.push("");
      urls[index] = json.url;
      setFormData((prev: any) => ({ ...prev, imageUrls: urls }));
    } catch (error: any) {
      setUploadError(error?.message || "Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  }

  function setImageUrl(index: number, url: string) {
    const urls = [...(formData.imageUrls || [])];
    while (urls.length <= index) urls.push("");
    urls[index] = url;
    setFormData((prev: any) => ({ ...prev, imageUrls: urls }));
  }

  async function deleteCollection(id: number) {
    if (!confirm("Delete this collection?")) return;
    try {
      const res = await fetch(`/api/admin/collections?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadCollections();
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="text-alabaster">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Collections Management</h1>
            <p className="mt-2 text-sm text-alabaster/60">
              Manage texture collections for the Textures page. Homepage featured collections
              and Material Library selections are curated separately.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                setFormData({});
                setEditing(-1);
              }}
              className="rounded bg-brass px-4 py-2 text-sm font-semibold text-ink"
            >
              + New Collection
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {editing !== null && (
          <div className="mb-8 rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {editing === -1 ? "New Collection" : "Edit Collection"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block">Title *</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
                />
              </div>
              <div>
                <label className="mb-2 block">Slug * (URL-friendly, e.g., "lime-plaster")</label>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
                />
              </div>
              <div>
                <label className="mb-2 block">Images (portrait, up to 4 — no cropping on site)</label>
                {uploadError ? (
                  <p className="mb-2 text-xs text-red-400">{uploadError}</p>
                ) : null}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {Array.from({ length: MAX_IMAGES }, (_, i) => {
                    const url = (formData.imageUrls || [])[i] || "";
                    return (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded border border-alabaster/10 bg-ink">
                          {url ? (
                            <Image
                              src={url}
                              alt={`Image ${i + 1}`}
                              width={200}
                              height={267}
                              className="h-full w-full object-contain"
                              unoptimized={url.startsWith("http")}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-center text-xs text-alabaster/40">
                              {PORTRAIT_PLACEHOLDER}
                            </div>
                          )}
                        </div>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setImageUrl(i, e.target.value)}
                          placeholder={`Image ${i + 1} URL`}
                          className="w-full rounded border border-alabaster/20 bg-ink px-2 py-1.5 text-xs text-alabaster"
                        />
                        <label className="flex cursor-pointer items-center justify-center gap-1 rounded border border-alabaster/20 py-1.5 text-xs hover:bg-alabaster/10">
                          {uploadingIndex === i ? "…" : "Upload"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadMedia(file, i);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="mb-2 block">Short Description</label>
                <textarea
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={saveCollection}
                  className="rounded bg-brass px-6 py-2 font-semibold text-ink"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(null);
                    setFormData({});
                  }}
                  className="rounded border border-alabaster/20 px-6 py-2 hover:bg-alabaster/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex items-center justify-between rounded-lg border border-alabaster/10 bg-alabaster/5 p-4"
            >
              <div>
                <h3 className="font-semibold">{collection.title || collection.slug}</h3>
                <p className="text-sm text-alabaster/60">{collection.short_description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const urls = normalizeImageUrls(collection.image_urls);
                    const fallbackHero = collection.hero_image_url
                      ? [collection.hero_image_url]
                      : [];
                    setFormData({
                      id: collection.id,
                      title: collection.title,
                      slug: collection.slug,
                      heroImageUrl: collection.hero_image_url,
                      imageUrls: urls.length > 0 ? urls : fallbackHero,
                      shortDescription: collection.short_description
                    });
                    setEditing(collection.id);
                  }}
                  className="rounded border border-alabaster/20 px-4 py-2 hover:bg-alabaster/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCollection(collection.id)}
                  className="rounded border border-red-500/20 px-4 py-2 text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {collections.length === 0 && (
            <p className="text-center text-alabaster/60">No collections yet. Create your first collection!</p>
          )}
        </div>
      </div>
    </div>
  );
}
