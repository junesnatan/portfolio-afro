import React, { useRef, useState, useEffect } from 'react';
import { useMobileInputStore } from '@/player/usePlayerInput';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { Zap, ArrowUp, HandMetal } from 'lucide-react';

export const MobileControls: React.FC = () => {
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const touchIdRef = useRef<number | null>(null);

  const { setJoystickMove, setSprinting, setJumping, setInteracting, isSprinting } =
    useMobileInputStore();
  const nearbyInteractable = useUIStore((s) => s.nearbyInteractable);
  const activeModal = useUIStore((s) => s.activeModal);
  const playInteract = useAudioStore((s) => s.playInteract);

  useEffect(() => {
    // Detect mobile touch
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (!isTouchDevice || activeModal) return null;

  // Joystick touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        updateJoystick(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        setKnobPos({ x: 0, y: 0 });
        setJoystickMove({ x: 0, y: 0 });
        break;
      }
    }
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const maxRadius = rect.width / 2;

    const clampedDist = Math.min(distance, maxRadius);
    const angle = Math.atan2(dy, dx);

    const nx = (Math.cos(angle) * clampedDist) / maxRadius;
    const ny = (Math.sin(angle) * clampedDist) / maxRadius;

    setKnobPos({
      x: Math.cos(angle) * clampedDist,
      y: Math.sin(angle) * clampedDist,
    });

    // Invert Y so up is forward (-1 to +1)
    setJoystickMove({ x: nx, y: -ny });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* --- VIRTUAL JOYSTICK (BOTTOM LEFT) --- */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto absolute left-6 bottom-8 w-32 h-32 rounded-full bg-[#2B201A]/60 border-2 border-[#D95D39]/50 backdrop-blur-md flex items-center justify-center touch-none shadow-lg"
      >
        {/* Outer Ring Accent */}
        <div className="w-16 h-16 rounded-full border border-[#E9C46A]/40 pointer-events-none" />

        {/* Draggable Knob */}
        <div
          className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-[#D95D39] to-[#E9C46A] shadow-lg pointer-events-none transition-transform duration-75 border border-white/40"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
      </div>

      {/* --- ACTION BUTTONS (BOTTOM RIGHT) --- */}
      <div className="pointer-events-auto absolute right-6 bottom-8 flex flex-col items-end gap-3.5">
        {/* INTERACTION BUTTON [E] */}
        <button
          onTouchStart={() => {
            playInteract();
            setInteracting(true);
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
          }}
          onTouchEnd={() => {
            setInteracting(false);
            window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));
          }}
          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xl transition-all active:scale-90 ${
            nearbyInteractable
              ? 'bg-[#D95D39] text-white border-2 border-[#E9C46A] shadow-xl animate-bounce'
              : 'bg-[#2B201A]/70 text-[#FAF0CA]/80 border border-[#D95D39]/40'
          }`}
        >
          <HandMetal className="w-5 h-5 mb-0.5" />
          <span>ACTION</span>
        </button>

        <div className="flex gap-3">
          {/* SPRINT TOGGLE BUTTON */}
          <button
            onTouchStart={() => setSprinting(!isSprinting)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-mono font-bold text-[10px] border transition-all active:scale-90 ${
              isSprinting
                ? 'bg-[#2A9D8F] text-white border-white shadow-md'
                : 'bg-[#2B201A]/70 text-[#FAF0CA]/80 border-[#D95D39]/40'
            }`}
          >
            <Zap className="w-4 h-4 mb-0.5" />
            <span>SPRINT</span>
          </button>

          {/* JUMP BUTTON */}
          <button
            onTouchStart={() => {
              setJumping(true);
              window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
            }}
            onTouchEnd={() => {
              setJumping(false);
              window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
            }}
            className="w-14 h-14 rounded-full bg-[#2B201A]/70 active:bg-[#D95D39] text-[#FAF0CA] border border-[#D95D39]/40 flex flex-col items-center justify-center font-mono font-bold text-[10px] active:scale-90 shadow-md"
          >
            <ArrowUp className="w-5 h-5 mb-0.5" />
            <span>SAUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
