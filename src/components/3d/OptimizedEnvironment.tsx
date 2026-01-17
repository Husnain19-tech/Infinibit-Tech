import { Environment } from "@react-three/drei";
import { memo } from "react";

// Presets that don't require external HDR downloads
// These use built-in lighting which is faster
type LightPreset = "minimal" | "studio" | "ambient";

interface OptimizedEnvironmentProps {
  preset?: LightPreset;
  intensity?: number;
}

/**
 * Optimized environment lighting that avoids external HDR downloads
 * Uses performant built-in lighting instead of fetching .hdr files
 */
const OptimizedEnvironment = memo(({ 
  preset = "ambient",
  intensity = 0.5 
}: OptimizedEnvironmentProps) => {
  // Use built-in presets that don't fetch external files
  // "night" preset is lightweight and works well for dark themes
  return (
    <Environment
      preset="night"
      environmentIntensity={intensity}
      background={false}
    />
  );
});

OptimizedEnvironment.displayName = "OptimizedEnvironment";

/**
 * Simple lighting setup without Environment for maximum performance
 * Use this for pages that don't need reflections
 */
export const SimpleLighting = memo(({ intensity = 0.5 }: { intensity?: number }) => (
  <>
    <ambientLight intensity={0.4 * intensity} />
    <directionalLight 
      position={[10, 10, 5]} 
      intensity={0.6 * intensity} 
      color="#00E5FF" 
    />
    <pointLight 
      position={[-10, -10, -5]} 
      intensity={0.3 * intensity} 
      color="#0097A7" 
    />
  </>
));

SimpleLighting.displayName = "SimpleLighting";

export default OptimizedEnvironment;
