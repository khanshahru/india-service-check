import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { services, type GovService } from "@/lib/services-data";
import { useI18n, localized } from "@/lib/i18n";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Compare Government Services — DocSetu" },
      { name: "description", content: "Compare documents, fees and timelines of Indian government services side-by-side." },
    ],
  }),
});

function ComparePage() {
  const { t, lang } = useI18n();
  const [picked, setPicked] = useState<string[]>([services[0]?.slug, services[1]?.slug].filter(Boolean) as string[]);
  const [adding, setAdding] = useState(false);

  const selected = useMemo(
    () => picked.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as GovService[],
    [picked]
  );

  const remaining = services.filter((s) => !picked.includes(s.slug));

  const toggle = (slug: string) => {
    setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : p.length >= 3 ? p : [...p, slug]));
    setAdding(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <SiteHeader />

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-saffron">
            <span className="text-india-green">/</span> {t("compare")}
          </div>
          <h1 className="mt-1.5 font-display text-2xl sm:text-4xl md:text-5xl font-semibold">{t("compareTitle")}</h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">{t("compareHint")}</p>

          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
            {selected.map((s) => (
              <button
                key={s.slug}
                onClick={() => toggle(s.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2 shadow-card"
              >
                <span className="max-w-[160px] truncate">{localized(s.name, lang)}</span> <X className="w-3.5 h-3.5" />
              </button>
            ))}
            {picked.length < 3 && (
              <div className="relative">
                <button
                  onClick={() => setAdding((a) => !a)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card border border-dashed border-primary/40 text-sm font-medium px-4 py-2 hover:border-primary transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add service
                </button>
                {adding && (
                  <div className="absolute z-20 top-full mt-2 left-0 w-72 max-h-80 overflow-auto rounded-xl border border-border bg-card shadow-elevated p-1">
                    {remaining.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => toggle(s.slug)}
                        className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-secondary/60 flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{localized(s.name, lang)}</span>
                        <span className="text-[10px] uppercase text-muted-foreground shrink-0">{s.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-0 sm:px-6 py-6 sm:py-12 flex-1 w-full">
        {selected.length === 0 ? (
          <p className="text-muted-foreground px-4">Pick a service to start comparing.</p>
        ) : (
          <div className="overflow-x-auto sm:rounded-2xl border-y sm:border border-border bg-card shadow-card">
            <table className="w-full text-sm">

              <thead>
                <tr className="bg-secondary/60">
                  <th className="text-left p-4 font-semibold w-44 align-bottom">Service</th>
                  {selected.map((s) => (
                    <th key={s.slug} className="text-left p-4 font-display text-base align-bottom min-w-[220px]">
                      {localized(s.name, lang)}
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.category}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&>tr]:border-t [&>tr]:border-border">
                <Row label={t("authority")} values={selected.map((s) => s.authority)} />
                <Row label={t("processingTime")} values={selected.map((s) => s.processingTime)} />
                <Row label={t("fee")} values={selected.map((s) => s.fee)} />
                <tr>
                  <td className="p-4 font-medium text-muted-foreground align-top">{t("documentsNeeded")}</td>
                  {selected.map((s) => (
                    <td key={s.slug} className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {s.documents.map((d, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${d.required ? "text-india-green" : "text-muted-foreground"}`} />
                            <span className={d.required ? "" : "text-muted-foreground"}>{localized(d.title, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-muted-foreground align-top">{t("eligibility")}</td>
                  {selected.map((s) => {
                    const elig = s.eligibility[lang === "hi" ? "hi" : "en"] ?? s.eligibility.en;
                    return (
                      <td key={s.slug} className="p-4 align-top">
                        <ul className="space-y-1.5">
                          {elig.map((e, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-saffron shrink-0" />
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td className="p-4 font-medium text-muted-foreground align-top">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-4 align-top">{v}</td>
      ))}
    </tr>
  );
}
