import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware to ensure Next.js generates middleware-manifest.json
// This prevents the "Cannot find module" error on Node 24 + Next.js 14.2.5
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: []
};
