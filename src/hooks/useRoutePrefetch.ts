import { useCallback, useEffect, useRef } from "react";

// Route to chunk mapping for prefetching
const routeChunks: Record<string, () => Promise<unknown>> = {
  "/portfolio": () => import("@/pages/Portfolio"),
  "/quote": () => import("@/pages/Quote"),
  "/services": () => import("@/pages/Services"),
  "/careers": () => import("@/pages/Careers"),
  "/team": () => import("@/pages/Team"),
  "/contact": () => import("@/pages/ContactPage"),
  "/auth": () => import("@/pages/Auth"),
};

// Cache of already prefetched routes
const prefetchedRoutes = new Set<string>();

/**
 * Hook to prefetch route chunks on hover/focus for instant navigation
 */
export const useRoutePrefetch = () => {
  const prefetchTimeoutRef = useRef<NodeJS.Timeout>();

  const prefetch = useCallback((href: string) => {
    // Skip if already prefetched or is current page
    if (prefetchedRoutes.has(href) || href === window.location.pathname) {
      return;
    }

    // Find matching route (handle exact and prefix matches)
    const matchingRoute = Object.keys(routeChunks).find(
      (route) => href === route || href.startsWith(route + "/")
    );

    if (matchingRoute && routeChunks[matchingRoute]) {
      // Small delay to avoid prefetching on quick hover-throughs
      prefetchTimeoutRef.current = setTimeout(() => {
        routeChunks[matchingRoute]()
          .then(() => {
            prefetchedRoutes.add(href);
          })
          .catch(() => {
            // Silently fail - will load normally on click
          });
      }, 50);
    }
  }, []);

  const cancelPrefetch = useCallback(() => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current);
      }
    };
  }, []);

  return { prefetch, cancelPrefetch };
};

/**
 * Prefetch critical routes on app load (after initial render)
 */
export const prefetchCriticalRoutes = () => {
  // Wait for idle time to prefetch most-visited routes
  if ("requestIdleCallback" in window) {
    (window as Window).requestIdleCallback(() => {
      ["/services", "/portfolio", "/contact"].forEach((route) => {
        if (routeChunks[route] && !prefetchedRoutes.has(route)) {
          routeChunks[route]()
            .then(() => prefetchedRoutes.add(route))
            .catch(() => {});
        }
      });
    });
  } else {
    // Fallback for Safari
    setTimeout(() => {
      ["/services", "/portfolio", "/contact"].forEach((route) => {
        if (routeChunks[route] && !prefetchedRoutes.has(route)) {
          routeChunks[route]()
            .then(() => prefetchedRoutes.add(route))
            .catch(() => {});
        }
      });
    }, 2000);
  }
};

export default useRoutePrefetch;
