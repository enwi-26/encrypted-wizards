import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { createClient } from "redis";

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
    
    // Check if running on Vercel and what databases are configured
    const isVercel = !!process.env.VERCEL;
    const redisUrl = process.env.KV_REST_API_URL || process.env.REDIS_URL || process.env.STORAGE_URL;
    const hasCloudDb = !!redisUrl;
    const isCloudStorage = isVercel || !!(hasCloudDb && process.env.BLOB_READ_WRITE_TOKEN);

    if (isVercel && (!hasCloudDb || !process.env.BLOB_READ_WRITE_TOKEN)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Cloud database variables not found. Please verify you linked both Vercel Redis (Upstash) & Vercel Blob in your project Storage panel, then REDEPLOY the project to apply them." 
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

    if (isCloudStorage) {
      // 2. Save application to Vercel KV or standard Redis
      if (process.env.KV_REST_API_URL) {
        await kv.lpush("applications", JSON.stringify(newApplication));
      } else if (redisUrl) {
        const client = createClient({ url: redisUrl });
        await client.connect();
        await client.lPush("applications", JSON.stringify(newApplication));
        await client.quit();
      }
    } else {
      // Fallback: Save application to applications.json locally
      const dataDir = path.join(process.cwd(), "src", "data");
      const applicationsFilePath = path.join(dataDir, "applications.json");
      
      let applications = [];
      if (fs.existsSync(applicationsFilePath)) {
        try {
          const fileContent = await fs.promises.readFile(applicationsFilePath, "utf8");
          applications = JSON.parse(fileContent || "[]");
        } catch (err) {
          console.error("Error reading applications.json, resetting to empty array", err);
          applications = [];
        }
      }

      applications.push(newApplication);

      await fs.promises.writeFile(
        applicationsFilePath,
        JSON.stringify(applications, null, 2),
        "utf8"
      );
    }

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
