import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { ShieldCheck, Heart, Globe, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sevanadu — Government Services, Simplified" },
      {
        name: "description",
        content:
          "Sevanadu is an independent, citizen-friendly guide to Indian government services — documents, eligibility, fees and processing timelines in plain language.",
      },
      { property: "og:title", content: "About Sevanadu" },
      { property: "og:description", content: "An independent, citizen-friendly guide to Indian government services." },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">About Sevanadu</h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Sevanadu is an independent, citizen-friendly guide to Indian government
          services. We translate the fine print of applying for an Aadhaar update, a
          PAN card, a passport, a ration card, a driving licence and dozens of other
          formalities into plain language — so a first-time applicant in a small town
          and a busy professional in a metro can both find the same clear answer.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card icon={<BookOpen className="w-5 h-5 text-india-green" />} title="What we cover">
            Documents required, eligibility, official fees, expected processing time
            and where to apply — for central and popular state government services.
          </Card>
          <Card icon={<Globe className="w-5 h-5 text-primary" />} title="In your language">
            Content is available in English and major Indian languages. We're expanding
            language coverage based on user demand.
          </Card>
          <Card icon={<ShieldCheck className="w-5 h-5 text-india-green" />} title="Independent">
            Sevanadu is not affiliated with the Government of India. We always link to
            the official portal so you can verify and apply on the authoritative source.
          </Card>
          <Card icon={<Heart className="w-5 h-5 text-saffron" />} title="Free to use">
            The site is free. It is supported by non-intrusive advertising and reader
            support. See our <Link to="/privacy" className="text-primary underline">privacy policy</Link> for details.
          </Card>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl sm:text-2xl font-semibold">Editorial approach</h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
            Every service listing is compiled from official government portals,
            gazette notifications and citizen-charter documents. We review high-traffic
            pages periodically and flag known variations by state where they exist.
            Because government fees, forms and procedures change, we always show the
            official portal link and encourage you to verify before applying.
          </p>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
            If you spot outdated or inaccurate information, please tell us — corrections
            are prioritised.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl sm:text-2xl font-semibold">Get in touch</h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
            Feedback, corrections and partnership enquiries:{" "}
            <a href="mailto:hello@sevanadu.app" className="text-primary underline">hello@sevanadu.app</a>{" "}
            · <Link to="/contact" className="text-primary underline">Contact page</Link>
          </p>
        </section>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2">{icon}<span className="font-display font-semibold">{title}</span></div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
