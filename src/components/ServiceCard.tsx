import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Clock } from "lucide-react";
import { useState } from "react";
import { ApplyLink } from "@/components/ApplyLink";
import { ServiceDetailsDrawer } from "@/components/ServiceDetailsDrawer";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/user-prefs";
import type { GovService } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";

export function ServiceCard({ service }: { service: GovService }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
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
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-0 -rotate-12 transition-all shrink-0" aria-hidden="true" />
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
