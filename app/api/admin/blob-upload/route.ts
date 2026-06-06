import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  const response = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: [
        "video/mp4",
        "video/quicktime",
        "video/webm",
        "video/x-msvideo",
      ],
      maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB — raw source can be large
      addRandomSuffix: true,
    }),
    onUploadCompleted: async () => {
      // no-op — CMS saves the URL itself
    },
  });

  return NextResponse.json(response);
}
