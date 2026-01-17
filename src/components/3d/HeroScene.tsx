import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  FloatingIcosahedron,
  FloatingTorus,
  FloatingOctahedron,
  ParticleField,
} from "./FloatingGeometry";

interface MouseFollowerProps {
  mousePosition: { x: number; y: number };
}

const MouseFollower = ({ mousePosition }: MouseFollowerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const x = (mousePosition.x * viewport.width) / 2;
      const y = (mousePosition.y * viewport.height) / 2;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        x * 0.3,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        y * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingIcosahedron 
        position={[0, 0, 0]} 
        scale={0.8} 
        color="#00E5FF" 
        distort={0.4}
      />
    </group>
  );
};

interface HeroSceneContentProps {
  mousePosition: { x: number; y: number };
}

const HeroSceneContent = ({ mousePosition }: HeroSceneContentProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#00E5FF" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#0097A7" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Particle field */}
      <ParticleField count={150} />

      {/* Mouse-following main geometry */}
      <MouseFollower mousePosition={mousePosition} />

      {/* Floating geometric shapes */}
      <group ref={groupRef}>
        <FloatingTorus position={[-4, 2, -3]} scale={0.5} color="#0097A7" speed={0.8} />
        <FloatingTorus position={[4, -2, -4]} scale={0.4} color="#00BCD4" speed={1.2} />
        <FloatingOctahedron position={[-3, -1.5, -2]} scale={0.6} color="#00E5FF" speed={0.6} />
        <FloatingOctahedron position={[3, 1.5, -3]} scale={0.5} color="#26C6DA" speed={1} />
        <FloatingIcosahedron position={[5, 0, -5]} scale={0.4} color="#00ACC1" speed={0.7} distort={0.2} />
        <FloatingIcosahedron position={[-5, 1, -4]} scale={0.35} color="#00E5FF" speed={0.9} distort={0.3} />
      </group>

      {/* Simple additional lighting for reflections - no external HDR fetch */}
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#00E5FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.2} color="#0097A7" />
    </>
  );
};

export default HeroSceneContent;
