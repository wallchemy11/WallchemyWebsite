"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

const Studio = dynamic(() => import("sanity").then((mod) => mod.Studio), {
  ssr: false
});

export default function AdminStudioPage() {
  return (
    <div className="min-h-screen bg-ink text-alabaster">
      <Studio config={config} />
    </div>
  );
}

