import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 200, radius = 4 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius + (Math.random() - 0.5) * 3;
      temp.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.02,
      });
    }
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    particles.forEach((particle, i) => {
      const { position, speed, offset, scale } = particle;
      dummy.position.set(
        position.x + Math.sin(time * speed + offset) * 0.3,
        position.y + Math.cos(time * speed + offset) * 0.3,
        position.z + Math.sin(time * speed * 0.5 + offset) * 0.2
      );
      dummy.scale.setScalar(scale * (1 + Math.sin(time * 2 + offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </instancedMesh>
  );
}
