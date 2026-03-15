import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import {
  getHomePage,
  getAboutPage,
  getTexturesPage,
  getProcessPage,
  getProjectsPage,
  getContactPage,
  getSiteSettings,
  getAllProjects,
  getAllCollections,
  getAllSelectedWork,
  getAllMaterialLibraryItems,
  saveHomePage,
  saveAboutPage,
  saveTexturesPage,
  saveProcessPage,
  saveProjectsPage,
  saveContactPage,
  saveSiteSettings
} from "@/lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const PAGES_WITH_HERO_VIDEO = new Set([
  "home",
  "about",
  "textures",
  "process",
  "contact"
]);

function collectHeroVideoWarnings(page: string, payload: any) {
  const warnings: string[] = [];
  if (!PAGES_WITH_HERO_VIDEO.has(page) || !payload || typeof payload !== "object") {
    return warnings;
  }

  const heroVideo =
    typeof payload.heroVideo === "string" ? payload.heroVideo.trim() : "";
  const heroVideoMobile =
    typeof payload.heroVideoMobile === "string" ? payload.heroVideoMobile.trim() : "";

  if (heroVideo && !heroVideoMobile) {
    warnings.push(
      "Hero Video URL (Mobile) is missing. Add a lighter mobile video to improve load time on phones."
    );
  }

  if (heroVideo && /\.mp4(?:[?#].*)?$/i.test(heroVideo)) {
    warnings.push(
      "Desktop hero uses a direct MP4 URL. Keep it short and compressed (ideally under 12MB) for faster first play."
    );
  }

  if (heroVideoMobile && /\.mp4(?:[?#].*)?$/i.test(heroVideoMobile)) {
    warnings.push(
      "Mobile hero uses a direct MP4 URL. Use a dedicated low-bitrate export (720/900p, ~1-2 Mbps)."
    );
  }

  if (/watch\.cloudflarestream\.com/i.test(heroVideo)) {
    warnings.push(
      "Cloudflare watch-page URLs do not work as background video sources. Use a direct media URL."
    );
  }

  if (/watch\.cloudflarestream\.com/i.test(heroVideoMobile)) {
    warnings.push(
      "Cloudflare watch-page URLs do not work for mobile hero videos. Use a direct media URL."
    );
  }

  return warnings;
}

export async function GET(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "home";

  let data;
  try {
    switch (page) {
      case "home":
        data = await getHomePage();
        break;
      case "about":
        data = await getAboutPage();
        break;
      case "textures":
        data = await getTexturesPage();
        break;
      case "process":
        data = await getProcessPage();
        break;
      case "projects":
        data = await getProjectsPage();
        break;
      case "contact":
        data = await getContactPage();
        break;
      case "settings":
        data = await getSiteSettings();
        break;
      case "projects-list":
        data = await getAllProjects();
        break;
      case "collections-list":
        data = await getAllCollections();
        break;
      case "selected-work-list":
        data = await getAllSelectedWork();
        break;
      case "material-library-list":
        data = await getAllMaterialLibraryItems();
        break;
      default:
        return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || {});
}

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "home";
  const data = await req.json();

  let success = false;
  let warnings: string[] = [];
  try {
    switch (page) {
      case "home":
        success = await saveHomePage(data);
        break;
      case "about":
        success = await saveAboutPage(data);
        break;
      case "textures":
        success = await saveTexturesPage(data);
        break;
      case "process":
        success = await saveProcessPage(data);
        break;
      case "projects":
        success = await saveProjectsPage(data);
        break;
      case "contact":
        success = await saveContactPage(data);
        break;
      case "settings":
        success = await saveSiteSettings(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }
    warnings = collectHeroVideoWarnings(page, data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (success) {
    return NextResponse.json({ success: true, warnings });
  }
  return NextResponse.json({ error: "Failed to save" }, { status: 500 });
}
