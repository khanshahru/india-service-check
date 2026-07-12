import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { Mail, ExternalLink, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sevanadu — Feedback & Corrections" },
      { name: "description", content: "Reach the Sevanadu team for corrections, feedback, partnerships and press enquiries." },
      { property: "og:title", content: "Contact Sevanadu" },
      { property: "og:description", content: "Reach the Sevanadu team." },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">Contact us</h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Sevanadu is a small independent project. We read every message and try to
          reply within a few working days.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:hello@sevanadu.app"
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <div className="font-display font-semibold">General enquiries</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">hello@sevanadu.app</div>
          </a>
          <a
            href="mailto:corrections@sevanadu.app"
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-india-green" />
              <div className="font-display font-semibold">Corrections</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              corrections@sevanadu.app — include the service name and a link to the official source if possible.
            </div>
          </a>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl sm:text-2xl font-semibold">Government grievances</h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
            Sevanadu cannot process, escalate or track any government application on
            your behalf. For grievances against a government department, please use
            the official public grievance portal:
          </p>
          <a
            href="https://pgportal.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-primary underline"
          >
            pgportal.gov.in <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl sm:text-2xl font-semibold">Advertising &amp; partnerships</h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
            For advertising and partnership enquiries, email{" "}
            <a href="mailto:hello@sevanadu.app" className="text-primary underline">hello@sevanadu.app</a>{" "}
            with the subject line "Partnership". Please review our{" "}
            <Link to="/terms" className="text-primary underline">terms</Link> and{" "}
            <Link to="/disclaimer" className="text-primary underline">disclaimer</Link>{" "}
            before reaching out.
          </p>
        </section>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}
