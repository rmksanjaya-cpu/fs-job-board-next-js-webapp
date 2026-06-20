import { NextRequest, NextResponse } from "next/server";
import { getJobs, JobFilters } from "@/lib/jobs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  // Helper to parse selection parameters that can be either multiple key instances,
  // or a single key with comma-separated values (e.g. types=Internship,Co-op).
  const getListParam = (paramName: string): string[] | undefined => {
    const vals = searchParams.getAll(paramName);
    if (vals.length === 0) return undefined;
    if (vals.length === 1 && vals[0].includes(",")) {
      return vals[0].split(",").map((v) => decodeURIComponent(v.trim())).filter(Boolean);
    }
    return vals.map((v) => decodeURIComponent(v.trim())).filter(Boolean);
  };

  const types = getListParam("types") || getListParam("type");
  const locations = getListParam("locations") || getListParam("location");
  const categories = getListParam("categories") || getListParam("category");
  const tags = getListParam("tags") || getListParam("tag");
  const terms = getListParam("terms") || getListParam("term");

  const filters: JobFilters = {
    search,
    types,
    locations,
    categories,
    tags,
    terms,
    page,
    limit,
  };

  try {
    const result = await getJobs(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
