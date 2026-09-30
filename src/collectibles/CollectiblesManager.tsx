import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { CollectibleData } from '@/types';

interface CollectibleItemProps {
  data: CollectibleData;
}

export const CollectibleItem: React.FC<CollectibleItemProps> = ({ data }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const playerPosition = useGameStore((s) => s.player.position);
  const collectItem = useGameStore((s) => s.collectItem);
  const showNotification = useUIStore((s) => s.showNotification);
  const playSuccess = useAudioStore((s) => s.playSuccess);

  const isCollected = data.collected;

  useFrame((_, delta) => {
    if (isCollected || !meshRef.current) return;

    // Gentle rotation and floating bob
    meshRef.current.rotation.y += delta * 1.5;
    meshRef.current.rotation.x += delta * 0.8;
    meshRef.current.position.y =
      data.position[1] + Math.sin(Date.now() * 0.0035) * 0.1;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }

    // Distance check to player for collection
    const dx = playerPosition[0] - data.position[0];
    const dy = playerPosition[1] - data.position[1];
    const dz = playerPosition[2] - data.position[2];
    const distSq = dx * dx + dy * dy + dz * dz;

    if (distSq < 3.2) {
      // Collect!
      collectItem(data.id);
      playSuccess();
      showNotification(
        `TRÉSOR TROUVÉ : ${data.name.toUpperCase()}`,
        data.secretFact
      );
    }
  });

  if (isCollected) return null;

  return (
    <group position={data.position}>
      {/* Floating Golden Cowrie Shell / Amber Jewel */}
      <mesh ref={meshRef} castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#E9C46A"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Terracotta Orbiting Halo */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#D95D39"
          roughness={0.5}
        />
      </mesh>

      {/* Ground Warm Ochre Projection Ring */}
      <mesh position={[0, -data.position[1] + 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.7, 32]} />
        <meshStandardMaterial
          color="#E9C46A"
          roughness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
};

export const CollectiblesManager: React.FC = () => {
  const collectibles = useGameStore((s) => s.collectibles);

  return (
    <group name="collectibles-system">
      {collectibles.map((col) => (
        <CollectibleItem key={col.id} data={col} />
      ))}
    </group>
  );
};
