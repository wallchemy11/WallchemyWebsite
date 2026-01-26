import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware to ensure Next.js generates middleware-manifest.json
// Matches admin routes only to avoid interfering with other routes
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
