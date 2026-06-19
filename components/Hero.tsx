"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CustomDropdown from "@/components/CustomDropdown";
import { JOBS_DATA } from "@/data/jobs";

export default function Hero() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/jobs?search=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`);
  };

  const allLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    JOBS_DATA.forEach((job) => {
      locationsSet.add(job.location);
    });
    return Array.from(locationsSet).sort();
  }, []);

  const trendingTags = ["React", "Internship", "Remote", "Go", "Python", "Full Stack"];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Glow effect elements */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-brand-blue/10 to-brand-sky/20 blur-3xl" />
      <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-brand-indigo/10 to-brand-sky/10 blur-3xl" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:bg-[linear-gradient(to_right,#1b2d48_1px,transparent_1px),linear-gradient(to_bottom,#1b2d48_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline and Form */}
          <div className="flex flex-col space-y-8 lg:col-span-7">
            {/* Tag badge */}
            <div className="inline-flex self-start items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 dark:bg-brand-blue/10 px-3.5 py-1 text-xs font-semibold text-brand-blue dark:text-brand-sky">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-blue dark:bg-brand-sky animate-ping" />
              1,200+ new software roles added today
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl md:text-6xl">
                Where Software <br />
                <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-sky bg-clip-text text-transparent">
                  Careers Begin.
                </span>
              </h1>
              <p className="max-w-xl text-lg text-navy-600 dark:text-navy-300 sm:text-xl leading-relaxed">
                Vaskara connects ambitious CS and software engineering students with top-tier internships, co-ops, and entry-level engineering roles.
              </p>
            </div>

            {/* Job Search Form */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl rounded-2xl border border-border bg-card p-2.5 shadow-lg shadow-navy-900/5 dark:shadow-black/20 md:p-3"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:divide-x md:divide-border">
                {/* Search query field */}
                <div className="flex flex-1 items-center px-3 py-2">
                  <svg
                    className="h-5 w-5 text-navy-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Role, tech stack, or keyword..."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="ml-3 w-full bg-transparent text-sm text-navy-900 dark:text-white placeholder:text-navy-400 outline-none"
                  />
                </div>

                {/* Location field */}
                <div className="flex flex-1 items-center px-3 py-2 md:pl-5 min-w-[200px]">
                  <CustomDropdown
                    options={allLocations}
                    selected={location}
                    onChange={(val) => setLocation(val)}
                    placeholder="Remote, city, or hybrid..."
                    isLocation={true}
                    searchable={true}
                    minimalist={true}
                    leftIcon={
                      <svg
                        className="h-5 w-5 text-navy-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    }
                  />
                </div>

                {/* Search CTA */}
                <button
                  type="submit"
                  className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-blue/90 hover:scale-101 active:scale-98 transition-all shrink-0 w-full md:w-auto"
                >
                  Search Jobs
                </button>
              </div>
            </form>

            {/* Trending / Suggestion tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">
                Trending searches:
              </span>
              {trendingTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setRole(tag)}
                  className="rounded-full border border-border bg-card/50 hover:bg-card px-3.5 py-1 text-xs font-medium text-navy-600 dark:text-navy-300 hover:text-brand-blue dark:hover:text-brand-sky hover:border-brand-blue/30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Premium CSS Dashboard Mock */}
          <div className="relative flex justify-center lg:col-span-5">
            {/* Decorative circle glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-brand-blue/10 blur-2xl" />
            </div>

            {/* Mock Dashboard container */}
            <div className="relative w-full max-w-[420px] rounded-3xl border border-border bg-card/60 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:rotate-1 hover:scale-102">
              
              {/* Top header bar simulator */}
              <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-red-400/90" />
                  <span className="h-3.5 w-3.5 rounded-full bg-yellow-400/90" />
                  <span className="h-3.5 w-3.5 rounded-full bg-green-400/90" />
                </div>
                <div className="rounded-md border border-border/60 bg-background px-3 py-1 text-[10px] font-mono text-navy-400">
                  ~/vaskara/dashboard
                </div>
              </div>

              {/* Mock Card 1: Candidate Match */}
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4 shadow-sm backdrop-blur-sm hover:border-brand-blue/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Mock Developer Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-blue text-white font-bold text-sm">
                      K
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white">Kasun R.</h4>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 font-mono">Student @ Software Eng.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                      GitHub Linked
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-navy-600 dark:text-navy-300">
                      <span>Developer Profile Completeness</span>
                      <span>92%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-sky" style={{ width: "92%" }} />
                    </div>
                  </div>
                  
                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["TypeScript", "React", "Next.js", "Tailwind"].map((sk, id) => (
                      <span key={id} className="rounded-md bg-navy-50 dark:bg-navy-900 px-2 py-0.5 text-[10px] font-semibold text-navy-600 dark:text-navy-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Element: Job Application Status */}
              <div className="mt-4 rounded-2xl border border-border/80 bg-background/50 p-4 shadow-sm backdrop-blur-sm hover:border-brand-blue/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Brand Icon (Stripe mockup) */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-indigo text-white font-bold text-xs">
                      S
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-900 dark:text-white">Stripe</h4>
                      <p className="text-[10px] text-navy-500 dark:text-navy-400">Software Engineer Intern</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue dark:text-brand-sky">
                    Interviewing
                  </span>
                </div>
                
                {/* Micro Steps */}
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-navy-400">
                  <span className="text-emerald-500 font-semibold">✓ Resume Checked</span>
                  <span className="text-emerald-500 font-semibold">✓ OA Cleared</span>
                  <span className="text-brand-blue dark:text-brand-sky font-semibold animate-pulse">● Panel Interview</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
