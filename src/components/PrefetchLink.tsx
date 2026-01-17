import { Link, LinkProps } from "react-router-dom";
import { useRoutePrefetch } from "@/hooks/useRoutePrefetch";
import { forwardRef } from "react";

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean;
}

/**
 * Link component that prefetches route chunks on hover/focus
 * for instant navigation without loading screens
 */
const PrefetchLink = forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ to, prefetch = true, onMouseEnter, onMouseLeave, onFocus, ...props }, ref) => {
    const { prefetch: doPrefetch, cancelPrefetch } = useRoutePrefetch();
    const href = typeof to === "string" ? to : to.pathname || "";

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefetch) {
        doPrefetch(href);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      cancelPrefetch();
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
      if (prefetch) {
        doPrefetch(href);
      }
      onFocus?.(e);
    };

    return (
      <Link
        ref={ref}
        to={to}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        {...props}
      />
    );
  }
);

PrefetchLink.displayName = "PrefetchLink";

export default PrefetchLink;
