"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  source_page?: string;
  is_read?: boolean;
  created_at?: string;
};

export const dynamic = "force-dynamic";

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("unread");
  const [summary, setSummary] = useState({ total: 0, unread: 0 });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    loadSummary();
    loadLeads();
  }, [filter]);

  async function loadSummary() {
    try {
      const res = await fetch("/api/admin/leads?summary=1");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setSummary({
          total: Number(data?.total || 0),
          unread: Number(data?.unread || 0)
        });
      }
    } catch (error) {
      console.error("Error loading lead summary:", error);
    }
  }

  async function loadLeads() {
    setLoading(true);
    try {
      const query = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/admin/leads${query}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateReadState(id: number, isRead: boolean) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead })
      });
      if (res.ok) {
        await Promise.all([loadSummary(), loadLeads()]);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  }

  function formatDate(value?: string) {
    if (!value) return "";
    const date = new Date(value);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  }

  function previewMessage(message?: string) {
    if (!message) return "—";
    const trimmed = message.trim();
    if (trimmed.length <= 140) return trimmed;
    return `${trimmed.slice(0, 140)}…`;
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
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Leads</h1>
            <p className="mt-2 text-sm text-alabaster/60">
              Unread: {summary.unread} · Total: {summary.total}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["unread", "all", "read"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`rounded border px-3 py-1 text-xs uppercase tracking-[0.28em] ${
                  filter === option
                    ? "border-brass/60 bg-brass/10 text-alabaster"
                    : "border-alabaster/20 text-alabaster/70 hover:bg-alabaster/10"
                }`}
              >
                {option === "all" ? "All" : option === "unread" ? "Unread" : "Read"}
              </button>
            ))}
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-lg border border-alabaster/10 bg-alabaster/5 p-6 text-sm text-alabaster/70">
            No leads yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-alabaster/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-ink/60 text-xs uppercase tracking-[0.28em] text-alabaster/60">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`border-t border-alabaster/10 ${
                      lead.is_read ? "bg-transparent" : "bg-brass/10"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-xs text-alabaster/60">{lead.company || "—"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p>{lead.email}</p>
                      <p className="text-xs text-alabaster/60">{lead.phone || "—"}</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-alabaster/70">
                      <p>{lead.project_type || "—"}</p>
                      <p>{lead.budget_range || "—"}</p>
                      <p>{lead.timeline || "—"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="max-w-[260px] text-alabaster/80">
                        {previewMessage(lead.message)}
                      </p>
                      <p className="mt-1 text-xs text-alabaster/50">
                        {lead.source_page || "/"}
                      </p>
                      {lead.message ? (
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="mt-2 text-xs uppercase tracking-[0.28em] text-brass/80 hover:text-brass"
                        >
                          View full message
                        </button>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-xs text-alabaster/60">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => updateReadState(lead.id, !lead.is_read)}
                        className="rounded border border-alabaster/20 px-3 py-2 text-xs hover:bg-alabaster/10"
                      >
                        {lead.is_read ? "Mark unread" : "Mark read"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedLead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-6">
          <div className="w-full max-w-2xl rounded-2xl border border-ink/10 bg-alabaster p-6 text-ink shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
                  Lead message
                </p>
                <h3 className="mt-2 text-xl font-semibold">{selectedLead.name}</h3>
                <p className="mt-1 text-sm text-ink/70">{selectedLead.email}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded border border-ink/20 px-3 py-2 text-xs uppercase tracking-[0.28em] text-ink/70 hover:bg-ink/10"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-4 text-sm text-ink/80">
              <p>{selectedLead.message || "No message provided."}</p>
              <div className="grid gap-2 text-xs text-ink/60 sm:grid-cols-2">
                <span>Phone: {selectedLead.phone || "—"}</span>
                <span>Company: {selectedLead.company || "—"}</span>
                <span>Project: {selectedLead.project_type || "—"}</span>
                <span>Budget: {selectedLead.budget_range || "—"}</span>
                <span>Timeline: {selectedLead.timeline || "—"}</span>
                <span>Received: {formatDate(selectedLead.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
