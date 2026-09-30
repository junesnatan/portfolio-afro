import React, { useEffect, useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusStep, setStatusStep] = useState('INITIALISATION');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 6;
        if (next < 25) setStatusStep('CRÉATION DU PAYSAGE SAVANNE & LUMIÈRES');
        else if (next < 55) setStatusStep('SCULPTURE DES BAOBABS, TERRES & TOTEMS');
        else if (next < 80) setStatusStep('SYNTHÈSE ACOUSTIQUE (BALAFON & KALIMBA)');
        else if (next < 100) setStatusStep('ANIMATION DU PERSONNAGE & PHYSIQUE RAPIER');
        else {
          setStatusStep('ATELIER PRÊT — BIENVENUE');
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 110);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] text-[#2B201A] p-6 font-mono transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Organic Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(217,93,57,0.06)_100%)] pointer-events-none" />

      {/* Main Artisan Card */}
      <div className="relative w-full max-w-md p-7 bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl flex flex-col gap-5">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#D95D39]/20 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D95D39] animate-spin-slow" />
            <span className="text-xs font-extrabold tracking-wider text-[#2B201A]">
              JUNES AGASSOUNON — ATELIER INTERACTIF
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#D95D39] bg-[#D95D39]/10 px-2 py-0.5 rounded-full">
            ÉDITION SAVANNE
          </span>
        </div>

        {/* Big Title */}
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#2B201A] flex items-center gap-2">
            OUVERTURE DU MONDE
            <Sparkles className="w-4 h-4 text-[#E9C46A] animate-pulse" />
          </h1>
          <p className="text-xs text-[#7A583A] mt-1 font-semibold">
            DÉVELOPPEUR FULL-STACK × DESIGNER GRAPHIQUE
          </p>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#3D2619] font-medium">
            <span className="text-[#D95D39] font-bold">{statusStep}</span>
            <span className="font-extrabold">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-[#E8D5B5] rounded-full overflow-hidden p-0.5 border border-[#D95D39]/20">
            <div
              className="h-full bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#E9C46A] rounded-full transition-all duration-150 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Breakdown Terminal Lines */}
        <div className="space-y-1 text-[11px] text-[#4A2E1B] bg-[#FAF7F2] p-3.5 rounded-xl border border-[#D95D39]/15 font-mono">
          <div className="flex justify-between">
            <span>PAYSAGE SAVANNE :</span>
            <span className={progress >= 25 ? 'text-[#D95D39] font-bold' : 'text-[#7A583A]/40'}>
              {progress >= 25 ? '██████████ [OK]' : '░░░░░░░░░░'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>MODÈLES &amp; BAOBABS :</span>
            <span className={progress >= 55 ? 'text-[#D95D39] font-bold' : 'text-[#7A583A]/40'}>
              {progress >= 55 ? '██████████ [OK]' : '░░░░░░░░░░'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>AUDIO HARMONIQUE :</span>
            <span className={progress >= 80 ? 'text-[#D95D39] font-bold' : 'text-[#7A583A]/40'}>
              {progress >= 80 ? '██████████ [OK]' : '░░░░░░░░░░'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>PHYSIQUE RAPIER :</span>
            <span className={progress >= 95 ? 'text-[#2A9D8F] font-bold' : 'text-[#7A583A]/40'}>
              {progress >= 95 ? '██████████ [OK]' : '░░░░░░░░░░'}
            </span>
          </div>
        </div>

        {/* Bottom Tip */}
        <div className="text-[10px] text-center text-[#7A583A] pt-1 font-medium">
          Astuce : Utilisez WASD/ZQSD pour marcher et glissez avec la souris ou au doigt pour admirer le panorama.
        </div>
      </div>
    </div>
  );
};
