import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    const dataFilePath = path.join(process.cwd(), "src", "data", "applications.json");
    
    let applications = [];
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
