import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useRef, useState, useCallback } from "react";
import { services, categories, type ServiceCategory } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "All Government Services — DocSetu" },
      { name: "description", content: "Browse 100+ Indian government services with the documents you need to apply." },
    ],
  }),
});

function ServicesPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ServiceCategory | "All">("All");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return services.filter((s) => {
      const matchesCat = cat === "All" || s.category === cat;
      if (!matchesCat) return false;
      if (!needle) return true;
      return (
        s.name.en.toLowerCase().includes(needle) ||
        s.name.hi.includes(q) ||
        s.authority.toLowerCase().includes(needle) ||
        s.slug.includes(needle)
      );
    });
  }, [q, cat]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <section className="sticky top-14 sm:top-16 z-30 border-b border-border bg-secondary/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-5 pb-3 sm:py-8">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-saffron">
            <span className="text-india-green">/</span> {t("allServices")}
          </div>
          <h1 className="mt-1.5 font-display text-2xl sm:text-4xl md:text-5xl font-semibold">{t("allServices")}</h1>

          <div className="mt-4 sm:mt-6 flex items-center gap-1.5 rounded-2xl border border-border bg-card shadow-card p-1.5 sm:p-2 max-w-2xl">
            <Search className="w-5 h-5 ml-2 sm:ml-3 text-muted-foreground shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent outline-none py-3 text-base min-w-0"
              inputMode="search"
              aria-label={t("searchPlaceholder")}
            />
          </div>

          <div className="mt-3 sm:mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex sm:flex-wrap gap-2 overflow-x-auto scrollbar-none pb-1">
            <CatChip active={cat === "All"} onClick={() => setCat("All")}>{t("all")}</CatChip>
            {categories.map((c) => (
              <CatChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</CatChip>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">{t("noResults")}</p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">{filtered.length} services</p>
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
