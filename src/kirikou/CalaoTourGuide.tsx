import React, { useState, useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Compass,
  ArrowRight,
  Award,
} from 'lucide-react';

interface CalaoTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPassport: () => void;
  walkToPosition: (targetX: number) => void;
  goToChapter: (chapterIdx: number) => void;
  chapterPositions: number[];
}

interface TourStep {
  chapterIndex: number;
  positionX: number;
  durationSeconds: number;
  title: string;
  subtitle: string;
  narration: string;
  highlights: { label: string; value: string }[];
  actionLabel?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    chapterIndex: 0,
    positionX: 180,
    durationSeconds: 12,
    title: 'Chapitre 1 : Qui suis-je ?',
    subtitle: 'Profil & Savoir-Faire',
    narration:
      '« Bienvenue ! Je suis le Calao, votre guide express. Junes AGASSOUNON est développeur web et graphiste. Il allie développement moderne (React, TypeScript, Node) et design soigné pour concevoir des produits web rapides, élégants et performants. »',
    highlights: [
      { label: 'Expérience', value: '5+ Ans' },
      { label: 'Double Profil', value: 'Code × Design' },
      { label: 'Approche', value: 'Impact & Clarté' },
    ],
  },
  {
    chapterIndex: 1,
    positionX: 1150,
    durationSeconds: 16,
    title: 'Chapitre 2 : Les Créations',
    subtitle: 'Projets Majeurs en Production',
    narration:
      '« Voici ses réalisations clés : plateformes SaaS, dashboards interactifs, applications web et expériences 3D. Chaque projet répond à un besoin concret avec une architecture solide et une interface sur mesure. »',
    highlights: [
      { label: 'Projets Livrés', value: '15+ Projets' },
      { label: 'Domaines', value: 'Web, Mobile, 3D' },
      { label: 'Stack Web', value: 'React, Next, Node' },
    ],
  },
  {
    chapterIndex: 2,
    positionX: 2150,
    durationSeconds: 12,
    title: 'Chapitre 3 : La Stack Technique',
    subtitle: 'Compétences & Maîtrise',
    narration:
      '« Côté technique, Junes s’appuie sur des standards rigoureux : 100% TypeScript strict, code propre et testé, animations fluides et architectures évolutives, faciles à maintenir dans le temps. »',
    highlights: [
      { label: 'Langages', value: 'TypeScript, Python, SQL' },
      { label: 'Frontend', value: 'React, Tailwind, Three' },
      { label: 'Backend & Cloud', value: 'PostgreSQL, Docker' },
    ],
  },
  {
    chapterIndex: 3,
    positionX: 3050,
    durationSeconds: 10,
    title: 'Chapitre 4 : Parlons de vos projets',
    subtitle: 'Collaboration & Disponibilité',
    narration:
      '« Vous avez une idée d’application, une refonte de site ou besoin d’un renfort technique ? Junes est disponible immédiatement pour vous accompagner en freelance ou en CDI. Échangeons simplement en 1 clic ! »',
    highlights: [
      { label: 'Disponibilité', value: 'Immédiate' },
      { label: 'Mobilité', value: 'Remote & Présentiel' },
      { label: 'Réponse', value: '< 24 Heures' },
    ],
  },
  {
    chapterIndex: 4,
    positionX: 3850,
    durationSeconds: 10,
    title: 'Chapitre 5 : Passeport & Contact',
    subtitle: 'Bilan de la Visite',
    narration:
      '« La visite est terminée ! Vous pouvez maintenant télécharger son CV en PDF, enregistrer votre Passeport souvenir personnalisé ou envoyer directement un message pour démarrer une collaboration. »',
    highlights: [
      { label: 'Visite', value: 'Terminée' },
      { label: 'CV', value: 'Format PDF' },
      { label: 'Contact', value: 'Immédiat' },
    ],
    actionLabel: 'OBTENIR MON PASSEPORT',
  },
];

export const CalaoTourGuide: React.FC<CalaoTourGuideProps> = ({
  isOpen,
  onClose,
  onOpenPassport,
  walkToPosition,
  goToChapter,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [stepProgress, setStepProgress] = useState<number>(0); // 0 to 100%
  const [calaoFlap, setCalaoFlap] = useState<boolean>(false);

  const playSuccess = useAudioStore((s) => s.playSuccess);
  const playInteract = useAudioStore((s) => s.playInteract);
  const initAmbient = useAudioStore((s) => s.initAmbient);

  const step = TOUR_STEPS[currentStepIdx];
  const timerRef = useRef<number | null>(null);

  // Initialize and move camera to the first step on opening
  useEffect(() => {
    if (isOpen) {
      initAmbient();
      setCurrentStepIdx(0);
      setStepProgress(0);
      setIsPlaying(true);
      walkToPosition(TOUR_STEPS[0].positionX);
      goToChapter(0);
      playSuccess();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Step countdown and camera navigation loop
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    const totalStepMs = step.durationSeconds * 1000;
    const stepIncrement = (intervalMs / totalStepMs) * 100;

    timerRef.current = window.setInterval(() => {
      setStepProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          // Advance to next step
          if (currentStepIdx < TOUR_STEPS.length - 1) {
            const nextIdx = currentStepIdx + 1;
            setCurrentStepIdx(nextIdx);
            walkToPosition(TOUR_STEPS[nextIdx].positionX);
            goToChapter(TOUR_STEPS[nextIdx].chapterIndex);
            playSuccess();
            return 0;
          } else {
            // Tour finished!
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + stepIncrement;
      });

      // Wing flap alternation
      setCalaoFlap((f) => !f);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentStepIdx, step]);

  if (!isOpen) return null;

  const handleNext = () => {
    playInteract();
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setStepProgress(0);
      walkToPosition(TOUR_STEPS[nextIdx].positionX);
      goToChapter(TOUR_STEPS[nextIdx].chapterIndex);
      playSuccess();
    } else {
      onOpenPassport();
    }
  };

  const handlePrev = () => {
    playInteract();
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      setStepProgress(0);
      walkToPosition(TOUR_STEPS[prevIdx].positionX);
      goToChapter(TOUR_STEPS[prevIdx].chapterIndex);
    }
  };

  const togglePlayPause = () => {
    playInteract();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-2 sm:p-4 md:p-6 font-sans">
      {/* ======================================================== */}
      {/* TOP FLIGHT BAR : Calao Guide Status & Exit               */}
      {/* ======================================================== */}
      <div className="pointer-events-auto flex items-center justify-between max-w-4xl mx-auto w-full bg-[#181B2E]/95 border border-[#E9C46A]/40 rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 shadow-2xl text-[#FAF0CA]">
        {/* Left: Calao Avatar & Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Animated Stylized Calao Avatar */}
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#D95D39] to-[#E9C46A] flex items-center justify-center border border-white/20 shadow-inner shrink-0">
            <svg
              viewBox="0 0 40 40"
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-200 ${
                calaoFlap ? '-translate-y-0.5 rotate-3' : 'translate-y-0.5 -rotate-2'
              }`}
            >
              {/* Calao Large Golden Curved Beak with Horn Casque */}
              <path
                d="M12 18 Q26 12 36 22 Q26 26 12 24 Z"
                fill="#E9C46A"
                stroke="#C44E2C"
                strokeWidth="1.2"
              />
              <path
                d="M16 14 Q28 10 32 16 Q24 16 16 14 Z"
                fill="#D95D39"
                stroke="#8C4A28"
                strokeWidth="0.8"
              />
              {/* Head & Body */}
              <circle cx="14" cy="20" r="7" fill="#1C120C" />
              {/* Expressive Eye */}
              <circle cx="15" cy="18" r="2.2" fill="#FAF0CA" />
              <circle cx="15.5" cy="18" r="1.1" fill="#1C120C" />
              {/* Wing Feathers */}
              <path
                d="M6 22 Q12 18 16 26 Q10 28 6 22 Z"
                fill="#3D2619"
              />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9C46A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#E9C46A]" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#E9C46A] px-1.5 sm:px-2 py-0.5 rounded-full bg-[#E9C46A]/20 shrink-0">
                VOL CALAO · 60S
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold opacity-80 shrink-0">
                {currentStepIdx + 1} / {TOUR_STEPS.length}
              </span>
            </div>
            <h4 className="font-title font-bold text-xs sm:text-base md:text-lg text-white truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
              {step.title}
            </h4>
          </div>
        </div>

        {/* Right: Controls & Exit */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
            title="Étape précédente"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#D95D39] hover:bg-[#E76F51] text-white shadow-md transition-all active:scale-95"
            title={isPlaying ? 'Pause' : 'Reprendre'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
            title="Étape suivante"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>

          <div className="h-5 sm:h-6 w-px bg-white/20 mx-0.5 sm:mx-1" />

          {/* Close Tour button */}
          <button
            onClick={() => {
              playInteract();
              onClose();
            }}
            className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all active:scale-95"
            title="Quitter la visite guidée"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM NARRATION CARD & METRIC HIGHLIGHTS                */}
      {/* ======================================================== */}
      <div className="pointer-events-auto max-w-3xl mx-auto w-full bg-[#FAF7F2] border-2 border-[#D95D39]/30 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-2xl text-[#2B201A] relative animate-fadeIn">
        {/* Step Progress Bar at top of card */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E8D5B5] rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#E9C46A] transition-all duration-150"
            style={{ width: `${stepProgress}%` }}
          />
        </div>

        {/* Header subtitle */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 mt-0.5">
          <span className="font-script text-sm sm:text-xl md:text-2xl font-bold text-[#D95D39] leading-tight truncate">
            ✦ {step.subtitle}
          </span>
          <span className="text-[10px] sm:text-xs font-body font-bold text-gray-500 shrink-0 ml-2">
            {Math.round((stepProgress / 100) * step.durationSeconds)}s / {step.durationSeconds}s
          </span>
        </div>

        {/* Griot Narration Speech */}
        <p className="font-body text-xs sm:text-sm md:text-base font-medium leading-snug sm:leading-relaxed italic text-[#3D2619] mb-2.5 sm:mb-4">
          {step.narration}
        </p>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-2.5 sm:mb-4">
          {step.highlights.map((h, i) => (
            <div
              key={i}
              className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#FFFDF7] border border-[#D95D39]/20 text-center shadow-sm min-w-0"
            >
              <div className="text-xs sm:text-sm md:text-base font-title font-bold text-[#D95D39] truncate">
                {h.value}
              </div>
              <div className="text-[8px] sm:text-[10px] font-body uppercase tracking-tight text-gray-600 font-bold mt-0.5 truncate">
                {h.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Next Chapter or Open Passport */}
        <div className="flex items-center justify-between pt-2 border-t border-[#D95D39]/15">
          <div className="text-xs font-mono opacity-70 hidden sm:flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#2A9D8F]" />
            <span>Vol automatique guidé par le Calao</span>
          </div>

          {currentStepIdx === TOUR_STEPS.length - 1 ? (
            <button
              onClick={() => {
                playSuccess();
                onOpenPassport();
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#E9C46A] hover:opacity-95 text-white font-mono font-extrabold text-[11px] sm:text-xs rounded-xl sm:rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-[#FAF0CA]" />
              <span>{step.actionLabel || 'GRAVER MON PASSEPORT'}</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-[#D95D39] hover:bg-[#C24C27] text-white font-mono font-bold text-[11px] sm:text-xs rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <span>ÉTAPE SUIVANTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
