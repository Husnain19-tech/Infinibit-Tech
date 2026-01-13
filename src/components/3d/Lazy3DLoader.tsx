import { Suspense, ComponentType, lazy, useState, useEffect } from "react";

interface Lazy3DLoaderProps {
  scene: ComponentType<any>;
  wrapper: ComponentType<any>;
  sceneProps?: Record<string, any>;
  wrapperProps?: Record<string, any>;
  fallback?: React.ReactNode;
  delay?: number;
}

// Error boundary fallback
const Scene3DFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-2 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  </div>
);

// Component to handle delayed loading
const DelayedLoader = ({
  children,
  delay,
  fallback,
}: {
  children: React.ReactNode;
  delay: number;
  fallback: React.ReactNode;
}) => {
  const [ready, setReady] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!ready) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Lazy load wrapper with retry logic
export const lazyWithRetry = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      // Retry once after a short delay
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        return await factory();
      } catch {
        // Return a fallback component on failure
        return {
          default: (() => null) as unknown as T,
        };
      }
    }
  });
};

// Pre-loaded 3D scene components with retry logic
export const LazyScene3D = lazyWithRetry(() => import("./Scene3D"));
export const LazyHeroSceneContent = lazyWithRetry(() => import("./HeroScene"));
export const LazyPortfolioSceneContent = lazyWithRetry(() => import("./PortfolioScene"));
export const LazyContactSceneContent = lazyWithRetry(() => import("./ContactScene"));
export const LazyServicesScene = lazyWithRetry(() => import("./ServicesScene"));
export const LazyGlobe3D = lazyWithRetry(() => import("./Globe3D"));

export { Scene3DFallback, DelayedLoader };
