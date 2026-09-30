import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientDustProps {
  count?: number;
  areaRadius?: number;
}

export const AmbientDust: React.FC<AmbientDustProps> = ({
  count = 600,
  areaRadius = 45,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and initial velocity offsets
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * areaRadius * 2;
      pos[i3 + 1] = Math.random() * 12 + 0.2; // Height from ground
      pos[i3 + 2] = (Math.random() - 0.5) * areaRadius * 2;

      vel[i3] = (Math.random() - 0.5) * 0.2;
      vel[i3 + 1] = Math.random() * 0.3 + 0.1;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    return [pos, vel];
  }, [count, areaRadius]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Drift upwards
      array[i3 + 1] += velocities[i3 + 1] * delta;
      // Gentle horizontal oscillation
      array[i3] += Math.sin(velocities[i3] * 10 + Date.now() * 0.001) * 0.02;

      // Wrap around height
      if (array[i3 + 1] > 14.0) {
        array[i3 + 1] = 0.2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#E9C46A"
        transparent
        opacity={0.55}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};
