import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Floating envelope shape
const FloatingEnvelope = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Envelope body */}
        <RoundedBox args={[1.2, 0.8, 0.1]} radius={0.05}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} metalness={0.5} roughness={0.3} />
        </RoundedBox>
        {/* Envelope flap */}
        <mesh position={[0, 0.35, 0.06]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.7, 0.5, 4]} />
          <meshStandardMaterial color="#0891b2" transparent opacity={0.6} metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

// Signal waves emanating outward
const SignalWaves = () => {
  const wavesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (wavesRef.current) {
      wavesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const scale = 1 + ((state.clock.elapsedTime * 0.5 + i * 0.3) % 2);
        mesh.scale.setScalar(scale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - scale / 2) * 0.3;
      });
    }
  });

  return (
    <group ref={wavesRef} position={[3, 0, -3]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.8, 0.85, 32]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

// Floating communication nodes
const CommunicationNode = ({ 
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
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={0.2}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Data stream particles
const DataStream = ({ count = 100 }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start from left side
      pos[i3] = -10 + Math.random() * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 8;
      pos[i3 + 2] = -5 + Math.random() * 3;
      
      vel[i3] = 0.02 + Math.random() * 0.03;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = 0;
    }
    
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        
        // Reset when reaching right side
        if (posArray[i3] > 10) {
          posArray[i3] = -10;
          posArray[i3 + 1] = (Math.random() - 0.5) * 8;
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
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Connection lines
const ConnectionWeb = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const nodes = [
      [-4, 2, -4],
      [4, 1, -3],
      [-3, -2, -5],
      [3, -1, -4],
      [0, 3, -6],
    ];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        result.push({
          start: nodes[i] as [number, number, number],
          end: nodes[j] as [number, number, number],
        });
      }
    }
    return result;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line.start, ...line.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
};

const ContactSceneContent = () => {
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
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#06b6d4" />
      
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
        <FloatingEnvelope position={[-4, 1, -4]} />
        
        <CommunicationNode position={[4, 2, -3]} color="#06b6d4" size={0.4} />
        <CommunicationNode position={[-3, -1, -5]} color="#a855f7" size={0.3} />
        <CommunicationNode position={[3, -2, -4]} color="#ec4899" size={0.25} />
        <CommunicationNode position={[0, 3, -6]} color="#06b6d4" size={0.35} />
        
        <SignalWaves />
        <DataStream count={80} />
        <ConnectionWeb />
      </group>
    </>
  );
};

export default ContactSceneContent;
