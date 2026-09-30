import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlayerAnimation } from '@/types';

interface CharacterModelProps {
  animation: PlayerAnimation;
}

export const CharacterModel: React.FC<CharacterModelProps> = ({ animation }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Limb refs for organic cartoon animation
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftCalfRef = useRef<THREE.Group>(null);
  const rightCalfRef = useRef<THREE.Group>(null);
  const bagRef = useRef<THREE.Group>(null);

  const animTime = useRef(0);

  useFrame((_, delta) => {
    // Dynamic animation frequencies inspired by animated films
    const speed = animation === 'run' ? 13 : animation === 'walk' ? 8.5 : 2.5;
    animTime.current += delta * speed;
    const t = animTime.current;

    if (animation === 'idle') {
      // Gentle cartoon breathing and natural relaxed sway
      if (torsoRef.current) {
        torsoRef.current.position.y = 0.85 + Math.sin(t) * 0.02;
        torsoRef.current.rotation.x = Math.sin(t * 0.6) * 0.02;
        torsoRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
      }
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(t * 0.5) * 0.02;
        headRef.current.rotation.y = Math.sin(t * 0.25) * 0.04;
        headRef.current.rotation.z = Math.sin(t * 0.4) * 0.015;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t) * 0.04;
        leftArmRef.current.rotation.z = 0.18;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -Math.sin(t) * 0.04;
        rightArmRef.current.rotation.z = -0.18;
      }
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftCalfRef.current) leftCalfRef.current.rotation.x = 0;
      if (rightCalfRef.current) rightCalfRef.current.rotation.x = 0;
      if (bagRef.current) bagRef.current.rotation.z = Math.sin(t) * 0.03;
    } else if (animation === 'walk' || animation === 'run') {
      const isRun = animation === 'run';
      const amp = isRun ? 0.95 : 0.6;
      const bob = isRun ? 0.08 : 0.04;
      const lean = isRun ? 0.2 : 0.06;

      // Torso bobbing and energetic stride
      if (torsoRef.current) {
        torsoRef.current.position.y = 0.85 + Math.abs(Math.sin(t)) * bob;
        torsoRef.current.rotation.x = lean;
        torsoRef.current.rotation.y = Math.sin(t) * (isRun ? 0.12 : 0.05);
      }

      // Arms swinging naturally with character bounce
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t) * amp;
        leftArmRef.current.rotation.z = 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -Math.sin(t) * amp;
        rightArmRef.current.rotation.z = -0.2;
      }

      // Legs alternating
      const legWave = Math.sin(t);
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = -legWave * amp;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = legWave * amp;
      }

      // Calves bending naturally
      if (leftCalfRef.current) {
        leftCalfRef.current.rotation.x =
          legWave < 0 ? Math.abs(legWave) * (isRun ? 1.2 : 0.6) : 0.05;
      }
      if (rightCalfRef.current) {
        rightCalfRef.current.rotation.x =
          legWave > 0 ? Math.abs(legWave) * (isRun ? 1.2 : 0.6) : 0.05;
      }

      // Satchel bouncing slightly on hip
      if (bagRef.current) {
        bagRef.current.rotation.x = Math.sin(t * 2) * 0.1;
      }
    } else if (animation === 'jump') {
      if (torsoRef.current) torsoRef.current.rotation.x = 0.1;
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.7;
        leftArmRef.current.rotation.z = 0.4;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -0.7;
        rightArmRef.current.rotation.z = -0.4;
      }
      if (leftLegRef.current) leftLegRef.current.rotation.x = -0.4;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -0.2;
      if (leftCalfRef.current) leftCalfRef.current.rotation.x = 0.8;
      if (rightCalfRef.current) rightCalfRef.current.rotation.x = 0.6;
    } else if (animation === 'interact') {
      if (torsoRef.current) {
        torsoRef.current.rotation.x = 0.05;
        torsoRef.current.rotation.y = 0.1;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -1.1;
        rightArmRef.current.rotation.z = -0.2;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = 0.1;
        leftArmRef.current.rotation.z = 0.15;
      }
    }
  });

  // African animated character palette
  const skinColor = '#482D1D'; // Warm rich African skin tone
  const hairColor = '#18120D'; // Dark textured hair
  const shirtColor = '#D95D39'; // Terracotta orange linen shirt
  const innerShirt = '#FAF7F2'; // Crisp ivory undershirt
  const pantsColor = '#264653'; // Savanna deep blue-green chinos
  const shoeColor = '#FAF7F2'; // Clean sneakers
  const shoeAccent = '#E76F51'; // Warm accent sole
  const bagLeather = '#8C4F2B'; // Warm carved leather bag
  const patternGold = '#E9C46A'; // Subtle gold geometric motif

  return (
    <group ref={groupRef} dispose={null}>
      {/* --- TORSO & UPPER BODY --- */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        {/* Main Chest (Linen Terracotta Shirt) */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.44, 0.24]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>

        {/* Ivory Undershirt at Neck V-Neck */}
        <mesh position={[0, 0.36, 0.122]}>
          <boxGeometry args={[0.14, 0.14, 0.01]} />
          <meshStandardMaterial color={innerShirt} roughness={0.8} />
        </mesh>

        {/* African Patterned Chest Embroidery / Collar Trim */}
        <mesh position={[0, 0.26, 0.123]}>
          <boxGeometry args={[0.22, 0.03, 0.01]} />
          <meshStandardMaterial color={patternGold} roughness={0.6} />
        </mesh>

        {/* Creative Satchel Strap (across chest diagonally) */}
        <mesh position={[0, 0.24, 0]} rotation={[0, 0, 0.55]}>
          <boxGeometry args={[0.05, 0.56, 0.26]} />
          <meshStandardMaterial color={bagLeather} roughness={0.6} />
        </mesh>

        {/* Creative Messenger Bag / Tablet Case on Hip */}
        <group ref={bagRef} position={[0.24, 0.05, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.24, 0.22]} />
            <meshStandardMaterial color={bagLeather} roughness={0.5} />
          </mesh>
          {/* Tablet Screen edge peeking out */}
          <mesh position={[0.04, 0.08, 0]}>
            <boxGeometry args={[0.02, 0.1, 0.18]} />
            <meshStandardMaterial color="#2B2D42" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>

        {/* --- HEAD & EXPRESSIVE CARTOON FACE --- */}
        <group ref={headRef} position={[0, 0.52, 0]}>
          {/* Head Base */}
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.28, 0.24]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>

          {/* Textured Afro-Fade / Stylized Hair Top */}
          <mesh position={[0, 0.15, -0.02]} castShadow>
            <boxGeometry args={[0.28, 0.14, 0.26]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.22, -0.02]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>

          {/* Eyes (Expressive animated film style) */}
          <group position={[0, 0.02, 0.122]}>
            {/* Left Eye */}
            <mesh position={[-0.065, 0, 0]}>
              <boxGeometry args={[0.045, 0.045, 0.01]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.3} />
            </mesh>
            <mesh position={[-0.065, 0, 0.006]}>
              <boxGeometry args={[0.025, 0.025, 0.01]} />
              <meshStandardMaterial color="#1B120C" roughness={0.2} />
            </mesh>

            {/* Right Eye */}
            <mesh position={[0.065, 0, 0]}>
              <boxGeometry args={[0.045, 0.045, 0.01]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.3} />
            </mesh>
            <mesh position={[0.065, 0, 0.006]}>
              <boxGeometry args={[0.025, 0.025, 0.01]} />
              <meshStandardMaterial color="#1B120C" roughness={0.2} />
            </mesh>

            {/* Warm Friendly Smile */}
            <mesh position={[0, -0.07, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.015, 0.01]} />
              <meshStandardMaterial color="#78350F" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* --- LEFT ARM (ROLLED SLEEVES) --- */}
        <group ref={leftArmRef} position={[0.27, 0.38, 0]}>
          {/* Terracotta Sleeve */}
          <mesh position={[0, -0.08, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.16, 12]} />
            <meshStandardMaterial color={shirtColor} roughness={0.7} />
          </mesh>
          {/* Bare Forearm (Warm Skin) */}
          <mesh position={[0, -0.24, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.22, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.37, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
        </group>

        {/* --- RIGHT ARM (ROLLED SLEEVES) --- */}
        <group ref={rightArmRef} position={[-0.27, 0.38, 0]}>
          {/* Terracotta Sleeve */}
          <mesh position={[0, -0.08, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.16, 12]} />
            <meshStandardMaterial color={shirtColor} roughness={0.7} />
          </mesh>
          {/* Bare Forearm (Warm Skin) */}
          <mesh position={[0, -0.24, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.22, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.37, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* --- PELVIS & LEGS --- */}
      <group position={[0, 0.85, 0]}>
        {/* Waist & Belt */}
        <mesh position={[0, -0.04, 0]} castShadow>
          <boxGeometry args={[0.34, 0.1, 0.2]} />
          <meshStandardMaterial color={pantsColor} roughness={0.8} />
        </mesh>

        {/* LEFT LEG */}
        <group ref={leftLegRef} position={[0.12, -0.12, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
            <meshStandardMaterial color={pantsColor} roughness={0.8} />
          </mesh>
          {/* Left Calf (Rolled Chino Hem) */}
          <group ref={leftCalfRef} position={[0, -0.34, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.05, 0.28, 12]} />
              <meshStandardMaterial color={pantsColor} roughness={0.8} />
            </mesh>
            {/* Sneaker */}
            <mesh position={[0, -0.32, 0.04]} castShadow>
              <boxGeometry args={[0.11, 0.09, 0.22]} />
              <meshStandardMaterial color={shoeColor} roughness={0.4} />
            </mesh>
            {/* Sneaker Terracotta Accent Sole */}
            <mesh position={[0, -0.36, 0.04]}>
              <boxGeometry args={[0.115, 0.02, 0.225]} />
              <meshStandardMaterial color={shoeAccent} roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* RIGHT LEG */}
        <group ref={rightLegRef} position={[-0.12, -0.12, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
            <meshStandardMaterial color={pantsColor} roughness={0.8} />
          </mesh>
          {/* Right Calf */}
          <group ref={rightCalfRef} position={[0, -0.34, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.05, 0.28, 12]} />
              <meshStandardMaterial color={pantsColor} roughness={0.8} />
            </mesh>
            {/* Sneaker */}
            <mesh position={[0, -0.32, 0.04]} castShadow>
              <boxGeometry args={[0.11, 0.09, 0.22]} />
              <meshStandardMaterial color={shoeColor} roughness={0.4} />
            </mesh>
            {/* Sneaker Accent Sole */}
            <mesh position={[0, -0.36, 0.04]}>
              <boxGeometry args={[0.115, 0.02, 0.225]} />
              <meshStandardMaterial color={shoeAccent} roughness={0.6} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
