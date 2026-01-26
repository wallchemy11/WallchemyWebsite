"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SelectedWorkPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data?page=selected-work-list");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error loading selected work:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveItem() {
    try {
      const res = await fetch("/api/admin/selected-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditing(null);
        setFormData({});
        loadItems();
      }
    } catch (error) {
      console.error("Error saving selected work:", error);
    }
  }

  async function uploadMedia(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "selected-work");
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

  async function deleteItem(id: number) {
    if (!confirm("Delete this selected work item?")) return;
    try {
      const res = await fetch(`/api/admin/selected-work?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadItems();
      }
    } catch (error) {
      console.error("Error deleting selected work:", error);
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
            <h1 className="text-2xl font-bold sm:text-3xl">Selected Work Management</h1>
            <p className="mt-2 text-sm text-alabaster/60">
              Create curated work entries. Choose which ones appear on the homepage from the Home page editor.
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
              + New Selected Work
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
              {editing === -1 ? "New Selected Work" : "Edit Selected Work"}
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
                <label className="mb-2 block">Slug * (URL-friendly)</label>
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
                <label className="mb-2 block">Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={saveItem}
                  className="rounded bg-brass px-6 py-2 font-semibold text-ink"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(null);
                    setFormData({});
                  }}
                  className="rounded border border-alabaster/20 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-lg border border-alabaster/10 bg-ink/40 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{item.title || item.slug}</p>
                <p className="text-sm text-alabaster/60">{item.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setFormData({
                      id: item.id,
                      title: item.title,
                      slug: item.slug,
                      heroImageUrl: item.hero_image_url,
                      description: item.description
                    });
                    setEditing(item.id);
                  }}
                  className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 ? (
            <p className="text-sm text-alabaster/60">No selected work items yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
