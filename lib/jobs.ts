import { JOBS_DATA, Job } from "@/data/jobs";

export interface JobFilters {
  search?: string;
  types?: string[];
  locations?: string[];
  categories?: string[];
  tags?: string[];
  terms?: string[];
  page?: number;
  limit?: number;
}

export interface PaginatedJobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  allLocations: string[];
  allTerms: string[];
  allTags: string[];
}

/**
 * Retrieves a filtered and paginated list of jobs, along with dynamic metadata (unique tags, terms, and locations).
 */
export async function getJobs(filters: JobFilters = {}): Promise<PaginatedJobsResponse> {
  const {
    search,
    types,
    locations,
    categories,
    tags,
    terms,
    page = 1,
    limit = 6,
  } = filters;

  // Extract all unique locations, terms, and tags from the main dataset for frontend filters
  const allLocations = Array.from(new Set(JOBS_DATA.map((job) => job.location))).sort();
  const allTerms = Array.from(new Set(JOBS_DATA.map((job) => job.term))).sort();
  const allTags = Array.from(new Set(JOBS_DATA.flatMap((job) => job.tags))).sort();

  let filteredJobs = [...JOBS_DATA];

  // 1. Search Query (matches title, company, description, or tags)
  if (search && search.trim() !== "") {
    const query = search.toLowerCase().trim();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((t) => t.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
    );
  }

  // 2. Job Type (Co-op, Internship)
  if (types && types.length > 0) {
    filteredJobs = filteredJobs.filter((job) => types.includes(job.type));
  }

  // 3. Location
  if (locations && locations.length > 0) {
    filteredJobs = filteredJobs.filter((job) => locations.includes(job.location));
  }

  // 4. Category
  if (categories && categories.length > 0) {
    filteredJobs = filteredJobs.filter((job) => categories.includes(job.category));
  }

  // 5. Skills/Tags (Must contain all selected tags)
  if (tags && tags.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      tags.every((tag) => job.tags.includes(tag))
    );
  }

  // 6. Placement Term
  if (terms && terms.length > 0) {
    filteredJobs = filteredJobs.filter((job) => terms.includes(job.term));
  }

  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const jobs = filteredJobs.slice(offset, offset + limit);

  return {
    jobs,
    total,
    page,
    limit,
    totalPages,
    allLocations,
    allTerms,
    allTags,
  };
}

/**
 * Retrieves a single job by its ID.
 */
export async function getJobById(id: string): Promise<Job | null> {
  const job = JOBS_DATA.find((j) => j.id === id);
  return job || null;
}
