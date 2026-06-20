import { NextRequest, NextResponse } from "next/server";
import { getJobById } from "@/lib/jobs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    console.error(`API Error fetching job details for ${error}:`, error);
    return NextResponse.json({ error: "Failed to fetch job details" }, { status: 500 });
  }
}
