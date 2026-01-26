import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}

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
