"use client";

import { useState } from "react";
import { type Job, JOBS_DATA } from "@/data/jobs";

const JOBS_PER_PAGE = 6;

export default function FeaturedJobs() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredJobs = JOBS_DATA.filter((job) => {
    if (selectedFilter === "all") return true;
    return job.category === selectedFilter;
  });

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const filters = [
    { label: "All Roles", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "AI / ML", value: "ai" },
    { label: "DevOps", value: "devops" },
    { label: "Mobile", value: "mobile" },
  ];

  return (
    <section id="jobs" className="py-20 lg:py-28 bg-navy-50/30 dark:bg-navy-950/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <h2 className="text-xs font-semibold text-brand-blue dark:text-brand-sky uppercase tracking-wider">
              Explore Opportunities
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-navy-900 dark:text-white sm:text-4xl">
              Featured Software Roles
            </p>
          </div>
          
          {/* Interactive Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter.value
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15 scale-102"
                    : "bg-card border-border text-navy-600 dark:text-navy-300 hover:border-brand-blue/30 hover:text-brand-blue"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 group"
            >
              <div>
                {/* Logo & Company details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm shadow-inner shrink-0 ${job.logoBg}`}>
                      {job.logoText}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-500 dark:text-navy-400">
                        {job.company}
                      </h4>
                      <h3 className="text-base font-extrabold text-navy-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-sky transition-colors mt-0.5">
                        {job.title}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-navy-50 dark:bg-navy-900 border border-border/40 px-2.5 py-0.5 text-[10px] font-bold text-navy-600 dark:text-navy-300">
                    {job.type}
                  </span>
                </div>

                {/* Location and Salary metadata */}
                <div className="mt-5 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-navy-500 dark:text-navy-400">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-navy-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-navy-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-brand-blue dark:text-brand-sky font-semibold">{job.salary}</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.map((tag, id) => (
                    <span
                      key={id}
                      className="rounded-md bg-navy-50/50 dark:bg-navy-900/50 border border-border/30 px-2 py-0.5 text-[10px] font-semibold text-navy-600 dark:text-navy-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[10px] font-medium text-navy-400 dark:text-navy-500">
                  Posted {job.posted}
                </span>
                <button className="inline-flex items-center justify-center rounded-xl bg-navy-900 dark:bg-navy-100 hover:bg-brand-blue dark:hover:bg-brand-sky px-4 py-2 text-xs font-bold text-white dark:text-navy-950 hover:text-white dark:hover:text-navy-950 transition-all cursor-pointer">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
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
        
        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-navy-50 dark:hover:bg-navy-900 px-6 py-3 text-sm font-bold text-navy-800 dark:text-navy-200 transition-all cursor-pointer hover:border-brand-blue/30 hover:text-brand-blue">
            <span>Explore All 1,200+ Internships</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
