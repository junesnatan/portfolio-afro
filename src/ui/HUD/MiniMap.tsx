import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { ZONES } from '@/config/constants';
import { Compass } from 'lucide-react';

export const MiniMap: React.FC = () => {
  const player = useGameStore((s) => s.player);
  const currentZone = useGameStore((s) => s.currentZone);

  const mapWidth = 140;
  const mapHeight = 140;
  const worldRangeX = 70; // [-35, 35]
  const worldRangeZ = 70; // [-55, 15]

  const toMapCoord = (x: number, z: number) => {
    const px = ((x + 35) / worldRangeX) * mapWidth;
    const pz = ((z - 15) / -worldRangeZ) * mapHeight;
    return {
      x: Math.max(8, Math.min(mapWidth - 8, px)),
      y: Math.max(8, Math.min(mapHeight - 8, pz)),
    };
  };

  const playerCoord = toMapCoord(player.position[0], player.position[2]);

  return (
    <div className="relative w-36 h-36 bg-[#2B201A]/90 border border-[#D95D39]/40 rounded-xl overflow-hidden shadow-lg backdrop-blur-md font-mono select-none">
      {/* Warm Ambient Savanna Radar Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(217,93,57,0.15)_100%)] pointer-events-none" />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      {/* Center Reticle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#E9C46A]/20 pointer-events-none" />

      {/* Zone POI Markers */}
      {Object.values(ZONES).map((z) => {
        const coord = toMapCoord(z.center[0], z.center[2]);
        const isCurrent = currentZone === z.id;
        return (
          <div
            key={z.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all ${
                isCurrent
                  ? 'bg-[#E9C46A] border-white shadow-[0_0_8px_#E9C46A] scale-125'
                  : 'bg-[#4A2E1B] border-[#D95D39]/50'
              }`}
            />
            {/* Tooltip on hover */}
            <div className="hidden group-hover:block absolute left-3 top-0 px-1.5 py-0.5 bg-[#2B201A] text-[9px] text-[#E9C46A] whitespace-nowrap rounded border border-[#D95D39]/30 z-20">
              {z.name.split(' ')[0]}
            </div>
          </div>
        );
      })}

      {/* Player Position Blip */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ left: `${playerCoord.x}px`, top: `${playerCoord.y}px` }}
      >
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-[#D95D39] border-2 border-[#2B201A] shadow-[0_0_10px_#D95D39] animate-ping opacity-75 absolute inset-0" />
          <div className="w-3 h-3 rounded-full bg-[#D95D39] border-2 border-white shadow-[0_0_8px_#D95D39] relative z-10" />
        </div>
      </div>

      {/* Mini Legend / Compass Header */}
      <div className="absolute top-1 left-2 right-2 flex items-center justify-between text-[9px] text-[#FAF0CA]/80">
        <span className="flex items-center gap-1 text-[#E9C46A]">
          <Compass className="w-2.5 h-2.5 animate-spin-slow" />
          CARTE
        </span>
        <span className="text-[#FAF0CA]/60">ATELIER</span>
      </div>

      {/* Coordinates at bottom */}
      <div className="absolute bottom-1 left-2 text-[8px] text-[#FAF0CA]/60">
        X:{player.position[0].toFixed(0)} Z:{player.position[2].toFixed(0)}
      </div>
    </div>
  );
};
