import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { IDENTITY_DATA } from '@/database/data';
import { TerracottaPot } from '../Environment/AfricanScenery';

interface IdentityHubProps {
  position?: [number, number, number];
}

export const IdentityHub: React.FC<IdentityHubProps> = ({
  position = [0, 0, -20],
}) => {
  const talismanRef = useRef<THREE.Mesh>(null);
  const playerPosition = useGameStore((s) => s.player.position);
  const setCurrentZone = useGameStore((s) => s.setCurrentZone);
  const setNearbyInteractable = useUIStore((s) => s.setNearbyInteractable);
  const toggleRecruiterMode = useUIStore((s) => s.toggleRecruiterMode);
  const playInteract = useAudioStore((s) => s.playInteract);

  const hasTriggeredZone = useRef(false);

  useFrame((_, delta) => {
    // Zone proximity check
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    if (distSq < 144.0 && !hasTriggeredZone.current) {
      hasTriggeredZone.current = true;
      setCurrentZone('identity');
    } else if (distSq >= 144.0) {
      hasTriggeredZone.current = false;
    }

    // Interactive console proximity
    const isNearConsole = distSq < 9.0;
    if (isNearConsole) {
      setNearbyInteractable({
        id: 'identity-core-console',
        type: 'terminal',
        position: [position[0], position[1] + 1, position[2]],
        activationRadius: 3.0,
        label: '[E] DÉCOUVRIR LE PARCOURS & DOSSIER DE JUNES',
      });
    }

    // Talisman animation
    if (talismanRef.current) {
      talismanRef.current.rotation.y += delta * 0.9;
      talismanRef.current.rotation.x += delta * 0.4;
      talismanRef.current.position.y =
        2.2 + Math.sin(Date.now() * 0.0025) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. PHYSICAL FLOOR & ROTUNDA PLATFORM                     */}
      {/* ======================================================== */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[10, 0.5, 10]} position={[0, -0.5, 0]} />
        {/* Perimeter decorative colliders */}
        <CuboidCollider args={[0.5, 2.5, 2]} position={[-9, 2.5, 0]} />
        <CuboidCollider args={[0.5, 2.5, 2]} position={[9, 2.5, 0]} />
      </RigidBody>

      {/* Main Circular Rotunda Terracotta Floor */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[9.5, 10, 0.1, 32]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Inner Sandstone Circle */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[7.8, 8.0, 0.06, 32]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Outer Ochre Decorative Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.4, 7.6, 48]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>

      {/* Inner Terracotta Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 4.0, 32]} />
        <meshStandardMaterial color="#D95D39" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. CENTRAL CARVED WOODEN PEDESTAL & TALISMAN             */}
      {/* ======================================================== */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.5, 1.0, 16]} />
        <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
      </mesh>

      {/* Terracotta Top Trim */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.08, 16]} />
        <meshStandardMaterial color="#D95D39" roughness={0.7} />
      </mesh>

      {/* Floating Rotating Golden Sun Talisman */}
      <mesh
        ref={talismanRef}
        position={[0, 2.2, 0]}
        onClick={() => {
          playInteract();
          toggleRecruiterMode(true);
        }}
        castShadow
      >
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#E9C46A"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 3. FOUR CARVED STORYTELLING TOTEMS (STATS)               */}
      {/* ======================================================== */}
      {[
        { pos: [-5, 0, -3], label: IDENTITY_DATA.stats[0].label, val: IDENTITY_DATA.stats[0].value },
        { pos: [5, 0, -3], label: IDENTITY_DATA.stats[1].label, val: IDENTITY_DATA.stats[1].value },
        { pos: [-5, 0, 3], label: IDENTITY_DATA.stats[2].label, val: IDENTITY_DATA.stats[2].value },
        { pos: [5, 0, 3], label: IDENTITY_DATA.stats[3].label, val: IDENTITY_DATA.stats[3].value },
      ].map((item, i) => (
        <group key={i} position={item.pos as [number, number, number]}>
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider args={[0.4, 1.2, 0.4]} position={[0, 1.2, 0]} />
          </RigidBody>
          {/* Wooden Totem Base */}
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 2.4, 0.8]} />
            <meshStandardMaterial color="#3D2619" roughness={0.88} />
          </mesh>
          {/* Terracotta Front Story Plate */}
          <mesh position={[0, 1.4, 0.41]} castShadow>
            <boxGeometry args={[0.6, 1.2, 0.04]} />
            <meshStandardMaterial color="#FAF0CA" roughness={0.7} />
          </mesh>
          {/* Ochre Carved Crown */}
          <mesh position={[0, 2.45, 0]} castShadow>
            <boxGeometry args={[0.9, 0.18, 0.9]} />
            <meshStandardMaterial color="#E9C46A" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Decorative Clay Pottery on Perimeter */}
      <TerracottaPot position={[-7.5, 0, 0]} scale={1.2} />
      <TerracottaPot position={[7.5, 0, 0]} scale={1.2} />
      <TerracottaPot position={[0, 0, -8]} scale={1.1} />
    </group>
  );
};
