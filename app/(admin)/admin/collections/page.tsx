"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CollectionsPage() {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
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

  async function uploadMedia(file: File) {
    setUploadError("");
    setUploading(true);
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
      setFormData((prev: any) => ({ ...prev, heroImageUrl: json.url }));
    } catch (error: any) {
      setUploadError(error?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
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
              Manage texture collections. Featured collections appear on the homepage.
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
                <label className="mb-2 block">Hero Image URL</label>
                <input
                  type="url"
                  value={formData.heroImageUrl || ""}
                  onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                  className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="mb-2 block">Upload Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadMedia(file);
                  }}
                  className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-sm text-alabaster file:mr-3 file:rounded file:border-0 file:bg-brass file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink"
                />
                {uploading ? (
                  <p className="mt-2 text-xs text-alabaster/60">Uploading...</p>
                ) : null}
                {uploadError ? (
                  <p className="mt-2 text-xs text-red-400">{uploadError}</p>
                ) : null}
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
                    setFormData({
                      id: collection.id,
                      title: collection.title,
                      slug: collection.slug,
                      heroImageUrl: collection.hero_image_url,
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
