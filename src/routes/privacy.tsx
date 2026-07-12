import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sevanadu" },
      {
        name: "description",
        content:
          "How Sevanadu collects, uses, and protects your information, including cookies, analytics, and third-party advertising such as Google AdSense.",
      },
      { property: "og:title", content: "Privacy Policy — Sevanadu" },
      { property: "og:description", content: "Sevanadu privacy practices, cookies and advertising disclosures." },
      { property: "og:url", content: "/privacy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "12 July 2026";
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14 prose-content">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

        <Section title="1. Who we are">
          <p>
            Sevanadu ("Sevanadu", "we", "us", or "our") is an independent information
            resource that helps citizens understand Indian government services,
            documents, fees and processing timelines. We are <strong>not affiliated
            with the Government of India</strong> or any of its ministries or
            departments. Sevanadu is operated as an informational project; you can
            reach us at <a href="mailto:hello@sevanadu.app">hello@sevanadu.app</a>.
          </p>
        </Section>

        <Section title="2. Information we collect">
          <p>We keep data collection to the minimum needed to run the site:</p>
          <ul>
            <li>
              <strong>Local preferences.</strong> Your language, saved services, recent
              searches, cookie choices and similar settings are stored in your browser
              (localStorage). They stay on your device and are not sent to us.
            </li>
            <li>
              <strong>Contact messages.</strong> If you email us, we receive your
              address and the contents of your message so we can reply.
            </li>
            <li>
              <strong>Standard server logs.</strong> Our hosting provider records
              standard request metadata (IP address, user agent, timestamps, referring
              URL) for security, abuse prevention and diagnostics. These logs are
              retained for a limited period.
            </li>
            <li>
              <strong>Analytics &amp; advertising data.</strong> Third-party services
              described below may collect data through cookies and similar technologies
              when you use the site.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> ask for Aadhaar, PAN, passport, bank or other
            sensitive personal identifiers on this site. Do not send us such
            information; if you do, we will delete it.
          </p>
        </Section>

        <Section title="3. How we use information">
          <ul>
            <li>To display service checklists and remember your preferences.</li>
            <li>To respond to your questions and feedback.</li>
            <li>To keep the site secure, prevent abuse and diagnose issues.</li>
            <li>To measure aggregate usage and improve the content.</li>
            <li>To show advertising that supports the site (see §5).</li>
          </ul>
        </Section>

        <Section title="4. Cookies and similar technologies">
          <p>
            Cookies are small text files stored by your browser. We use them, together
            with localStorage, for two purposes:
          </p>
          <ul>
            <li>
              <strong>Essential.</strong> Remember your language, saved services and
              cookie choice. Always on — the site does not work correctly without them.
            </li>
            <li>
              <strong>Analytics &amp; advertising.</strong> Set by third parties (e.g.
              Google) to measure usage and show advertising. Off by default; turned on
              only if you accept via our cookie banner.
            </li>
          </ul>
          <p>
            You can change your choice at any time from the "Cookie settings" link in
            the footer, or by clearing site data in your browser.
          </p>
        </Section>

        <Section title="5. Advertising — Google AdSense and other partners">
          <p>
            Sevanadu may display advertisements served by Google AdSense and other
            approved advertising networks. When enabled:
          </p>
          <ul>
            <li>
              Google, as a third-party vendor, uses cookies to serve ads on Sevanadu.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve
              ads to you based on your visit to this and other sites on the Internet.
            </li>
            <li>
              You can opt out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>,{" "}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>, or{" "}
              <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>.
            </li>
            <li>
              For users in the EEA, UK and other regions requiring consent, we rely on
              a consent banner (a "consent management platform") before enabling
              personalised advertising, as required by Google's{" "}
              <a href="https://www.google.com/about/company/user-consent-policy/" target="_blank" rel="noopener noreferrer">EU User Consent Policy</a>.
            </li>
            <li>
              Third-party advertisers may also use cookies subject to their own privacy
              policies. Sevanadu has no control over these cookies.
            </li>
          </ul>
          <p>
            We do not knowingly allow interest-based advertising to be shown to
            children. See §8.
          </p>
        </Section>

        <Section title="6. Analytics">
          <p>
            We may use privacy-respecting analytics (such as Google Analytics) to
            understand aggregate usage. Where required, analytics only runs after you
            accept via the cookie banner. IP addresses are truncated or anonymised
            where the provider supports it.
          </p>
        </Section>

        <Section title="7. Sharing of information">
          <p>
            We do not sell your personal information. We share limited data only with:
          </p>
          <ul>
            <li>Hosting and infrastructure providers that run the site on our behalf.</li>
            <li>Advertising and analytics partners described above, subject to their policies.</li>
            <li>Authorities, when required by law or to protect our rights and users' safety.</li>
          </ul>
        </Section>

        <Section title="8. Children's privacy">
          <p>
            Sevanadu is a general-audience information site and is not directed to
            children under 13 (or the equivalent minimum age in your country). We do
            not knowingly collect personal information from children. If you believe a
            child has provided us data, please contact us and we will delete it.
          </p>
        </Section>

        <Section title="9. Your rights">
          <p>
            Depending on where you live (including under India's Digital Personal Data
            Protection Act, 2023, the EU/UK GDPR and the California CCPA), you may
            have rights to access, correct, delete, restrict or object to processing of
            your personal data, and to withdraw consent. Contact us at{" "}
            <a href="mailto:hello@sevanadu.app">hello@sevanadu.app</a> and we will
            respond within the timelines required by applicable law.
          </p>
        </Section>

        <Section title="10. Data retention and security">
          <p>
            We retain contact emails only as long as needed to respond to your query.
            Server logs are kept for a short window for security purposes. We use
            reasonable technical and organisational safeguards (HTTPS, hardened
            hosting, access controls) but no method of transmission over the Internet
            is 100% secure.
          </p>
        </Section>

        <Section title="11. International transfers">
          <p>
            Our hosting, analytics and advertising partners may process data outside
            your country of residence, including in the United States and the European
            Union. Where required, we rely on appropriate safeguards such as standard
            contractual clauses.
          </p>
        </Section>

        <Section title="12. Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will be
            highlighted on this page with a new "Last updated" date. Continued use of
            the site after changes indicates your acceptance of the revised policy.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            Questions or requests about this policy? Email{" "}
            <a href="mailto:hello@sevanadu.app">hello@sevanadu.app</a> or use our{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </Section>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl sm:text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
