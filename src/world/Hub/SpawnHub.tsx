import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { InteractiveDoor } from './InteractiveDoor';
import { TechTerminal } from './TechTerminal';
import { TerracottaPot, CarvedTotem } from '../Environment/AfricanScenery';
import { PROJECTS_DATA } from '@/database/data';

export const SpawnHub: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* ======================================================== */}
      {/* 1. FLOOR & ENVIRONMENT COLLIDERS                         */}
      {/* ======================================================== */}
      <RigidBody type="fixed" colliders={false}>
        {/* Main Floor Collider */}
        <CuboidCollider args={[15, 0.5, 15]} position={[0, -0.5, 0]} />

        {/* Boundary Walls & Railings to prevent falling */}
        {/* South Wall (behind player spawn) */}
        <CuboidCollider args={[15, 2.5, 0.5]} position={[0, 2.5, 12]} />
        {/* West Wall */}
        <CuboidCollider args={[0.5, 2.5, 15]} position={[-12, 2.5, 0]} />
        {/* East Wall */}
        <CuboidCollider args={[0.5, 2.5, 15]} position={[12, 2.5, 0]} />
        {/* North Wall Left Section */}
        <CuboidCollider args={[4.5, 2.5, 0.5]} position={[-7.5, 2.5, -8]} />
        {/* North Wall Right Section */}
        <CuboidCollider args={[4.5, 2.5, 0.5]} position={[7.5, 2.5, -8]} />
      </RigidBody>

      {/* ======================================================== */}
      {/* 2. ARTISAN COURTYARD FLOOR (CLAY & WARM STONE)          */}
      {/* ======================================================== */}
      {/* Main Terracotta Base Slab */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[24, 0.1, 24]} />
        <meshStandardMaterial color="#B85D3B" roughness={0.85} />
      </mesh>

      {/* Inner Circular Courtyard (Warm Sandstone Pavers) */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[7.8, 8.2, 0.08, 32]} />
        <meshStandardMaterial color="#E8D5B5" roughness={0.8} />
      </mesh>

      {/* Outer Terracotta Inlay Ring */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.4, 7.6, 48]} />
        <meshStandardMaterial color="#D95D39" roughness={0.7} />
      </mesh>

      {/* Inner Golden Ochre Ring */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.35, 48]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>

      {/* Central Courtyard Sun Emblem (Stylized African Compass) */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 16]} />
        <meshStandardMaterial color="#E07A5F" roughness={0.7} />
      </mesh>

      {/* Spawn Welcoming Marker at Character Start */}
      <mesh position={[0, 0.065, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.05, 32]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.5} />
      </mesh>

      {/* ======================================================== */}
      {/* 3. PERGOLA WOODEN TIMBER BEAMS (NATURAL SHADE)           */}
      {/* ======================================================== */}
      {/* 4 Robust Teak Corner Pillars */}
      {[
        [-10, 0, 10],
        [10, 0, 10],
        [-10, 0, -6],
        [10, 0, -6],
      ].map(([x, y, z], idx) => (
        <group key={`courtyard-pillar-${idx}`} position={[x, y, z]}>
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider args={[0.45, 3.0, 0.45]} position={[0, 3.0, 0]} />
          </RigidBody>
          {/* Wood Pillar Body */}
          <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 6.0, 0.9]} />
            <meshStandardMaterial color="#4A2E1B" roughness={0.9} />
          </mesh>
          {/* Carved Terracotta Base Plinth */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.3, 0.8, 1.3]} />
            <meshStandardMaterial color="#D95D39" roughness={0.8} />
          </mesh>
          {/* Decorative Ochre Carving Ring */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <boxGeometry args={[0.95, 0.25, 0.95]} />
            <meshStandardMaterial color="#E9C46A" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Overhead Timber Crossbeams */}
      <mesh position={[0, 5.9, 10]} castShadow>
        <boxGeometry args={[20.8, 0.35, 0.5]} />
        <meshStandardMaterial color="#3D2619" roughness={0.9} />
      </mesh>
      <mesh position={[0, 5.9, -6]} castShadow>
        <boxGeometry args={[20.8, 0.35, 0.5]} />
        <meshStandardMaterial color="#3D2619" roughness={0.9} />
      </mesh>
      <mesh position={[-10, 6.1, 2]} castShadow>
        <boxGeometry args={[0.5, 0.35, 16.5]} />
        <meshStandardMaterial color="#3D2619" roughness={0.9} />
      </mesh>
      <mesh position={[10, 6.1, 2]} castShadow>
        <boxGeometry args={[0.5, 0.35, 16.5]} />
        <meshStandardMaterial color="#3D2619" roughness={0.9} />
      </mesh>

      {/* Pergola Slats for dappled sunlight */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={`slat-${i}`} position={[x, 6.3, 2]} castShadow>
          <boxGeometry args={[0.18, 0.2, 16]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.9} />
        </mesh>
      ))}

      {/* Decorative Woven Shade Fabric Canvas */}
      <mesh position={[0, 6.2, 2]} rotation={[0.02, 0, 0]}>
        <planeGeometry args={[10, 12]} />
        <meshStandardMaterial
          color="#FAF0CA"
          roughness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Courtyard Low Adobe Walls */}
      <mesh position={[-11, 0.5, 2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1.0, 14]} />
        <meshStandardMaterial color="#C86D51" roughness={0.85} />
      </mesh>
      <mesh position={[11, 0.5, 2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1.0, 14]} />
        <meshStandardMaterial color="#C86D51" roughness={0.85} />
      </mesh>

      {/* Clay Pottery & Entrance Totems */}
      <TerracottaPot position={[-9, 0, 9]} scale={1.2} />
      <TerracottaPot position={[9, 0, 9]} scale={1.1} />
      <TerracottaPot position={[-10.2, 1.0, 1]} scale={0.8} />
      <TerracottaPot position={[10.2, 1.0, 1]} scale={0.8} />
      <CarvedTotem position={[-8, 0, -5.5]} height={3.2} />
      <CarvedTotem position={[8, 0, -5.5]} height={3.2} />

      {/* ======================================================== */}
      {/* 4. INTERACTIVE HUB ELEMENTS (ARTISAN WORKSTATIONS)       */}
      {/* ======================================================== */}
      {/* Sculpted Wooden North Portal Gate */}
      <InteractiveDoor position={[0, 0, -8]} />

      {/* Kiosk 1: Agri-Pulse (Full-Stack & IoT Rurale) */}
      <TechTerminal
        position={[-4.5, 0, -2.5]}
        rotation={[0, Math.PI / 4, 0]}
        project={PROJECTS_DATA[0]}
      />

      {/* Kiosk 2: Lumina Luxury (Creative Dev & 3D Haute Couture) */}
      <TechTerminal
        position={[4.5, 0, -2.5]}
        rotation={[0, -Math.PI / 4, 0]}
        project={PROJECTS_DATA[1]}
      />
    </group>
  );
};
