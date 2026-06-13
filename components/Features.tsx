export default function Features() {
  const items = [
    {
      title: "GitHub Portfolio Integration",
      desc: "Connect your GitHub account. We automatically analyze your repositories, technologies, and contribution frequency to highlight your real-world projects to employers.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-blue dark:text-brand-sky"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      title: "Strictly Student-First Roles",
      desc: "Tired of 'entry-level' jobs asking for 5 years of experience? Every listing on Vaskara is vetted to make sure it is a true internship, co-op, or junior developer position.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-blue dark:text-brand-sky"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
    },
    {
      title: "Direct Engineering Pipelines",
      desc: "Skip the black-hole ATS portals. Vaskara routes student applications directly to engineering managers, tech leads, and technical hiring coordinators who code.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-blue dark:text-brand-sky"
        >
          <path d="M2 20h20" />
          <path d="m5 17 5-5 5 5" />
          <path d="m14 10 3-3 3 3" />
          <path d="M17 14V7h-7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-xs font-semibold text-brand-blue dark:text-brand-sky uppercase tracking-wider">
            Built for modern developers
          </h2>
          <p className="mt-3 text-3xl font-extrabold text-navy-900 dark:text-white sm:text-4xl">
            Why software students choose Vaskara
          </p>
          <p className="mt-4 text-base text-navy-600 dark:text-navy-300">
            We bypass the traditional, outdated recruitment flow to give technical students the direct engineering placement they deserve.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-blue/30 group hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900 group-hover:bg-brand-blue/10 group-hover:scale-105 transition-all duration-300 mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-sky transition-colors">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
