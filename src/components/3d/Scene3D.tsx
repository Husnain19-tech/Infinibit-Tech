import { Canvas } from "@react-three/fiber";
import { Suspense, ReactNode, memo, useMemo, useState, useCallback } from "react";
import { Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  enableAdaptive?: boolean;
}

// Error boundary for 3D scene
const Scene3DErrorFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading 3D experience...</p>
    </div>
  </div>
);

const Scene3D = memo(({ 
  children, 
  className = "", 
  cameraPosition = [0, 0, 5],
  enableAdaptive = true,
}: Scene3DProps) => {
  const [hasError, setHasError] = useState(false);

  // Memoize camera config to prevent unnecessary re-renders
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

  // Handle WebGL errors gracefully
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(0x000000, 0);
    
    // Monitor for context loss
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setHasError(true);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      setHasError(false);
    });
  }, []);

  if (hasError) {
    return <Scene3DErrorFallback />;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={cameraConfig}
        dpr={[0.5, 1.5]} // Performance: limit pixel ratio with lower minimum
        gl={glConfig}
        style={{ background: "transparent" }}
        onCreated={handleCreated}
        frameloop="demand" // Only render when needed
        flat // Disable tone mapping for performance
      >
        {/* Automatic DPR and event optimization */}
        {enableAdaptive && (
          <>
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
          </>
        )}
        
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
});

Scene3D.displayName = "Scene3D";

// Import THREE for the onCreated callback
import * as THREE from "three";

export default Scene3D;
