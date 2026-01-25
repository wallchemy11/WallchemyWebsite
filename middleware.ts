import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"]
};

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Wallchemy Admin", charset="UTF-8"'
    }
  });
}

export function middleware(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;

  // If no password is set, allow access (local/dev convenience).
  // IMPORTANT: set ADMIN_PASSWORD in Vercel for production.
  if (!password) return NextResponse.next();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return unauthorized();

  const [scheme, encoded] = authHeader.split(" ");
  if (scheme !== "Basic" || !encoded) return unauthorized();

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user !== "admin" || pass !== password) return unauthorized();

  return NextResponse.next();
}

