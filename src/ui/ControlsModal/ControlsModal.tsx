import React from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { X, Keyboard, Mouse, Smartphone, Compass } from 'lucide-react';

export const ControlsModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const playInteract = useAudioStore((s) => s.playInteract);

  if (activeModal !== 'controls') return null;

  const handleClose = () => {
    playInteract();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-xl bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl p-6 md:p-8 text-[#2B201A]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D95D39]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#D95D39] flex items-center justify-center text-white shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2B201A] tracking-wide">
                GUIDE DE NAVIGATION
              </h2>
              <p className="text-xs font-mono text-[#7A583A] font-semibold">
                COMMANDES &amp; EXPLORATION DU MONDE 3D
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2.5 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Sections */}
        <div className="space-y-4">
          {/* Keyboard Controls */}
          <div className="bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D95D39] mb-3 flex items-center gap-2 font-bold">
              <Keyboard className="w-4 h-4" />
              Clavier (Ordinateur)
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Avancer / Reculer :</span>
                <span className="text-[#2B201A] font-bold">W / S (ou Z / S)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Gauche / Droite :</span>
                <span className="text-[#2B201A] font-bold">A / D (ou Q / D)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Courir (Sprint) :</span>
                <span className="text-[#2B201A] font-bold">Shift</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Sauter :</span>
                <span className="text-[#2B201A] font-bold">Espace</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg col-span-2">
                <span className="text-[#D95D39] font-bold">Interagir avec un kiosque :</span>
                <span className="text-[#2B201A] font-extrabold px-2.5 py-0.5 bg-[#E9C46A] rounded-md shadow-sm">Touche [E]</span>
              </div>
            </div>
          </div>

          {/* Mouse Controls */}
          <div className="bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#2A9D8F] mb-3 flex items-center gap-2 font-bold">
              <Mouse className="w-4 h-4" />
              Souris &amp; Caméra
            </h3>
            <div className="space-y-1.5 text-xs font-mono text-[#3D2619]">
              <div className="flex justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Rotation vue 360° :</span>
                <span className="text-[#2B201A] font-bold">Clic Gauche + Glisser</span>
              </div>
              <div className="flex justify-between p-2 bg-[#FDFBF7] border border-[#D95D39]/15 rounded-lg">
                <span className="text-[#7A583A]">Zoom avant / arrière :</span>
                <span className="text-[#2B201A] font-bold">Molette Souris</span>
              </div>
            </div>
          </div>

          {/* Mobile Touch */}
          <div className="bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#E76F51] mb-3 flex items-center gap-2 font-bold">
              <Smartphone className="w-4 h-4" />
              Mobile &amp; Écran Tactile
            </h3>
            <div className="text-xs font-mono text-[#4A2E1B] space-y-1">
              <div>• Joystick virtuel en bas à gauche pour diriger le personnage.</div>
              <div>• Boutons d'action en bas à droite pour Courir, Sauter et Interagir.</div>
              <div>• Glisser sur l'écran pour orienter la vue à votre guise.</div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
          >
            REPRENDRE L'EXPLORATION
          </button>
        </div>
      </div>
    </div>
  );
};
