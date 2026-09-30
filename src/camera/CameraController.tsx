import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';

export const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  const playerPosition = useGameStore((s) => s.player.position);
  const activeModal = useUIStore((s) => s.activeModal);
  const nearbyInteractable = useUIStore((s) => s.nearbyInteractable);

  // Orbit spherical coordinates
  const spherical = useRef(new THREE.Spherical(5.5, Math.PI / 3, 0));
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  // Camera targets
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 4, 8));

  // Pointer drag listeners for orbiting camera around player
  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      // Don't drag if clicking UI or if modal is open
      if (activeModal) return;
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || activeModal) return;

      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      previousPointer.current = { x: e.clientX, y: e.clientY };

      // Orbit sensitivity
      spherical.current.theta -= deltaX * 0.005;
      spherical.current.phi -= deltaY * 0.005;

      // Restrict polar angle so camera doesn't go below floor or overhead inversion
      spherical.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, spherical.current.phi));
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (activeModal) return;
      spherical.current.radius = Math.max(
        3.0,
        Math.min(10.0, spherical.current.radius + e.deltaY * 0.005)
      );
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [gl, activeModal]);

  useFrame((_, delta) => {
    const targetPlayerPos = new THREE.Vector3(
      playerPosition[0],
      playerPosition[1] + 1.2,
      playerPosition[2]
    );

    if (activeModal === 'project_detail' && nearbyInteractable) {
      // SHOWCASE CAMERA: cinematic focus on interactive terminal
      const terminalPos = new THREE.Vector3(
        nearbyInteractable.position[0],
        nearbyInteractable.position[1] + 1.4,
        nearbyInteractable.position[2]
      );
      const camTargetPos = new THREE.Vector3(
        nearbyInteractable.position[0] + 0.4,
        nearbyInteractable.position[1] + 1.6,
        nearbyInteractable.position[2] + 2.4
      );

      currentCamPos.current.lerp(camTargetPos, delta * 3.5);
      currentLookAt.current.lerp(terminalPos, delta * 4.0);
    } else {
      // GAMEPLAY CAMERA: third-person follow
      const offset = new THREE.Vector3().setFromSpherical(spherical.current);
      const desiredPos = targetPlayerPos.clone().add(offset);

      // Smooth dampening
      currentCamPos.current.lerp(desiredPos, delta * 6.0);
      currentLookAt.current.lerp(targetPlayerPos, delta * 8.0);
    }

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
