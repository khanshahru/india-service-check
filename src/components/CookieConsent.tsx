import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "sevanadu:cookie-consent";

type Choice = "accepted" | "essential" | null;

function read(): Choice {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

function write(v: Exclude<Choice, null>) {
  try {
    window.localStorage.setItem(KEY, v);
    window.dispatchEvent(new CustomEvent("sevanadu:cookie-consent", { detail: v }));
  } catch {
    /* ignore */
  }
}

export function hasAcceptedAdCookies(): boolean {
  return read() === "accepted";
}

export function openCookieSettings() {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("sevanadu:cookie-consent", { detail: null }));
  } catch {
    /* ignore */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(read() === null);
    check();
    const onChange = () => check();
    window.addEventListener("sevanadu:cookie-consent", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("sevanadu:cookie-consent", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 md:bottom-4 md:inset-x-auto md:right-4 md:max-w-md z-50 print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 md:mx-0 mb-3 md:mb-0 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-elevated p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-saffron shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="font-display font-semibold text-sm">Cookies on Sevanadu</div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              We use essential cookies to run the site. With your consent, we also use
              analytics and advertising cookies (including Google AdSense) to keep
              Sevanadu free.{" "}
              <Link to="/privacy" className="text-primary underline">Privacy policy</Link>{" "}
              ·{" "}
              <Link to="/cookies" className="text-primary underline">Cookie policy</Link>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  write("accepted");
                  setVisible(false);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-saffron-gradient text-saffron-foreground font-semibold px-3.5 py-2 text-xs shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => {
                  write("essential");
                  setVisible(false);
                }}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background font-semibold px-3.5 py-2 text-xs hover:border-primary/40 transition"
              >
                Essential only
              </button>
            </div>
          </div>
          <button
            type="button"
            aria-label="Dismiss cookie banner (essential only)"
            onClick={() => {
              write("essential");
              setVisible(false);
            }}
            className="shrink-0 inline-flex items-center justify-center rounded-full w-7 h-7 text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
