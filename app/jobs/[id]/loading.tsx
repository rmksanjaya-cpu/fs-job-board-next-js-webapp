import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function JobDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />

      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-indigo dark:text-brand-sky transition-colors group cursor-pointer"
            >
              <svg
                className="h-4 w-4 transform transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <span>Back to Search</span>
            </Link>
          </div>

          {/* Job Hero Card Skeleton */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Left Logo + Titles Skeleton */}
              <div className="flex items-start gap-4 flex-1">
                <div className="h-16 w-16 rounded-2xl bg-navy-100 dark:bg-navy-800 animate-pulse shrink-0" />
                <div className="space-y-2.5 flex-1">
                  {/* Title */}
                  <div className="h-7 w-48 sm:w-72 rounded bg-navy-100 dark:bg-navy-800 animate-pulse" />
                  {/* Company */}
                  <div className="h-4 w-24 rounded bg-navy-100 dark:bg-navy-800 animate-pulse" />
                  
                  {/* Quick Meta Badges Skeleton */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center rounded-full bg-navy-50 dark:bg-navy-900 border border-border/40 px-3 py-0.5">
                      <span className="h-3 w-12 rounded bg-navy-200/50 dark:bg-navy-800 animate-pulse" />
                    </span>
                    <span className="inline-flex items-center rounded-full bg-brand-blue/5 border border-brand-blue/20 dark:border-brand-sky/20 px-3 py-0.5">
                      <span className="h-3 w-16 rounded bg-brand-blue/20 dark:bg-brand-sky/20 animate-pulse" />
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5">
                      <span className="h-3.5 w-14 rounded bg-emerald-500/20 animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply Action Skeleton */}
              <div className="sm:text-right shrink-0 w-full sm:w-auto">
                <div className="h-12 w-full sm:w-44 rounded-2xl bg-brand-blue/20 dark:bg-brand-sky/10 animate-pulse border border-brand-blue/20" />
              </div>

            </div>
          </div>

          {/* Core Info Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 items-start">
            
            {/* Left Column: Rich Text details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About the Role */}
              <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  About the Role
                </h2>
                <div className="space-y-2.5 pt-2">
                  <div className="h-3.5 w-full rounded bg-navy-100 dark:bg-navy-800/80 animate-pulse" />
                  <div className="h-3.5 w-11/12 rounded bg-navy-100 dark:bg-navy-800/80 animate-pulse" />
                  <div className="h-3.5 w-4/5 rounded bg-navy-100 dark:bg-navy-800/80 animate-pulse" />
                </div>
              </section>

              {/* Responsibilities */}
              <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3 pl-5 list-disc text-sm text-navy-600 dark:text-navy-300 leading-relaxed animate-pulse">
                  <li><div className="h-3.5 w-11/12 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-5/6 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-10/12 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-3/4 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                </ul>
              </section>

              {/* Requirements */}
              <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  Requirements
                </h2>
                <ul className="space-y-3 pl-5 list-disc text-sm text-navy-600 dark:text-navy-300 leading-relaxed animate-pulse">
                  <li><div className="h-3.5 w-10/12 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-11/12 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-4/5 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                  <li><div className="h-3.5 w-11/12 inline-block rounded bg-navy-100 dark:bg-navy-800/85" /></li>
                </ul>
              </section>

              {/* About the Company */}
              <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                  About the Company
                </h2>
                <div className="space-y-2.5 pt-2">
                  <div className="h-3.5 w-full rounded bg-navy-100 dark:bg-navy-800/80 animate-pulse" />
                  <div className="h-3.5 w-5/6 rounded bg-navy-100 dark:bg-navy-800/80 animate-pulse" />
                </div>
              </section>

            </div>

            {/* Right Column: Sidebar Stats */}
            <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
              
              {/* Job Info Summary */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
                <h2 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider border-b border-border/60 pb-3">
                  Job Summary
                </h2>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-navy-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wide">Location</h4>
                      <div className="h-4 w-28 rounded bg-navy-100 dark:bg-navy-800 animate-pulse mt-1" />
                    </div>
                  </div>

                  {/* Compensation */}
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-navy-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wide">Base Pay</h4>
                      <div className="h-4 w-20 rounded bg-navy-100 dark:bg-navy-800 animate-pulse mt-1" />
                    </div>
                  </div>

                  {/* Placement Term */}
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-navy-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wide">Placement Term</h4>
                      <div className="h-4 w-24 rounded bg-navy-100 dark:bg-navy-800 animate-pulse mt-1" />
                    </div>
                  </div>

                  {/* Date Posted */}
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-navy-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wide">Date Posted</h4>
                      <div className="h-4 w-28 rounded bg-navy-100 dark:bg-navy-800 animate-pulse mt-1" />
                    </div>
                  </div>
                </div>

                {/* Skills section */}
                <div className="border-t border-border/60 pt-4 mt-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wide">Skills Required</h4>
                  <div className="flex flex-wrap gap-1.5 animate-pulse">
                    {Array.from({ length: 5 }).map((_, tagIdx) => (
                      <div
                        key={tagIdx}
                        className="h-6 w-16 rounded-md bg-navy-50/50 dark:bg-navy-900/50 border border-border/30"
                      />
                    ))}
                  </div>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
