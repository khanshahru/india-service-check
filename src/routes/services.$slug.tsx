import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Building2, Clock, ExternalLink, IndianRupee, ListChecks, Printer } from "lucide-react";
import { services, type GovService } from "@/lib/services-data";
import { localized, useI18n } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    return {
      meta: [
        { title: s ? `${s.name.en} — Documents Required | DocSetu` : "Service — DocSetu" },
        { name: "description", content: s ? `Documents, fees and processing time for ${s.name.en} application in India.` : "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <p className="text-muted-foreground">Service not found</p>
        <Link to="/services" className="text-primary underline mt-2 inline-block">Back to services</Link>
      </div>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: GovService };
  const { t, lang } = useI18n();
  const elig = service.eligibility[lang === "hi" ? "hi" : "en"] ?? service.eligibility.en;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-hero">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("back")}
          </Link>
          <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
            <span className="text-india-green">{service.category}</span>
            <span className="text-muted-foreground">· {service.authority}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
            {localized(service.name, lang)}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{localized(service.description, lang)}</p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            <Meta icon={<Building2 className="w-4 h-4" />} label={t("authority")} value={service.authority} />
            <Meta icon={<Clock className="w-4 h-4" />} label={t("processingTime")} value={service.processingTime} />
            <Meta icon={<IndianRupee className="w-4 h-4" />} label={t("fee")} value={service.fee} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3 print:hidden">
            {service.applyUrl && (
              <a
                href={service.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-saffron-gradient text-saffron-foreground font-semibold px-5 py-3 shadow-elevated hover:opacity-95 transition"
              >
                {t("applyOfficial")} <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card font-semibold px-5 py-3 hover:border-primary/40 transition"
            >
              <Printer className="w-4 h-4" /> {t("print")}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14 grid lg:grid-cols-[1.6fr_1fr] gap-10 w-full flex-1">
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
            <ListChecks className="w-5 h-5 text-india-green" />
            {t("documentsNeeded")}
          </h2>
          <ol className="mt-6 space-y-3">
            {service.documents.map((d, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/5 border border-primary/15 flex items-center justify-center font-display font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{localized(d.title, lang)}</span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                        d.required
                          ? "bg-india-green/10 text-india-green border border-india-green/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {d.required ? t("required") : t("optional")}
                    </span>
                  </div>
                  {d.note && (
                    <p className="text-sm text-muted-foreground mt-1">{localized(d.note, lang)}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
            <BadgeCheck className="w-5 h-5 text-saffron" />
            {t("eligibility")}
          </h2>
          <ul className="mt-6 space-y-3">
            {elig.map((e, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                <span className="text-foreground/85">{e}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 rounded-2xl border border-border bg-secondary/60">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footerNote")}
            </p>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur p-4 shadow-card">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 font-medium text-sm">{value}</div>
    </div>
  );
}
