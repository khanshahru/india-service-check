import { Link } from "@tanstack/react-router";
import { Globe, Home, LayoutGrid, GitCompare } from "lucide-react";
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
            <div className="leading-tight min-w-0 hidden xs:block">
              <div className="font-display text-base sm:text-lg font-semibold tracking-tight truncate">{t("brandName")}</div>
            </div>
          </Link>

          {search ? (
            <div className="flex-1 min-w-0 max-w-2xl">{search}</div>
          ) : (
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium flex-1">
              <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {t("brandName")}
              </Link>
              <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {t("allServices")}
              </Link>
              <Link to="/compare" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {t("compare")}
              </Link>
            </nav>
          )}

          {search && (
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium shrink-0">
              <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {t("allServices")}
              </Link>
              <Link to="/compare" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
                {t("compare")}
              </Link>
            </nav>
          )}

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

export function MobileTabBar() {
  const { t } = useI18n();
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <TabItem to="/" icon={<Home className="w-5 h-5" />} label={t("brandName")} />
        <TabItem to="/services" icon={<LayoutGrid className="w-5 h-5" />} label={t("allServices")} />
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
  return (
    <footer className="mt-16 sm:mt-24 border-t border-border/60 pb-20 md:pb-0 print:hidden">
      <div className="h-1 bg-tricolor" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 grid gap-4 md:gap-6 md:grid-cols-2 items-start">
        <div>
          <div className="font-display text-xl font-semibold">{t("brandName")}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">{t("footerNote")}</p>
        </div>
        <div className="md:text-right text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("brandName")} · Made with care in India
        </div>
      </div>
    </footer>
  );
}
