import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware to ensure Next.js generates middleware-manifest.json
// Matches admin routes only to avoid interfering with other routes
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/api/")) {
    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = pathname.replace("/admin/api", "/api/admin");
    return NextResponse.rewrite(nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
