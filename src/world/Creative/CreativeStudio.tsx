import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { PROJECTS_DATA } from '@/database/data';
import { TerracottaPot, CarvedTotem } from '../Environment/AfricanScenery';

interface CreativeStudioProps {
  position?: [number, number, number];
}

export const CreativeStudio: React.FC<CreativeStudioProps> = ({
  position = [25, 0, -10],
}) => {
  const playerPosition = useGameStore((s) => s.player.position);
  const setCurrentZone = useGameStore((s) => s.setCurrentZone);
  const openProjectModal = useUIStore((s) => s.openProjectModal);
  const setNearbyInteractable = useUIStore((s) => s.setNearbyInteractable);

  const kromaProject =
    PROJECTS_DATA.find((p) => p.id === 'kroma-identity') || PROJECTS_DATA[0];
  const artPrismRef = useRef<THREE.Mesh>(null);
  const hasTriggeredZone = useRef(false);

  useFrame((_, delta) => {
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    if (distSq < 169.0 && !hasTriggeredZone.current) {
      hasTriggeredZone.current = true;
      setCurrentZone('creativestudio');
    } else if (distSq >= 169.0) {
      hasTriggeredZone.current = false;
    }

    if (distSq < 9.0) {
      setNearbyInteractable({
        id: 'creative-kroma-showcase',
        type: 'project',
        position: [position[0], position[1] + 1, position[2]],
        activationRadius: 3.0,
        label: `[E] CONTEMPLER : ${kromaProject.title}`,
        dataId: kromaProject.id,
      });
    }

    if (artPrismRef.current) {
      artPrismRef.current.rotation.y += delta * 0.7;
      artPrismRef.current.rotation.z += delta * 0.4;
      artPrismRef.current.position.y =
        2.5 + Math.sin(Date.now() * 0.0025) * 0.12;
    }
  });

  return (
    <group position={position}>
      {/* Floor & Boundary Colliders */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[11, 0.5, 9]} position={[0, -0.5, 0]} />
        <CuboidCollider args={[11, 3.5, 0.5]} position={[0, 3.5, -9]} />
      </RigidBody>

      {/* Terracotta Floor Platform */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[22, 0.1, 18]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Sandstone Pavers */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <cylinderGeometry args={[7.6, 7.8, 0.04, 32]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Golden Accent Floor Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.2, 7.45, 32]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* WOODEN ART GALLERY FRAMES & POSTERS                      */}
      {/* ======================================================== */}
      {[-6, 0, 6].map((x, i) => (
        <group key={i} position={[x, 3.2, -8.8]}>
          {/* Carved Teak Picture Frame */}
          <mesh castShadow>
            <boxGeometry args={[3.8, 4.8, 0.2]} />
            <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
          </mesh>
          {/* African Graphic Design Canvas / Art Poster */}
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[3.4, 4.4]} />
            <meshStandardMaterial
              color={i === 0 ? '#D95D39' : i === 1 ? '#E9C46A' : '#2A9D8F'}
              roughness={0.7}
            />
          </mesh>
          {/* Inner Accent Border */}
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[3.0, 4.0]} />
            <meshStandardMaterial
              color={i === 1 ? '#264653' : '#FAF0CA'}
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* CENTRAL SCULPTURE & KROMA SHOWCASE                       */}
      {/* ======================================================== */}
      {/* Carved Pedestal */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 1.2, 12]} />
        <meshStandardMaterial color="#3D2619" roughness={0.88} />
      </mesh>
      {/* Terracotta Top Cap */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.06, 16]} />
        <meshStandardMaterial color="#D95D39" roughness={0.7} />
      </mesh>

      {/* Rotating Prismatic Amber / Ochre Gem */}
      <mesh
        ref={artPrismRef}
        position={[0, 2.5, 0]}
        onClick={() => openProjectModal(kromaProject)}
        castShadow
      >
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#E9C46A"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Scenery details */}
      <TerracottaPot position={[-9.5, 0, 4]} scale={1.2} />
      <CarvedTotem position={[9.5, 0, 4]} height={3.5} />
    </group>
  );
};
