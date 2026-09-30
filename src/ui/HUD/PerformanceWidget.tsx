import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';

export const PerformanceWidget: React.FC = () => {
  const showFpsCounter = useUIStore((s) => s.showFpsCounter);
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.6);

  useEffect(() => {
    if (!showFpsCounter) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (now: number) => {
      frameCount++;
      const elapsed = now - lastTime;

      if (elapsed >= 500) {
        const currentFps = Math.round((frameCount * 1000) / elapsed);
        setFps(Math.min(120, currentFps));
        setFrameTime(Number((elapsed / frameCount).toFixed(1)));
        frameCount = 0;
        lastTime = now;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [showFpsCounter]);

  if (!showFpsCounter) return null;

  const fpsColor =
    fps >= 55 ? 'text-emerald-600' : fps >= 30 ? 'text-amber-600' : 'text-rose-600';

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#FAF7F2]/90 border border-[#D95D39]/30 rounded-lg backdrop-blur-md font-mono text-[10px] select-none text-[#2B201A] shadow-sm">
      <Activity className="w-3 h-3 text-[#D95D39] animate-pulse" />
      <span className={`font-bold ${fpsColor}`}>{fps} FPS</span>
      <span className="text-[#2B201A]/30">|</span>
      <span>{frameTime} ms</span>
    </div>
  );
};
