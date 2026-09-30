import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { TerracottaPot, CarvedTotem } from '../Environment/AfricanScenery';

interface DevelopmentLabProps {
  position?: [number, number, number];
}

export const DevelopmentLab: React.FC<DevelopmentLabProps> = ({
  position = [-25, 0, -10],
}) => {
  const playerPosition = useGameStore((s) => s.player.position);
  const setCurrentZone = useGameStore((s) => s.setCurrentZone);
  const setNearbyInteractable = useUIStore((s) => s.setNearbyInteractable);
  const toggleRecruiterMode = useUIStore((s) => s.toggleRecruiterMode);

  const rotatingHoloRef = useRef<THREE.Group>(null);
  const hasTriggeredZone = useRef(false);

  useFrame((_, delta) => {
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    if (distSq < 169.0 && !hasTriggeredZone.current) {
      hasTriggeredZone.current = true;
      setCurrentZone('devlab');
    } else if (distSq >= 169.0) {
      hasTriggeredZone.current = false;
    }

    // Near main console
    if (distSq < 9.0) {
      setNearbyInteractable({
        id: 'devlab-skills-console',
        type: 'terminal',
        position: [position[0], position[1] + 1, position[2]],
        activationRadius: 3.0,
        label: '[E] EXPLORER LES TECHNOLOGIES & CODE',
      });
    }

    if (rotatingHoloRef.current) {
      rotatingHoloRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group position={position}>
      {/* Floor Slab with Colliders */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[11, 0.5, 9]} position={[0, -0.5, 0]} />
        {/* Rear Wall Collider */}
        <CuboidCollider args={[11, 3.5, 0.5]} position={[0, 3.5, -9]} />
      </RigidBody>

      {/* Terracotta Floor Platform */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[22, 0.1, 18]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Inner Sand Pavers */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <cylinderGeometry args={[7.6, 7.8, 0.04, 32]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Savanna Green Inlay Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.2, 7.45, 32]} />
        <meshStandardMaterial color="#2A9D8F" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* WOODEN ARTISAN BOOKSHELVES / WORK BENCHES                */}
      {/* ======================================================== */}
      {[-8, -4, 4, 8].map((x, idx) => (
        <group key={`shelf-${idx}`} position={[x, 0, -7.5]}>
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider args={[1.0, 3.0, 0.8]} position={[0, 3.0, 0]} />
          </RigidBody>
          {/* Solid Wooden Shelf Body */}
          <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 6.0, 1.4]} />
            <meshStandardMaterial color="#4A2E1B" roughness={0.9} />
          </mesh>
          {/* Horizontal Wooden Shelves */}
          {[1.2, 2.4, 3.6, 4.8].map((y, lIdx) => (
            <mesh key={lIdx} position={[0, y, 0.4]} castShadow>
              <boxGeometry args={[1.8, 0.12, 0.8]} />
              <meshStandardMaterial color="#3D2619" roughness={0.85} />
            </mesh>
          ))}
          {/* Carved Terracotta Books & Scrolls on Shelves */}
          {[1.5, 2.7, 3.9].map((y, sIdx) => (
            <mesh key={`scroll-${sIdx}`} position={[(sIdx % 2 - 0.5) * 0.6, y, 0.4]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
              <meshStandardMaterial color={sIdx % 2 === 0 ? '#FAF0CA' : '#D95D39'} roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ======================================================== */}
      {/* FLOATING STACK EMBLEMS (WOOD & CLAY FINISH)              */}
      {/* ======================================================== */}
      <group ref={rotatingHoloRef} position={[0, 3.0, 0]}>
        {[
          { label: 'TS', color: '#2A9D8F', angle: 0 },
          { label: 'REACT', color: '#E76F51', angle: (Math.PI * 2) / 5 },
          { label: 'NODE', color: '#264653', angle: (Math.PI * 4) / 5 },
          { label: 'THREE', color: '#E9C46A', angle: (Math.PI * 6) / 5 },
          { label: 'SUPABASE', color: '#F4A261', angle: (Math.PI * 8) / 5 },
        ].map((item, i) => {
          const r = 3.6;
          const x = Math.cos(item.angle) * r;
          const z = Math.sin(item.angle) * r;
          return (
            <mesh key={i} position={[x, 0, z]} castShadow>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Central Interactive Wooden Artisan Desk */}
      <mesh
        position={[0, 0.5, 0]}
        castShadow
        receiveShadow
        onClick={() => toggleRecruiterMode(true)}
      >
        <cylinderGeometry args={[1.4, 1.6, 1.0, 12]} />
        <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
      </mesh>
      {/* Desk Top Terracotta Paver */}
      <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.3, 16]} />
        <meshStandardMaterial color="#D95D39" roughness={0.7} />
      </mesh>

      {/* Scenery details */}
      <TerracottaPot position={[-9.5, 0, 4]} scale={1.1} />
      <CarvedTotem position={[9.5, 0, 4]} height={3.5} />
    </group>
  );
};
