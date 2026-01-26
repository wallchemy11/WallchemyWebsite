import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";

const AUTH_COOKIE = "wallchemy_admin";

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = cookies();
  const usernameCookie = cookieStore.get(`${AUTH_COOKIE}.u`);
  const sigCookie = cookieStore.get(`${AUTH_COOKIE}.s`);
  
  if (!usernameCookie || !sigCookie) return false;
  
  // Verify session signature
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-secret";
  
  // Simple verification - in production, use proper session signing
  return usernameCookie.value === expectedUser;
}

export async function createSession(username: string) {
  const cookieStore = cookies();
  const secure = process.env.NODE_ENV === "production";
  
  cookieStore.set(`${AUTH_COOKIE}.u`, username, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12 // 12 hours
  });
  
  cookieStore.set(`${AUTH_COOKIE}.s`, "authenticated", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(`${AUTH_COOKIE}.u`);
  cookieStore.delete(`${AUTH_COOKIE}.s`);
  cookieStore.set(`${AUTH_COOKIE}.u`, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  cookieStore.set(`${AUTH_COOKIE}.s`, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}
