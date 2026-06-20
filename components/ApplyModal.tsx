"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  company: string;
  logoBg?: string;
  logoText?: string;
  type?: string;
  category?: string;
  salary?: string;
}

export default function ApplyModal({
  jobId,
  jobTitle,
  company,
  logoBg,
  logoText,
  type,
  category,
  salary,
}: ApplyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [github, setGithub] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Status states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Disable scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setSubmitError(null);
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form states
    setFullName("");
    setEmail("");
    setPhone("");
    setPortfolio("");
    setGithub("");
    setCoverLetter("");
    setResume(null);
    setErrors({});
    setIsSuccess(false);
  };

  // Client-side validations
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (portfolio.trim()) {
      try {
        new URL(portfolio.trim());
      } catch {
        newErrors.portfolio = "Please enter a valid URL (e.g. https://portfolio.com).";
      }
    }

    if (github.trim()) {
      try {
        new URL(github.trim());
      } catch {
        newErrors.github = "Please enter a valid URL (e.g. https://github.com/username).";
      }
    }

    if (!resume) {
      newErrors.resume = "Please upload your resume / CV.";
    }

    if (coverLetter.length > 1000) {
      newErrors.coverLetter = "Cover Letter must not exceed 1000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    const allowedExtensions = [".pdf", ".docx", ".doc"];
    const fileNameLower = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    if (!hasAllowedExtension) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, or DOCX files are allowed." }));
      setResume(null);
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({ ...prev, resume: "Resume file must be smaller than 5MB." }));
      setResume(null);
      return;
    }

    // Clear file error if valid
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });
    setResume(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("portfolio", portfolio.trim());
      formData.append("github", github.trim());
      formData.append("coverLetter", coverLetter.trim());
      if (resume) {
        formData.append("resume", resume);
      }

      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setErrors(data.details);
        } else {
          setSubmitError(data.error || "An error occurred while submitting your application.");
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setSubmitError("Failed to connect to the server. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-brand-blue hover:bg-brand-indigo px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-blue/15 transition-all hover:scale-102 cursor-pointer"
      >
        Apply for this role
      </button>

      {/* Modal Backdrop and Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 dark:bg-navy-950/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div
            className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-xl relative overflow-hidden max-h-[90vh] flex flex-col transition-all transform scale-100 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 text-navy-400 hover:text-navy-600 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-40"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-border/60 flex items-start gap-4">
              {logoBg && logoText && (
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl font-extrabold text-xl shadow-inner shrink-0 ${logoBg}`}>
                  {logoText}
                </div>
              )}
              <div className="flex-1 min-w-0 pr-6">
                <h2 className="text-lg font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight truncate">
                  {isSuccess ? "Application Sent!" : `Apply for ${jobTitle}`}
                </h2>
                <p className="text-xs font-bold text-navy-500 dark:text-navy-400 mt-0.5">
                  at {company}
                </p>
                
                {/* Meta Badges inside Modal */}
                {!isSuccess && (type || category || salary) && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {type && (
                      <span className="rounded-full bg-navy-50 dark:bg-navy-900 border border-border/40 px-2 py-0.5 text-[10px] font-bold text-navy-600 dark:text-navy-300">
                        {type}
                      </span>
                    )}
                    {category && (
                      <span className="rounded-full bg-brand-blue/5 border border-brand-blue/20 dark:border-brand-sky/20 px-2 py-0.5 text-[10px] font-bold text-brand-blue dark:text-brand-sky">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    )}
                    {salary && (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {salary}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Success View */}
            {isSuccess ? (
              <div className="flex-1 overflow-y-auto p-8 text-center flex flex-col items-center justify-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                    Congratulations, {fullName}!
                  </h3>
                  <p className="text-sm text-navy-500 dark:text-navy-400 leading-relaxed max-w-xs mx-auto">
                    Your application for the <strong>{jobTitle}</strong> position has been submitted successfully to <strong>{company}</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-50/50 dark:bg-navy-900/50 border border-border/60 text-[11px] text-navy-400 dark:text-navy-500 max-w-xs leading-normal">
                  Your details have been persisted directly to local storage at <code className="font-bold text-navy-600 dark:text-navy-300">data/applications.json</code>.
                </div>

                <button
                  onClick={handleClose}
                  className="w-full rounded-2xl bg-brand-blue hover:bg-brand-indigo py-3 text-sm font-bold text-white transition-all cursor-pointer"
                >
                  Close Confirmation
                </button>
              </div>
            ) : (
              /* Form View */
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col min-h-0">
                <div className="p-6 space-y-5 flex-1 scrollbar-thin overflow-y-auto max-h-[60vh]">
                  {/* General Submit Error Alert */}
                  {submitError && (
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {submitError}
                    </div>
                  )}

                  {/* Personal Information Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? "border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500"
                            : "border-border focus:ring-brand-blue/20 focus:border-brand-blue"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[10px] font-bold text-rose-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500"
                            : "border-border focus:ring-brand-blue/20 focus:border-brand-blue"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10px] font-bold text-rose-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Portfolio Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-border px-3.5 py-2 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                        Portfolio Link
                      </label>
                      <input
                        type="text"
                        placeholder="https://myportfolio.com"
                        value={portfolio}
                        onChange={(e) => {
                          setPortfolio(e.target.value);
                          if (errors.portfolio) setErrors((prev) => ({ ...prev, portfolio: "" }));
                        }}
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                          errors.portfolio
                            ? "border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500"
                            : "border-border focus:ring-brand-blue/20 focus:border-brand-blue"
                        }`}
                      />
                      {errors.portfolio && (
                        <p className="text-[10px] font-bold text-rose-500">{errors.portfolio}</p>
                      )}
                    </div>
                  </div>

                  {/* GitHub URL */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                      GitHub Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={github}
                      onChange={(e) => {
                        setGithub(e.target.value);
                        if (errors.github) setErrors((prev) => ({ ...prev, github: "" }));
                      }}
                      disabled={isSubmitting}
                      className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        errors.github
                          ? "border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500"
                          : "border-border focus:ring-brand-blue/20 focus:border-brand-blue"
                      }`}
                    />
                    {errors.github && (
                      <p className="text-[10px] font-bold text-rose-500">{errors.github}</p>
                    )}
                  </div>

                  {/* Resume Upload Dropzone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                      Resume / CV <span className="text-rose-500">*</span>
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {resume ? (
                      /* Selected File Card */
                      <div className="flex items-center justify-between p-3.5 rounded-2xl border border-brand-blue/30 bg-brand-blue/[0.03] dark:bg-brand-sky/[0.02]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue dark:text-brand-sky shrink-0">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-navy-850 dark:text-navy-200 truncate pr-2 max-w-[200px]">
                              {resume.name}
                            </p>
                            <p className="text-[10px] text-navy-400 dark:text-navy-500 font-medium">
                              {formatFileSize(resume.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResume(null)}
                          disabled={isSubmitting}
                          className="text-navy-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-500/5 cursor-pointer disabled:opacity-40"
                          aria-label="Remove resume"
                        >
                          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a44.075 44.075 0 0 1-1.897.113L18 4.75A2.25 2.25 0 0 0 15.75 2.5H8.25A2.25 2.25 0 0 0 6 4.75l-.044.204c-.6.044-1.18.112-1.761.203L3.75 5.5m16.5 0a48.667 48.667 0 0 1-7.5 1.2M3.75 5.5a48.654 48.654 0 0 0 7.5 1.2m0 0V3.75m0 9.75h-.008v.008H12v-.008Z" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      /* Drag & Drop Dropzone */
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all hover:bg-navy-50/20 dark:hover:bg-navy-950/10 flex flex-col items-center justify-center gap-2 ${
                          errors.resume
                            ? "border-rose-500/60 bg-rose-500/[0.01]"
                            : "border-border hover:border-brand-blue/40"
                        }`}
                      >
                        <svg className="h-8 w-8 text-navy-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-navy-700 dark:text-navy-300">
                            Drag & drop file here or <span className="text-brand-blue dark:text-brand-sky font-extrabold hover:underline">browse</span>
                          </p>
                          <p className="text-[9px] text-navy-400 dark:text-navy-500 font-medium mt-1">
                            Supports PDF, DOC, DOCX up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                    {errors.resume && (
                      <p className="text-[10px] font-bold text-rose-500">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Letter text area */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                        Cover Letter / Notes
                      </label>
                      <span className={`text-[9px] font-bold ${coverLetter.length > 1000 ? "text-rose-500" : "text-navy-400"}`}>
                        {coverLetter.length} / 1000
                      </span>
                    </div>
                    <textarea
                      placeholder="Explain why you are a great fit for this role..."
                      value={coverLetter}
                      onChange={(e) => {
                        setCoverLetter(e.target.value);
                        if (errors.coverLetter) setErrors((prev) => ({ ...prev, coverLetter: "" }));
                      }}
                      disabled={isSubmitting}
                      rows={4}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm bg-background/50 hover:bg-background focus:bg-background text-navy-900 dark:text-white focus:outline-none focus:ring-2 resize-none transition-all ${
                        errors.coverLetter
                          ? "border-rose-500/60 focus:ring-rose-500/20 focus:border-rose-500"
                          : "border-border focus:ring-brand-blue/20 focus:border-brand-blue"
                      }`}
                    />
                    {errors.coverLetter && (
                      <p className="text-[10px] font-bold text-rose-500">{errors.coverLetter}</p>
                    )}
                  </div>
                </div>

                {/* Fixed Footer with action buttons */}
                <div className="border-t border-border/60 px-6 py-4 bg-navy-50/30 dark:bg-navy-950/10 flex items-center justify-between shrink-0">
                  <a
                    href="https://github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium text-navy-400 hover:text-brand-blue dark:hover:text-brand-sky transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span>View Repository</span>
                  </a>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="rounded-xl border border-border bg-card px-5 py-2 text-xs font-bold text-navy-800 dark:text-navy-200 transition-all hover:bg-navy-50 dark:hover:bg-navy-900 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-brand-blue hover:bg-brand-indigo px-6 py-2 text-xs font-bold text-white shadow-md shadow-brand-blue/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
