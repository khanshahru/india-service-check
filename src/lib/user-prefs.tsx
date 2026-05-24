import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "docsetu:favorites";
const RECENT_KEY = "docsetu:recent";
const MAX_RECENT = 6;

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("docsetu:prefs", { detail: { key } }));
}

function useStored(key: string) {
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    setValue(read(key));
    const onChange = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (!d || d.key === key) setValue(read(key));
    };
    window.addEventListener("docsetu:prefs", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("docsetu:prefs", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [key]);

  return [value, setValue] as const;
}

export function useFavorites() {
  const [favorites] = useStored(FAV_KEY);

  const toggle = useCallback((slug: string) => {
    const cur = read(FAV_KEY);
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
    write(FAV_KEY, next);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}

export function useRecent() {
  const [recent] = useStored(RECENT_KEY);

  const push = useCallback((slug: string) => {
    const cur = read(RECENT_KEY).filter((s) => s !== slug);
    write(RECENT_KEY, [slug, ...cur].slice(0, MAX_RECENT));
  }, []);

  return { recent, push };
}
