"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-blue to-brand-sky text-white shadow-md shadow-brand-blue/20 transition-transform group-hover:scale-105">
                {/* SVG Sun/Light Beacon representing Vaskara */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 animate-pulse"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand-blue">
                Vaskara<span className="font-light text-navy-500 dark:text-navy-400">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#jobs"
              className="text-sm font-medium text-navy-600 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-navy-600 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky transition-colors"
            >
              Why Vaskara
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-navy-600 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky transition-colors"
            >
              For Employers
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-navy-600 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-navy-700 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="rounded-full bg-navy-900 dark:bg-navy-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-navy-950 shadow-sm hover:bg-navy-800 dark:hover:bg-white transition-all hover:scale-102"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-navy-500 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800 hover:text-navy-700 dark:hover:text-navy-200 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-4 duration-200" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2 border-t border-border bg-background">
            <Link
              href="/#jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-850 hover:text-brand-blue"
            >
              Find Jobs
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-850 hover:text-brand-blue"
            >
              Why Vaskara
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-850 hover:text-brand-blue"
            >
              For Employers
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-850 hover:text-brand-blue"
            >
              Resources
            </Link>
            <div className="border-t border-border pt-4 pb-2">
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full rounded-md px-3 py-2 text-base font-medium text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-850 hover:text-brand-blue"
              >
                Sign In
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 block w-full text-center rounded-full bg-brand-blue py-3 text-base font-semibold text-white shadow-md hover:bg-brand-blue/90"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
