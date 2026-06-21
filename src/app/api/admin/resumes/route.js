import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSCODE = "wizard-admin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");
    const filename = searchParams.get("filename");
    const originalName = searchParams.get("originalname") || "resume.pdf";

    if (password !== ADMIN_PASSCODE) {
      return new Response("Unauthorized access. Access denied.", { status: 401 });
    }

    if (!filename) {
      return new Response("Filename parameter is required.", { status: 400 });
    }

    // Sanitize filename to prevent directory traversal attacks
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "src", "data", "resumes", safeFilename);

    if (!fs.existsSync(filePath)) {
      return new Response("Resume file not found on the server.", { status: 404 });
    }

    const fileBuffer = await fs.promises.readFile(filePath);
    
    // Determine content type based on file extension
    let contentType = "application/octet-stream";
    if (safeFilename.endsWith(".pdf")) {
      contentType = "application/pdf";
    } else if (safeFilename.endsWith(".docx")) {
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (safeFilename.endsWith(".doc")) {
      contentType = "application/msword";
    }

    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}"`);
    headers.set("Content-Type", contentType);

    return new Response(fileBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error("Admin resume download error:", error);
    return new Response("Internal server error occurred.", { status: 500 });
  }
}
