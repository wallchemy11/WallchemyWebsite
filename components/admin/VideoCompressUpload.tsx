"use client";

import { useRef, useState } from "react";

// ── Paths ─────────────────────────────────────────────────────────────────────
// ffmpeg.js + its worker chunk (814.ffmpeg.js) are served from /public so the
// browser can create a same-origin Worker. Core JS/WASM are loaded by the
// worker itself via importScripts — cross-origin is fine for importScripts.
const FFMPEG_LOCAL  = "/vendor/ffmpeg/ffmpeg.js";
// Must match the version the worker (814.ffmpeg.js) was compiled against.
const CORE_BASE     = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.9/dist/umd";

// ── fetchFile: convert a File to Uint8Array without @ffmpeg/util ─────────────
async function fetchFile(file: File): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer());
}

// ── Script loader (idempotent) ────────────────────────────────────────────────
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const el = document.createElement("script");
    el.src = src;
    el.onload  = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });
}

// ── FFmpeg singleton — WASM + worker loaded once per browser session ─────────
let _ff: any = null;
let _ffLoading: Promise<any> | null = null;

async function getFFmpeg() {
  if (_ff) return _ff;
  if (_ffLoading) return _ffLoading;

  _ffLoading = (async () => {
    // ffmpeg.js served locally so the Worker it spawns is same-origin.
    // Core JS/WASM passed as raw CDN URLs — importScripts (used by the worker
    // internally) supports cross-origin CORS; only `new Worker(url)` blocks it.
    await loadScript(FFMPEG_LOCAL);

    const { FFmpeg } = (window as any).FFmpegWASM as { FFmpeg: any };
    const ff = new FFmpeg();
    await ff.load({
      coreURL: `${CORE_BASE}/ffmpeg-core.js`,
      wasmURL: `${CORE_BASE}/ffmpeg-core.wasm`,
    });
    _ff = ff;
    return ff;
  })();

  return _ffLoading;
}

// ── Compress one version ──────────────────────────────────────────────────────
async function compress(
  ff:    any,
  input: string,
  out:   string,
  width: number,
  crf:   number,
  onPct: (n: number) => void,
): Promise<Uint8Array> {
  const cb = ({ progress }: { progress: number }) =>
    onPct(Math.min(Math.round(progress * 100), 99));
  ff.on("progress", cb);
  await ff.exec([
    "-i", input,
    "-vf", `scale=${width}:-2`,
    "-c:v", "libx264", "-crf", String(crf), "-preset", "fast",
    "-an",                      // hero videos are always muted
    "-movflags", "+faststart",
    out,
  ]);
  ff.off("progress", cb);
  onPct(100);
  const data = await ff.readFile(out);
  await ff.deleteFile(out);
  return data as Uint8Array;
}

// ── Upload via Vercel Blob client upload (no 4.5 MB body limit) ──────────────
async function uploadBlob(
  data:     Uint8Array,
  filename: string,
  onPct:    (n: number) => void,
): Promise<string> {
  // Dynamic import is fine here — @vercel/blob/client has no Worker/WASM issues
  const { upload } = await import("@vercel/blob/client");
  const file = new File([data.buffer as ArrayBuffer], filename, { type: "video/mp4" });
  const blob = await upload(`hero-videos/${filename}`, file, {
    access:            "public",
    handleUploadUrl:   "/api/admin/blob-upload",
    onUploadProgress:  ({ percentage }) => onPct(Math.round(percentage)),
  });
  return blob.url;
}

// ── Component ─────────────────────────────────────────────────────────────────
type Phase =
  | "idle" | "loading-wasm"
  | "compressing-desktop" | "uploading-desktop"
  | "compressing-mobile"  | "uploading-mobile"
  | "done" | "error";

type Props = {
  /** Called with the 1 080 p desktop URL (produced when this prop is provided) */
  onDesktopUrl?: (url: string) => void;
  /** Called with the 720 p mobile URL (produced when this prop is provided) */
  onMobileUrl?:  (url: string) => void;
  label?:        string;
};

export default function VideoCompressUpload({
  onDesktopUrl,
  onMobileUrl,
  label = "Upload & Compress",
}: Props) {
  const [phase,      setPhase]      = useState<Phase>("idle");
  const [desktopPct, setDesktopPct] = useState(0);
  const [mobilePct,  setMobilePct]  = useState(0);
  const [uploadPct,  setUploadPct]  = useState(0);
  const [errorMsg,   setErrorMsg]   = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function run(file: File) {
    setErrorMsg(""); setDesktopPct(0); setMobilePct(0); setUploadPct(0);
    try {
      setPhase("loading-wasm");
      const ff  = await getFFmpeg();
      await ff.writeFile("input.mp4", await fetchFile(file));
      const ts = Date.now();

      if (onDesktopUrl) {
        setPhase("compressing-desktop");
        const data = await compress(ff, "input.mp4", "out-desktop.mp4", 1920, 26, setDesktopPct);
        setPhase("uploading-desktop"); setUploadPct(0);
        const url  = await uploadBlob(data, `desktop-${ts}.mp4`, setUploadPct);
        onDesktopUrl(url);
      }

      if (onMobileUrl) {
        setPhase("compressing-mobile"); setUploadPct(0);
        const data = await compress(ff, "input.mp4", "out-mobile.mp4", 1280, 28, setMobilePct);
        setPhase("uploading-mobile"); setUploadPct(0);
        const url  = await uploadBlob(data, `mobile-${ts}.mp4`, setUploadPct);
        onMobileUrl(url);
      }

      await ff.deleteFile("input.mp4").catch(() => {});
      setPhase("done");
      setTimeout(() => setPhase("idle"), 4000);
    } catch (err: any) {
      console.error("[VideoCompressUpload]", err);
      setErrorMsg(err?.message || "Compression failed — check console for details.");
      setPhase("error");
    }
  }

  // ── Idle / Error ────────────────────────────────────────────────────────────
  if (phase === "idle" || phase === "error") {
    return (
      <div className="mt-2 space-y-1.5">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded bg-brass px-3 py-1.5 text-xs font-semibold text-ink transition-opacity hover:opacity-80"
        >
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v9M4 7l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 13h12" strokeLinecap="round"/>
          </svg>
          {label}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) run(f);
            e.target.value = "";
          }}
        />
        {errorMsg && (
          <p className="text-xs font-medium text-red-400">{errorMsg}</p>
        )}
      </div>
    );
  }

  // ── Done ────────────────────────────────────────────────────────────────────
  if (phase === "done") {
    return (
      <p className="mt-2 text-xs font-semibold text-green-600">
        ✓ Compressed &amp; uploaded — URLs filled in above
      </p>
    );
  }

  // ── Active progress ─────────────────────────────────────────────────────────
  const phaseLabel: Record<Phase, string> = {
    idle: "", done: "", error: "",
    "loading-wasm":        "Loading compressor (first use only, ~30 MB)…",
    "compressing-desktop": "Compressing desktop 1080p…",
    "uploading-desktop":   "Uploading desktop…",
    "compressing-mobile":  "Compressing mobile 720p…",
    "uploading-mobile":    "Uploading mobile…",
  };

  const showDesktop = !!onDesktopUrl && ["compressing-desktop","uploading-desktop","compressing-mobile","uploading-mobile"].includes(phase);
  const showMobile  = !!onMobileUrl  && ["compressing-mobile","uploading-mobile"].includes(phase);
  const showUpload  = phase === "uploading-desktop" || phase === "uploading-mobile";

  return (
    <div className="mt-2 space-y-2 rounded-md border border-alabaster/20 bg-alabaster/10 p-3 text-xs">
      <p className="font-semibold text-alabaster/80">{phaseLabel[phase]}</p>

      {showDesktop && <ProgressBar label="Desktop 1080p" pct={desktopPct} />}
      {showMobile  && <ProgressBar label="Mobile 720p"   pct={mobilePct}  />}
      {showUpload  && <ProgressBar label="Upload"        pct={uploadPct}  color="bg-green-500/70" />}

      <p className="text-alabaster/50">Large files may take a few minutes. Don't close this tab.</p>
    </div>
  );
}

function ProgressBar({
  label, pct, color = "bg-brass",
}: { label: string; pct: number; color?: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-alabaster/70">
        <span className="font-medium">{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-alabaster/20">
        <div className={`h-full ${color} transition-all duration-200`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
