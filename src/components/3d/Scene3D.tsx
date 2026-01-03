import { Canvas } from "@react-three/fiber";
import { Suspense, ReactNode } from "react";
import { Preload } from "@react-three/drei";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

const Scene3D = ({ 
  children, 
  className = "", 
  cameraPosition = [0, 0, 5] 
}: Scene3DProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 75 }}
        dpr={[1, 1.5]} // Performance: limit pixel ratio
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
