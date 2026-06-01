import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Clock } from "lucide-react";
import type { GovService } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";

export function ServiceCard({ service }: { service: GovService }) {
  const { lang } = useI18n();
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      aria-label={`View details for ${localized(service.name, lang)}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card hover:shadow-elevated hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer"
    >
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
            {localized(service.name, lang)}
          </h3>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-0 -rotate-12 transition-all shrink-0" />
      </div>
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{localized(service.description, lang)}</p>
      <div className="mt-4 pt-4 border-t border-border/70 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />{service.documents.length} docs</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{service.processingTime}</span>
      </div>
    </Link>
  );
}
