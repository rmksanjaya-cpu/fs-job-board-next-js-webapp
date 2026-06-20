import Link from "next/link";

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

export default function FeaturedJobsSkeleton() {
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
          
          {/* Interactive Filters (Static visual skeleton) */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span
                key={filter.value}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide border transition-all duration-200 ${
                  filter.value === "all"
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15 scale-102"
                    : "bg-card border-border text-navy-600 dark:text-navy-300"
                }`}
              >
                {filter.label}
              </span>
            ))}
          </div>
        </div>

        {/* Jobs List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <JobCardSkeleton key={idx} />
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link href="/jobs" className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-navy-50 dark:hover:bg-navy-900 px-6 py-3 text-sm font-bold text-navy-800 dark:text-navy-200 transition-all cursor-pointer hover:border-brand-blue/30 hover:text-brand-blue">
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
          </Link>
        </div>

      </div>
    </section>
  );
}
