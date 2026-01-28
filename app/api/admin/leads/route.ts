import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getLeads, getLeadSummary, setLeadReadState } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Leads storage unavailable. DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  const params = req.nextUrl.searchParams;
  const summary = params.get("summary");
  if (summary === "1") {
    const data = await getLeadSummary();
    return NextResponse.json(data);
  }

  const statusParam = params.get("status");
  const status =
    statusParam === "unread" || statusParam === "read" ? statusParam : undefined;
  const limitParam = params.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  const data = await getLeads({ status, limit });
  return NextResponse.json(data || []);
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Leads storage unavailable. DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const id = Number(body?.id);
  const isRead = Boolean(body?.isRead);

  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid lead id" }, { status: 400 });
  }

  await setLeadReadState(id, isRead);
  return NextResponse.json({ success: true });
}
