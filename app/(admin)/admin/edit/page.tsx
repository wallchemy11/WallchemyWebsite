"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

type FieldConfig = {
  key: string;
  label: string;
  description: string;
  type: "text" | "textarea" | "url" | "array" | "object" | "media" | "color";
  arrayItemType?: "project" | "collection" | "cta" | "step" | "value" | "manifesto";
  mediaKind?: "image" | "video";
};

const PAGE_CONFIGS: Record<string, FieldConfig[]> = {
  home: [
    {
      key: "heroHeadline",
      label: "Hero Headline",
      description: "Main headline on the homepage hero section",
      type: "text"
    },
    {
      key: "heroSubheadline",
      label: "Hero Subheadline",
      description: "Supporting text below the headline",
      type: "text"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL (Desktop)",
      description: "R2 video URL for desktop hero background",
      type: "url"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      description: "R2 video URL for mobile hero background",
      type: "url"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      description: "Fallback image shown before video loads",
      type: "media",
      mediaKind: "image"
    },
    {
      key: "introText",
      label: "Intro Statement",
      description: "Large split-text statement below the hero",
      type: "textarea"
    },
    {
      key: "manifesto.eyebrow",
      label: "Manifesto Eyebrow",
      description: "Small label above the manifesto title",
      type: "text"
    },
    {
      key: "manifesto.title",
      label: "Manifesto Title",
      description: "Main manifesto heading",
      type: "text"
    },
    {
      key: "manifesto.subtitle",
      label: "Manifesto Subtitle",
      description: "Short subtitle under the manifesto title",
      type: "text"
    },
    {
      key: "manifesto.items",
      label: "Manifesto Items",
      description: "Short sections inside the manifesto",
      type: "array",
      arrayItemType: "manifesto"
    },
    {
      key: "studioDivider.eyebrow",
      label: "Studio Divider Eyebrow",
      description: "Label above the studio divider text",
      type: "text"
    },
    {
      key: "studioDivider.title",
      label: "Studio Divider Title",
      description: "Main studio divider title",
      type: "text"
    },
    {
      key: "studioDivider.subtitle",
      label: "Studio Divider Subtitle",
      description: "Studio divider subtitle",
      type: "text"
    },
    {
      key: "ctaIntro",
      label: "CTA Intro Text",
      description: "Text above the CTA buttons",
      type: "textarea"
    },
    {
      key: "primaryCtas",
      label: "Call-to-Action Buttons",
      description: "Buttons shown in the CTA section",
      type: "array",
      arrayItemType: "cta"
    },
    {
      key: "ribbonHeading.eyebrow",
      label: "Ribbon Eyebrow",
      description: "Label above the material ribbon",
      type: "text"
    },
    {
      key: "ribbonHeading.title",
      label: "Ribbon Title",
      description: "Heading for the ribbon section",
      type: "text"
    },
    {
      key: "selectedDivider.eyebrow",
      label: "Selected Work Divider Eyebrow",
      description: "Label above selected work divider",
      type: "text"
    },
    {
      key: "selectedDivider.title",
      label: "Selected Work Divider Title",
      description: "Title for selected work divider",
      type: "text"
    },
    {
      key: "selectedDivider.subtitle",
      label: "Selected Work Divider Subtitle",
      description: "Subtitle for selected work divider",
      type: "text"
    },
    {
      key: "selectedHeading.eyebrow",
      label: "Selected Projects Eyebrow",
      description: "Eyebrow for selected projects section",
      type: "text"
    },
    {
      key: "selectedHeading.title",
      label: "Selected Projects Title",
      description: "Title for selected projects section",
      type: "text"
    },
    {
      key: "selectedHeading.subtitle",
      label: "Selected Projects Subtitle",
      description: "Subtitle for selected projects section",
      type: "text"
    }
  ],
  about: [
    {
      key: "title",
      label: "Page Title",
      description: "Internal title (not shown on site)",
      type: "text"
    },
    {
      key: "intro",
      label: "Introduction",
      description: "Opening text on the About page",
      type: "textarea"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL (Desktop)",
      description: "R2 video URL for desktop hero background",
      type: "url"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      description: "R2 video URL for mobile hero background",
      type: "url"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      description: "Fallback image",
      type: "media",
      mediaKind: "image"
    },
    {
      key: "studioDividerImage",
      label: "Studio Divider Image",
      description: "Image used in the Studio Ethos divider",
      type: "media",
      mediaKind: "image"
    },
    {
      key: "studioDivider.eyebrow",
      label: "Studio Divider Eyebrow",
      description: "Label above the Studio Ethos divider",
      type: "text"
    },
    {
      key: "studioDivider.title",
      label: "Studio Divider Title",
      description: "Title text for Studio Ethos divider",
      type: "text"
    },
    {
      key: "studioDivider.subtitle",
      label: "Studio Divider Subtitle",
      description: "Subtitle text for Studio Ethos divider",
      type: "text"
    },
    {
      key: "narrative",
      label: "Narrative",
      description: "Main story text",
      type: "textarea"
    },
    {
      key: "narrativeHeading.eyebrow",
      label: "Narrative Eyebrow",
      description: "Label above the narrative section",
      type: "text"
    },
    {
      key: "narrativeHeading.title",
      label: "Narrative Title",
      description: "Title for the narrative section",
      type: "text"
    },
    {
      key: "narrativeHeading.subtitle",
      label: "Narrative Subtitle",
      description: "Subtitle for the narrative section",
      type: "text"
    },
    {
      key: "founderNote",
      label: "Founder Note",
      description: "Note about the founders/team",
      type: "textarea"
    },
    {
      key: "studioValues",
      label: "Studio Values",
      description: "List of core values",
      type: "array",
      arrayItemType: "value"
    },
    {
      key: "valuesHeading.eyebrow",
      label: "Values Eyebrow",
      description: "Label above the values section",
      type: "text"
    },
    {
      key: "valuesHeading.title",
      label: "Values Title",
      description: "Title for the values section",
      type: "text"
    },
    {
      key: "valuesDividerImage",
      label: "Values Divider Image",
      description: "Image used above the values section",
      type: "media",
      mediaKind: "image"
    },
    {
      key: "valuesDivider.eyebrow",
      label: "Values Divider Eyebrow",
      description: "Label above the values divider",
      type: "text"
    },
    {
      key: "valuesDivider.title",
      label: "Values Divider Title",
      description: "Title for values divider",
      type: "text"
    },
    {
      key: "valuesDivider.subtitle",
      label: "Values Divider Subtitle",
      description: "Subtitle for values divider",
      type: "text"
    }
  ],
  textures: [
    {
      key: "title",
      label: "Page Title",
      type: "text",
      description: "Internal title"
    },
    {
      key: "intro",
      label: "Introduction",
      type: "textarea",
      description: "Opening text"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL",
      type: "url",
      description: "R2 video URL for the hero background"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      type: "url",
      description: "R2 video URL for mobile hero background"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image shown before video loads"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      type: "url",
      description: "R2 video URL for mobile hero background"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image shown before video loads"
    },
    {
      key: "dividerImage",
      label: "Divider Image",
      type: "media",
      mediaKind: "image",
      description: "Image shown above collections"
    },
    {
      key: "defaultCollectionImage",
      label: "Default Collection Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image if a collection has no image"
    },
    {
      key: "divider.eyebrow",
      label: "Divider Eyebrow",
      description: "Label above the divider",
      type: "text"
    },
    {
      key: "divider.title",
      label: "Divider Title",
      description: "Main divider title",
      type: "text"
    },
    {
      key: "divider.subtitle",
      label: "Divider Subtitle",
      description: "Divider subtitle",
      type: "text"
    },
    {
      key: "collectionsHeading.eyebrow",
      label: "Collections Eyebrow",
      description: "Label above the collections list",
      type: "text"
    },
    {
      key: "collectionsHeading.subtitle",
      label: "Collections Subtitle",
      description: "Subtitle above the collections list",
      type: "text"
    },
    
  ],
  process: [
    {
      key: "title",
      label: "Page Title",
      type: "text",
      description: "Internal title"
    },
    {
      key: "intro",
      label: "Introduction",
      type: "textarea",
      description: "Opening text"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL",
      type: "url",
      description: "R2 video URL for the hero background"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      type: "url",
      description: "R2 video URL for mobile hero background"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image shown before video loads"
    },
    {
      key: "dividerImage",
      label: "Divider Image",
      type: "media",
      mediaKind: "image",
      description: "Image shown above the process steps"
    },
    {
      key: "divider.eyebrow",
      label: "Divider Eyebrow",
      description: "Label above the divider",
      type: "text"
    },
    {
      key: "divider.title",
      label: "Divider Title",
      description: "Main divider title",
      type: "text"
    },
    {
      key: "divider.subtitle",
      label: "Divider Subtitle",
      description: "Divider subtitle",
      type: "text"
    },
    {
      key: "narrativeHeading.eyebrow",
      label: "Process Eyebrow",
      description: "Label above the process narrative",
      type: "text"
    },
    {
      key: "narrativeHeading.title",
      label: "Process Title",
      description: "Title above the process steps",
      type: "text"
    },
    {
      key: "narrativeHeading.subtitle",
      label: "Process Subtitle",
      description: "Subtitle for process section",
      type: "text"
    },
    {
      key: "steps",
      label: "Process Steps",
      type: "array",
      arrayItemType: "step",
      description: "Each step supports a title and subtext"
    }
  ],
  projects: [
    {
      key: "title",
      label: "Page Title",
      type: "text",
      description: "Internal title"
    },
    {
      key: "intro",
      label: "Introduction",
      type: "textarea",
      description: "Opening text"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL",
      type: "url",
      description: "R2 video URL for the hero background"
    },
    {
      key: "defaultProjectImage",
      label: "Default Project Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image if a project has no image"
    },
    {
      key: "selectedDivider.eyebrow",
      label: "Selected Divider Eyebrow",
      description: "Label above selected projects divider",
      type: "text"
    },
    {
      key: "selectedDivider.title",
      label: "Selected Divider Title",
      description: "Title above selected projects divider",
      type: "text"
    },
    {
      key: "selectedDivider.subtitle",
      label: "Selected Divider Subtitle",
      description: "Subtitle for selected projects divider",
      type: "text"
    },
    {
      key: "selectedHeading.eyebrow",
      label: "Selected Projects Eyebrow",
      description: "Eyebrow for selected projects section",
      type: "text"
    },
    {
      key: "selectedHeading.title",
      label: "Selected Projects Title",
      description: "Title for selected projects section",
      type: "text"
    },
    {
      key: "selectedHeading.subtitle",
      label: "Selected Projects Subtitle",
      description: "Subtitle for selected projects section",
      type: "text"
    }
    
  ],
  contact: [
    {
      key: "title",
      label: "Page Title",
      type: "text",
      description: "Internal title"
    },
    {
      key: "intro",
      label: "Introduction",
      type: "textarea",
      description: "Opening text"
    },
    {
      key: "heroVideo",
      label: "Hero Video URL",
      type: "url",
      description: "R2 video URL for the hero background"
    },
    {
      key: "heroVideoMobile",
      label: "Hero Video URL (Mobile)",
      type: "url",
      description: "R2 video URL for mobile hero background"
    },
    {
      key: "heroPoster",
      label: "Hero Poster Image",
      type: "media",
      mediaKind: "image",
      description: "Fallback image"
    },
    {
      key: "divider.eyebrow",
      label: "Divider Eyebrow",
      type: "text",
      description: "Label above the enquiry divider"
    },
    {
      key: "divider.title",
      label: "Divider Title",
      type: "text",
      description: "Title above the enquiry divider"
    },
    {
      key: "divider.subtitle",
      label: "Divider Subtitle",
      type: "text",
      description: "Subtitle above the enquiry divider"
    },
    {
      key: "panelEyebrow",
      label: "Contact Panel Eyebrow",
      type: "text",
      description: "Small label above the contact panel"
    },
    {
      key: "studioAddress",
      label: "Studio Address",
      type: "text",
      description: "Physical address"
    },
    {
      key: "email",
      label: "Email",
      type: "text",
      description: "Contact email"
    },
    {
      key: "dividerImage",
      label: "Divider Image",
      type: "media",
      mediaKind: "image",
      description: "Image used above the enquiry form"
    },
    {
      key: "meetingEyebrow",
      label: "Meeting Eyebrow",
      type: "text",
      description: "Small label for meeting section"
    },
    {
      key: "meetingTitle",
      label: "Meeting Section Title",
      type: "text",
      description: "Heading for the meeting block"
    },
    {
      key: "meetingSubtitle",
      label: "Meeting Section Subtitle",
      type: "textarea",
      description: "Supporting copy for meeting block"
    },
    {
      key: "meetingCtaLabel",
      label: "Meeting Button Label",
      type: "text",
      description: "Text for the meeting button"
    },
    {
      key: "meetingLink",
      label: "Meeting Link",
      type: "url",
      description: "Calendly or WhatsApp link"
    },
    {
      key: "whatsappNumber",
      label: "WhatsApp Number",
      type: "text",
      description: "Include country code (e.g., +91XXXXXXXXXX)"
    },
    {
      key: "whatsappMessage",
      label: "WhatsApp Default Message",
      type: "textarea",
      description: "Pre-filled message for WhatsApp button"
    },
    {
      key: "social.instagram",
      label: "Instagram URL",
      type: "url",
      description: "Full Instagram profile URL"
    },
    {
      key: "social.behance",
      label: "Behance URL",
      type: "url",
      description: "Full Behance profile URL"
    },
    {
      key: "social.linkedin",
      label: "LinkedIn URL",
      type: "url",
      description: "Full LinkedIn profile URL"
    },
    {
      key: "social.youtube",
      label: "YouTube URL",
      type: "url",
      description: "Full YouTube channel URL"
    }
  ],
  settings: [
    {
      key: "palette.ink",
      label: "Ink (Background)",
      type: "color",
      description: "Primary background color"
    },
    {
      key: "palette.alabaster",
      label: "Alabaster (Text)",
      type: "color",
      description: "Primary text color"
    },
    {
      key: "palette.brass",
      label: "Brass (Accent)",
      type: "color",
      description: "Accent color for buttons and highlights"
    },
    {
      key: "palette.smoke",
      label: "Smoke (Muted)",
      type: "color",
      description: "Muted secondary color"
    },
    {
      key: "palette.ember",
      label: "Ember (Error/Accent)",
      type: "color",
      description: "Warm accent color"
    },
  ]
};

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<string>(searchParams.get("page") || "home");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<any>({});
  const [projectUploading, setProjectUploading] = useState(false);
  const [projectUploadError, setProjectUploadError] = useState("");
  const [editingCollection, setEditingCollection] = useState<number | null>(null);
  const [collectionForm, setCollectionForm] = useState<any>({});
  const [collectionUploading, setCollectionUploading] = useState(false);
  const [collectionUploadError, setCollectionUploadError] = useState("");

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) setPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    loadPage();
    loadProjectsAndCollections();
  }, [page]);

  async function loadProjectsAndCollections() {
    try {
      const [projRes, collRes] = await Promise.all([
        fetch("/api/admin/data?page=projects-list"),
        fetch("/api/admin/data?page=collections-list")
      ]);
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(Array.isArray(projData) ? projData : []);
      }
      if (collRes.ok) {
        const collData = await collRes.json();
        setCollections(Array.isArray(collData) ? collData : []);
      }
    } catch (error) {
      console.error("Error loading projects/collections:", error);
    }
  }

  async function saveProjectInline() {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm)
      });
      if (res.ok) {
        setEditingProject(null);
        setProjectForm({});
        loadProjectsAndCollections();
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  }

  async function deleteProjectInline(id: number) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProjectsAndCollections();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  async function uploadProjectImage(file: File) {
    setProjectUploadError("");
    setProjectUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "projects");
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Upload failed");
      }
      const json = await res.json();
      setProjectForm((prev: any) => ({ ...prev, heroImageUrl: json.url }));
    } catch (error: any) {
      setProjectUploadError(error?.message || "Upload failed");
    } finally {
      setProjectUploading(false);
    }
  }

  async function saveCollectionInline() {
    try {
      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionForm)
      });
      if (res.ok) {
        setEditingCollection(null);
        setCollectionForm({});
        loadProjectsAndCollections();
      }
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  }

  async function deleteCollectionInline(id: number) {
    if (!confirm("Delete this collection?")) return;
    try {
      const res = await fetch(`/api/admin/collections?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProjectsAndCollections();
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  }

  async function uploadCollectionImage(file: File) {
    setCollectionUploadError("");
    setCollectionUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "collections");
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Upload failed");
      }
      const json = await res.json();
      setCollectionForm((prev: any) => ({ ...prev, heroImageUrl: json.url }));
    } catch (error: any) {
      setCollectionUploadError(error?.message || "Upload failed");
    } finally {
      setCollectionUploading(false);
    }
  }

  async function loadPage() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/data?page=${page}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else if (res.status === 401) {
        router.push("/admin/login");
      }
    } catch (error) {
      setMessage("Error loading page data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/data?page=${page}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const error = await res.json();
        setMessage(error.error || "Error saving");
      }
    } catch (error) {
      setMessage("Error saving");
    } finally {
      setSaving(false);
    }
  }

  function updateField(path: string[], value: any) {
    setData((prev: any) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  }

  function getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  function groupForField(pageKey: string, field: FieldConfig) {
    const key = field.key;
    if (pageKey === "home") {
      if (key.startsWith("hero")) return "Hero";
      if (key.startsWith("intro")) return "Intro";
      if (key.startsWith("manifesto")) return "Manifesto";
      if (key.startsWith("studioDivider")) return "Studio Divider";
      if (key.startsWith("cta") || key.startsWith("primaryCtas")) return "CTA";
      if (key.startsWith("ribbon")) return "Ribbon";
      if (key.startsWith("selectedDivider") || key.startsWith("selectedHeading"))
        return "Selected Work";
    }
    if (pageKey === "about") {
      if (key.startsWith("hero") || key === "title" || key === "intro") return "Hero";
      if (key.startsWith("studioDivider")) return "Studio Divider";
      if (key.startsWith("narrative")) return "Narrative";
      if (key.startsWith("valuesHeading") || key.startsWith("studioValues")) return "Values";
      if (key.startsWith("valuesDivider")) return "Values Divider";
    }
    if (pageKey === "textures") {
      if (key.startsWith("hero") || key === "title" || key === "intro") return "Hero";
      if (key.startsWith("divider")) return "Divider";
      if (key.startsWith("collectionsHeading") || key.startsWith("defaultCollection"))
        return "Collections";
    }
    if (pageKey === "process") {
      if (key.startsWith("hero") || key === "title" || key === "intro") return "Hero";
      if (key.startsWith("divider")) return "Divider";
      if (key.startsWith("narrativeHeading")) return "Narrative";
      if (key === "steps") return "Steps";
    }
    if (pageKey === "projects") {
      if (key.startsWith("hero") || key === "title" || key === "intro") return "Hero";
      if (key.startsWith("selectedDivider") || key.startsWith("selectedHeading"))
        return "Selected Work";
      if (key.startsWith("defaultProjectImage")) return "Projects";
    }
    if (pageKey === "contact") {
      if (key.startsWith("hero") || key === "title" || key === "intro") return "Hero";
      if (key.startsWith("divider")) return "Enquiry";
      if (key.startsWith("panelEyebrow")) return "Contact Panel";
      if (key.startsWith("meeting")) return "Meeting";
      if (key.startsWith("whatsapp") || key.startsWith("social"))
        return "Social + WhatsApp";
    }
    if (pageKey === "settings") return "Palette";
    return "General";
  }

  function collectWarnings(fields: FieldConfig[]) {
    const warnings: string[] = [];
    fields.forEach((field) => {
      const value = getNestedValue(data, field.key);
      if (field.type === "array") {
        if (!Array.isArray(value) || value.length === 0) {
          warnings.push(`${field.label} is empty.`);
        }
      }
      if (field.type === "url" || field.type === "text" || field.type === "textarea") {
        if (!value || String(value).trim().length === 0) {
          if (field.key.toLowerCase().includes("hero") || field.key.toLowerCase().includes("divider")) {
            warnings.push(`${field.label} is missing.`);
          }
        }
      }
      if (field.type === "media" && !value) {
        warnings.push(`${field.label} is missing.`);
      }
      if (field.arrayItemType === "step" && Array.isArray(value)) {
        value.forEach((step: any, idx: number) => {
          if (!step?.title || !step?.body) {
            warnings.push(`Process step ${idx + 1} needs title + subtext.`);
          }
        });
      }
    });
    return warnings;
  }

  function renderField(field: FieldConfig) {
    const path = field.key.split(".");
    const value = getNestedValue(data, field.key);

    if (field.type === "array") {
      return (
        <div key={field.key} className="space-y-4">
          <div>
            <label className="mb-2 block font-semibold">{field.label}</label>
            <p className="mb-3 text-sm text-alabaster/60">{field.description}</p>
            {field.arrayItemType === "project" && (
              <div className="mb-4 rounded-lg border border-alabaster/10 bg-alabaster/5 p-4">
                <p className="text-sm text-alabaster/70">
                  💡 <strong>Tip:</strong> To add/edit projects, go to{" "}
                  <button
                    onClick={() => router.push("/admin/projects")}
                    className="underline hover:text-brass"
                  >
                    Projects Management
                  </button>
                  . Selected projects will appear here automatically.
                </p>
              </div>
            )}
            {field.arrayItemType === "collection" && (
              <div className="mb-4 rounded-lg border border-alabaster/10 bg-alabaster/5 p-4">
                <p className="text-sm text-alabaster/70">
                  💡 <strong>Tip:</strong> To add/edit collections, go to{" "}
                  <button
                    onClick={() => router.push("/admin/collections")}
                    className="underline hover:text-brass"
                  >
                    Collections Management
                  </button>
                  . Selected collections will appear here automatically.
                </p>
              </div>
            )}
            <div className="space-y-2">
              {(Array.isArray(value) ? value : []).map((item: any, idx: number) => (
                <div key={idx} className="rounded border border-alabaster/10 bg-alabaster/5 p-3">
                  {field.arrayItemType === "cta" && (
                    <>
                      <input
                        type="text"
                        placeholder="Button Label"
                        value={item.label || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], label: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="mb-2 w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                      />
                      <input
                        type="text"
                        placeholder="Button Link (URL)"
                        value={item.href || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], href: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                      />
                    </>
                  )}
                  {field.arrayItemType === "step" && (
                    <>
                      <input
                        type="text"
                        placeholder="Step title"
                        value={item?.title || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], title: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="mb-2 w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                      />
                      <textarea
                        placeholder="Supporting text"
                        value={item?.body || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], body: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                        rows={3}
                      />
                    </>
                  )}
                  {field.arrayItemType === "value" && (
                    <input
                      type="text"
                      value={item || ""}
                      onChange={(e) => {
                        const newArr = [...(value || [])];
                        newArr[idx] = e.target.value;
                        updateField(path, newArr);
                      }}
                      className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                    />
                  )}
                  {field.arrayItemType === "manifesto" && (
                    <>
                      <input
                        type="text"
                        placeholder="Item Eyebrow"
                        value={item.eyebrow || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], eyebrow: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="mb-2 w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                      />
                      <textarea
                        placeholder="Item Text"
                        value={item.text || ""}
                        onChange={(e) => {
                          const newArr = [...(value || [])];
                          newArr[idx] = { ...newArr[idx], text: e.target.value };
                          updateField(path, newArr);
                        }}
                        className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                        rows={3}
                      />
                    </>
                  )}
                  <button
                    onClick={() => {
                      const newArr = [...(value || [])];
                      newArr.splice(idx, 1);
                      updateField(path, newArr);
                    }}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newArr = [...(value || [])];
                  if (field.arrayItemType === "cta") {
                    newArr.push({ label: "", href: "" });
                  } else if (field.arrayItemType === "manifesto") {
                    newArr.push({ eyebrow: "", text: "" });
                  } else if (field.arrayItemType === "step") {
                    newArr.push({ title: "", body: "" });
                  } else {
                    newArr.push("");
                  }
                  updateField(path, newArr);
                }}
                className="rounded border border-alabaster/20 bg-alabaster/10 px-4 py-2 text-sm hover:bg-alabaster/20"
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>
      );
    }

    async function handleUpload(file: File) {
      setUploadError("");
      setUploadingField(field.key);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "folder",
          field.mediaKind === "video" ? "videos" : "images"
        );
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error?.error || "Upload failed");
        }
        const json = await res.json();
        updateField(path, json.url);
      } catch (error: any) {
        setUploadError(error?.message || "Upload failed");
      } finally {
        setUploadingField(null);
      }
    }

    if (field.type === "media") {
      return (
        <div key={field.key} className="space-y-3">
          <label className="block font-semibold">{field.label}</label>
          <p className="text-sm text-alabaster/60">{field.description}</p>
          {field.mediaKind === "image" && value ? (
            <img
              src={value}
              alt={field.label}
              className="h-32 w-full rounded border border-alabaster/10 object-cover sm:h-40"
            />
          ) : null}
          {field.mediaKind === "video" && value ? (
            <div className="rounded border border-alabaster/10 bg-ink px-4 py-2 text-xs text-alabaster/70">
              Current video: {value}
            </div>
          ) : null}
          {field.mediaKind === "image" ? (
            <input
              type="url"
              value={value || ""}
              onChange={(e) => updateField(path, e.target.value)}
              className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
              placeholder="https://..."
            />
          ) : null}
          <input
            type="file"
            accept={field.mediaKind === "video" ? "video/*" : "image/*"}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-sm text-alabaster file:mr-3 file:rounded file:border-0 file:bg-brass file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink"
          />
          {uploadingField === field.key ? (
            <p className="text-xs text-alabaster/60">Uploading...</p>
          ) : null}
          {uploadError ? (
            <p className="text-xs text-red-400">{uploadError}</p>
          ) : null}
        </div>
      );
    }

    return (
      <div key={field.key}>
        <label className="mb-2 block font-semibold">{field.label}</label>
        <p className="mb-2 text-sm text-alabaster/60">{field.description}</p>
        {field.type === "textarea" ? (
          <textarea
            value={value || ""}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
            rows={4}
          />
        ) : field.type === "color" ? (
          <input
            type="color"
            value={value || "#0b0a09"}
            onChange={(e) => updateField(path, e.target.value)}
            className="h-10 w-24 rounded border border-alabaster/20 bg-ink p-1"
          />
        ) : (
          <>
            <input
              type={field.type === "url" ? "url" : "text"}
              value={value || ""}
              onChange={(e) => updateField(path, e.target.value)}
              className="w-full rounded border border-alabaster/20 bg-ink px-4 py-2 text-alabaster"
              placeholder={field.type === "url" ? "https://..." : ""}
            />
            {field.type === "url" && value ? (
              /\.(png|jpg|jpeg|webp|gif)$/i.test(value) ||
              value.includes("unsplash") ||
              value.includes("pexels") ? (
                <img
                  src={value}
                  alt={field.label}
                  className="mt-2 h-28 w-full rounded border border-alabaster/10 object-cover"
                />
              ) : (
                <p className="mt-2 text-xs text-alabaster/60">URL set.</p>
              )
            ) : null}
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-alabaster">
        <p>No data found</p>
      </div>
    );
  }

  const fields = PAGE_CONFIGS[page] || [];
  const groupedFields = fields.reduce<Record<string, FieldConfig[]>>((acc, field) => {
    const group = groupForField(page, field);
    if (!acc[group]) acc[group] = [];
    acc[group].push(field);
    return acc;
  }, {});
  const warnings = collectWarnings(fields);

  return (
    <div className="text-alabaster">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Edit {page.charAt(0).toUpperCase() + page.slice(1)} Page
            </h1>
            <p className="mt-2 text-sm text-alabaster/60">
              Changes will appear on the live site immediately after saving
            </p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
          >
            ← Back to Dashboard
          </button>
        </div>

        {warnings.length > 0 ? (
          <div className="mb-6 rounded-lg border border-ember/30 bg-ember/10 p-4 text-sm text-alabaster/80">
            <p className="mb-2 font-semibold text-ember">Content warnings</p>
            <ul className="space-y-1">
              {warnings.map((warning, idx) => (
                <li key={`${warning}-${idx}`}>• {warning}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-6 rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 sm:p-6">
          {Object.entries(groupedFields).map(([group, groupFields]) => (
            <details key={group} open className="rounded border border-alabaster/10 bg-ink/40 p-4">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.28em] text-brass">
                {group}
              </summary>
              <div className="mt-4 space-y-6">
                {groupFields.map(renderField)}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-brass px-6 py-3 font-semibold text-ink hover:bg-brass/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
        </div>

        {page === "textures" && (
          <div className="mt-10 rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Collections</h2>
                <p className="text-sm text-alabaster/60">
                  Add and edit collections directly here.
                </p>
              </div>
              <button
                onClick={() => {
                  setCollectionForm({});
                  setEditingCollection(-1);
                }}
                className="rounded bg-brass px-4 py-2 text-sm font-semibold text-ink"
              >
                + New Collection
              </button>
            </div>

            {editingCollection !== null && (
              <div className="mb-6 rounded border border-alabaster/10 bg-ink/40 p-4">
                <h3 className="mb-4 text-lg font-semibold">
                  {editingCollection === -1 ? "New Collection" : "Edit Collection"}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={collectionForm.title || ""}
                    onChange={(e) => setCollectionForm({ ...collectionForm, title: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="text"
                    placeholder="Slug (e.g., velvet-lime)"
                    value={collectionForm.slug || ""}
                    onChange={(e) => setCollectionForm({ ...collectionForm, slug: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="url"
                    placeholder="Hero Image URL"
                    value={collectionForm.heroImageUrl || ""}
                    onChange={(e) => setCollectionForm({ ...collectionForm, heroImageUrl: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadCollectionImage(file);
                    }}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-sm text-alabaster file:mr-3 file:rounded file:border-0 file:bg-brass file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink"
                  />
                  {collectionUploading ? (
                    <p className="text-xs text-alabaster/60">Uploading...</p>
                  ) : null}
                  {collectionUploadError ? (
                    <p className="text-xs text-red-400">{collectionUploadError}</p>
                  ) : null}
                  <textarea
                    placeholder="Short description"
                    value={collectionForm.shortDescription || ""}
                    onChange={(e) => setCollectionForm({ ...collectionForm, shortDescription: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={saveCollectionInline}
                      className="rounded bg-brass px-4 py-2 text-sm font-semibold text-ink"
                    >
                      Save Collection
                    </button>
                    <button
                      onClick={() => {
                        setEditingCollection(null);
                        setCollectionForm({});
                      }}
                      className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className={`flex flex-col gap-3 rounded border border-alabaster/10 bg-ink/40 p-4 sm:flex-row sm:items-center sm:justify-between ${
                    editingCollection === collection.id ? "opacity-60" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold">{collection.title || collection.slug}</p>
                    <p className="text-sm text-alabaster/60">{collection.short_description}</p>
                    {editingCollection === collection.id ? (
                      <p className="mt-1 text-xs text-brass">Editing</p>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCollectionForm({
                          id: collection.id,
                          title: collection.title,
                          slug: collection.slug,
                          heroImageUrl: collection.hero_image_url,
                          shortDescription: collection.short_description
                        });
                        setEditingCollection(collection.id);
                      }}
                      className="rounded border border-alabaster/20 px-3 py-2 text-sm hover:bg-alabaster/10 disabled:opacity-50"
                      disabled={editingCollection === collection.id}
                    >
                      {editingCollection === collection.id ? "Editing" : "Edit"}
                    </button>
                    <button
                      onClick={() => deleteCollectionInline(collection.id)}
                      className="rounded border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {collections.length === 0 ? (
                <p className="text-sm text-alabaster/60">No collections yet.</p>
              ) : null}
            </div>
          </div>
        )}

        {page === "projects" && (
          <div className="mt-10 rounded-lg border border-alabaster/10 bg-alabaster/5 p-5 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Projects</h2>
                <p className="text-sm text-alabaster/60">
                  Add and edit projects directly here.
                </p>
              </div>
              <button
                onClick={() => {
                  setProjectForm({});
                  setEditingProject(-1);
                }}
                className="rounded bg-brass px-4 py-2 text-sm font-semibold text-ink"
              >
                + New Project
              </button>
            </div>

            {editingProject !== null && (
              <div className="mb-6 rounded border border-alabaster/10 bg-ink/40 p-4">
                <h3 className="mb-4 text-lg font-semibold">
                  {editingProject === -1 ? "New Project" : "Edit Project"}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={projectForm.title || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="text"
                    placeholder="Slug (e.g., amara-residence)"
                    value={projectForm.slug || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={projectForm.location || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="number"
                    placeholder="Area (sq ft)"
                    value={projectForm.areaSqFt || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, areaSqFt: parseInt(e.target.value) || 0 })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="url"
                    placeholder="Hero Image URL"
                    value={projectForm.heroImageUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, heroImageUrl: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadProjectImage(file);
                    }}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-sm text-alabaster file:mr-3 file:rounded file:border-0 file:bg-brass file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ink"
                  />
                  {projectUploading ? (
                    <p className="text-xs text-alabaster/60">Uploading...</p>
                  ) : null}
                  {projectUploadError ? (
                    <p className="text-xs text-red-400">{projectUploadError}</p>
                  ) : null}
                  <textarea
                    placeholder="Atmosphere note"
                    value={projectForm.atmosphereNote || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, atmosphereNote: e.target.value })}
                    className="w-full rounded border border-alabaster/20 bg-ink px-3 py-2 text-alabaster"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={saveProjectInline}
                      className="rounded bg-brass px-4 py-2 text-sm font-semibold text-ink"
                    >
                      Save Project
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setProjectForm({});
                      }}
                      className="rounded border border-alabaster/20 px-4 py-2 text-sm hover:bg-alabaster/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex flex-col gap-3 rounded border border-alabaster/10 bg-ink/40 p-4 sm:flex-row sm:items-center sm:justify-between ${
                    editingProject === project.id ? "opacity-60" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold">{project.title || project.slug}</p>
                    <p className="text-sm text-alabaster/60">
                      {project.location} • {project.area_sq_ft} sq ft
                    </p>
                    {editingProject === project.id ? (
                      <p className="mt-1 text-xs text-brass">Editing</p>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setProjectForm({
                          id: project.id,
                          title: project.title,
                          slug: project.slug,
                          location: project.location,
                          areaSqFt: project.area_sq_ft,
                          heroImageUrl: project.hero_image_url,
                          atmosphereNote: project.atmosphere_note
                        });
                        setEditingProject(project.id);
                      }}
                      className="rounded border border-alabaster/20 px-3 py-2 text-sm hover:bg-alabaster/10 disabled:opacity-50"
                      disabled={editingProject === project.id}
                    >
                      {editingProject === project.id ? "Editing" : "Edit"}
                    </button>
                    <button
                      onClick={() => deleteProjectInline(project.id)}
                      className="rounded border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 ? (
                <p className="text-sm text-alabaster/60">No projects yet.</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
