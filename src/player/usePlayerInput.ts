import { useEffect, useRef } from 'react';
import { PlayerControls } from '@/types';
import { create } from 'zustand';

interface MobileInputStore {
  joystickMove: { x: number; y: number };
  isSprinting: boolean;
  isJumping: boolean;
  isInteracting: boolean;
  setJoystickMove: (move: { x: number; y: number }) => void;
  setSprinting: (sprint: boolean) => void;
  setJumping: (jump: boolean) => void;
  setInteracting: (interact: boolean) => void;
}

export const useMobileInputStore = create<MobileInputStore>((set) => ({
  joystickMove: { x: 0, y: 0 },
  isSprinting: false,
  isJumping: false,
  isInteracting: false,
  setJoystickMove: (joystickMove) => set({ joystickMove }),
  setSprinting: (isSprinting) => set({ isSprinting }),
  setJumping: (isJumping) => set({ isJumping }),
  setInteracting: (isInteracting) => set({ isInteracting }),
}));

export const usePlayerInput = () => {
  const controls = useRef<PlayerControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    jump: false,
    interact: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling on Space / Arrow keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'KeyW':
        case 'KeyZ': // Support AZERTY keyboards
        case 'ArrowUp':
          controls.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          controls.current.backward = true;
          break;
        case 'KeyA':
        case 'KeyQ': // Support AZERTY keyboards
        case 'ArrowLeft':
          controls.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          controls.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          controls.current.run = true;
          break;
        case 'Space':
          controls.current.jump = true;
          break;
        case 'KeyE':
          controls.current.interact = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'KeyZ':
        case 'ArrowUp':
          controls.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          controls.current.backward = false;
          break;
        case 'KeyA':
        case 'KeyQ':
        case 'ArrowLeft':
          controls.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          controls.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          controls.current.run = false;
          break;
        case 'Space':
          controls.current.jump = false;
          break;
        case 'KeyE':
          controls.current.interact = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
};
