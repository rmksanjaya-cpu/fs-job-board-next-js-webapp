import Link from "next/link";
import { type Job } from "@/data/jobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 group">
      <div>
        {/* Logo & Company details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm shadow-inner shrink-0 ${job.logoBg}`}>
              {job.logoText}
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-500 dark:text-navy-400">
                {job.company}
              </h4>
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-base font-extrabold text-navy-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-sky transition-colors mt-0.5 cursor-pointer">
                  {job.title}
                </h3>
              </Link>
            </div>
          </div>
          <span className="rounded-full bg-navy-50 dark:bg-navy-900 border border-border/40 px-2.5 py-0.5 text-[10px] font-bold text-navy-600 dark:text-navy-300">
            {job.type}
          </span>
        </div>

        {/* Location and Salary metadata */}
        <div className="mt-5 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-navy-500 dark:text-navy-400">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-navy-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-navy-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-brand-blue dark:text-brand-sky font-semibold">{job.salary}</span>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-md bg-navy-50/50 dark:bg-navy-900/50 border border-border/30 px-2 py-0.5 text-[10px] font-semibold text-navy-600 dark:text-navy-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="text-[10px] font-medium text-navy-400 dark:text-navy-500">
          Posted {job.posted}
        </span>
        <Link href={`/jobs/${job.id}`} className="inline-flex items-center justify-center rounded-xl bg-navy-900 dark:bg-navy-100 hover:bg-brand-blue dark:hover:bg-brand-sky px-4 py-2 text-xs font-bold text-white dark:text-navy-950 hover:text-white dark:hover:text-navy-950 transition-all cursor-pointer">
          Apply Now
        </Link>
      </div>
    </div>
  );
}
