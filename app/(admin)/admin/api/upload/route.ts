import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "uploads");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File missing" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.-]+/g, "-");
  const filename = `${folder}/${Date.now()}-${safeName}`;

  try {
    const blob = await put(filename, file, {
      access: "public"
    });
    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
