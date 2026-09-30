import React from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { useGameStore } from '@/stores/useGameStore';
import {
  X,
  Sliders,
  Volume2,
  Tv,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const showFpsCounter = useUIStore((s) => s.showFpsCounter);
  const toggleFpsCounter = useUIStore((s) => s.toggleFpsCounter);

  const audioSettings = useAudioStore((s) => s.settings);
  const setMasterVolume = useAudioStore((s) => s.setMasterVolume);
  const setMusicVolume = useAudioStore((s) => s.setMusicVolume);
  const setSfxVolume = useAudioStore((s) => s.setSfxVolume);
  const playInteract = useAudioStore((s) => s.playInteract);

  const resetProgress = useGameStore((s) => s.resetProgress);

  if (activeModal !== 'settings') return null;

  const handleClose = () => {
    playInteract();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl p-6 md:p-8 text-[#2B201A]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D95D39]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#D95D39] flex items-center justify-center text-white shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2B201A] tracking-wide">
                RÉGLAGES DE L'EXPÉRIENCE
              </h2>
              <p className="text-xs font-mono text-[#7A583A] font-semibold">
                AUDIO ACOUSTIQUE &amp; PERFORMANCES
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

        <div className="space-y-5">
          {/* Audio Sliders */}
          <div className="bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl p-4 space-y-3 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D95D39] flex items-center gap-2 font-bold">
              <Volume2 className="w-4 h-4" />
              Harmonies &amp; Sons Acoustiques
            </h3>

            {/* Master Volume */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-medium">
                <span className="text-[#7A583A]">Volume Général</span>
                <span className="text-[#2B201A] font-bold">{Math.round(audioSettings.masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="w-full accent-[#D95D39] cursor-pointer"
              />
            </div>

            {/* Ambient / Music Volume */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-medium">
                <span className="text-[#7A583A]">Nappe Harmonique (Balafon &amp; Drone)</span>
                <span className="text-[#2B201A] font-bold">{Math.round(audioSettings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-full accent-[#D95D39] cursor-pointer"
              />
            </div>

            {/* SFX Volume */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-medium">
                <span className="text-[#7A583A]">Bruitages (Pas en terre &amp; Kalimba)</span>
                <span className="text-[#2B201A] font-bold">{Math.round(audioSettings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="w-full accent-[#D95D39] cursor-pointer"
              />
            </div>
          </div>

          {/* Graphics & HUD Toggles */}
          <div className="bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl p-4 space-y-3 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#2A9D8F] flex items-center gap-2 font-bold">
              <Tv className="w-4 h-4" />
              Affichage &amp; Télémétrie
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#2B201A] font-medium">
                Afficher le compteur FPS
              </span>
              <button
                onClick={() => {
                  playInteract();
                  toggleFpsCounter();
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl border transition-colors ${
                  showFpsCounter
                    ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                    : 'bg-[#FDFBF7] text-[#7A583A] border-[#D95D39]/20'
                }`}
              >
                {showFpsCounter ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
              </button>
            </div>
          </div>

          {/* Reset Exploration Progress */}
          <div className="flex items-center justify-between p-3.5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl shadow-sm">
            <span className="text-xs font-mono text-[#7A583A] font-medium">
              Réinitialiser l'exploration
            </span>
            <button
              onClick={() => {
                playInteract();
                resetProgress();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl text-xs font-mono font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            ENREGISTRER &amp; RETOURNER
          </button>
        </div>
      </div>
    </div>
  );
};
