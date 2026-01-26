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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Failed to save" }, { status: 500 });
}
