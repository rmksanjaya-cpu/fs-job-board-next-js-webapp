"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-navy-950 text-navy-200 border-t border-navy-900 pt-16 pb-12 w-full mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 border-b border-navy-900">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="flex items-center gap-2 self-start group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-blue to-brand-sky text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Vaskara<span className="font-light text-brand-sky">.</span>
              </span>
            </Link>
            <p className="text-sm text-navy-400 max-w-xs leading-relaxed">
              Vaskara is the leading job board crafted exclusively for computer science and software engineering students seeking verified internships and co-ops.
            </p>
          </div>

          {/* Newsletter Input Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Weekly Internships
            </h4>
            <p className="text-xs text-navy-400 leading-relaxed">
              Get the top 10 new software developer internships sent straight to your inbox once a week.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="developer@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-navy-800 bg-navy-900/60 px-3.5 py-2.5 text-xs text-white placeholder:text-navy-500 outline-none focus:border-brand-blue transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-blue hover:bg-brand-blue/90 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:scale-101 active:scale-98 transition-all cursor-pointer text-center"
              >
                {subscribed ? "Subscribed! ✓" : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Socials & Rights Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-navy-500 text-center">
          <p>© {new Date().getFullYear()} Vaskara Job Board. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
