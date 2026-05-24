import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/user-prefs";

export function FavoriteButton({
  slug,
  label,
  className = "",
  compact = false,
}: {
  slug: string;
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition ${
        compact ? "w-11 h-11" : "px-4 py-3"
      } ${
        active
          ? "border-saffron/40 bg-saffron/10 text-saffron"
          : "border-border bg-card hover:border-primary/40 text-foreground"
      } ${className}`}
    >
      <Heart className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
      {!compact && <span>{label ?? (active ? "Saved" : "Save")}</span>}
    </button>
  );
}
