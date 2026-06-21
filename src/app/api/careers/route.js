import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { isCloudStorage, getDbDiagnostics, saveApplication } from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const appType = formData.get("appType"); // "job" or "internship"
    const role = formData.get("role");
    const portfolio = formData.get("portfolio");
    const coverLetter = formData.get("coverLetter");
    const resumeFile = formData.get("resume");

    if (!name || !email || !phone || !appType || !role || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const sanitizedFileName = `${timestamp}-${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    let resumeUrlPath = "";
    
    // Check database configuration and diagnostics
    const diagnostics = getDbDiagnostics();

    if (diagnostics.errorMsg) {
      return NextResponse.json(
        { 
          success: false, 
          error: diagnostics.errorMsg 
        },
        { status: 500 }
      );
    }

    if (isCloudStorage) {
      // 1. Upload file to Vercel Blob
      const arrayBuffer = await resumeFile.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      
      const blob = await put(sanitizedFileName, fileBuffer, {
        access: "public",
        contentType: resumeFile.type
      });
      resumeUrlPath = blob.url; // Save the Vercel Blob URL directly
    } else {
      // Setup paths locally
      const dataDir = path.join(process.cwd(), "src", "data");
      const resumesDir = path.join(dataDir, "resumes");

      // Ensure local directories exist
      if (!fs.existsSync(resumesDir)) {
        fs.mkdirSync(resumesDir, { recursive: true });
      }

      const resumeSavePath = path.join(resumesDir, sanitizedFileName);
      const arrayBuffer = await resumeFile.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      
      await fs.promises.writeFile(resumeSavePath, fileBuffer);
      resumeUrlPath = sanitizedFileName; // Save local filename
    }

    const newApplication = {
      id: `APP-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      appType,
      role,
      portfolio: portfolio || "",
      coverLetter: coverLetter || "",
      resumeFilename: resumeUrlPath, // Holds either sanitized filename (local) or Vercel Blob URL
      resumeOriginalName: resumeFile.name,
      submittedAt: new Date().toISOString()
    };

    // 2. Save application to database or local filesystem
    await saveApplication(newApplication);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id: newApplication.id
    }, { status: 200 });

  } catch (error) {
    console.error("Careers API submission error:", error);
    return NextResponse.json(
      { success: false, error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
