import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Particles from './Particles';
import OrbitalRings from './OrbitalRings';

export default function InteractiveModel({ scrollProgress = 0, particleCount = 200 }) {
  const groupRef = useRef();
  const solidRef = useRef();
  const wireRef = useRef();
  const innerRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Drag state
  const dragState = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    velocityX: 0,
    velocityY: 0,
    rotationX: 0,
    rotationY: 0,
  });

  // Mouse tracking for smooth follow
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    // Normalized pointer position
    const canvas = e.nativeEvent?.target;
    if (canvas && canvas.getBoundingClientRect) {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.current.x = ((e.nativeEvent.clientX - rect.left) / rect.width) * 2 - 1;
      mouseTarget.current.y = -((e.nativeEvent.clientY - rect.top) / rect.height) * 2 + 1;
    }

    if (dragState.current.isDragging && e.point) {
      const dx = e.point.x - dragState.current.prevX;
      const dy = e.point.y - dragState.current.prevY;
      dragState.current.velocityX = dx * 2.5;
      dragState.current.velocityY = dy * 2.5;
      dragState.current.prevX = e.point.x;
      dragState.current.prevY = e.point.y;
    }
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    dragState.current.isDragging = true;
    if (e.point) {
      dragState.current.prevX = e.point.x;
      dragState.current.prevY = e.point.y;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    dragState.current.isDragging = false;
  }, []);

  // Outer wireframe geometry
  const wireGeom = useMemo(() => new THREE.IcosahedronGeometry(1.6, 1), []);
  // Scattered fragments
  const fragmentGeom = useMemo(() => new THREE.IcosahedronGeometry(0.15, 0), []);

  // Pre-compute fragment positions
  const fragments = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2 + Math.random() * 1.5;
      arr.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const d = dragState.current;

    // Smooth mouse follow (lerp)
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.04;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.04;

    // Auto rotation (slow, cinematic)
    const autoRotY = time * 0.12;
    const autoRotX = Math.sin(time * 0.08) * 0.08;

    // Mouse influence
    const mouseRotY = mouseCurrent.current.x * 0.35;
    const mouseRotX = mouseCurrent.current.y * 0.18;

    // Drag velocity with damping (inertia)
    if (!d.isDragging) {
      d.velocityX *= 0.96;
      d.velocityY *= 0.96;
    }
    d.rotationY += d.velocityX;
    d.rotationX += d.velocityY;

    // Dampen drag rotation back toward zero very slowly (natural return)
    d.rotationY *= 0.999;
    d.rotationX *= 0.999;

    // Combine rotations
    groupRef.current.rotation.y = autoRotY + mouseRotY + d.rotationY;
    groupRef.current.rotation.x = autoRotX + mouseRotX + d.rotationX;

    // === Scroll-based transforms ===
    // Phase 1: Hero — large and centered
    // Phase 2: Moving back
    // Phase 3: Shift to side
    // Phase 4: Fade to minimal
    const sp = scrollProgress;

    const scale = THREE.MathUtils.lerp(1, 0.4, THREE.MathUtils.clamp(sp * 2, 0, 1));
    groupRef.current.scale.setScalar(scale);

    const posZ = THREE.MathUtils.lerp(0, -5, THREE.MathUtils.clamp(sp * 2.5, 0, 1));
    const posX = THREE.MathUtils.lerp(0, 2, THREE.MathUtils.clamp((sp - 0.3) * 3, 0, 1));
    groupRef.current.position.z = posZ;
    groupRef.current.position.x = posX;

    // Gentle floating
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.12;

    // Wireframe animation
    if (wireRef.current) {
      wireRef.current.rotation.y = time * 0.06;
      wireRef.current.rotation.x = time * 0.04;
      // Scroll: wireframe becomes more visible
      wireRef.current.material.opacity = THREE.MathUtils.lerp(
        0.06,
        0.2,
        THREE.MathUtils.clamp((sp - 0.4) * 3, 0, 1)
      );
    }

    // Hover brightness
    if (solidRef.current) {
      const targetEmissive = hovered ? 0.1 : 0.02;
      solidRef.current.material.emissiveIntensity +=
        (targetEmissive - solidRef.current.material.emissiveIntensity) * 0.08;
    }

    // Inner sphere pulse
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.03);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setHovered(false);
      }}
      onPointerEnter={() => setHovered(true)}
    >
      {/* Main solid sculpture — high-detail icosahedron */}
      <mesh ref={solidRef} castShadow>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshStandardMaterial
          color="#c8c8c8"
          metalness={0.97}
          roughness={0.12}
          emissive="#ffffff"
          emissiveIntensity={0.02}
          envMapIntensity={2}
        />
      </mesh>

      {/* Wireframe overlay — slightly larger, slowly counter-rotating */}
      <mesh ref={wireRef} geometry={wireGeom}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Inner dark core sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Scattered wireframe fragments */}
      {fragments.map((frag, i) => (
        <FloatingFragment key={i} fragment={frag} geometry={fragmentGeom} />
      ))}

      {/* Orbital rings */}
      <OrbitalRings hovered={hovered} />

      {/* Particles */}
      <Particles count={particleCount} radius={3.5} />
    </group>
  );
}

function FloatingFragment({ fragment, geometry }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const { position, speed, offset } = fragment;
    meshRef.current.position.set(
      position[0] + Math.sin(time * speed + offset) * 0.2,
      position[1] + Math.cos(time * speed * 0.7 + offset) * 0.2,
      position[2] + Math.sin(time * speed * 0.5 + offset) * 0.15
    );
    meshRef.current.rotation.x = time * speed * 0.3;
    meshRef.current.rotation.y = time * speed * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={fragment.position}
      rotation={fragment.rotation}
    >
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
    </mesh>
  );
}
