import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function OrbitalRings({ hovered = false }) {
  const group = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.z = time * 0.05;
      group.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }
  });

  const ringOpacity = hovered ? 0.25 : 0.12;

  return (
    <group ref={group}>
      {/* Main large ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.003, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={ringOpacity} />
      </mesh>

      {/* Second ring — tilted */}
      <mesh rotation={[Math.PI / 1.8, 0.4, 0.3]}>
        <torusGeometry args={[3.2, 0.002, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={ringOpacity * 0.7} />
      </mesh>

      {/* Third ring — wider */}
      <mesh rotation={[Math.PI / 3, -0.2, 0.8]}>
        <torusGeometry args={[3.6, 0.002, 16, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={ringOpacity * 0.5} />
      </mesh>

      {/* Inner tight ring */}
      <mesh rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[2.0, 0.004, 16, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={ringOpacity * 0.8} />
      </mesh>
    </group>
  );
}
