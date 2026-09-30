import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useAudioStore } from '@/stores/useAudioStore';

interface InteractiveDoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const InteractiveDoor: React.FC<InteractiveDoorProps> = ({
  position,
  rotation = [0, 0, 0],
}) => {
  const leftPanelRef = useRef<THREE.Group>(null);
  const rightPanelRef = useRef<THREE.Group>(null);
  const playerPosition = useGameStore((s) => s.player.position);
  const playPortalOpen = useAudioStore((s) => s.playPortalOpen);

  const [isOpen, setIsOpen] = useState(false);
  const currentOpenProgress = useRef(0); // 0 = closed, 1 = fully open

  useFrame((_, delta) => {
    // Check distance between player and carved wooden door
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    const shouldOpen = distSq < 18.0; // Within 4.2 units
    if (shouldOpen !== isOpen) {
      setIsOpen(shouldOpen);
      if (shouldOpen) {
        playPortalOpen();
      }
    }

    // Smoothly slide open the wooden gate
    const targetProgress = isOpen ? 1.0 : 0.0;
    currentOpenProgress.current = THREE.MathUtils.damp(
      currentOpenProgress.current,
      targetProgress,
      5.0,
      delta
    );

    const slideDistance = 1.35 * currentOpenProgress.current;

    if (leftPanelRef.current) {
      leftPanelRef.current.position.x = -0.7 - slideDistance;
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.position.x = 0.7 + slideDistance;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* ======================================================== */}
      {/* 1. SCULPTED WOODEN ARCHWAY & COLLIDERS                   */}
      {/* ======================================================== */}
      <RigidBody type="fixed" colliders={false}>
        {/* Left Post */}
        <CuboidCollider args={[0.3, 2.2, 0.35]} position={[-2.3, 2.2, 0]} />
        <mesh position={[-2.3, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 4.4, 0.7]} />
          <meshStandardMaterial color="#3D2619" roughness={0.88} />
        </mesh>
        {/* Left Post Carved Ochre Accent */}
        <mesh position={[-2.3, 2.2, 0.36]} castShadow>
          <boxGeometry args={[0.4, 3.2, 0.04]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.7} />
        </mesh>

        {/* Right Post */}
        <CuboidCollider args={[0.3, 2.2, 0.35]} position={[2.3, 2.2, 0]} />
        <mesh position={[2.3, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 4.4, 0.7]} />
          <meshStandardMaterial color="#3D2619" roughness={0.88} />
        </mesh>
        {/* Right Post Carved Ochre Accent */}
        <mesh position={[2.3, 2.2, 0.36]} castShadow>
          <boxGeometry args={[0.4, 3.2, 0.04]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.7} />
        </mesh>

        {/* Top Carved Lintel Beam */}
        <CuboidCollider args={[2.6, 0.35, 0.35]} position={[0, 4.2, 0]} />
        <mesh position={[0, 4.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.7, 0.7]} />
          <meshStandardMaterial color="#301C11" roughness={0.9} />
        </mesh>
        {/* Terracotta Top Ridge Cap */}
        <mesh position={[0, 4.6, 0]} castShadow>
          <boxGeometry args={[5.4, 0.15, 0.8]} />
          <meshStandardMaterial color="#D95D39" roughness={0.75} />
        </mesh>
      </RigidBody>

      {/* ======================================================== */}
      {/* 2. DYNAMIC SLIDING CARVED WOODEN SHUTTERS                */}
      {/* ======================================================== */}
      {/* Dynamic Left Shutter */}
      <group ref={leftPanelRef} position={[-0.7, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.35, 3.6, 0.14]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Inlaid Carved Terracotta Diagonal Planks */}
        <mesh position={[0.1, 0, 0.08]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.2, 2.6, 0.02]} />
          <meshStandardMaterial color="#D95D39" roughness={0.7} />
        </mesh>
        {/* Carved Ochre Diamond Handle */}
        <mesh position={[0.45, 0, 0.1]}>
          <boxGeometry args={[0.12, 0.3, 0.05]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.5} />
        </mesh>
      </group>

      {/* Dynamic Right Shutter */}
      <group ref={rightPanelRef} position={[0.7, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.35, 3.6, 0.14]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Inlaid Carved Terracotta Diagonal Planks */}
        <mesh position={[-0.1, 0, 0.08]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.2, 2.6, 0.02]} />
          <meshStandardMaterial color="#D95D39" roughness={0.7} />
        </mesh>
        {/* Carved Ochre Diamond Handle */}
        <mesh position={[-0.45, 0, 0.1]}>
          <boxGeometry args={[0.12, 0.3, 0.05]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.5} />
        </mesh>
      </group>

      {/* Terracotta Stone Threshold Paver */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 1.0]} />
        <meshStandardMaterial
          color="#D95D39"
          roughness={0.7}
        />
      </mesh>
      {/* Golden Welcome Inlay */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.78, 32]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.5} />
      </mesh>
    </group>
  );
};
