import { useEffect, useState, useCallback, useRef } from "react";

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  isLowPerformance: boolean;
  shouldReduceAnimations: boolean;
  shouldDisable3D: boolean;
}

// Hook to monitor and optimize performance
export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false,
    shouldReduceAnimations: false,
    shouldDisable3D: false,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setMetrics(prev => ({
        ...prev,
        shouldReduceAnimations: true,
      }));
      return;
    }

    // FPS monitoring
    let animationFrameId: number;
    
    const measureFPS = () => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      frameTimesRef.current.push(delta);
      
      // Keep last 60 frames for averaging
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      // Calculate average FPS every 30 frames
      if (frameTimesRef.current.length >= 30 && frameTimesRef.current.length % 30 === 0) {
        const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
        const fps = Math.round(1000 / avgFrameTime);
        
        // Get memory if available
        const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize;
        
        setMetrics({
          fps,
          memory: memory ? Math.round(memory / 1048576) : undefined, // Convert to MB
          isLowPerformance: fps < 30,
          shouldReduceAnimations: fps < 45,
          shouldDisable3D: fps < 20,
        });
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return metrics;
};

// Hook to lazy load 3D components
export const useLazy3DLoad = (delay: number = 1000) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Delay initial load for better FCP
    const timer = setTimeout(() => {
      if (isInViewport) {
        setShouldLoad(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isInViewport]);

  const setRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { shouldLoad, setRef };
};

// Hook to detect device capabilities
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    hasWebGL2: false,
    hasGoodGPU: false,
    isMobile: false,
    hasLowMemory: false,
    connectionSpeed: "4g" as "slow-2g" | "2g" | "3g" | "4g",
  });

  useEffect(() => {
    // Check WebGL2 support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    const hasWebGL2 = !!gl;

    // Check GPU capabilities
    let hasGoodGPU = false;
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for dedicated GPU
        hasGoodGPU = !/intel|mesa|swiftshader/i.test(renderer);
      }
    }

    // Check mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check memory
    const hasLowMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory !== undefined && 
      (navigator as unknown as { deviceMemory: number }).deviceMemory < 4;

    // Check connection
    const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection;
    const connectionSpeed = (connection?.effectiveType as "slow-2g" | "2g" | "3g" | "4g") || "4g";

    setCapabilities({
      hasWebGL2,
      hasGoodGPU,
      isMobile,
      hasLowMemory,
      connectionSpeed,
    });
  }, []);

  const shouldUse3D = capabilities.hasWebGL2 && 
    !capabilities.hasLowMemory && 
    capabilities.connectionSpeed !== "slow-2g" &&
    capabilities.connectionSpeed !== "2g";

  const shouldUseHighQuality = capabilities.hasGoodGPU && !capabilities.isMobile;

  return { ...capabilities, shouldUse3D, shouldUseHighQuality };
};

// Image lazy loading with blur placeholder
export const useProgressiveImage = (lowQualitySrc: string, highQualitySrc: string) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
      setIsLoaded(true);
    };
  }, [highQualitySrc]);

  return { src, isLoaded, blur: !isLoaded };
};

// Debounced scroll handler
export const useScrollOptimized = (callback: (scrollY: number) => void, delay: number = 16) => {
  const lastCallRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      
      if (now - lastCallRef.current < delay) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
          callback(window.scrollY);
          lastCallRef.current = now;
        });
        return;
      }

      callback(window.scrollY);
      lastCallRef.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [callback, delay]);
};
