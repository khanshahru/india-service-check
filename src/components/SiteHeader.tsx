import { Link, useNavigate } from "@tanstack/react-router";
import { Globe, Home, LayoutGrid, GitCompare, Heart, Search, X, Mail, ExternalLink, ShieldCheck, Info } from "lucide-react";
import { openCookieSettings } from "@/components/CookieConsent";
import { useState } from "react";
import { useI18n, langLabels, type Lang } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function SiteHeader({ search }: { search?: React.ReactNode } = {}) {
  const { lang, setLang, t } = useI18n();
  return (
    <>
      <div className="h-1 bg-tricolor print:hidden" aria-hidden />
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-border/60 print:hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center gap-3 sm:gap-5">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0 shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center shadow-card shrink-0">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-saffron ashoka-chakra" />
            </div>
            <div className="leading-tight min-w-0 hidden sm:block">
              <div className="font-display text-base sm:text-lg font-semibold tracking-tight truncate">{t("brandName")}</div>
            </div>
          </Link>

          <div className="flex-1 min-w-0 max-w-2xl">
            {search ?? <CompactSearch />}
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium shrink-0">
            <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {t("allServices")}
            </Link>
            <Link to="/compare" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {t("compare")}
            </Link>
            <Link to="/favorites" className="text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1.5" activeProps={{ className: "text-foreground" }}>
              <Heart className="w-4 h-4" />
              Saved
            </Link>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full h-9 px-3 shrink-0">
                <Globe className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{langLabels[lang]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[60vh] overflow-auto">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)} className={`text-base py-2.5 ${l === lang ? "font-semibold" : ""}`}>
                  {langLabels[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}

function CompactSearch() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate({ to: "/services", search: { q: q.trim() } });
    } else {
      navigate({ to: "/services" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card shadow-card pl-3 pr-1 h-9 focus-within:ring-2 focus-within:ring-ring/40 transition">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent outline-none py-1.5 text-sm min-w-0"
          inputMode="search"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </form>
  );
}

export function MobileTabBar() {
  const { t } = useI18n();
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        <TabItem to="/" icon={<Home className="w-5 h-5" />} label={t("brandName")} />
        <TabItem to="/services" icon={<LayoutGrid className="w-5 h-5" />} label={t("allServices")} />
        <TabItem to="/favorites" icon={<Heart className="w-5 h-5" />} label="Saved" />
        <TabItem to="/compare" icon={<GitCompare className="w-5 h-5" />} label={t("compare")} />
      </div>
    </nav>
  );
}

function TabItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground active:bg-secondary/60 transition-colors"
      activeOptions={{ exact: to === "/" }}
      activeProps={{ className: "text-primary" }}
    >
      {icon}
      <span className="truncate max-w-[90%]">{label}</span>
    </Link>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 sm:mt-24 border-t border-border/60 pb-20 md:pb-0 bg-secondary/30 print:hidden">
      <div className="h-1 bg-tricolor" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 grid gap-8 sm:gap-10 md:grid-cols-5">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-card">
              <div className="w-5 h-5 rounded-full border-2 border-saffron ashoka-chakra" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">{t("brandName")}</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
            A citizen-friendly guide to Indian government services — documents,
            eligibility, fees and processing times, in plain language.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-india-green" aria-hidden="true" />
            Independent · Non-official
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground/80">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">{t("allServices")}</Link></li>
            <li><Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">Saved services</Link></li>
            <li><Link to="/compare" className="text-muted-foreground hover:text-foreground transition-colors">{t("compare")}</Link></li>
          </ul>
        </div>

        {/* Official portals */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground/80">Official portals</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { label: "India.gov.in", href: "https://www.india.gov.in" },
              { label: "DigiLocker", href: "https://www.digilocker.gov.in" },
              { label: "UMANG", href: "https://web.umang.gov.in" },
              { label: "MyGov", href: "https://www.mygov.in" },
              { label: "Aadhaar (UIDAI)", href: "https://uidai.gov.in" },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & legal */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground/80">Support</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href="mailto:hello@sevanadu.app"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                hello@sevanadu.app
              </a>
            </li>
            <li>
              <a
                href="https://pgportal.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                Grievance portal
                <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="tel:112"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Emergency helpline · 112
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground/80">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy policy</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of service</Link></li>
            <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie policy</Link></li>
            <li><Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link></li>
            <li>
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5 flex gap-3 items-start">
          <Info className="w-4 h-4 mt-0.5 text-saffron shrink-0" aria-hidden="true" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("brandName")} is an independent information resource and is not affiliated with,
            endorsed by, or a substitute for the Government of India or any of its
            departments. Always verify document requirements, fees and procedures on the
            respective official portal before applying.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pt-6 pb-8 border-t border-border/60 flex flex-col gap-3 text-xs text-muted-foreground">
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <span aria-hidden="true">·</span>
          <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          <span aria-hidden="true">·</span>
          <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
          <span aria-hidden="true">·</span>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <span aria-hidden="true">·</span>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>© {year} {t("brandName")} · Made with care in India 🇮🇳</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Version 1.0</span>
            <span aria-hidden="true">·</span>
            <span>Last updated {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
