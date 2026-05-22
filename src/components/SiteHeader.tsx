import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { useI18n, langLabels, type Lang } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  return (
    <>
      <div className="h-1 bg-tricolor" aria-hidden />
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-card">
              <div className="w-5 h-5 rounded-full border-2 border-saffron ashoka-chakra" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">{t("brandName")}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">India · Bhārat</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {t("brandName")}
            </Link>
            <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {t("allServices")}
            </Link>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-full">
                <Globe className="w-4 h-4" />
                <span>{langLabels[lang]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)} className={l === lang ? "font-semibold" : ""}>
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

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="h-1 bg-tricolor" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-6 md:grid-cols-2 items-start">
        <div>
          <div className="font-display text-xl font-semibold">{t("brandName")}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">{t("footerNote")}</p>
        </div>
        <div className="md:text-right text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("brandName")} · Made with care in India
        </div>
      </div>
    </footer>
  );
}
