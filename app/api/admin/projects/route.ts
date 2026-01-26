import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getAllProjects, saveProject, deleteProject } from "@/lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const slug = data.slug || `project-${Date.now()}`;
  const success = await saveProject(slug, data);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Failed to save" }, { status: 500 });
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }
  const success = await deleteProject(id);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
}
