import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Sevanadu" },
      {
        name: "description",
        content:
          "The terms that govern your use of Sevanadu, an independent guide to Indian government services.",
      },
      { property: "og:title", content: "Terms of Service — Sevanadu" },
      { property: "og:description", content: "Terms that govern use of Sevanadu." },
      { property: "og:url", content: "/terms" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 12 July 2026</p>

        <S title="1. Acceptance of terms">
          <p>
            By accessing or using Sevanadu (the "Service"), you agree to be bound by
            these Terms of Service and our <Link to="/privacy">Privacy Policy</Link>.
            If you do not agree, please do not use the Service.
          </p>
        </S>

        <S title="2. Nature of the service">
          <p>
            Sevanadu provides <strong>informational summaries</strong> of Indian
            government services — required documents, eligibility, fees and processing
            times — in plain language. Sevanadu is an <strong>independent</strong>{" "}
            resource and is <strong>not affiliated with, endorsed by, or a substitute
            for</strong> the Government of India, any state government, or any of
            their ministries, departments or officers.
          </p>
        </S>

        <S title="3. No professional advice">
          <p>
            Content on Sevanadu is provided "as is" for general information only. It
            is not legal, financial, tax, immigration or professional advice. Always
            verify document requirements, fees and procedures on the respective
            official government portal before applying.
          </p>
        </S>

        <S title="4. Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful, fraudulent or harmful purpose.</li>
            <li>Attempt to breach security or interfere with normal operation.</li>
            <li>Scrape, mirror or resell substantial portions of the content without permission.</li>
            <li>Impersonate any person or misrepresent your affiliation with any person or entity.</li>
            <li>Upload or transmit malware, spam or automated abusive traffic.</li>
          </ul>
        </S>

        <S title="5. Intellectual property">
          <p>
            All original content on Sevanadu (text, layout, branding, illustrations
            and code) is owned by Sevanadu or its licensors and is protected by
            applicable copyright and trademark laws. Government emblems, logos and
            official portal names remain the property of their respective owners and
            are used only for identification and reference.
          </p>
        </S>

        <S title="6. Third-party links and advertising">
          <p>
            The Service links to official government portals and may display third-
            party advertising (including Google AdSense). We do not control and are
            not responsible for the content, policies or practices of third-party
            sites. Your interactions with third parties are solely between you and
            them.
          </p>
        </S>

        <S title="7. Disclaimer of warranties">
          <p>
            The Service is provided on an "as is" and "as available" basis, without
            warranties of any kind, express or implied, including merchantability,
            fitness for a particular purpose, and non-infringement. We do not warrant
            that the content is accurate, complete, current, or that the Service will
            be uninterrupted or error-free.
          </p>
        </S>

        <S title="8. Limitation of liability">
          <p>
            To the maximum extent permitted by law, Sevanadu and its contributors will
            not be liable for any indirect, incidental, consequential, special or
            punitive damages, or any loss of data, revenue or goodwill, arising out of
            or relating to your use of, or inability to use, the Service. Our total
            aggregate liability for any claim relating to the Service will not exceed
            INR 1,000.
          </p>
        </S>

        <S title="9. Indemnity">
          <p>
            You agree to indemnify and hold Sevanadu harmless from any claims,
            damages, losses and expenses (including reasonable legal fees) arising
            from your misuse of the Service or breach of these Terms.
          </p>
        </S>

        <S title="10. Modifications">
          <p>
            We may modify these Terms at any time. Continued use of the Service after
            changes are posted constitutes acceptance of the revised Terms.
          </p>
        </S>

        <S title="11. Governing law">
          <p>
            These Terms are governed by the laws of India. Subject to applicable
            consumer-protection laws, courts at Bengaluru, Karnataka will have
            exclusive jurisdiction over any dispute arising out of these Terms or your
            use of the Service.
          </p>
        </S>

        <S title="12. Contact">
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:hello@sevanadu.app" className="text-primary underline">hello@sevanadu.app</a>.
          </p>
        </S>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl sm:text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
