import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { services, categories, type ServiceCategory } from "@/lib/services-data";
import { useI18n } from "@/lib/i18n";
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

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-saffron">
            <span className="text-india-green">/</span> {t("allServices")}
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold">{t("allServices")}</h1>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-card shadow-card p-2 max-w-2xl">
            <Search className="w-5 h-5 ml-3 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent outline-none py-2.5"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <CatChip active={cat === "All"} onClick={() => setCat("All")}>{t("all")}</CatChip>
            {categories.map((c) => (
              <CatChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</CatChip>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex-1 w-full">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">{t("noResults")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
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
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-card"
          : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
