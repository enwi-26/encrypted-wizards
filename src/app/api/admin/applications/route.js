import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import { createClient } from "redis";

const ADMIN_PASSCODE = "wizard-admin";

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: "Incorrect admin passcode. Access denied." },
        { status: 401 }
      );
    }

    const isVercel = !!process.env.VERCEL;
    const hasCloudDb = !!(process.env.KV_REST_API_URL || process.env.REDIS_URL);
    const isCloudStorage = isVercel || hasCloudDb;

    if (isVercel && !hasCloudDb) {
      return NextResponse.json(
        { success: false, error: "Vercel Redis/KV database is not linked. Please connect a database and REDEPLOY your project." },
        { status: 500 }
      );
    }

    let applications = [];

    if (isCloudStorage) {
      if (process.env.KV_REST_API_URL) {
        // Retrieve from Vercel KV Redis List
        const kvApps = await kv.lrange("applications", 0, -1);
        applications = kvApps.map(item => {
          try {
            return typeof item === "string" ? JSON.parse(item) : item;
          } catch (e) {
            return item;
          }
        });
      } else if (process.env.REDIS_URL) {
        // Retrieve from standard Redis List
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        const redisApps = await client.lRange("applications", 0, -1);
        await client.quit();
        applications = redisApps.map(item => {
          try {
            return typeof item === "string" ? JSON.parse(item) : item;
          } catch (e) {
            return item;
          }
        });
      }
    } else {
      // Fallback: Retrieve locally from applications.json
      const dataFilePath = path.join(process.cwd(), "src", "data", "applications.json");
      if (fs.existsSync(dataFilePath)) {
        try {
          const fileContent = await fs.promises.readFile(dataFilePath, "utf8");
          applications = JSON.parse(fileContent || "[]");
        } catch (err) {
          console.error("Error reading applications.json", err);
          return NextResponse.json(
            { success: false, error: "Failed to read application records." },
            { status: 500 }
          );
        }
      }
    }

    // Return the applications sorted by newest first
    const sortedApps = [...applications].sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    return NextResponse.json({
      success: true,
      applications: sortedApps
    }, { status: 200 });

  } catch (error) {
    console.error("Admin applications retrieval error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
