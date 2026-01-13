import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Physics-inspired floating object with spring dynamics
interface PhysicsObjectProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  mass?: number;
  damping?: number;
  stiffness?: number;
  geometry?: "sphere" | "box" | "icosahedron" | "torus" | "octahedron";
}

export const PhysicsFloatingObject = ({
  position,
  scale = 1,
  color = "#00E5FF",
  mass = 1,
  damping = 0.3,
  stiffness = 0.02,
  geometry = "icosahedron",
}: PhysicsObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetRef = useRef(new THREE.Vector3(...position));
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Spring physics simulation
      const displacement = targetRef.current.clone().sub(meshRef.current.position);
      const springForce = displacement.multiplyScalar(stiffness / mass);
      
      // Add floating motion
      const floatOffset = new THREE.Vector3(
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1,
        Math.sin(state.clock.elapsedTime * 0.3 + position[1]) * 0.15,
        Math.cos(state.clock.elapsedTime * 0.4 + position[2]) * 0.08
      );
      
      // Apply forces
      velocityRef.current.add(springForce);
      velocityRef.current.add(floatOffset.multiplyScalar(0.01));
      velocityRef.current.multiplyScalar(1 - damping);
      
      // Update position
      meshRef.current.position.add(velocityRef.current);
      
      // Rotation based on velocity
      meshRef.current.rotation.x += velocityRef.current.y * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += velocityRef.current.x * 0.3;
      
      // Scale on hover with spring effect
      const targetScale = hovered ? scale * 1.3 : scale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const handlePointerEnter = useCallback(() => setHovered(true), []);
  const handlePointerLeave = useCallback(() => setHovered(false), []);

  const geometryElement = useMemo(() => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "box":
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6, 0]} />;
      default:
        return <icosahedronGeometry args={[0.5, 1]} />;
    }
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {geometryElement}
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.2}
        roughness={0.1}
        distort={hovered ? 0.5 : 0.2}
        speed={2}
        emissive={color}
        emissiveIntensity={hovered ? 0.3 : 0.1}
      />
    </mesh>
  );
};

// Gravity-affected bouncing particles
interface GravityParticleProps {
  startPosition: [number, number, number];
  color?: string;
  size?: number;
}

export const GravityParticle = ({
  startPosition,
  color = "#00E5FF",
  size = 0.1,
}: GravityParticleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    Math.random() * 0.05,
    (Math.random() - 0.5) * 0.02
  ));
  const gravity = -0.001;
  const bounceEnergy = 0.7;
  const groundLevel = -3;

  useFrame(() => {
    if (meshRef.current) {
      // Apply gravity
      velocityRef.current.y += gravity;
      
      // Update position
      meshRef.current.position.add(velocityRef.current);
      
      // Bounce off ground
      if (meshRef.current.position.y < groundLevel) {
        meshRef.current.position.y = groundLevel;
        velocityRef.current.y = Math.abs(velocityRef.current.y) * bounceEnergy;
        velocityRef.current.x *= 0.9;
        velocityRef.current.z *= 0.9;
      }
      
      // Reset if too slow
      if (Math.abs(velocityRef.current.y) < 0.001 && meshRef.current.position.y <= groundLevel + 0.01) {
        meshRef.current.position.set(...startPosition);
        velocityRef.current.set(
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.05 + 0.02,
          (Math.random() - 0.5) * 0.02
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} position={startPosition}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

// Orbital physics system
interface OrbitalSystemProps {
  center?: [number, number, number];
  orbitRadius?: number;
  count?: number;
  speed?: number;
}

export const OrbitalSystem = ({
  center = [0, 0, 0],
  orbitRadius = 2,
  count = 6,
  speed = 0.5,
}: OrbitalSystemProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const objects = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: orbitRadius + (Math.random() - 0.5) * 0.5,
      yOffset: (Math.random() - 0.5) * 0.5,
      speed: speed * (0.8 + Math.random() * 0.4),
      size: 0.1 + Math.random() * 0.15,
      color: `hsl(${187 + Math.random() * 20}, 100%, ${50 + Math.random() * 20}%)`,
    }));
  }, [count, orbitRadius, speed]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const obj = objects[i];
        const angle = obj.angle + state.clock.elapsedTime * obj.speed;
        child.position.x = Math.cos(angle) * obj.radius;
        child.position.z = Math.sin(angle) * obj.radius;
        child.position.y = Math.sin(angle * 2) * obj.yOffset;
        child.rotation.x = state.clock.elapsedTime * 0.5;
        child.rotation.y = state.clock.elapsedTime * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef} position={center}>
      {objects.map((obj, i) => (
        <mesh key={i} scale={obj.size}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={obj.color}
            emissive={obj.color}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Magnetic field visualization
interface MagneticFieldProps {
  position?: [number, number, number];
  lineCount?: number;
  strength?: number;
}

export const MagneticField = ({
  position = [0, 0, 0],
  lineCount = 8,
  strength = 1,
}: MagneticFieldProps) => {
  const linesRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => {
      const angle = (i / lineCount) * Math.PI * 2;
      return {
        startAngle: angle,
        color: `hsl(${187 + i * 3}, 100%, 50%)`,
      };
    });
  }, [lineCount]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1 * strength;
    }
  });

  return (
    <group ref={linesRef} position={position}>
      {lines.map((line, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh rotation={[0, line.startAngle, 0]} position={[1.5, 0, 0]}>
            <torusGeometry args={[0.3, 0.02, 8, 32, Math.PI]} />
            <meshBasicMaterial color={line.color} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Wave simulation
interface WaveFieldProps {
  width?: number;
  depth?: number;
  resolution?: number;
  amplitude?: number;
  frequency?: number;
}

export const WaveField = ({
  width = 10,
  depth = 10,
  resolution = 32,
  amplitude = 0.3,
  frequency = 2,
}: WaveFieldProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const distance = Math.sqrt(x * x + y * y);
        const wave = Math.sin(distance * frequency - state.clock.elapsedTime * 2) * amplitude;
        positions.setZ(i, wave * (1 - distance / (width / 2)));
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[width, depth, resolution, resolution]} />
      <meshStandardMaterial
        color="#00E5FF"
        transparent
        opacity={0.3}
        wireframe
        emissive="#00E5FF"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};
