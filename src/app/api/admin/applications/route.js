import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getDbDiagnostics, getApplications } from "@/lib/db";

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

    const diagnostics = getDbDiagnostics();

    if (diagnostics.errorMsg) {
      return NextResponse.json(
        { success: false, error: diagnostics.errorMsg },
        { status: 500 }
      );
    }

    let applications = [];
    try {
      applications = await getApplications();
    } catch (err) {
      console.error("Error fetching applications:", err);
      return NextResponse.json(
        { success: false, error: err.message || "Failed to retrieve application records." },
        { status: 500 }
      );
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
