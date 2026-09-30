import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { PROJECTS_DATA } from '@/database/data';
import { ProjectData } from '@/types';

interface TechTerminalProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  project?: ProjectData;
}

export const TechTerminal: React.FC<TechTerminalProps> = ({
  position,
  rotation = [0, 0, 0],
  project = PROJECTS_DATA[0],
}) => {
  const artifactRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const playerPosition = useGameStore((s) => s.player.position);
  const openProjectModal = useUIStore((s) => s.openProjectModal);
  const setNearbyInteractable = useUIStore((s) => s.setNearbyInteractable);
  const playInteract = useAudioStore((s) => s.playInteract);

  const isNearbyRef = useRef(false);

  useFrame((_, delta) => {
    // Distance calculation
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;
    const isNearby = distSq < 9.0; // Within 3 units

    if (isNearby !== isNearbyRef.current) {
      isNearbyRef.current = isNearby;
      if (isNearby) {
        setNearbyInteractable({
          id: `terminal-${project.id}`,
          type: 'terminal',
          position,
          activationRadius: 3.0,
          label: `[E] OUVRIR : ${project.title}`,
          dataId: project.id,
        });
      } else {
        const current = useUIStore.getState().nearbyInteractable;
        if (current?.id === `terminal-${project.id}`) {
          setNearbyInteractable(null);
        }
      }
    }

    // Floating carved talisman rotation
    if (artifactRef.current) {
      artifactRef.current.rotation.y += delta * 1.0;
      artifactRef.current.position.y = 1.85 + Math.sin(Date.now() * 0.003) * 0.06;
    }

    // Gentle pulse ring on ground
    if (pulseRingRef.current) {
      const ringScale = isNearby
        ? 1.0 + Math.sin(Date.now() * 0.006) * 0.06
        : 1.0;
      pulseRingRef.current.scale.set(ringScale, ringScale, ringScale);
    }
  });

  const handleClick = () => {
    playInteract();
    openProjectModal(project);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Physical Artisan Kiosk Station */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.6, 0.75, 0.45]} position={[0, 0.75, 0]} />

        {/* Terracotta Base Plinth */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.65, 0.4, 8]} />
          <meshStandardMaterial color="#D95D39" roughness={0.8} />
        </mesh>

        {/* Sculpted Teak Wood Pedestal Body */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.5, 0.6, 8]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>

        {/* Carved Ochre Geometric Ring */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.08, 12]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.6} />
        </mesh>

        {/* Angled Wooden Drafting Desk Top */}
        <mesh
          position={[0, 1.02, 0]}
          rotation={[-Math.PI / 6, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.95, 0.6, 0.1]} />
          <meshStandardMaterial color="#3D2619" roughness={0.85} />
        </mesh>

        {/* Warm Woven Linen / Canvas Project Tablet Surface */}
        <mesh
          position={[0, 1.05, 0.04]}
          rotation={[-Math.PI / 6, 0, 0]}
          onClick={handleClick}
        >
          <planeGeometry args={[0.82, 0.48]} />
          <meshStandardMaterial
            color="#FAF0CA"
            roughness={0.7}
          />
        </mesh>

        {/* Terracotta Graphic Header Bar on Tablet */}
        <mesh
          position={[0, 1.22, 0.045]}
          rotation={[-Math.PI / 6, 0, 0]}
          onClick={handleClick}
        >
          <planeGeometry args={[0.76, 0.08]} />
          <meshStandardMaterial
            color="#D95D39"
            roughness={0.5}
          />
        </mesh>
      </RigidBody>

      {/* Floating Carved Amber Artifact / Diamond */}
      <mesh
        ref={artifactRef}
        position={[0, 1.85, 0]}
        onClick={handleClick}
        castShadow
      >
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color="#E9C46A"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Ground Terracotta & Ochre Activation Ring */}
      <mesh
        ref={pulseRingRef}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.35, 1.48, 32]} />
        <meshStandardMaterial
          color="#D95D39"
          roughness={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};
