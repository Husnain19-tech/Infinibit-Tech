import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Floating calculator/document shapes
function FloatingDocument({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Document body */}
        <RoundedBox args={[0.8, 1.1, 0.05]} radius={0.02}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.4} />
        </RoundedBox>
        {/* Document lines */}
        {[-0.2, 0, 0.2].map((y, i) => (
          <mesh key={i} position={[0, y, 0.03]}>
            <boxGeometry args={[0.5, 0.05, 0.01]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.3} />
          </mesh>
        ))}
        {/* Checkmark */}
        <mesh position={[0.25, -0.35, 0.03]}>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// Animated price tags
function PriceTag({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + delay;
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2} rotationIntensity={0.2}>
        {/* Tag body */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 6]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} />
        </mesh>
        {/* Tag hole */}
        <mesh position={[0, 0, 0.03]}>
          <ringGeometry args={[0.03, 0.05, 16]} />
          <meshStandardMaterial color="#0a0a0f" />
        </mesh>
      </Float>
    </group>
  );
}

// Progress steps visualization
function ProgressSteps({ activeStep = 1 }: { activeStep?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const steps = useMemo(() => [
    { x: -1.5, active: activeStep >= 1 },
    { x: -0.5, active: activeStep >= 2 },
    { x: 0.5, active: activeStep >= 3 },
    { x: 1.5, active: activeStep >= 4 },
  ], [activeStep]);

  return (
    <group ref={groupRef} position={[0, 2.5, -2]}>
      {/* Connection line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Step nodes */}
      {steps.map((step, i) => (
        <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.2}>
          <mesh position={[step.x, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color={step.active ? "#00e5ff" : "#1a1a2e"} 
              emissive={step.active ? "#00e5ff" : "#000000"}
              emissiveIntensity={step.active ? 0.6 : 0}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Floating currency symbols
function CurrencySymbols() {
  const groupRef = useRef<THREE.Group>(null);
  const symbolsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.5 + 0.3,
        delay: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const data = symbolsData[i];
        if (data && child instanceof THREE.Mesh) {
          child.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * data.speed + data.delay) * 0.3;
          child.rotation.y = state.clock.elapsedTime * data.speed;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {symbolsData.map((data, i) => (
        <mesh key={i} position={data.position} scale={data.scale}>
          <torusGeometry args={[1, 0.3, 8, 16]} />
          <meshStandardMaterial 
            color="#00e5ff" 
            emissive="#00e5ff" 
            emissiveIntensity={0.2} 
            transparent 
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// Data flow particles
function DataFlow() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleData = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3;
      velocities.push(Math.random() * 0.02 + 0.01);
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += particleData.velocities[i];
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4;
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
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Central glowing orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, 0, -3]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#00e5ff"
          emissive="#0088aa"
          emissiveIntensity={0.3}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function QuoteSceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} intensity={0.4} color="#00e5ff" />
      <pointLight position={[5, -3, 2]} intensity={0.3} color="#00ff88" />

      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />

      <group ref={groupRef}>
        {/* Floating documents */}
        <FloatingDocument position={[-4, 1.5, -1]} rotation={[0, 0.3, 0]} />
        <FloatingDocument position={[4, -1, -2]} rotation={[0, -0.5, 0.1]} />
        <FloatingDocument position={[-3, -2, 0]} rotation={[0.1, 0.8, 0]} />

        {/* Price tags */}
        <PriceTag position={[3, 2, -1]} delay={0} />
        <PriceTag position={[-2, 0.5, 0]} delay={1} />
        <PriceTag position={[2, -1.5, -1.5]} delay={2} />
        <PriceTag position={[-4, -0.5, -1]} delay={3} />

        {/* Progress visualization */}
        <ProgressSteps activeStep={2} />

        {/* Currency symbols */}
        <CurrencySymbols />

        {/* Data flow */}
        <DataFlow />

        {/* Central orb */}
        <CentralOrb />
      </group>
    </>
  );
}
