import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function JobsLoading() {
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
            
            {/* Sidebar Filters Skeleton */}
            <aside className="w-full lg:w-80 shrink-0 rounded-3xl border border-border bg-card p-6 shadow-sm sticky top-24 self-start z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-border/85 pb-4">
                <h2 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                  Filters
                </h2>
                <div className="h-4 w-12 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
              </div>

              {/* Text Search Input Skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
                <div className="h-10 w-full rounded-2xl border border-border bg-background/50 animate-pulse" />
              </div>

              {/* Dropdowns Skeletons */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="border-t border-border/60 pt-6 space-y-2">
                  <div className="h-3 w-20 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
                  <div className="h-10 w-full rounded-2xl border border-border bg-card animate-pulse" />
                </div>
              ))}

              {/* Skills Tags Skeletons */}
              <div className="border-t border-border/60 pt-6 space-y-3">
                <div className="h-3 w-28 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
                <div className="flex flex-wrap gap-1.5 pr-1">
                  {Array.from({ length: 12 }).map((_, sIdx) => (
                    <div
                      key={sIdx}
                      className="h-6 w-14 rounded-md border border-border/30 bg-navy-50/50 dark:bg-navy-900/50 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Jobs Display Grid Skeleton */}
            <div className="flex-1 w-full space-y-6">
              
              {/* Header Stats Skeleton */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="h-4 w-28 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
                <div className="h-4 w-36 rounded bg-navy-100 dark:bg-navy-850 animate-pulse" />
              </div>

              {/* Job Grid / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <JobCardSkeleton key={idx} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
