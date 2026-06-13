"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { JOBS_DATA } from "@/data/jobs";

const JOBS_PER_PAGE = 6;

export default function JobsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamically extract all unique tags from JOBS_DATA for filter buttons
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    JOBS_DATA.forEach((job) => {
      job.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // 1. Search Query (Matches title, company or tags)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesTags) {
          return false;
        }
      }

      // 2. Job Type (Co-op, Internship)
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(job.type)) {
          return false;
        }
      }

      // 3. Location Type (Remote, Hybrid, On-site)
      if (selectedLocations.length > 0) {
        const locationLower = job.location.toLowerCase();
        const isRemote = locationLower.includes("remote");
        const isHybrid = locationLower.includes("hybrid");
        const isOnSite = !isRemote && !isHybrid;

        const matchesRemote = selectedLocations.includes("Remote") && isRemote;
        const matchesHybrid = selectedLocations.includes("Hybrid") && isHybrid;
        const matchesOnSite = selectedLocations.includes("On-site") && isOnSite;

        if (!matchesRemote && !matchesHybrid && !matchesOnSite) {
          return false;
        }
      }

      // 4. Category
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(job.category)) {
          return false;
        }
      }

      // 5. Skills/Tags
      if (selectedTags.length > 0) {
        // Must contain all selected tags
        const hasAllSelectedTags = selectedTags.every((tag) => job.tags.includes(tag));
        if (!hasAllSelectedTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedLocations, selectedCategories, selectedTags]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(
      (currentPage - 1) * JOBS_PER_PAGE,
      currentPage * JOBS_PER_PAGE
    );
  }, [filteredJobs, currentPage]);

  // Handlers (which reset page to 1)
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
    setCurrentPage(1);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedCategories([]);
    setSelectedTags([]);
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
            <aside className="w-full lg:w-80 shrink-0 rounded-3xl border border-border bg-card p-6 shadow-sm sticky top-24 self-start">
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
                    value={searchQuery}
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

              {/* Job Type Checkboxes */}
              <div className="border-t border-border/60 pt-6 mt-6 space-y-3">
                <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
                  Job Type
                </h3>
                <div className="space-y-2">
                  {["Internship", "Co-op"].map((type) => (
                    <label key={type} className="flex items-center gap-3 text-sm text-navy-700 dark:text-navy-300 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue/30 cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Checkboxes */}
              <div className="border-t border-border/60 pt-6 mt-6 space-y-3">
                <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
                  Workplace Type
                </h3>
                <div className="space-y-2">
                  {["Remote", "Hybrid", "On-site"].map((loc) => (
                    <label key={loc} className="flex items-center gap-3 text-sm text-navy-700 dark:text-navy-300 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => toggleLocation(loc)}
                        className="h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue/30 cursor-pointer"
                      />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Checkboxes */}
              <div className="border-t border-border/60 pt-6 mt-6 space-y-3">
                <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
                  Job Category
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Frontend", value: "frontend" },
                    { label: "Backend", value: "backend" },
                    { label: "AI / ML", value: "ai" },
                    { label: "DevOps", value: "devops" },
                    { label: "Mobile", value: "mobile" },
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center gap-3 text-sm text-navy-700 dark:text-navy-300 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                        className="h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue/30 cursor-pointer"
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
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
                  {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                </span>
                {filteredJobs.length > 0 && (
                  <span className="text-xs font-medium text-navy-400">
                    Showing Page {currentPage} of {totalPages || 1}
                  </span>
                )}
              </div>

              {/* Job Grid / List */}
              {paginatedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedJobs.map((job) => (
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
              {totalPages > 1 && (
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
