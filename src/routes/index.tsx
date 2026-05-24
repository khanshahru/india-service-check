import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { Lang } from "@/lib/i18n";

import { Search, ArrowRight, ShieldCheck, Languages, Clock3, Heart, History } from "lucide-react";
import { useMemo, useState } from "react";
import { services } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useFavorites, useRecent } from "@/lib/user-prefs";


export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { recent } = useRecent();
  const { favorites } = useFavorites();

  const bySlug = useMemo(() => new Map(services.map((s) => [s.slug, s])), []);
  const recentServices = recent.map((s) => bySlug.get(s)).filter(Boolean) as typeof services;
  const favServices = favorites.map((s) => bySlug.get(s)).filter(Boolean) as typeof services;


  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return services
      .filter(
        (s) =>
          s.name.en.toLowerCase().includes(needle) ||
          s.name.hi.includes(q) ||
          s.slug.includes(needle),
      )
      .slice(0, 5);
  }, [q]);

  const popular = services.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 ashoka-chakra opacity-[0.04]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-muted-foreground shadow-card">
              <span className="w-1.5 h-1.5 rounded-full bg-india-green animate-pulse" />
              <span className="truncate max-w-[260px] sm:max-w-none">{t("tagline")}</span>
            </div>
            <h1 className="mt-4 sm:mt-6 font-display text-[2rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground">
              {t("heroTitle")}
            </h1>
            <p className="mt-3 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("heroSub")}</p>

            {/* Search */}
            <div className="mt-6 sm:mt-8 relative max-w-2xl">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-border bg-card shadow-elevated p-1.5 sm:p-2 focus-within:ring-2 focus-within:ring-ring/40 transition">
                <Search className="w-5 h-5 ml-2 sm:ml-3 text-muted-foreground shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="flex-1 bg-transparent outline-none py-3 text-base placeholder:text-muted-foreground/70 min-w-0"
                  inputMode="search"
                  aria-label={t("searchPlaceholder")}
                />
                <Button
                  onClick={() => navigate({ to: "/services" })}
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 h-11 px-3 sm:px-4"
                  aria-label={t("browseAll")}
                >
                  <span className="hidden sm:inline">{t("browseAll")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden z-10">
                  {suggestions.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-accent active:bg-accent transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-medium truncate">{localized(s.name, lang)}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.authority}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Stat row */}
            <dl className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl">
              <Stat n="100+" label={t("stat1")} />
              <Stat n="7" label={t("stat2")} />
              <Stat n="₹0" label={t("stat3")} />
            </dl>
          </div>
        </div>
      </section>

      {/* RECENT & FAVORITES */}
      {(recentServices.length > 0 || favServices.length > 0) && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-16 grid gap-10 md:gap-12 md:grid-cols-2">
          {recentServices.length > 0 && (
            <Shelf icon={<History className="w-4 h-4" />} accent="text-primary" title="Recently viewed" items={recentServices} lang={lang} />
          )}
          {favServices.length > 0 && (
            <Shelf icon={<Heart className="w-4 h-4 fill-current" />} accent="text-saffron" title="Your favorites" items={favServices} lang={lang} />
          )}
        </section>
      )}

      {/* POPULAR */}

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-5 sm:mb-8">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-saffron">
              <span className="text-india-green">/</span> {t("popular")}
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-semibold">{t("popular")}</h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline shrink-0"
          >
            <span className="hidden sm:inline">{t("browseAll")}</span>
            <span className="sm:hidden">All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">{t("whyTitle")}</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-lg">{t("whyDesc")}</p>
          </div>
          <div className="grid gap-3 sm:gap-4">
            <Feature icon={<ShieldCheck className="w-5 h-5" />} title={t("feat1Title")} desc={t("feat1Desc")} accent="saffron" />
            <Feature icon={<Clock3 className="w-5 h-5" />} title={t("feat2Title")} desc={t("feat2Desc")} accent="green" />
            <Feature icon={<Languages className="w-5 h-5" />} title={t("feat3Title")} desc={t("feat3Desc")} accent="navy" />
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">{n}</div>
      <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">{label}</div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: "saffron" | "green" | "navy";
}) {
  const bg =
    accent === "saffron"
      ? "bg-saffron text-saffron-foreground"
      : accent === "green"
        ? "bg-india-green text-india-green-foreground"
        : "bg-primary text-primary-foreground";
  return (
    <div className="flex gap-4 rounded-2xl bg-card border border-border p-5 shadow-card">
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

function Shelf({
  icon,
  title,
  items,
  accent,
  lang,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  items: typeof services;
  lang: Lang;
}) {
  return (
    <div>
      <div className={`flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold ${accent}`}>
        {icon}
        <span>{title}</span>
      </div>
      <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        {items.slice(0, 5).map((s) => (
          <li key={s.slug}>
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="flex items-center justify-between px-4 py-3 hover:bg-accent/60 transition-colors"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{localized(s.name, lang)}</div>
                <div className="text-xs text-muted-foreground truncate">{s.authority}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

