import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

interface LocationMarkerProps {
  position: [number, number, number];
  label: string;
  color?: string;
}

const LocationMarker = ({ position, label, color = "#00E5FF" }: LocationMarkerProps) => {
  const markerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
    }
  });

  return (
    <group position={position}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={0.5} distance={0.3} />
      <Html
        position={[0, 0.1, 0]}
        center
        style={{
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {label}
      </Html>
    </group>
  );
};

// Convert lat/lng to 3D position on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
};

// Office/client locations
const locations = [
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 52.52, lng: 13.405, label: "Berlin" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
];

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
}

const ConnectionLine = ({ start, end }: ConnectionLineProps) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = startVec.clone().add(endVec).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(1.3); // Curve outward
    
    return new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#00E5FF", transparent: true, opacity: 0.5 }), []);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />
  );
};

const Globe3D = () => {
  const globeRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Create globe texture pattern
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Dark background
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, 512, 256);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
    ctx.lineWidth = 0.5;
    
    // Longitude lines
    for (let i = 0; i <= 24; i++) {
      ctx.beginPath();
      ctx.moveTo((512 / 24) * i, 0);
      ctx.lineTo((512 / 24) * i, 256);
      ctx.stroke();
    }
    
    // Latitude lines
    for (let i = 0; i <= 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (256 / 12) * i);
      ctx.lineTo(512, (256 / 12) * i);
      ctx.stroke();
    }
    
    // Add some land masses (simplified)
    ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
    // North America
    ctx.beginPath();
    ctx.ellipse(100, 80, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    // Europe
    ctx.beginPath();
    ctx.ellipse(280, 70, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Asia
    ctx.beginPath();
    ctx.ellipse(380, 80, 60, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(280, 140, 25, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // South America
    ctx.beginPath();
    ctx.ellipse(140, 170, 20, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    // Australia
    ctx.beginPath();
    ctx.ellipse(430, 180, 25, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (atmosphereRef.current) {
      const material = atmosphereRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
      }
    }
  });

  // Create connection lines between some locations
  const connections = useMemo(() => {
    const pairs = [
      [0, 1], // London - New York
      [0, 6], // London - Berlin
      [1, 7], // New York - San Francisco
      [2, 3], // Tokyo - Singapore
      [3, 4], // Singapore - Dubai
      [4, 0], // Dubai - London
      [5, 2], // Sydney - Tokyo
    ];
    return pairs.map(([i, j]) => ({
      start: latLngToVector3(locations[i].lat, locations[i].lng, 1),
      end: latLngToVector3(locations[j].lat, locations[j].lng, 1),
    }));
  }, []);

  return (
    <group ref={globeRef}>
      {/* Main globe */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          map={gridTexture}
          transparent
          opacity={0.9}
          emissive="#00E5FF"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[1.05, 64, 64]}>
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            time: { value: 0 },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform float time;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              vec3 color = vec3(0.0, 0.9, 1.0);
              float pulse = 0.8 + sin(time * 2.0) * 0.2;
              gl_FragColor = vec4(color, intensity * 0.5 * pulse);
            }
          `}
        />
      </Sphere>

      {/* Location markers */}
      {locations.map((loc, index) => (
        <LocationMarker
          key={index}
          position={latLngToVector3(loc.lat, loc.lng, 1.02)}
          label={loc.label}
        />
      ))}

      {/* Connection lines */}
      {connections.map((conn, index) => (
        <ConnectionLine key={index} start={conn.start} end={conn.end} />
      ))}
    </group>
  );
};

export default Globe3D;
