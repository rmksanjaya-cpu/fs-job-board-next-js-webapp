import { NextRequest, NextResponse } from "next/server";
import { getJobById } from "@/lib/jobs";
import { saveApplication } from "@/lib/applications";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 1. Verify that the job exists
    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json(
        { error: "The job listing you are applying for was not found or has been removed." },
        { status: 404 }
      );
    }

    // 2. Parse form data (multipart/form-data for file uploads)
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseErr) {
      return NextResponse.json(
        { error: "Invalid form request. Please submit a valid form." },
        { status: 400 }
      );
    }

    const fullName = formData.get("fullName")?.toString()?.trim() || "";
    const email = formData.get("email")?.toString()?.trim() || "";
    const phone = formData.get("phone")?.toString()?.trim() || "";
    const portfolio = formData.get("portfolio")?.toString()?.trim() || "";
    const github = formData.get("github")?.toString()?.trim() || "";
    const coverLetter = formData.get("coverLetter")?.toString()?.trim() || "";
    const resumeFile = formData.get("resume");

    // 3. Server-side validations
    const errors: Record<string, string> = {};

    // Validate Name
    if (!fullName) {
      errors.fullName = "Full Name is required.";
    } else if (fullName.length < 3) {
      errors.fullName = "Full Name must be at least 3 characters.";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate URLs if provided
    if (portfolio) {
      try {
        new URL(portfolio);
      } catch {
        errors.portfolio = "Please enter a valid URL (e.g. https://portfolio.com).";
      }
    }
    if (github) {
      try {
        new URL(github);
      } catch {
        errors.github = "Please enter a valid URL (e.g. https://github.com/username).";
      }
    }

    // Validate Cover Letter character length
    if (coverLetter && coverLetter.length > 1000) {
      errors.coverLetter = "Cover Letter must not exceed 1000 characters.";
    }

    // Validate Resume File
    if (!resumeFile || !(resumeFile instanceof File)) {
      errors.resume = "Resume / CV file is required.";
    } else {
      const allowedExtensions = [".pdf", ".docx", ".doc"];
      const fileNameLower = resumeFile.name.toLowerCase();
      const hasAllowedExtension = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));
      
      const allowedMimeTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword"
      ];
      const isAllowedMime = allowedMimeTypes.includes(resumeFile.type);

      if (!hasAllowedExtension && !isAllowedMime) {
        errors.resume = "Only PDF, DOC, or DOCX files are allowed.";
      }

      // Max file size: 5MB
      const maxSizeBytes = 5 * 1024 * 1024;
      if (resumeFile.size > maxSizeBytes) {
        errors.resume = "Resume file must be smaller than 5MB.";
      }
    }

    // Return bad request if validation errors exist
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    // Since we validated resumeFile is a File above, we can cast it
    const file = resumeFile as File;

    // 4. Save metadata to applications JSON
    const applicationRecord = await saveApplication({
      jobId: id,
      jobTitle: job.title,
      fullName,
      email,
      phone: phone || undefined,
      portfolio: portfolio || undefined,
      github: github || undefined,
      coverLetter: coverLetter || undefined,
      resumeName: file.name,
      resumeSize: file.size,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      applicationId: applicationRecord.id,
    });

  } catch (error: any) {
    console.error("API Error in job application route:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
