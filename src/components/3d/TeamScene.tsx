import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating orbs that represent team collaboration
const FloatingOrb = ({ 
  position, 
  color, 
  scale = 1,
  speed = 1 
}: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.5 * scale, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Connection lines between orbs (representing collaboration)
const ConnectionLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const linePositions = useMemo(() => {
    const positions: [number, number, number][][] = [];
    const points = [
      [-4, 2, -3],
      [4, 1, -4],
      [0, -2, -5],
      [-3, -1, -6],
      [3, 3, -5],
    ];
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        positions.push([
          points[i] as [number, number, number],
          points[j] as [number, number, number],
        ]);
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {linePositions.map((pair, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...pair[0], ...pair[1]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
};

// Particle cloud
const TeamParticles = ({ count = 200 }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a dome shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const radius = 8 + Math.random() * 4;
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi) - 2;
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 5;
      
      // Cyan to purple gradient
      const t = Math.random();
      cols[i3] = 0.02 + t * 0.4;
      cols[i3 + 1] = 0.7 - t * 0.3;
      cols[i3 + 2] = 0.83 + t * 0.17;
    }
    
    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const TeamSceneContent = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#06b6d4" />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#a855f7" />
      
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <group ref={groupRef}>
        {/* Floating orbs representing team members */}
        <FloatingOrb position={[-4, 2, -3]} color="#06b6d4" scale={0.8} speed={0.8} />
        <FloatingOrb position={[4, 1, -4]} color="#a855f7" scale={1} speed={1.2} />
        <FloatingOrb position={[0, -2, -5]} color="#06b6d4" scale={0.6} speed={1} />
        <FloatingOrb position={[-3, -1, -6]} color="#ec4899" scale={0.7} speed={0.9} />
        <FloatingOrb position={[3, 3, -5]} color="#06b6d4" scale={0.9} speed={1.1} />
        
        <ConnectionLines />
        <TeamParticles count={150} />
      </group>
    </>
  );
};

export default TeamSceneContent;
