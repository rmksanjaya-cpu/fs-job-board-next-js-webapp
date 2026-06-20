import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function JobNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation Link to mirror layout of details page */}
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

          {/* Expired Job Main Warning Container */}
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-amber-500/[0.03] dark:bg-amber-400/[0.01] blur-3xl rounded-full h-56 w-56 mx-auto animate-pulse" />
            
            {/* Custom Briefcase + Expiration Alert SVG */}
            <div className="relative inline-block mb-6">
              <svg className="mx-auto h-20 w-20 text-navy-300 dark:text-navy-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.4v-4.25m16.5 0a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25m16.5 0V7.5A2.25 2.25 0 0 0 18 5.25H6A2.25 2.25 0 0 0 3.75 7.5v6.65M15 12.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-500/40 dark:border-amber-400/40 shadow-sm animate-pulse">
                <svg className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-4">
              Job Listing No Longer Available
            </h1>
            <p className="mt-4 text-sm sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed max-w-lg mx-auto">
              This role might have been filled, expired, or removed by the employer. Since tech internships and co-ops recruit very quickly, the listing has been taken down.
            </p>

            <div className="mt-8 p-4 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.02] border border-amber-500/10 dark:border-amber-400/10 max-w-md mx-auto">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                Pro-tip: Set filters for Internships or Co-ops on the search page to find similar software developer opportunities.
              </p>
            </div>

            {/* CTA Button Group */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-brand-blue hover:bg-brand-indigo px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-blue/15 transition-all hover:scale-102 cursor-pointer"
              >
                Explore Active Jobs
              </Link>
              <Link
                href="/"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-border bg-card hover:bg-navy-50 dark:hover:bg-navy-900 px-8 py-3.5 text-sm font-bold text-navy-800 dark:text-navy-200 transition-all hover:border-brand-blue/30 hover:text-brand-blue cursor-pointer"
              >
                Go to Homepage
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
