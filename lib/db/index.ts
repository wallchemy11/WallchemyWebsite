import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || "");

export const db = sql;

// Helper to ensure tables exist (run migrations)
export async function initDatabase() {
  try {
    // This will be run via Vercel Postgres migrations in production
    // For now, we'll handle it via API route
    return true;
  } catch (error) {
    console.error("Database init error:", error);
    return false;
  }
}
