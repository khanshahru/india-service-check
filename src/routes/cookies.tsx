import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileTabBar } from "@/components/SiteHeader";
import { openCookieSettings } from "@/components/CookieConsent";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Sevanadu" },
      { name: "description", content: "How Sevanadu uses cookies, including advertising cookies from Google AdSense, and how to manage your choices." },
      { property: "og:title", content: "Cookie Policy — Sevanadu" },
      { property: "og:description", content: "Cookies used by Sevanadu and how to manage them." },
      { property: "og:url", content: "/cookies" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-24 md:pb-0">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">Cookie policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 12 July 2026</p>

        <div className="mt-6 space-y-5 text-sm sm:text-[15px] leading-relaxed text-foreground/85">
          <p>
            Cookies are small text files placed on your device by websites you visit.
            We also use similar technologies such as <code className="text-xs bg-secondary px-1 py-0.5 rounded">localStorage</code>{" "}
            (used to remember your language and saved services). This page describes
            the cookies used on Sevanadu and how you can control them. For full detail,
            see our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>.
          </p>

          <h2 className="font-display text-xl font-semibold mt-6">Categories we use</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="p-3 border border-border text-xs uppercase tracking-wider">Category</th>
                  <th className="p-3 border border-border text-xs uppercase tracking-wider">Purpose</th>
                  <th className="p-3 border border-border text-xs uppercase tracking-wider">Examples</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                <tr>
                  <td className="p-3 border border-border font-semibold">Essential</td>
                  <td className="p-3 border border-border">Remember your language, saved services and cookie choice. Always on.</td>
                  <td className="p-3 border border-border">
                    <code>sevanadu:favorites</code>, <code>sevanadu:cookie-consent</code>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Analytics</td>
                  <td className="p-3 border border-border">Measure aggregate usage to improve the site. Runs only with your consent.</td>
                  <td className="p-3 border border-border">Google Analytics (<code>_ga</code>, <code>_gid</code>)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Advertising</td>
                  <td className="p-3 border border-border">Deliver and measure advertising. Runs only with your consent.</td>
                  <td className="p-3 border border-border">
                    Google AdSense (<code>__gads</code>, <code>__gpi</code>, <code>IDE</code>)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-xl font-semibold mt-6">Managing your choices</h2>
          <p>
            You can change your cookie preferences at any time. Clicking the button
            below will re-open the cookie banner so you can update your consent.
          </p>
          <div>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card font-semibold px-4 py-2 text-sm hover:border-primary/40 transition"
            >
              Change cookie settings
            </button>
          </div>
          <p>
            You can also block or delete cookies directly in your browser. Note that
            blocking essential cookies may cause parts of the site to stop working.
          </p>

          <h2 className="font-display text-xl font-semibold mt-6">Third-party opt-outs</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Settings</a>
            </li>
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Analytics opt-out</a>
            </li>
            <li>
              <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-primary underline">Digital Advertising Alliance (US)</a>
            </li>
            <li>
              <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-primary underline">Your Online Choices (EU/UK)</a>
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}
