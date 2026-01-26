import "server-only";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");
  const nextPath = String(form.get("next") || "/admin");

  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "";

  if (!expectedPass) {
    await createSession(username);
    return NextResponse.redirect(new URL(nextPath, req.url), { status: 303 });
  }

  if (username !== expectedUser || password !== expectedPass) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url, { status: 303 });
  }

  await createSession(username);
  return NextResponse.redirect(new URL(nextPath, req.url), { status: 303 });
}
