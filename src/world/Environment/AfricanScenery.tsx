import React from 'react';
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier';

// Stylized Cartoon Baobab Tree
export const StylizedBaobab: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0,
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider args={[4.0, 1.4]} position={[0, 4.0, 0]} />
      </RigidBody>

      {/* Massive Rounded Trunk (Warm Earth Brown) */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.8, 6.4, 12]} />
        <meshStandardMaterial color="#5E3821" roughness={0.9} />
      </mesh>

      {/* Base Buttress Roots */}
      <mesh position={[0, 0.6, 0]} receiveShadow>
        <cylinderGeometry args={[1.7, 2.2, 1.4, 8]} />
        <meshStandardMaterial color="#4A2B18" roughness={0.95} />
      </mesh>

      {/* Stylized Sculpted Foliage Canopies (Savanna Greens) */}
      <mesh position={[0, 6.5, 0]} castShadow>
        <sphereGeometry args={[2.4, 12, 12]} />
        <meshStandardMaterial color="#2D6A4F" roughness={0.7} />
      </mesh>
      <mesh position={[1.4, 6.2, 0.8]} castShadow>
        <sphereGeometry args={[1.6, 10, 10]} />
        <meshStandardMaterial color="#40916C" roughness={0.7} />
      </mesh>
      <mesh position={[-1.2, 6.4, -0.6]} castShadow>
        <sphereGeometry args={[1.8, 10, 10]} />
        <meshStandardMaterial color="#52B788" roughness={0.7} />
      </mesh>
    </group>
  );
};

// Stylized Umbrella Acacia Tree
export const StylizedAcacia: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0,
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider args={[3.0, 0.4]} position={[0, 3.0, 0]} />
      </RigidBody>

      {/* Slender curved trunk */}
      <mesh position={[0, 2.6, 0]} rotation={[0.08, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.25, 0.45, 5.2, 8]} />
        <meshStandardMaterial color="#593D28" roughness={0.9} />
      </mesh>

      {/* Flat Umbrella Canopy (Double layers) */}
      <mesh position={[0, 5.2, 0]} castShadow>
        <cylinderGeometry args={[3.2, 3.0, 0.6, 12]} />
        <meshStandardMaterial color="#52B788" roughness={0.8} />
      </mesh>
      <mesh position={[0.4, 5.6, 0.2]} castShadow>
        <cylinderGeometry args={[2.2, 2.0, 0.5, 10]} />
        <meshStandardMaterial color="#74C69D" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Terracotta Clay Pottery / Urn
export const TerracottaPot: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0,
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.9, 12]} />
        <meshStandardMaterial color="#D95D39" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.28, 0.3, 12]} />
        <meshStandardMaterial color="#E07A5F" roughness={0.65} />
      </mesh>
      {/* Decorative Ochre Band */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.1, 12]} />
        <meshStandardMaterial color="#E9C46A" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Carved Wooden Totem Pillar
export const CarvedTotem: React.FC<{ position: [number, number, number]; height?: number }> = ({
  position,
  height = 4.0,
}) => {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.35, height / 2, 0.35]} position={[0, height / 2, 0]} />
      </RigidBody>

      {/* Main Wooden Pole */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, height, 0.7]} />
        <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
      </mesh>

      {/* Geometric relief carvings */}
      {[0.8, 1.8, 2.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0.36]} castShadow>
          <boxGeometry args={[0.5, 0.25, 0.05]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#E07A5F' : '#E9C46A'} roughness={0.7} />
        </mesh>
      ))}
      {[0.8, 1.8, 2.8].map((y, i) => (
        <mesh key={`b-${i}`} position={[0, y, -0.36]} castShadow>
          <boxGeometry args={[0.5, 0.25, 0.05]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#E07A5F' : '#E9C46A'} roughness={0.7} />
        </mesh>
      ))}

      {/* Sculpted Crown Top */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <coneGeometry args={[0.5, 0.6, 4]} />
        <meshStandardMaterial color="#E07A5F" roughness={0.6} />
      </mesh>
    </group>
  );
};

// African Scenery Composer
export const AfricanScenery: React.FC = () => {
  return (
    <group name="african-scenery">
      {/* Majestic Baobab Trees around perimeter */}
      <StylizedBaobab position={[-28, 0, -32]} scale={1.2} />
      <StylizedBaobab position={[30, 0, -30]} scale={1.1} />
      <StylizedBaobab position={[0, 0, -62]} scale={1.3} />
      <StylizedBaobab position={[-32, 0, 15]} scale={1.0} />
      <StylizedBaobab position={[28, 0, 15]} scale={1.05} />

      {/* Stylized Acacia Trees */}
      <StylizedAcacia position={[-16, 0, -22]} scale={0.95} />
      <StylizedAcacia position={[16, 0, -22]} scale={0.9} />
      <StylizedAcacia position={[-18, 0, 4]} scale={1.1} />
      <StylizedAcacia position={[18, 0, 4]} scale={1.0} />

      {/* Terracotta Clay Pots */}
      <TerracottaPot position={[-3.2, 0, -7.5]} scale={1.0} />
      <TerracottaPot position={[3.2, 0, -7.5]} scale={0.9} />
      <TerracottaPot position={[-5.5, 0, -18]} scale={1.2} />
      <TerracottaPot position={[5.5, 0, -18]} scale={1.1} />

      {/* Carved Wooden Totem Pillars at thresholds */}
      <CarvedTotem position={[-3.2, 0, 8]} height={3.6} />
      <CarvedTotem position={[3.2, 0, 8]} height={3.6} />
    </group>
  );
};
