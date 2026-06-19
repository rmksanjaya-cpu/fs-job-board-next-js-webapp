"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  options: (string | Option)[];
  selected: string | string[]; // string for single-select, string[] for multi-select
  onChange: (value: any) => void;
  multiple?: boolean;
  searchable?: boolean;
  isLocation?: boolean;
  leftIcon?: React.ReactNode;
  minimalist?: boolean;
}

export default function CustomDropdown({
  label,
  placeholder = "Select option",
  options,
  selected,
  onChange,
  multiple = false,
  searchable = false,
  isLocation = false,
  leftIcon,
  minimalist = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format options into standard objects
  const normalizedOptions: Option[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { label: opt, value: opt };
    }
    return opt;
  });

  // Filter options based on search query
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group options if isLocation is true
  const groupedOptions = (() => {
    if (!isLocation) {
      return { all: filteredOptions };
    }

    const remote: Option[] = [];
    const local: Option[] = [];

    filteredOptions.forEach((opt) => {
      if (opt.label.toLowerCase().includes("remote")) {
        remote.push(opt);
      } else {
        local.push(opt);
      }
    });

    return { remote, local };
  })();

  const isSelected = (value: string) => {
    if (multiple && Array.isArray(selected)) {
      return selected.includes(value);
    }
    return selected === value;
  };

  const handleSelect = (value: string) => {
    if (multiple && Array.isArray(selected)) {
      const isAlreadySelected = selected.includes(value);
      const nextSelected = isAlreadySelected
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      onChange(nextSelected);
    } else {
      onChange(value);
      setIsOpen(false);
    }
  };

  // Get current button display text
  const getButtonText = () => {
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0) return placeholder;
      if (selected.length === 1) {
        const found = normalizedOptions.find((o) => o.value === selected[0]);
        return found ? found.label : selected[0];
      }
      return `${selected.length} Selected`;
    } else {
      if (!selected) return placeholder;
      const found = normalizedOptions.find((o) => o.value === selected);
      return found ? found.label : (selected as string);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wide">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between text-sm transition-all duration-200 cursor-pointer ${
          minimalist
            ? "border-0 bg-transparent px-1 py-1 focus:outline-none"
            : `rounded-2xl border bg-card px-4 py-2.5 ${
                isOpen
                  ? "border-brand-blue ring-2 ring-brand-blue/15 shadow-md"
                  : "border-border hover:border-brand-blue/40"
              }`
        } text-navy-900 dark:text-white`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {leftIcon && <span className="text-navy-400 shrink-0">{leftIcon}</span>}
          <span className="truncate font-medium">{getButtonText()}</span>
        </div>
        <svg
          className={`h-4 w-4 text-navy-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className={`absolute ${minimalist ? "left-0 w-72 md:w-80" : "left-0 right-0"} z-50 mt-1.5 rounded-2xl border border-border/80 dark:border-navy-800 bg-card/95 backdrop-blur-md p-2 shadow-2xl shadow-navy-950/20 dark:shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-150`}>

          {/* Search bar inside dropdown */}
          {searchable && (
            <div className="relative mb-2 px-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border/80 bg-background/50 px-3 py-1.5 pl-8 text-xs text-navy-900 dark:text-white placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
              <svg
                className="absolute left-3 top-2.5 h-3.5 w-3.5 text-navy-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
            {isLocation ? (
              <>
                {/* Remote Section */}
                {groupedOptions.remote && groupedOptions.remote.length > 0 && (
                  <div className="py-1">
                    <div className="px-2.5 pb-1 text-[10px] font-bold text-brand-blue dark:text-brand-sky uppercase tracking-wider flex items-center gap-1.5">
                      <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                      Remote Opportunities
                    </div>
                    <div className="space-y-0.5">
                      {groupedOptions.remote.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelect(opt.value)}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                            isSelected(opt.value)
                              ? "bg-brand-blue/15 border border-brand-blue/30 text-brand-blue dark:text-brand-sky"
                              : "bg-brand-blue/5 dark:bg-brand-blue/10 border border-transparent hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 text-brand-blue dark:text-brand-sky/90"
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {isSelected(opt.value) && (
                              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* City Section */}
                {groupedOptions.local && groupedOptions.local.length > 0 && (
                  <div className="py-1 border-t border-border/30 mt-1">
                    <div className="px-2.5 pb-1 text-[10px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider flex items-center gap-1.5">
                      <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      City & Hybrid Locations
                    </div>
                    <div className="space-y-0.5">
                      {groupedOptions.local.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelect(opt.value)}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all cursor-pointer ${
                            isSelected(opt.value)
                              ? "bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-bold"
                              : "hover:bg-navy-50 dark:hover:bg-navy-900/50 text-navy-700 dark:text-navy-300 font-medium"
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected(opt.value) && (
                            <svg className="h-3.5 w-3.5 text-navy-900 dark:text-white shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Standard rendering (no grouping)
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all cursor-pointer ${
                    isSelected(opt.value)
                      ? "bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-bold"
                      : "hover:bg-navy-50 dark:hover:bg-navy-900/50 text-navy-700 dark:text-navy-300 font-medium"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected(opt.value) && (
                    <svg className="h-3.5 w-3.5 text-navy-900 dark:text-white shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))
            )}

            {/* Empty State */}
            {filteredOptions.length === 0 && (
              <div className="py-4 text-center text-xs text-navy-450 dark:text-navy-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
