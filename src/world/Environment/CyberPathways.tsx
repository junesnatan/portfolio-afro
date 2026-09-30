import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

export const CyberPathways: React.FC = () => {
  return (
    <group name="african-pathways">
      {/* 1. Hub to Identity Corridor ([0, 0, 0] to [0, 0, -20]) */}
      <group position={[0, 0, -10]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.5, 0.4, 6]} position={[0, -0.4, 0]} />
        </RigidBody>
        {/* Warm Terracotta & Clay Walkway */}
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[5.0, 0.08, 12]} />
          <meshStandardMaterial color="#C86D51" roughness={0.8} />
        </mesh>
        {/* Carved Dark Teak Wooden Border Rails */}
        <mesh position={[-2.4, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 12]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[2.4, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 12]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Golden Ochre Pattern Inlay Center Line */}
        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 11.6]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.6} />
        </mesh>
      </group>

      {/* 2. Identity to Project District Corridor ([0, 0, -20] to [0, 0, -45]) */}
      <group position={[0, 0, -32.5]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.5, 0.4, 7.5]} position={[0, -0.4, 0]} />
        </RigidBody>
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[5.0, 0.08, 15]} />
          <meshStandardMaterial color="#D17B58" roughness={0.8} />
        </mesh>
        <mesh position={[-2.4, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 15]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[2.4, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 15]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Savanna Ochre Inlay */}
        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 14.6]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.6} />
        </mesh>
      </group>

      {/* 3. Hub to DevLab Pathway ([0, 0, 0] to [-25, 0, -10]) */}
      <group position={[-14, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.0, 0.4, 9]} position={[0, -0.4, 0]} />
        </RigidBody>
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[4.0, 0.08, 18]} />
          <meshStandardMaterial color="#B85D3B" roughness={0.8} />
        </mesh>
        <mesh position={[-1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 18]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 18]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Soft Terracotta Ochre Path Accent */}
        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 17.6]} />
          <meshStandardMaterial color="#2A9D8F" roughness={0.6} />
        </mesh>
      </group>

      {/* 4. Hub to Creative Studio Pathway ([0, 0, 0] to [25, 0, -10]) */}
      <group position={[14, 0, -5]} rotation={[0, -Math.PI / 8, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.0, 0.4, 9]} position={[0, -0.4, 0]} />
        </RigidBody>
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[4.0, 0.08, 18]} />
          <meshStandardMaterial color="#B85D3B" roughness={0.8} />
        </mesh>
        <mesh position={[-1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 18]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 18]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        {/* Warm Golden Inlay */}
        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 17.6]} />
          <meshStandardMaterial color="#E9C46A" roughness={0.6} />
        </mesh>
      </group>

      {/* 5. Project District to Contact Station Pathway ([0, 0, -45] to [20, 0, -35]) */}
      <group position={[10, 0, -40]} rotation={[0, -Math.PI / 5, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[2.0, 0.4, 8]} position={[0, -0.4, 0]} />
        </RigidBody>
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <boxGeometry args={[4.0, 0.08, 16]} />
          <meshStandardMaterial color="#C86D51" roughness={0.8} />
        </mesh>
        <mesh position={[-1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 16]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[1.9, 0.08, 0]} castShadow>
          <boxGeometry args={[0.2, 0.12, 16]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 15.6]} />
          <meshStandardMaterial color="#E76F51" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};
