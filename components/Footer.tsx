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
          <span className="hidden md:inline text-navy-800">•</span>
          <a
            href="https://github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-sky font-semibold transition-colors flex items-center gap-1.5"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
