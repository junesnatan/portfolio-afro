import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { usePlayerInput, useMobileInputStore } from './usePlayerInput';
import { useGameStore } from '@/stores/useGameStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { PLAYER_SPEED, PLAYER_RUN_MULTIPLIER } from '@/config/constants';
import { PlayerAnimation } from '@/types';

interface CharacterControllerProps {
  initialPosition?: [number, number, number];
}

export const CharacterController: React.FC<CharacterControllerProps> = ({
  initialPosition = [0, 1.2, 4],
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const characterMeshGroup = useRef<THREE.Group>(null);
  const controls = usePlayerInput();
  const { camera } = useThree();

  const [currentAnim, setCurrentAnim] = useState<PlayerAnimation>('idle');
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const setPlayerAnimation = useGameStore((s) => s.setPlayerAnimation);
  const playFootstep = useAudioStore((s) => s.playFootstep);

  const footstepAccumulator = useRef(0);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  // Direction vectors reused across frames to prevent GC overhead
  const moveDirection = useRef(new THREE.Vector3());
  const cameraForward = useRef(new THREE.Vector3());
  const cameraSide = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!rigidBodyRef.current) return;

    const mobileState = useMobileInputStore.getState();
    const ctrl = controls.current;

    // Merge keyboard and mobile input
    const inputX =
      (ctrl.right ? 1 : 0) - (ctrl.left ? 1 : 0) + mobileState.joystickMove.x;
    const inputZ =
      (ctrl.forward ? 1 : 0) - (ctrl.backward ? 1 : 0) + mobileState.joystickMove.y;
    const isRunning = ctrl.run || mobileState.isSprinting;
    const isJumping = ctrl.jump || mobileState.isJumping;

    // Calculate camera-relative movement vectors
    camera.getWorldDirection(cameraForward.current);
    cameraForward.current.y = 0;
    cameraForward.current.normalize();

    cameraSide.current.crossVectors(camera.up, cameraForward.current).normalize();

    moveDirection.current.set(0, 0, 0);

    if (Math.abs(inputZ) > 0.05) {
      moveDirection.current.addScaledVector(cameraForward.current, inputZ);
    }
    if (Math.abs(inputX) > 0.05) {
      moveDirection.current.addScaledVector(cameraSide.current, -inputX);
    }

    const isMoving = moveDirection.current.lengthSq() > 0.001;

    // Movement speed
    const currentSpeed = isRunning
      ? PLAYER_SPEED * PLAYER_RUN_MULTIPLIER
      : PLAYER_SPEED;

    const currentVelocity = rigidBodyRef.current.linvel();

    if (isMoving) {
      moveDirection.current.normalize();

      // Smooth rotation toward movement vector
      targetRotation.current = Math.atan2(
        moveDirection.current.x,
        moveDirection.current.z
      );

      // Shortest angle interpolation
      let angleDiff = targetRotation.current - currentRotation.current;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      currentRotation.current += angleDiff * Math.min(1, delta * 15);

      if (characterMeshGroup.current) {
        characterMeshGroup.current.rotation.y = currentRotation.current;
      }

      // Apply linear velocity on X and Z while preserving gravity on Y
      rigidBodyRef.current.setLinvel(
        {
          x: moveDirection.current.x * currentSpeed,
          y: isJumping && Math.abs(currentVelocity.y) < 0.1 ? 6.5 : currentVelocity.y,
          z: moveDirection.current.z * currentSpeed,
        },
        true
      );

      // Determine animation
      const nextAnim: PlayerAnimation = isRunning ? 'run' : 'walk';
      if (currentAnim !== nextAnim) {
        setCurrentAnim(nextAnim);
        setPlayerAnimation(nextAnim);
      }

      // Footstep sound timing
      footstepAccumulator.current += delta * (isRunning ? 3.5 : 2.2);
      if (footstepAccumulator.current >= 1.0) {
        playFootstep();
        footstepAccumulator.current = 0;
      }
    } else {
      // Gentle stop
      rigidBodyRef.current.setLinvel(
        {
          x: currentVelocity.x * 0.75,
          y: isJumping && Math.abs(currentVelocity.y) < 0.1 ? 6.5 : currentVelocity.y,
          z: currentVelocity.z * 0.75,
        },
        true
      );

      if (currentAnim !== 'idle') {
        setCurrentAnim('idle');
        setPlayerAnimation('idle');
      }
      footstepAccumulator.current = 0;
    }

    // Sync position with global store
    const translation = rigidBodyRef.current.translation();
    setPlayerPosition([translation.x, translation.y, translation.z]);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      position={initialPosition}
      enabledRotations={[false, false, false]}
      linearDamping={1.2}
      angularDamping={1.0}
      mass={70}
      friction={0.0}
      type="dynamic"
      canSleep={false}
    >
      <CapsuleCollider args={[0.45, 0.28]} position={[0, 0.75, 0]} friction={0.0} restitution={0.0} />
      <group ref={characterMeshGroup}>
        <CharacterModel animation={currentAnim} />
      </group>
    </RigidBody>
  );
};
