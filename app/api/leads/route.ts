import { NextResponse } from "next/server";
import { createLead } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const company = String(body?.company || "").trim();
  const projectType = String(body?.projectType || "").trim();
  const budgetRange = String(body?.budgetRange || "").trim();
  const timeline = String(body?.timeline || "").trim();
  const message = String(body?.message || "").trim();
  const sourcePage = String(body?.sourcePage || "").trim();
  const honeypot = String(body?.website || "").trim();

  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Please add a short project summary.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Leads storage unavailable. DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  await createLead({
    name,
    email,
    phone,
    company,
    projectType,
    budgetRange,
    timeline,
    message,
    sourcePage
  });

  return NextResponse.json({ success: true });
}
