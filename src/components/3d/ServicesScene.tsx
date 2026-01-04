import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  distort?: number;
  hovered?: boolean;
}

const FloatingCube = ({ position, color, scale = 1, speed = 1, rotationIntensity = 1, floatIntensity = 1, distort = 0.3, hovered }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
      const targetScale = hovered ? scale * 1.3 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0}
          metalness={0.3}
          roughness={0.2}
          distort={distort}
          speed={2}
        />
      </Box>
    </Float>
  );
};

const FloatingSphere = ({ position, color, scale = 1, speed = 1, rotationIntensity = 1, floatIntensity = 1, distort = 0.4, hovered }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008 * speed;
      const targetScale = hovered ? scale * 1.3 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={rotationIntensity * 0.5} floatIntensity={floatIntensity * 1.2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.2}
          roughness={0.1}
          distort={distort}
          speed={3}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = ({ position, color, scale = 1, speed = 1, rotationIntensity = 1, floatIntensity = 1, hovered }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004 * speed;
      meshRef.current.rotation.z += 0.006 * speed;
      const targetScale = hovered ? scale * 1.3 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={speed * 1.8} rotationIntensity={rotationIntensity * 0.7} floatIntensity={floatIntensity}>
      <Torus ref={meshRef} args={[1, 0.4, 16, 32]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          envMapIntensity={0.8}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Torus>
    </Float>
  );
};

interface MiniParticleFieldProps {
  count?: number;
}

const MiniParticleField = ({ count = 50 }: MiniParticleFieldProps) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00E5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface ServicesSceneContentProps {
  hoveredIndex: number | null;
}

const ServicesSceneContent = ({ hoveredIndex }: ServicesSceneContentProps) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00E5FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0077B6" />
      
      {/* Floating shapes positioned around the edges */}
      <FloatingCube 
        position={[-6, 3, -2]} 
        color="#00E5FF" 
        scale={0.6} 
        speed={0.8}
        hovered={hoveredIndex === 0}
      />
      <FloatingSphere 
        position={[6, -2, -3]} 
        color="#0077B6" 
        scale={0.8} 
        speed={1.2}
        distort={0.5}
        hovered={hoveredIndex === 1}
      />
      <FloatingTorus 
        position={[-5, -3, -1]} 
        color="#00B4D8" 
        scale={0.5} 
        speed={1}
        hovered={hoveredIndex === 2}
      />
      <FloatingCube 
        position={[5, 4, -2]} 
        color="#48CAE4" 
        scale={0.5} 
        speed={0.6}
        hovered={hoveredIndex === 3}
      />
      <FloatingSphere 
        position={[0, 5, -4]} 
        color="#00E5FF" 
        scale={0.4} 
        speed={1.5}
        distort={0.3}
        hovered={hoveredIndex !== null}
      />
      <FloatingTorus 
        position={[7, 1, -3]} 
        color="#0096C7" 
        scale={0.4} 
        speed={0.9}
        hovered={hoveredIndex === 1 || hoveredIndex === 3}
      />
      
      <MiniParticleField count={80} />
      <Environment preset="city" />
    </>
  );
};

interface ServicesSceneProps {
  hoveredIndex: number | null;
}

const ServicesScene = ({ hoveredIndex }: ServicesSceneProps) => {
  return (
    <div className="absolute inset-0 -z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ServicesSceneContent hoveredIndex={hoveredIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ServicesScene;
