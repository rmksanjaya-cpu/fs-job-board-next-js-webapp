"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import CustomDropdown from "@/components/CustomDropdown";
import { type Job } from "@/data/jobs";
import { useSearchParams } from "next/navigation";

const JOBS_PER_PAGE = 6;

function JobCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-pulse space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-navy-100 dark:bg-navy-800" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-navy-100 dark:bg-navy-800" />
            <div className="h-3 w-20 rounded bg-navy-100 dark:bg-navy-800" />
          </div>
        </div>
        <div className="h-5 w-16 rounded bg-navy-100 dark:bg-navy-800" />
      </div>
      <div className="h-3 w-full rounded bg-navy-100 dark:bg-navy-800" />
      <div className="h-3 w-2/3 rounded bg-navy-100 dark:bg-navy-800" />
      <div className="flex items-center gap-2 pt-2">
        <div className="h-6 w-16 rounded-full bg-navy-100 dark:bg-navy-800" />
        <div className="h-6 w-20 rounded-full bg-navy-100 dark:bg-navy-800" />
        <div className="h-6 w-14 rounded-full bg-navy-100 dark:bg-navy-800" />
      </div>
    </div>
  );
}

function JobsContent() {
  const searchParams = useSearchParams();

  // Filter States
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic filter options loaded from API
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [allTerms, setAllTerms] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Jobs state from API
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search query input to prevent excessive API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchVal);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchVal]);

  // Parse URL search parameters on mount
  useEffect(() => {
    const searchValParam = searchParams.get("search") || "";
    const locVal = searchParams.get("location") || "";
    
    if (searchValParam) {
      setSearchVal(searchValParam);
      setDebouncedSearchQuery(searchValParam);
    }
    
    if (locVal) {
      setSelectedLocations([locVal]);
    }
  }, [searchParams]);

  // Fetch jobs dynamically from backend API based on state changes
  useEffect(() => {
    let isMounted = true;
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearchQuery) queryParams.set("search", debouncedSearchQuery);
        if (selectedTypes.length > 0) queryParams.set("types", selectedTypes.join(","));
        if (selectedLocations.length > 0) queryParams.set("locations", selectedLocations.join(","));
        if (selectedCategories.length > 0) queryParams.set("categories", selectedCategories.join(","));
        if (selectedTags.length > 0) queryParams.set("tags", selectedTags.join(","));
        if (selectedTerms.length > 0) queryParams.set("terms", selectedTerms.join(","));
        queryParams.set("page", String(currentPage));
        queryParams.set("limit", String(JOBS_PER_PAGE));

        const res = await fetch(`/api/jobs?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        
        if (isMounted) {
          setJobs(data.jobs);
          setTotalJobs(data.total);
          setTotalPages(data.totalPages);
          if (data.allLocations) setAllLocations(data.allLocations);
          if (data.allTerms) setAllTerms(data.allTerms);
          if (data.allTags) setAllTags(data.allTags);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchQuery, selectedTypes, selectedLocations, selectedCategories, selectedTags, selectedTerms, currentPage]);

  // Handlers (which reset page to 1)
  const handleSearchChange = (val: string) => {
    setSearchVal(val);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchVal("");
    setDebouncedSearchQuery("");
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedTerms([]);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Hero Header */}
          <div className="mb-10 lg:mb-16">
            <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl">
              Search Open Roles
            </h1>
            <p className="mt-3 text-base text-navy-500 dark:text-navy-400 max-w-2xl">
              Find and filter dynamic software developer opportunities. Discover high-quality internships and co-ops designed to jumpstart your career.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80 shrink-0 rounded-3xl border border-border bg-card p-6 shadow-sm sticky top-24 self-start z-10">
              <div className="flex items-center justify-between border-b border-border/85 pb-4 mb-6">
                <h2 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-brand-blue hover:text-brand-indigo dark:text-brand-sky transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Text Search Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
                  Keyword Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Title, company, or tech..."
                    value={searchVal}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background/50 hover:bg-background focus:bg-background px-4 py-2.5 pl-10 text-sm text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  />
                  <svg
                    className="absolute left-3.5 top-3 h-4 w-4 text-navy-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                  </svg>
                </div>
              </div>

              {/* Job Type Dropdown */}
              <div className="border-t border-border/60 pt-6 mt-6">
                <CustomDropdown
                  label="Job Type"
                  placeholder="All Job Types"
                  options={["Internship", "Co-op"]}
                  selected={selectedTypes}
                  onChange={(val) => {
                    setSelectedTypes(val);
                    setCurrentPage(1);
                  }}
                  multiple={true}
                  leftIcon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.4v-4.25m16.5 0a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25m16.5 0V7.5A2.25 2.25 0 0 0 18 5.25H6A2.25 2.25 0 0 0 3.75 7.5v6.65M15 12.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  }
                />
              </div>

              {/* Placement Term Dropdown */}
              <div className="border-t border-border/60 pt-6 mt-6">
                <CustomDropdown
                  label="Placement Term"
                  placeholder="All Terms"
                  options={allTerms}
                  selected={selectedTerms}
                  onChange={(val) => {
                    setSelectedTerms(val);
                    setCurrentPage(1);
                  }}
                  multiple={true}
                  leftIcon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  }
                />
              </div>

              {/* Location Dropdown */}
              <div className="border-t border-border/60 pt-6 mt-6">
                <CustomDropdown
                  label="Locations"
                  placeholder="All Locations"
                  options={allLocations}
                  selected={selectedLocations}
                  onChange={(val) => {
                    setSelectedLocations(val);
                    setCurrentPage(1);
                  }}
                  multiple={true}
                  searchable={true}
                  isLocation={true}
                  leftIcon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  }
                />
              </div>

              {/* Category Dropdown */}
              <div className="border-t border-border/60 pt-6 mt-6">
                <CustomDropdown
                  label="Job Category"
                  placeholder="All Categories"
                  options={[
                    { label: "Frontend", value: "frontend" },
                    { label: "Backend", value: "backend" },
                    { label: "AI / ML", value: "ai" },
                    { label: "DevOps", value: "devops" },
                    { label: "Mobile", value: "mobile" },
                  ]}
                  selected={selectedCategories}
                  onChange={(val) => {
                    setSelectedCategories(val);
                    setCurrentPage(1);
                  }}
                  multiple={true}
                  leftIcon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  }
                />
              </div>

              {/* Skills Multiselect tags */}
              <div className="border-t border-border/60 pt-6 mt-6 space-y-3">
                <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-blue/10 border-brand-blue text-brand-blue dark:border-brand-sky dark:text-brand-sky"
                            : "bg-navy-50/50 dark:bg-navy-900/50 border-border/30 text-navy-600 dark:text-navy-300 hover:border-brand-blue/30"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

            </aside>

            {/* Jobs Display Grid */}
            <div className="flex-1 w-full space-y-6">
              
              {/* Header Stats */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider">
                  {isLoading ? "Searching..." : `${totalJobs} ${totalJobs === 1 ? "Job" : "Jobs"} Found`}
                </span>
                {!isLoading && totalJobs > 0 && (
                  <span className="text-xs font-medium text-navy-400">
                    Showing Page {currentPage} of {totalPages || 1}
                  </span>
                )}
              </div>

              {/* Job Grid / List */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <JobCardSkeleton key={idx} />
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/80 bg-navy-50/20 dark:bg-navy-950/10 rounded-3xl">
                  <svg
                    className="h-12 w-12 text-navy-400 dark:text-navy-600 mb-4 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                  </svg>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">No jobs match your search</h3>
                  <p className="mt-1 text-sm text-navy-400 max-w-sm">
                    Try adjusting your filters, clearing your search keywords, or selecting different technologies.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-5 rounded-xl bg-navy-900 dark:bg-navy-100 hover:bg-brand-blue dark:hover:bg-brand-sky text-white dark:text-navy-950 hover:text-white dark:hover:text-navy-950 text-xs font-bold px-4 py-2 cursor-pointer transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {!isLoading && totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 pt-6 border-t border-border/30">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-navy-600 dark:text-navy-300 hover:border-brand-blue/30 hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-inherit disabled:cursor-not-allowed transition-all cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15 scale-105"
                          : "bg-card border-border text-navy-600 dark:text-navy-300 hover:border-brand-blue/30 hover:text-brand-blue"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-navy-600 dark:text-navy-300 hover:border-brand-blue/30 hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-inherit disabled:cursor-not-allowed transition-all cursor-pointer"
                    aria-label="Next Page"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue border-t-transparent" />
            <p className="text-sm font-semibold text-navy-500">Loading Job Board...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}

