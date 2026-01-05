import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Floating briefcase shape
const FloatingBriefcase = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={position} scale={0.8}>
        {/* Briefcase body */}
        <mesh>
          <boxGeometry args={[1.2, 0.8, 0.4]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.55, 0]}>
          <torusGeometry args={[0.25, 0.05, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#0891b2" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Clasp */}
        <mesh position={[0, 0.1, 0.21]}>
          <boxGeometry args={[0.2, 0.1, 0.02]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

// Rising career arrows
const CareerArrows = () => {
  const arrowsRef = useRef<THREE.Group>(null);
  
  const arrows = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      x: -4 + i * 2,
      delay: i * 0.5,
      speed: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (arrowsRef.current) {
      arrowsRef.current.children.forEach((child, i) => {
        const arrow = child as THREE.Group;
        const time = state.clock.elapsedTime * arrows[i].speed + arrows[i].delay;
        arrow.position.y = -3 + ((time % 6) * 1.2);
        const opacity = Math.sin((time % 6) / 6 * Math.PI);
        arrow.children.forEach((mesh) => {
          ((mesh as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = opacity * 0.6;
        });
      });
    }
  });

  return (
    <group ref={arrowsRef}>
      {arrows.map((arrow, idx) => (
        <group key={idx} position={[arrow.x, -3, -5]}>
          <mesh>
            <coneGeometry args={[0.15, 0.4, 4]} />
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.08, 0.5, 0.08]} />
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Floating skill badges
const SkillBadge = ({ 
  position, 
  color,
  size = 0.3 
}: { 
  position: [number, number, number]; 
  color: string;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[size]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={0.15}
          speed={2}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Network of opportunities
const OpportunityNetwork = () => {
  const networkRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => [
    { pos: [-3, 2, -4] as [number, number, number], size: 0.15 },
    { pos: [3, 1.5, -5] as [number, number, number], size: 0.12 },
    { pos: [-2, -1, -3] as [number, number, number], size: 0.1 },
    { pos: [2, -2, -4] as [number, number, number], size: 0.13 },
    { pos: [0, 2.5, -6] as [number, number, number], size: 0.14 },
    { pos: [-4, 0, -5] as [number, number, number], size: 0.11 },
    { pos: [4, 0.5, -4] as [number, number, number], size: 0.12 },
  ], []);

  const connections = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.4) {
          result.push({ start: nodes[i].pos, end: nodes[j].pos });
        }
      }
    }
    return result;
  }, [nodes]);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    }
  });

  return (
    <group ref={networkRef}>
      {/* Connection lines */}
      {connections.map((conn, idx) => (
        <line key={`line-${idx}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.12} />
        </line>
      ))}
      {/* Nodes */}
      {nodes.map((node, idx) => (
        <mesh key={`node-${idx}`} position={node.pos}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.5} emissive="#06b6d4" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Growth particles rising upward
const GrowthParticles = ({ count = 80 }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 12;
      pos[i3 + 1] = (Math.random() - 0.5) * 10;
      pos[i3 + 2] = -3 - Math.random() * 5;
      vel[i] = 0.01 + Math.random() * 0.02;
    }
    
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += velocities[i];
        
        if (posArray[i3 + 1] > 5) {
          posArray[i3 + 1] = -5;
          posArray[i3] = (Math.random() - 0.5) * 12;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#06b6d4"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const CareersSceneContent = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#06b6d4" />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#a855f7" />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#fbbf24" />
      
      <Stars
        radius={50}
        depth={50}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <group ref={groupRef}>
        <FloatingBriefcase position={[-4, 1.5, -4]} />
        
        <SkillBadge position={[4, 2, -3]} color="#06b6d4" size={0.35} />
        <SkillBadge position={[-3, -1, -5]} color="#a855f7" size={0.28} />
        <SkillBadge position={[3, -1.5, -4]} color="#ec4899" size={0.25} />
        <SkillBadge position={[0, 3, -6]} color="#fbbf24" size={0.3} />
        <SkillBadge position={[-2, 2, -5]} color="#10b981" size={0.22} />
        
        <CareerArrows />
        <OpportunityNetwork />
        <GrowthParticles count={60} />
      </group>
    </>
  );
};

export default CareersSceneContent;
