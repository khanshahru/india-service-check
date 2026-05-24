import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton({
  title,
  text,
  className = "",
  compact = false,
}: {
  title: string;
  text?: string;
  className?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url });
        return;
      } catch {
        /* user dismissed */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label="Share"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card font-semibold hover:border-primary/40 transition ${
        compact ? "w-11 h-11" : "px-4 py-3"
      } ${className}`}
    >
      {copied ? <Check className="w-4 h-4 text-india-green" /> : <Share2 className="w-4 h-4" />}
      {!compact && <span>{copied ? "Copied" : "Share"}</span>}
    </button>
  );
}
