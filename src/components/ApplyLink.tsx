import { ExternalLink } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ApplyLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> {
  href: string;
  serviceName: string;
  authority?: string;
  children?: ReactNode;
  showIcon?: boolean;
  iconClassName?: string;
}

/**
 * Consistent Apply-link behavior across the app:
 * - Always opens in a new tab (target="_blank")
 * - Uses rel="noopener noreferrer" for security
 * - Provides a descriptive aria-label naming the service + authority
 * - Appends a visually-hidden "(opens in new tab)" hint for screen readers
 * - Renders an ExternalLink icon (decorative, aria-hidden)
 */
export function ApplyLink({
  href,
  serviceName,
  authority,
  children = "Apply",
  showIcon = true,
  iconClassName = "w-3.5 h-3.5",
  onClick,
  ...rest
}: ApplyLinkProps) {
  const label = authority
    ? `${children} for ${serviceName} on official ${authority} website (opens in new tab)`
    : `${children} for ${serviceName} (opens in new tab)`;

  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={onClick}
    >
      <span aria-hidden="false">{children}</span>
      {showIcon && <ExternalLink className={iconClassName} aria-hidden="true" />}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
