import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveModel from './InteractiveModel';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

/* ── Camera that responds to mouse/touch movement ── */
function ResponsiveCamera() {
  const { camera } = useThree();
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
      const clientY = e.touches ? e.touches[0]?.clientY : e.clientY;
      if (clientX !== undefined) {
        mouseTarget.current.x = (clientX / window.innerWidth) * 2 - 1;
        mouseTarget.current.y = -(clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  useFrame(() => {
    // Smooth lerp toward mouse position
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.03;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.03;

    // Subtle camera parallax
    camera.position.x = mouseCurrent.current.x * 0.4;
    camera.position.y = mouseCurrent.current.y * 0.25 + 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Dust motes — very small, slow, ambient ── */
function DustParticles({ count = 50 }) {
  const ref = useRef();
  const dummy = new THREE.Object3D();

  const particles = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 15,
      speed: 0.02 + Math.random() * 0.04,
      offset: Math.random() * 100,
    }))
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    particles.current.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.offset) * 0.5,
        p.y + Math.cos(time * p.speed * 0.7 + p.offset) * 0.3,
        p.z + Math.sin(time * p.speed * 0.5 + p.offset) * 0.4
      );
      dummy.scale.setScalar(0.008 + Math.sin(time + p.offset) * 0.003);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </instancedMesh>
  );
}

export default function HeroScene({ scrollProgress = 0 }) {
  const { pixelRatio, particleCount, isMobile } = useDeviceCapability();

  return (
    <Canvas
      dpr={[1, Math.min(pixelRatio, 2)]}
      camera={{ position: [0, 0.2, 6], fov: 45 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      {/* Camera parallax */}
      <ResponsiveCamera />

      {/* Cinematic lighting */}
      <ambientLight intensity={0.12} />

      {/* Key light — top right */}
      <directionalLight
        position={[5, 6, 5]}
        intensity={0.9}
        color="#ffffff"
      />

      {/* Fill light — left, cooler */}
      <directionalLight
        position={[-4, -1, 4]}
        intensity={0.25}
        color="#cccccc"
      />

      {/* Rim light — behind */}
      <pointLight
        position={[0, 2, -4]}
        intensity={0.6}
        color="#ffffff"
        distance={15}
      />

      {/* Top accent */}
      <pointLight
        position={[0, 5, 2]}
        intensity={0.3}
        color="#ffffff"
        distance={12}
      />

      {/* Environment for metallic reflections */}
      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.4} />
      </Suspense>

      {/* Main interactive sculpture */}
      <Suspense fallback={null}>
        <InteractiveModel
          scrollProgress={scrollProgress}
          particleCount={particleCount}
        />
      </Suspense>

      {/* Ambient dust */}
      {!isMobile && <DustParticles count={40} />}

      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 6, 22]} />
    </Canvas>
  );
}
