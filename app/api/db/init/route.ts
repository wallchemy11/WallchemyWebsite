import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    const schemaPath = path.join(process.cwd(), "lib/db/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    // Execute schema (strip comments before splitting)
    const withoutComments = schema
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n");
    const statements = withoutComments
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const db = getDb();
    for (const statement of statements) {
      try {
        await db.query(statement, []);
      } catch (error: any) {
        // Ignore "already exists" errors
        if (!error.message?.includes("already exists")) {
          console.error("Schema error:", error.message);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Database initialized" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
