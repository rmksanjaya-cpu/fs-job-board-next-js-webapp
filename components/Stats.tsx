export default function Stats() {
  const stats = [
    { label: "Active Student Devs", value: "12,000+", desc: "Top talent from global tech hubs" },
    { label: "Software Internships", value: "4,500+", desc: "Updated hourly with verified roles" },
    { label: "Tech Partners", value: "180+", desc: "From fast-growing startups to Big Tech" },
    { label: "Avg. Co-op Rate", value: "$45.50", desc: "Top compensation for software talent" },
  ];

  return (
    <section className="py-16 bg-navy-50/50 dark:bg-navy-950/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-blue/30 group"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white bg-gradient-to-r from-brand-blue to-brand-indigo bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="mt-2 text-sm font-bold text-navy-800 dark:text-navy-200">
                {stat.label}
              </span>
              <span className="mt-1.5 text-xs text-navy-500 dark:text-navy-400 max-w-[180px]">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
