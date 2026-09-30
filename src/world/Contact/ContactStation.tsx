import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { TerracottaPot, CarvedTotem } from '../Environment/AfricanScenery';

interface ContactStationProps {
  position?: [number, number, number];
}

export const ContactStation: React.FC<ContactStationProps> = ({
  position = [20, 0, -35],
}) => {
  const playerPosition = useGameStore((s) => s.player.position);
  const setCurrentZone = useGameStore((s) => s.setCurrentZone);
  const setNearbyInteractable = useUIStore((s) => s.setNearbyInteractable);
  const openContactModal = useUIStore((s) => s.openContactModal);

  const emblemRef = useRef<THREE.Mesh>(null);
  const hasTriggeredZone = useRef(false);

  useFrame((_, delta) => {
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distSq = dx * dx + dz * dz;

    if (distSq < 144.0 && !hasTriggeredZone.current) {
      hasTriggeredZone.current = true;
      setCurrentZone('contact');
    } else if (distSq >= 144.0) {
      hasTriggeredZone.current = false;
    }

    if (distSq < 9.0) {
      setNearbyInteractable({
        id: 'contact-transmission-terminal',
        type: 'contact_station',
        position: [position[0], position[1] + 1, position[2]],
        activationRadius: 3.0,
        label: '[E] REJOINDRE LE DIALOGUE & CONTACTER JUNES',
      });
    }

    if (emblemRef.current) {
      emblemRef.current.rotation.y += delta * 1.2;
      emblemRef.current.position.y =
        4.8 + Math.sin(Date.now() * 0.003) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Floor & Boundary Colliders */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[8, 0.5, 8]} position={[0, -0.5, 0]} />
        <CuboidCollider args={[1.5, 4.0, 1.5]} position={[0, 4.0, 0]} />
      </RigidBody>

      {/* Hexagonal Terracotta Platform Floor */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[7.5, 8.0, 0.1, 6]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Inner Sandstone Circle */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[6.4, 6.6, 0.04, 32]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Ochre Decorative Ring */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.0, 6.2, 32]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* L'ARBRE À PALABRE & TIMBER PAVILION STRUCTURE            */}
      {/* ======================================================== */}
      {/* 6 Carved Perimeter Columns */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * 5.2;
        const z = Math.sin(angle) * 5.2;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 2.2, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.28, 4.4, 8]} />
              <meshStandardMaterial color="#4A2E1B" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.35, 0.45, 0.6, 8]} />
              <meshStandardMaterial color="#D95D39" roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Woven Conical Thatch Roof */}
      <mesh position={[0, 5.8, 0]} castShadow>
        <coneGeometry args={[6.4, 2.6, 8]} />
        <meshStandardMaterial color="#FAF0CA" roughness={0.95} />
      </mesh>

      {/* Wooden Center Post */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 5.0, 8]} />
        <meshStandardMaterial color="#3D2619" roughness={0.9} />
      </mesh>

      {/* Floating Golden Communication Talisman */}
      <mesh ref={emblemRef} position={[0, 4.8, 0]} castShadow>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.35} metalness={0.4} />
      </mesh>

      {/* ======================================================== */}
      {/* ARTISAN DIALOGUE & CONTACT DESK                          */}
      {/* ======================================================== */}
      <group position={[0, 0, 2.4]}>
        <mesh
          position={[0, 0.5, 0]}
          castShadow
          receiveShadow
          onClick={openContactModal}
        >
          <boxGeometry args={[2.0, 1.0, 0.8]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Parchment Display Surface */}
        <mesh
          position={[0, 0.96, 0.05]}
          rotation={[-Math.PI / 6, 0, 0]}
          onClick={openContactModal}
        >
          <planeGeometry args={[1.7, 0.65]} />
          <meshStandardMaterial color="#FAF0CA" roughness={0.7} />
        </mesh>
        {/* Terracotta Decorative Header Bar */}
        <mesh
          position={[0, 1.18, 0.06]}
          rotation={[-Math.PI / 6, 0, 0]}
          onClick={openContactModal}
        >
          <planeGeometry args={[1.6, 0.1]} />
          <meshStandardMaterial color="#D95D39" roughness={0.6} />
        </mesh>
      </group>

      {/* Traditional Pottery & Totem Accents */}
      <TerracottaPot position={[-3.5, 0, -2]} scale={1.2} />
      <TerracottaPot position={[3.5, 0, -2]} scale={1.1} />
      <CarvedTotem position={[0, 0, -5]} height={3.6} />
    </group>
  );
};
