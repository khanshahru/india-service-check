import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { services } from "@/lib/services-data";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { useFavorites } from "@/lib/user-prefs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  head: () => ({
    meta: [
      { title: "Your Saved Services · DocSetu" },
      {
        name: "description",
        content:
          "Quickly revisit the Indian government services you saved — Aadhaar, PAN, Passport, licences and more, all in one place.",
      },
      { property: "og:title", content: "Your Saved Services · DocSetu" },
      {
        property: "og:description",
        content: "Your personal shortlist of Indian government services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { lang: _lang } = useI18n();

  const bySlug = useMemo(() => new Map(services.map((s) => [s.slug, s])), []);
  const favServices = useMemo(
    () => favorites.map((s) => bySlug.get(s)).filter(Boolean) as typeof services,
    [favorites, bySlug],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-8 sm:py-12 pb-24 md:pb-12">
        <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-saffron">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Your favorites
            </div>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Saved services
            </h1>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {favServices.length > 0
                ? `${favServices.length} service${favServices.length === 1 ? "" : "s"} saved for quick access.`
                : "Tap the heart on any service to save it here for later."}
            </p>
          </div>
        </header>

        {favServices.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 sm:p-12 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-saffron/10 text-saffron flex items-center justify-center">
        <Heart className="w-7 h-7" />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold">No favorites yet</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Browse services and tap the heart icon to save the ones you use most.
        They'll appear here so you can revisit them in one tap.
      </p>
      <Link
        to="/services"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
      >
        Browse all services <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
