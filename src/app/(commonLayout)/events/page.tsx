"use client";

import { EventCard } from "@/components/common/shared/eventCard";
import { useGetAllEventsQuery } from "@/redux/features/eventSlice/eventSlice";
import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import CardLoading from "@/components/common/shared/cardLoading";
import Link from "next/link";

const EventsPage = () => {
  // ── Filter State ──
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"PUBLIC" | "PRIVATE" | "">("");
  const [isPaid, setIsPaid] = useState<boolean | "">("");
  const [page, setPage] = useState(1);

  // Debounced search input
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: suggestionData, isFetching: isFetchingSuggestions } = useGetAllEventsQuery(
    { page: 1, limit: 5, search: debouncedValue },
    { skip: debouncedValue.trim().length === 0 || !showSuggestions }
  );
  const suggestions = suggestionData?.data ?? [];

  const { data, isLoading, isFetching } = useGetAllEventsQuery({
    page,
    limit: 10,
    search,
    type,
    isPaid,
  });

  const events = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage ?? 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputValue);
    setPage(1);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (title: string) => {
    setInputValue(title);
    setSearch(title);
    setPage(1);
    setShowSuggestions(false);
  };

  const handleTypeChange = (val: "PUBLIC" | "PRIVATE" | "") => {
    setType(val);
    setPage(1);
  };

  const handlePaidChange = (val: boolean | "") => {
    setIsPaid(val);
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setInputValue("");
    setType("");
    setIsPaid("");
    setPage(1);
  };

  const activeFilterCount = [search, type, isPaid !== ""].filter(Boolean).length;

  return (
    <div className="w-full min-h-screen pt-24 pb-20 dark:bg-[#0a0a0a] bg-slate-50">
      {/* ── Page Header ── */}
      <div className="text-center mb-12 px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80 mb-3">Discover</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white text-black tracking-tight">
          All Events
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
          Browse, filter, and join events that matter to you.
        </p>
      </div>

      {/* ── Filters Bar ── */}
      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1" ref={suggestionRef}>
                <form onSubmit={handleSearch} className="flex w-full items-center gap-2 dark:bg-white/[0.04] bg-gray-200 border border-white/[0.08] rounded-xl px-4 h-11 focus-within:border-primary/40 transition-colors">
                <Search className="h-4 w-4 dark:text-white/30 text-black/30 flex-shrink-0" />
                <input
                type="text"
                placeholder="Search events..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                  if (e.target.value === "") setSearch(""); 
                }}
                onFocus={() => setShowSuggestions(true)}
                className="flex-1 bg-transparent text-sm dark:text-white text-black placeholder:dark:text-white/30 placeholder:text-black/30 outline-none"
                />
                {inputValue && (
                <button
                    type="button"
                    onClick={() => { setInputValue(""); setSearch(""); setPage(1); setShowSuggestions(false); }}
                    className="dark:text-white/30 text-black/30 hover:text-white text-xs transition-colors"
                >✕</button>
                )}
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && inputValue.trim().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                    {isFetchingSuggestions || debouncedValue !== inputValue ? (
                      <div className="px-4 py-3 flex items-center gap-2 text-sm text-gray-500 dark:text-white/40">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Searching...
                      </div>
                    ) : suggestions.length > 0 ? (
                      <ul>
                        {suggestions.map((event: any) => (
                          <li key={event.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectSuggestion(event.title)}
                              className="w-full text-left px-4 py-2.5 text-sm dark:text-white text-black hover:bg-gray-100 dark:hover:bg-white/5 transition-colors line-clamp-1"
                            >
                              <Search className="h-3 w-3 inline-block mr-2 opacity-50 mb-0.5" />
                              {event.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-white/40">
                        No matches found.
                      </div>
                    )}
                  </div>
                )}
            </div>
          

            {/* Type Filter */}
            <div className="flex gap-2">
            {(["", "PUBLIC", "PRIVATE"] as const).map((val) => (
              <button
                key={val}
                onClick={() => handleTypeChange(val)}
                className={`px-4 h-11 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${type === val
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white/[0.04] dark:text-white/50 text-black/50 dark:border-white/[0.08] border-gray-200 hover:border-white/20 dark:hover:text-white"
                  }`}
              >
                {val === "" ? "All" : val === "PUBLIC" ? "Public" : "Private"}
              </button>
            ))}
            </div>

            {/* isPaid Filter */}
            <div className="flex gap-2">
                {([["", "Any"], [false, "Free"], [true, "Paid"]] as [boolean | "", string][]).map(([val, label]) => (
                <button
                    key={String(val)}
                    onClick={() => handlePaidChange(val)}
                    className={`px-4 h-11 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${isPaid === val
                    ? val === false
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20"
                        : val === true
                        ? "bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/20"
                        : "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white/[0.04] dark:text-white/50 text-black/50 dark:border-white/[0.08] border-gray-200 hover:border-white/20 dark:hover:text-white"
                    }`}
                >
                    {label}
                </button>
                ))}
            </div>

            {/* Reset */}
                {activeFilterCount > 0 && (
                    <button
                    onClick={handleReset}
                    className="h-11 px-4 rounded-xl text-xs font-bold text-rose-400 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all uppercase tracking-wider"
                    >
                    Reset ({activeFilterCount})
                    </button>
                )}
          
        </div>

        {/* Meta summary */}
        {meta && (
          <p className="mt-3 text-xs text-white/30">
            Showing {events.length} of {meta.total} event{meta.total !== 1 ? "s" : ""}
            {search && <> for <span className="text-white/60 font-medium">"{search}"</span></>}
          </p>
        )}
      </div>

      {/* ── Events Grid ── */}
      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6">
        {isLoading || isFetching ? (
           <div className='flex items-center justify-center'>
            <div className="grid w-full max-w-7xl xl:max-w-[1200px] 3xl:max-w-[1400px] mx-auto px-6 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
              {[...Array(2)].map((_, i) => (
                <CardLoading key={i} />
              ))}
            </div>
    </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-white/40 text-sm">Try adjusting your filters or search term.</p>
            <button onClick={handleReset} className="mt-6 px-6 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-center gap-3 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/60 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all border ${page === p
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white/[0.04] text-white/50 border-white/[0.08] hover:border-white/20 hover:text-white"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/60 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;