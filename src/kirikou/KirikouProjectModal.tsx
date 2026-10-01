import React, { useEffect } from 'react';
import { ProjectData } from '@/types';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import {
  AgriPulseDemo,
  LuminaLuxuryDemo,
  KromaPatternDemo,
  VelocityFleetDemo,
} from './KirikouMiniDemos';

interface KirikouProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const KirikouProjectModal: React.FC<KirikouProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-[#FDFBF7] border-t-2 sm:border-2 border-[#D95D39]/30 rounded-t-[26px] sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-[#2B201A]">
        {/* Mobile Sheet Drag Indicator */}
        <div className="w-10 h-1 bg-[#D95D39]/30 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D95D39]/20 pb-3 sm:pb-4 mb-3.5 sm:mb-5 gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-[#D95D39]/15 text-[#D95D39] border border-[#D95D39]/30 rounded-full">
                {project.category.replace('_', ' ')}
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-[#7A583A]">
                {project.year} • {project.role}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#2B201A] leading-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#7A583A] font-medium mt-0.5 sm:mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-full transition-colors shrink-0 active:scale-95"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="p-2.5 sm:p-3.5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl sm:rounded-2xl flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs font-mono text-[#7A583A] font-semibold uppercase truncate">
                {m.label}
              </span>
              <span className="text-lg sm:text-xl font-extrabold font-mono text-[#D95D39] mt-0.5 sm:mt-1">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative Description */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-1.5 sm:mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95D39]" />
            Le Conte du Projet &amp; Conception
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#3D2619] leading-relaxed bg-[#FAF7F2] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#D95D39]/15 font-medium">
            {project.description}
          </p>
        </div>

        {/* Live Interactive Playable Demo */}
        <div className="mb-4 sm:mb-6">
          {project.id === 'proj-1' && <AgriPulseDemo />}
          {project.id === 'proj-2' && <LuminaLuxuryDemo />}
          {project.id === 'proj-3' && <KromaPatternDemo />}
          {project.id === 'proj-4' && <VelocityFleetDemo />}
        </div>

        {/* Key Features */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-2">
            Fonctionnalités &amp; Réalisations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2.5 sm:p-3 bg-[#FAF7F2] rounded-xl sm:rounded-2xl border border-[#D95D39]/15"
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#3D2619] font-medium leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-5 sm:mb-7">
          <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-2">
            Stack Technique
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-mono font-medium bg-[#FAF7F2] text-[#2B201A] border border-[#D95D39]/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-[#D95D39]/20">
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono font-bold rounded-xl sm:rounded-2xl transition-all duration-200 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white shadow-md active:scale-95"
              >
                {link.type === 'github' ? (
                  <Github className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto text-center px-4 py-2.5 text-xs sm:text-sm font-mono text-[#7A583A] hover:text-[#2B201A] bg-[#F4EFE6] hover:bg-[#E8D5B5] rounded-xl sm:rounded-2xl transition-colors font-semibold active:scale-95"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
