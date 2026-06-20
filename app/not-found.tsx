import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 lg:py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          {/* Animated 404 visual */}
          <div className="relative mb-6 flex justify-center">
            <div className="absolute inset-0 -z-10 bg-brand-blue/10 dark:bg-brand-sky/5 blur-3xl rounded-full h-44 w-44 mx-auto animate-pulse" />
            <h1 className="text-8xl sm:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-sky drop-shadow-md select-none animate-pulse">
              404
            </h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-4">
            Oops! Page Not Found
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed max-w-md mx-auto">
            We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, renamed, or doesn&apos;t exist.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-brand-blue hover:bg-brand-indigo px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-blue/15 transition-all hover:scale-102 cursor-pointer"
            >
              Go to Homepage
            </Link>
            <Link
              href="/jobs"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-border bg-card hover:bg-navy-50 dark:hover:bg-navy-900 px-8 py-3.5 text-sm font-bold text-navy-800 dark:text-navy-200 transition-all hover:border-brand-blue/30 hover:text-brand-blue cursor-pointer"
            >
              Search Open Roles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
