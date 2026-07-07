import { Link } from "@tanstack/react-router";
import { FileText, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { ApplyLink } from "@/components/ApplyLink";
import { ServiceDetailsDrawer } from "@/components/ServiceDetailsDrawer";
import { ShareButton } from "@/components/ShareButton";
import { useFavorites } from "@/lib/user-prefs";
import type { GovService } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCard({ service }: { service: GovService }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(service.slug);
  const name = localized(service.name, lang);
  return (
    <>
      <article className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/40">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-india-green">
                <span className="w-1.5 h-1.5 rounded-full bg-india-green" />
                {service.category}
              </div>
              <span className="text-[10px] uppercase tracking-[0.12em] font-semibold px-1.5 py-0.5 rounded-full border border-border bg-secondary/60 text-foreground/70">
                {service.state ?? "Central"}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold leading-tight text-foreground">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Open details for ${name}`}
                aria-haspopup="dialog"
                className="text-left outline-none before:absolute before:inset-0 before:rounded-2xl before:content-[''] hover:text-primary transition-colors cursor-pointer"
              >
                {name}
              </button>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ShareButton
              title={name}
              url={typeof window !== "undefined" ? `${window.location.origin}/services/${service.slug}` : `/services/${service.slug}`}
              compact
              className="relative z-10 w-9 h-9 rounded-full border bg-card hover:border-primary/40"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(service.slug);
              }}
              aria-pressed={saved}
              aria-label={saved ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
              className={`relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border transition ${
                saved
                  ? "border-saffron/40 bg-saffron/10 text-saffron"
                  : "border-border bg-card text-muted-foreground hover:text-saffron hover:border-saffron/40"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{localized(service.description, lang)}</p>
        <div className="mt-4 pt-4 border-t border-border/70 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4 min-w-0">
            <span className="inline-flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" aria-hidden="true" />{service.documents.length} docs</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{service.processingTime}</span>
          </div>
          {service.applyUrl && (
            <ApplyLink
              href={service.applyUrl}
              serviceName={name}
              authority={service.authority}
              onClick={(e) => e.stopPropagation()}
              iconClassName="w-3 h-3"
              className="relative z-10 inline-flex items-center gap-1 font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded px-1 -mx-1"
            >
              Apply
            </ApplyLink>
          )}
        </div>
      </article>
      <ServiceDetailsDrawer service={service} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function ServiceCardLinkFallback({ service }: { service: GovService }) {
  const { lang } = useI18n();
  return (
    <Link to="/services/$slug" params={{ slug: service.slug }}>
      {localized(service.name, lang)}
    </Link>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-14 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>
      <div className="mt-4 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-4 w-12 rounded-md" />
      </div>
    </div>
  );
}
