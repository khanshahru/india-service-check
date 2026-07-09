import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import { services } from "@/lib/services-data";
import { ServiceDetailsDrawer } from "@/components/ServiceDetailsDrawer";

/**
 * Reads the `?service=<slug>` search param on the current route and renders
 * the shared service details drawer for that slug. Enables deep-linkable
 * drawer URLs on any page that includes this host.
 */
export function ServiceDrawerHost() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { service?: string };
  const slug = typeof search.service === "string" ? search.service : undefined;
  const service = slug ? services.find((s) => s.slug === slug) : undefined;

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        navigate({
          to: ".",
          search: (prev: Record<string, unknown>) => ({ ...prev, service: undefined }),
          replace: true,
          resetScroll: false,
        });
      }
    },
    [navigate],
  );

  if (!service) return null;
  return <ServiceDetailsDrawer service={service} open onOpenChange={onOpenChange} />;
}

/**
 * Hook returning an opener that pushes `?service=<slug>` onto the current
 * route so the drawer opens and the URL becomes shareable.
 */
export function useOpenServiceDrawer() {
  const navigate = useNavigate();
  return useCallback(
    (slug: string) => {
      navigate({
        to: ".",
        search: (prev: Record<string, unknown>) => ({ ...prev, service: slug }),
        resetScroll: false,
      });
    },
    [navigate],
  );
}

export function buildServiceDeepLink(slug: string): string {
  if (typeof window === "undefined") return `/?service=${encodeURIComponent(slug)}`;
  const url = new URL(window.location.href);
  url.searchParams.set("service", slug);
  url.hash = "";
  return url.toString();
}
