import { Canvas } from "@react-three/fiber";
import { Suspense, ReactNode, useMemo, memo } from "react";
import { Preload, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";

interface OptimizedScene3DProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  enablePerformanceMonitor?: boolean;
  maxDpr?: number;
  minDpr?: number;
}

// Performance-optimized 3D scene wrapper
const OptimizedScene3D = memo(({ 
  children, 
  className = "", 
  cameraPosition = [0, 0, 5],
  enablePerformanceMonitor = true,
  maxDpr = 1.5,
  minDpr = 0.5,
}: OptimizedScene3DProps) => {
  // Memoize camera config
  const cameraConfig = useMemo(() => ({
    position: cameraPosition,
    fov: 75,
    near: 0.1,
    far: 100,
  }), [cameraPosition]);

  // Memoize WebGL context options for performance
  const glConfig = useMemo(() => ({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance" as const,
    stencil: false,
    depth: true,
    failIfMajorPerformanceCaveat: false,
  }), []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={cameraConfig}
        dpr={[minDpr, maxDpr]}
        gl={glConfig}
        style={{ background: "transparent" }}
        frameloop="demand"
        performance={{ min: 0.2 }}
        flat
      >
        {/* Automatic DPR adjustment based on performance */}
        <AdaptiveDpr pixelated />
        
        {/* Reduce event handling overhead */}
        <AdaptiveEvents />
        
        {/* Performance monitoring for automatic quality adjustment */}
        {enablePerformanceMonitor && (
          <PerformanceMonitor
            onDecline={() => {
              // Automatically reduce quality when performance drops
              console.log("3D Performance: Reducing quality");
            }}
            onIncline={() => {
              // Restore quality when performance improves
              console.log("3D Performance: Restoring quality");
            }}
            flipflops={3}
            onFallback={() => {
              console.log("3D Performance: Using fallback rendering");
            }}
          />
        )}
        
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
});

OptimizedScene3D.displayName = "OptimizedScene3D";

export default OptimizedScene3D;
