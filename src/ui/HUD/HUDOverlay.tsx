import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { ZONES } from '@/config/constants';
import { PROJECTS_DATA } from '@/database/data';
import { ProjectModal } from '../ProjectModal/ProjectModal';
import { RecruiterModeModal } from '../RecruiterMode/RecruiterModeModal';
import { ControlsModal } from '../ControlsModal/ControlsModal';
import { ContactModal } from '../ContactModal/ContactModal';
import { SignatureCinematicModal } from '../Signature/SignatureCinematicModal';
import { SettingsModal } from '../SettingsModal/SettingsModal';
import { AdminDashboardModal } from '@/admin/AdminDashboardModal';
import { MiniMap } from './MiniMap';
import { PerformanceWidget } from './PerformanceWidget';
import { MobileControls } from '../MobileControls/MobileControls';
import {
  Compass,
  Volume2,
  VolumeX,
  Briefcase,
  HelpCircle,
  Sparkles,
  Layers,
  HandMetal,
  Settings,
} from 'lucide-react';

export const HUDOverlay: React.FC = () => {
  const currentZone = useGameStore((s) => s.currentZone);
  const missions = useGameStore((s) => s.missions);
  const getExplorationPercentage = useGameStore(
    (s) => s.getExplorationPercentage
  );
  const player = useGameStore((s) => s.player);

  const nearbyInteractable = useUIStore((s) => s.nearbyInteractable);
  const activeModal = useUIStore((s) => s.activeModal);
  const openProjectModal = useUIStore((s) => s.openProjectModal);
  const openContactModal = useUIStore((s) => s.openContactModal);
  const openSignatureCinematic = useUIStore((s) => s.openSignatureCinematic);
  const notification = useUIStore((s) => s.notification);
  const toggleRecruiterMode = useUIStore((s) => s.toggleRecruiterMode);
  const openControlsModal = useUIStore((s) => s.openControlsModal);
  const openSettingsModal = useUIStore((s) => s.openSettingsModal);

  const audioSettings = useAudioStore((s) => s.settings);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const playInteract = useAudioStore((s) => s.playInteract);
  const initAmbient = useAudioStore((s) => s.initAmbient);

  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  const zoneInfo = ZONES[currentZone] || ZONES.spawn;
  const activeMission =
    missions.find((m) => m.status === 'active') || missions[0];
  const explorationProgress = getExplorationPercentage();

  // Listen for 'E' key for nearby interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // First interaction initializes ambient Web Audio
      if (!hasStartedAudio) {
        initAmbient();
        setHasStartedAudio(true);
      }

      if (e.code === 'KeyE' && nearbyInteractable && !activeModal) {
        playInteract();
        if (nearbyInteractable.type === 'contact_station') {
          openContactModal();
        } else if (
          nearbyInteractable.type === 'terminal' ||
          nearbyInteractable.type === 'project'
        ) {
          const project =
            PROJECTS_DATA.find((p) => p.id === nearbyInteractable.dataId) ||
            PROJECTS_DATA[0];
          openProjectModal(project);
        }
      }

      // Quick toggle Recruiter Mode with 'M' or 'R'
      if ((e.code === 'KeyM' || e.code === 'KeyR') && !activeModal) {
        toggleRecruiterMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    nearbyInteractable,
    activeModal,
    hasStartedAudio,
    initAmbient,
    playInteract,
    openProjectModal,
    openContactModal,
    toggleRecruiterMode,
  ]);

  const handleInteractionClick = () => {
    if (!nearbyInteractable) return;
    playInteract();
    if (nearbyInteractable.type === 'contact_station') {
      openContactModal();
    } else if (
      nearbyInteractable.type === 'terminal' ||
      nearbyInteractable.type === 'project'
    ) {
      const project =
        PROJECTS_DATA.find((p) => p.id === nearbyInteractable.dataId) ||
        PROJECTS_DATA[0];
      openProjectModal(project);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none font-sans overflow-hidden">
      {/* ========================================= */}
      {/* TOP HEADER BAR                            */}
      {/* ========================================= */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-start justify-between">
        {/* Left: Identity & Zone Badge */}
        <div className="flex flex-col gap-2">
          {/* Main Logo Tag */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-[#FAF7F2]/95 border border-[#D95D39]/35 rounded-xl backdrop-blur-md shadow-sm">
              <span className="font-mono font-bold text-sm tracking-wider text-[#2B201A]">
                JUNES AGASSOUNON
              </span>
              <span className="text-[10px] font-mono text-[#D95D39] font-bold ml-2">
                DÉV &amp; GRAPHISTE
              </span>
            </div>

            {/* Active Zone Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FAF7F2]/90 border border-[#D95D39]/20 rounded-xl backdrop-blur-md shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#D95D39] animate-spin-slow" />
              <span className="text-xs font-mono text-[#4A2E1B] font-medium">
                {zoneInfo.name}
              </span>
            </div>
          </div>

          {/* Active Mission Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF7F2]/95 border border-[#2A9D8F]/40 rounded-xl backdrop-blur-md max-w-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
            <div className="text-[11px] font-mono truncate">
              <span className="text-[#2A9D8F] uppercase font-bold mr-1.5">
                OBJECTIF :
              </span>
              <span className="text-[#2B201A]">{activeMission.title}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Live Performance / FPS Telemetry Widget */}
          <PerformanceWidget />

          {/* SIGNATURE TRANSFORMATION BUTTON */}
          <button
            onClick={() => {
              playInteract();
              openSignatureCinematic();
            }}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-[#FAF7F2]/90 hover:bg-[#F3EDE2] text-[#D95D39] border border-[#D95D39]/30 font-mono font-bold text-xs rounded-xl shadow-sm transition-all"
            title="Lancer la séquence cinématique signature"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D95D39] animate-pulse" />
            <span>TRANSFORMATION</span>
          </button>

          {/* RECRUITER MODE BUTTON */}
          <button
            onClick={() => {
              playInteract();
              toggleRecruiterMode(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            title="Accès direct aux projets, compétences et dossier complet"
          >
            <Briefcase className="w-4 h-4 text-white" />
            <span>DOSSIER RECRUTEUR</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              if (!hasStartedAudio) {
                initAmbient();
                setHasStartedAudio(true);
              }
              toggleMute();
            }}
            className="p-2.5 bg-[#FAF7F2]/90 hover:bg-[#F3EDE2] border border-[#D95D39]/25 rounded-xl text-[#2B201A] shadow-sm backdrop-blur-md transition-colors"
            title={audioSettings.muted ? 'Activer le son' : 'Couper le son'}
          >
            {audioSettings.muted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#D95D39]" />
            )}
          </button>

          {/* Controls Help Toggle */}
          <button
            onClick={() => {
              playInteract();
              openControlsModal();
            }}
            className="hidden sm:flex p-2.5 bg-[#FAF7F2]/90 hover:bg-[#F3EDE2] border border-[#D95D39]/25 rounded-xl text-[#2B201A] shadow-sm backdrop-blur-md transition-colors"
            title="Guide des touches"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* System Settings Toggle */}
          <button
            onClick={() => {
              playInteract();
              openSettingsModal();
            }}
            className="p-2.5 bg-[#FAF7F2]/90 hover:bg-[#F3EDE2] border border-[#D95D39]/25 rounded-xl text-[#2B201A] shadow-sm backdrop-blur-md transition-colors"
            title="Paramètres graphiques et sonores"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* DISCOVERY NOTIFICATION TOAST */}
      {notification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-5 py-3.5 bg-[#FAF7F2]/98 border border-[#E9C46A] text-[#2B201A] rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center gap-1 animate-fadeIn z-40 max-w-md text-center">
          <div className="text-xs font-mono font-bold text-[#D95D39] uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
            {notification.title}
          </div>
          {notification.subtitle && (
            <div className="text-xs font-sans text-[#4A2E1B] leading-snug">
              {notification.subtitle}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* BOTTOM FOOTER INFO & PROGRESS             */}
      {/* ========================================= */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between">
        {/* Left: Exploration Meter & Coordinates */}
        <div className="flex flex-col gap-1.5 bg-[#FAF7F2]/95 border border-[#D95D39]/25 rounded-2xl p-3.5 backdrop-blur-md max-w-xs shadow-md">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#4A2E1B] flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-[#D95D39]" />
              EXPLORATION MONDE
            </span>
            <span className="font-bold text-[#D95D39]">
              {explorationProgress}%
            </span>
          </div>

          <div className="w-44 h-2 bg-[#E8D5B5] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D95D39] to-[#2A9D8F] rounded-full transition-all duration-500"
              style={{ width: `${explorationProgress}%` }}
            />
          </div>

          <div className="text-[10px] font-mono text-[#7A583A] mt-0.5">
            POSITION : [X:{player.position[0].toFixed(1)} Z:
            {player.position[2].toFixed(1)}]
          </div>
        </div>

        {/* Center: Dynamic Interactive Prompt Banner */}
        {nearbyInteractable && !activeModal && (
          <div className="pointer-events-auto absolute left-1/2 bottom-8 -translate-x-1/2 flex items-center">
            <button
              onClick={handleInteractionClick}
              className="group flex items-center gap-3 px-6 py-3.5 bg-[#D95D39] border-2 border-[#E9C46A] rounded-2xl shadow-2xl backdrop-blur-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E9C46A] text-[#2B201A] font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                E
              </div>
              <span className="font-mono text-sm md:text-base font-bold text-white tracking-wide group-hover:text-[#FAF0CA] transition-colors">
                {nearbyInteractable.label}
              </span>
              <HandMetal className="w-4 h-4 text-[#FAF0CA] ml-1" />
            </button>
          </div>
        )}

        {/* Right: Radar MiniMap & Controls Hint on Desktop */}
        <div className="hidden md:flex flex-col items-end gap-2.5">
          <MiniMap />
          <div className="hidden lg:block text-right text-[11px] font-mono text-[#4A2E1B] bg-[#FAF7F2]/95 border border-[#D95D39]/25 rounded-2xl p-3 backdrop-blur-md shadow-sm">
            <div className="text-[#2B201A] font-bold mb-0.5">CONTRÔLES RAPIDES</div>
            <div>WASD / ZQSD : Déplacement</div>
            <div>Souris Drag : Vue Caméra</div>
            <div>Shift : Courir | Espace : Saut</div>
          </div>
        </div>
      </footer>

      {/* ========================================= */}
      {/* MOBILE TOUCH CONTROLS                     */}
      {/* ========================================= */}
      <MobileControls />

      {/* ========================================= */}
      {/* MODALS & OVERLAYS                         */}
      {/* ========================================= */}
      <ProjectModal />
      <RecruiterModeModal />
      <ControlsModal />
      <ContactModal />
      <SignatureCinematicModal />
      <SettingsModal />
      <AdminDashboardModal />
    </div>
  );
};
