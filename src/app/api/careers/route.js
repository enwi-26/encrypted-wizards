import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    // 1. Setup paths
    const dataDir = path.join(process.cwd(), "src", "data");
    const resumesDir = path.join(dataDir, "resumes");
    const applicationsFilePath = path.join(dataDir, "applications.json");

    // 2. Ensure directories exist
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }

    // 3. Save the resume file
    const timestamp = Date.now();
    const sanitizedFileName = `${timestamp}-${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const resumeSavePath = path.join(resumesDir, sanitizedFileName);
    
    const arrayBuffer = await resumeFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    
    await fs.promises.writeFile(resumeSavePath, fileBuffer);

    // 4. Save application metadata to applications.json
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

    const newApplication = {
      id: `APP-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      appType,
      role,
      portfolio: portfolio || "",
      coverLetter: coverLetter || "",
      resumeFilename: sanitizedFileName,
      resumeOriginalName: resumeFile.name,
      submittedAt: new Date().toISOString()
    };

    applications.push(newApplication);

    await fs.promises.writeFile(
      applicationsFilePath,
      JSON.stringify(applications, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id: newApplication.id
    }, { status: 200 });

  } catch (error) {
    console.error("Careers API submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while submitting." },
      { status: 500 }
    );
  }
}
