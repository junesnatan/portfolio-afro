import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { TechTerminal } from '../Hub/TechTerminal';
import { TerracottaPot, CarvedTotem } from '../Environment/AfricanScenery';
import { PROJECTS_DATA } from '@/database/data';

interface ProjectDistrictProps {
  position?: [number, number, number];
}

export const ProjectDistrict: React.FC<ProjectDistrictProps> = ({
  position = [0, 0, -45],
}) => {
  const playerPosition = useGameStore((s) => s.player.position);
  const setCurrentZone = useGameStore((s) => s.setCurrentZone);
  const hasTriggeredZone = useRef(false);

  const diamondRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    if (distSq < 400.0 && !hasTriggeredZone.current) {
      hasTriggeredZone.current = true;
      setCurrentZone('projectdistrict');
    } else if (distSq >= 400.0) {
      hasTriggeredZone.current = false;
    }

    if (diamondRef.current) {
      diamondRef.current.rotation.y += delta * 1.0;
      diamondRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Broad District Floor with Physical Colliders */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[20, 0.5, 14]} position={[0, -0.5, 0]} />
        {/* Perimeter North Wall */}
        <CuboidCollider args={[20, 3.5, 0.5]} position={[0, 3.5, -14]} />
      </RigidBody>

      {/* Main Terracotta Floor Surface */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[40, 0.1, 28]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Warm Sand Plaza Ribbon */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[38, 0.04, 24]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Central Ochre Walkway Spine */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 0.4]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 1. AGRI-PULSE SECTOR (WEST - SAVANNA & AGRI-TECH)        */}
      {/* ======================================================== */}
      <group position={[-12, 0, 0]}>
        {/* Terrace Platform */}
        <mesh position={[0, 0.08, 0]} receiveShadow>
          <cylinderGeometry args={[5.0, 5.5, 0.16, 24]} />
          <meshStandardMaterial color="#2A9D8F" roughness={0.7} />
        </mesh>
        {/* Terracotta Border Ring */}
        <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.8, 5.1, 32]} />
          <meshStandardMaterial color="#D95D39" roughness={0.6} />
        </mesh>
        {/* Wooden Observation Mast */}
        <mesh position={[0, 2.5, -3.5]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 5.0, 8]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.9} />
        </mesh>
        <mesh position={[0, 5.0, -3.5]} castShadow>
          <coneGeometry args={[0.6, 0.8, 4]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.6} />
        </mesh>

        {/* Interactive Artisan Terminal for Agri-Pulse */}
        <TechTerminal position={[0, 0.16, 1.8]} project={PROJECTS_DATA[0]} />
        <TerracottaPot position={[-3.5, 0.16, 0]} scale={1.0} />
      </group>

      {/* ======================================================== */}
      {/* 2. LUMINA LUXURY SECTOR (CENTER - HAUTE CRÉATION)        */}
      {/* ======================================================== */}
      <group position={[0, 0, -4]}>
        {/* Terracotta & Gold Atelier Podium */}
        <mesh position={[0, 0.12, 0]} receiveShadow>
          <cylinderGeometry args={[4.5, 5.0, 0.24, 32]} />
          <meshStandardMaterial color="#D95D39" roughness={0.75} />
        </mesh>
        {/* Golden Paver Top */}
        <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.1, 4.35, 32]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.5} />
        </mesh>
        {/* Floating Carved Gold / Amber Luxury Diamond */}
        <mesh ref={diamondRef} position={[0, 3.0, 0]} castShadow>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#E9C46A"
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>

        {/* Interactive Artisan Terminal for Lumina */}
        <TechTerminal position={[0, 0.24, 2.2]} project={PROJECTS_DATA[1]} />
        <TerracottaPot position={[-3.0, 0.24, 1.0]} scale={0.9} />
        <TerracottaPot position={[3.0, 0.24, 1.0]} scale={0.9} />
      </group>

      {/* ======================================================== */}
      {/* 3. VELOCITY MOBILITY SECTOR (EAST - LOGISTIQUE MODERNE)  */}
      {/* ======================================================== */}
      <group position={[12, 0, 0]}>
        {/* Terracotta Platform */}
        <mesh position={[0, 0.08, 0]} receiveShadow>
          <cylinderGeometry args={[5.0, 5.5, 0.16, 24]} />
          <meshStandardMaterial color="#E07A5F" roughness={0.75} />
        </mesh>
        {/* Sandstone Pavers */}
        <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.8, 5.1, 32]} />
          <meshStandardMaterial color="#FAF0CA" roughness={0.6} />
        </mesh>
        {/* Carved Totem Posts */}
        <CarvedTotem position={[-2.5, 0.16, -3.0]} height={3.2} />
        <CarvedTotem position={[2.5, 0.16, -3.0]} height={3.2} />

        {/* Interactive Artisan Terminal for Velocity */}
        <TechTerminal position={[0, 0.16, 1.8]} project={PROJECTS_DATA[2]} />
      </group>

      {/* Back Boundary Wall Details */}
      <mesh position={[0, 1.8, -13.8]} castShadow receiveShadow>
        <boxGeometry args={[39.5, 3.6, 0.5]} />
        <meshStandardMaterial color="#C86D51" roughness={0.88} />
      </mesh>
    </group>
  );
};
