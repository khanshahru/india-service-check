import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, X, History, SlidersHorizontal, MapPin, ChevronDown, RotateCcw } from "lucide-react";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { services, categories, INDIAN_STATES, type ServiceCategory } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";
import { ServiceCard } from "@/components/ServiceCard";
import { useRecentSearches } from "@/lib/user-prefs";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Government Services — DocSetu" },
      { name: "description", content: "Browse 100+ Indian government services with the documents you need to apply." },
    ],
  }),
});

function ServicesPage() {
  const { t, lang } = useI18n();
  const { q: urlQ } = Route.useSearch();
  const [q, setQ] = useState(urlQ ?? "");
  const [cat, setCat] = useState<ServiceCategory | "All">("All");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [sort, setSort] = useState<"relevance" | "name" | "fastest">("relevance");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searches, push: pushSearch, clear: clearSearches } = useRecentSearches();

  useEffect(() => {
    setQ(urlQ ?? "");
  }, [urlQ]);

  // Lightweight fuzzy-ish scorer: prioritise prefix and word-boundary matches.
  const score = (s: typeof services[number], needle: string) => {
    const hay = `${s.name.en} ${s.name.hi} ${s.authority} ${s.state ?? ""} ${s.slug}`.toLowerCase();
    if (!needle) return 0;
    if (hay.startsWith(needle)) return 100;
    if (s.name.en.toLowerCase().startsWith(needle)) return 90;
    const idx = hay.indexOf(needle);
    if (idx === -1) return -1;
    // Boost word-boundary hits
    const boundary = hay[idx - 1] === " " || idx === 0 ? 30 : 0;
    return 50 - Math.min(idx, 40) + boundary;
  };

  const suggestions = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return services
      .map((s) => ({ s, sc: score(s, needle) }))
      .filter((x) => x.sc >= 0)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 6)
      .map((x) => x.s);
  }, [q]);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const list = services.filter((s) => {
      const matchesCat = cat === "All" || s.category === cat;
      if (!matchesCat) return false;
      const matchesState =
        stateFilter === "All" ||
        (stateFilter === "Central" ? !s.state : s.state === stateFilter);
      if (!matchesState) return false;
      if (!needle) return true;
      return score(s, needle) >= 0;
    });

    if (sort === "name") {
      list.sort((a, b) => a.name.en.localeCompare(b.name.en));
    } else if (sort === "fastest") {
      const days = (p: string) => {
        const m = p.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 999;
      };
      list.sort((a, b) => days(a.processingTime) - days(b.processingTime));
    } else if (needle) {
      list.sort((a, b) => score(b, needle) - score(a, needle));
    }
    return list;
  }, [q, cat, stateFilter, sort]);

  const showSuggestions = open && suggestions.length > 0;
  const showRecent = open && !q.trim() && searches.length > 0;
  const showDropdown = showSuggestions || showRecent;
  const hasFilters = q.trim() !== "" || cat !== "All" || stateFilter !== "All";
  const filterCount = (q.trim() !== "" ? 1 : 0) + (cat !== "All" ? 1 : 0) + (stateFilter !== "All" ? 1 : 0);

  const resultsRef = useRef<HTMLElement>(null);

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const commitSearch = useCallback(() => {
    if (q.trim()) pushSearch(q);
  }, [q, pushSearch]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((i) => (suggestions.length ? (i + 1) % suggestions.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((i) => (suggestions.length ? (i - 1 + suggestions.length) % suggestions.length : 0));
      } else if (e.key === "Enter") {
        if (showSuggestions && suggestions[highlighted]) {
          e.preventDefault();
          commitSearch();
          setOpen(false);
          const link = listRef.current?.querySelectorAll("a")[highlighted] as HTMLAnchorElement | undefined;
          link?.click();
        } else {
          commitSearch();
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    },
    [showSuggestions, suggestions, highlighted, commitSearch],
  );

  const clearAll = () => {
    setQ("");
    setCat("All");
    setStateFilter("All");
    setSort("relevance");
  };

  const searchBar = (
    <div className="relative w-full">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card shadow-card pl-3 pr-1 h-10 focus-within:ring-2 focus-within:ring-ring/40 transition">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setHighlighted(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent outline-none py-2 text-sm min-w-0"
          inputMode="search"
          autoComplete="off"
          aria-label={t("searchPlaceholder")}
          aria-autocomplete="list"
          aria-controls={showSuggestions ? "search-suggestions" : undefined}
          aria-activedescendant={showSuggestions ? `sug-${highlighted}` : undefined}
        />
        {q && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id="search-suggestions"
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden z-40"
          role="listbox"
        >
          {showSuggestions &&
            suggestions.map((s, i) => (
              <Link
                key={s.slug}
                id={`sug-${i}`}
                to="/services/$slug"
                params={{ slug: s.slug }}
                role="option"
                aria-selected={i === highlighted}
                onMouseEnter={() => setHighlighted(i)}
                onClick={commitSearch}
                className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                  i === highlighted ? "bg-accent" : "hover:bg-accent/60"
                }`}
              >
                <div className="min-w-0">
                  <div className="font-medium truncate text-sm">{localized(s.name, lang)}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {s.authority}
                    {s.state ? ` · ${s.state}` : ""}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
              </Link>
            ))}
          {showRecent && (
            <div className="py-1">
              <div className="px-4 py-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <History className="w-3 h-3" /> Recent searches
                </span>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={clearSearches}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>
              {searches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQ(term);
                    inputRef.current?.focus();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-accent/60 transition-colors"
                >
                  <History className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm">{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader search={searchBar} />

      <section className="sticky top-14 sm:top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 flex items-center gap-2">
          <h1 className="font-display text-sm font-semibold tracking-tight whitespace-nowrap hidden sm:flex items-baseline gap-2 mr-1">
            {t("allServices")}
            <span className="text-xs font-normal text-muted-foreground">{filtered.length}</span>
          </h1>
          <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-none min-w-0">
            <CatChip active={cat === "All"} onClick={() => setCat("All")}>{t("all")}</CatChip>
            {categories.map((c) => (
              <CatChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</CatChip>
            ))}
          </div>

          {/* Desktop: inline controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <select
                      id="state-filter"
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      aria-label="Filter by state"
                      className="appearance-none rounded-full border border-border bg-card pl-8 pr-7 h-8 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 hover:border-primary/40 transition cursor-pointer"
                    >
                      <option value="All">All India</option>
                      <option value="Central">Central</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <MapPin className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p>Filter by state</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as typeof sort)}
                      aria-label="Sort services"
                      className="appearance-none rounded-full border border-border bg-card pl-8 pr-7 h-8 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 hover:border-primary/40 transition cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="name">Name (A→Z)</option>
                      <option value="fastest">Fastest</option>
                    </select>
                    <SlidersHorizontal className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p>Sort results</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={!hasFilters}
                    aria-label="Reset filters"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p>Reset filters</p></TooltipContent>
              </Tooltip>
              {hasFilters && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold -ml-1">
                  {filterCount}
                </span>
              )}
            </TooltipProvider>
          </div>

          {/* Mobile: filters popover */}
          <div className="flex md:hidden shrink-0">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="More filters"
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 h-8 text-xs font-medium transition ${hasFilters ? "border-primary text-primary bg-primary/10" : "border-border bg-card text-foreground hover:border-primary/40"}`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                  {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 space-y-4" sideOffset={6}>
                <div className="space-y-1.5">
                  <label htmlFor="state-filter-mobile" className="text-xs font-semibold text-muted-foreground">State</label>
                  <div className="relative">
                    <select
                      id="state-filter-mobile"
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-card pl-9 pr-8 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option value="All">All India</option>
                      <option value="Central">Central / Pan-India</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sort-mobile" className="text-xs font-semibold text-muted-foreground">Sort</label>
                  <div className="relative">
                    <select
                      id="sort-mobile"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as typeof sort)}
                      className="w-full appearance-none rounded-lg border border-border bg-card pl-9 pr-8 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="name">Name (A→Z)</option>
                      <option value="fastest">Fastest processing</option>
                    </select>
                    <SlidersHorizontal className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={!hasFilters}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Reset filters
                  {hasFilters && (
                    <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {filterCount}
                    </span>
                  )}
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>


      <section ref={resultsRef} className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full scroll-mt-32">
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {q.trim() !== "" && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold hover:bg-primary/20 transition"
                aria-label={`Remove search filter: ${q}`}
              >
                Search: {q}
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
            {cat !== "All" && (
              <button
                type="button"
                onClick={() => setCat("All")}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold hover:bg-primary/20 transition"
                aria-label={`Remove category filter: ${cat}`}
              >
                {cat}
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
            {stateFilter !== "All" && (
              <button
                type="button"
                onClick={() => setStateFilter("All")}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold hover:bg-primary/20 transition"
                aria-label={`Remove state filter: ${stateFilter}`}
              >
                {stateFilter}
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition"
            >
              Clear all
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noResults")}</p>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              {filtered.length} {filtered.length === 1 ? "service" : "services"}
            </p>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </>
        )}
      </section>

      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function CatChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all min-h-9 ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-card"
          : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
