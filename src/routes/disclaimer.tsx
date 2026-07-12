import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Sevanadu" },
      { name: "description", content: "Sevanadu is an independent information resource and is not affiliated with the Government of India." },
      { property: "og:title", content: "Disclaimer — Sevanadu" },
      { property: "og:description", content: "Sevanadu is an independent information resource." },
      { property: "og:url", content: "/disclaimer" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">Disclaimer</h1>

        <div className="mt-6 space-y-5 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
          <p>
            <strong>Not a government website.</strong> Sevanadu is an independent
            information project. It is not affiliated with, endorsed by, sponsored by
            or in any way officially connected to the Government of India, any state
            government, or any of their ministries, departments, agencies or officers.
            All government emblems, logos, portal names and scheme names remain the
            property of their respective owners and are used only for identification
            and reference.
          </p>
          <p>
            <strong>No professional advice.</strong> The information on Sevanadu is
            provided for general informational purposes only. It does not constitute
            legal, financial, tax, immigration or any other professional advice, and
            it should not be relied upon as such. You should consult the relevant
            official portal, or a qualified professional, before making any decisions
            based on information you read here.
          </p>
          <p>
            <strong>Accuracy.</strong> We make good-faith efforts to keep content
            current, but government fees, forms, timelines and procedures change
            frequently. Sevanadu makes no warranty or representation, express or
            implied, about the completeness, accuracy, reliability or availability of
            information on this site. Always verify with the official source.
          </p>
          <p>
            <strong>External links.</strong> Sevanadu links to official government
            portals and other third-party resources for your convenience. We do not
            control and are not responsible for the content, policies, availability or
            practices of any external site.
          </p>
          <p>
            <strong>Advertising.</strong> Sevanadu displays advertising, including
            Google AdSense, to help support the site. Advertisements are labelled and
            kept separate from editorial content. Sevanadu does not endorse advertised
            products or services. See our <Link to="/privacy" className="text-primary underline">privacy policy</Link>{" "}
            for how advertising cookies work and how to opt out.
          </p>
          <p>
            <strong>No liability.</strong> To the fullest extent permitted by law,
            Sevanadu, its contributors and its operators will not be liable for any
            loss or damage, direct or indirect, arising out of or in connection with
            the use of this site or reliance on any information contained within it.
          </p>
          <p>
            <strong>Report a problem.</strong> If you notice inaccurate information or
            a broken link, please email{" "}
            <a href="mailto:corrections@sevanadu.app" className="text-primary underline">corrections@sevanadu.app</a>.
          </p>
        </div>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}
