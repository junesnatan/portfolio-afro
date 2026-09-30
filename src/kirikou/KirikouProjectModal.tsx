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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 animate-fadeIn font-sans">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-3xl shadow-2xl p-5 md:p-8 text-[#2B201A]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D95D39]/20 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase bg-[#D95D39]/15 text-[#D95D39] border border-[#D95D39]/30 rounded-full">
                {project.category.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-[#7A583A]">
                {project.year} • {project.role}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2B201A]">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-[#7A583A] font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="p-3.5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl flex flex-col justify-between"
            >
              <span className="text-xs font-mono text-[#7A583A] font-semibold uppercase">
                {m.label}
              </span>
              <span className="text-xl font-extrabold font-mono text-[#D95D39] mt-1">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative Description */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#D95D39]" />
            Le Conte du Projet &amp; Conception
          </h3>
          <p className="text-sm md:text-base text-[#3D2619] leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-[#D95D39]/15 font-medium">
            {project.description}
          </p>
        </div>

        {/* Live Interactive Playable Demo */}
        <div className="mb-6">
          {project.id === 'proj-1' && <AgriPulseDemo />}
          {project.id === 'proj-2' && <LuminaLuxuryDemo />}
          {project.id === 'proj-3' && <KromaPatternDemo />}
          {project.id === 'proj-4' && <VelocityFleetDemo />}
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-2.5">
            Fonctionnalités &amp; Réalisations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 bg-[#FAF7F2] rounded-2xl border border-[#D95D39]/15"
              >
                <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-[#3D2619] font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-7">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] font-bold mb-2.5">
            Stack Technique
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1 text-xs font-mono font-medium bg-[#FAF7F2] text-[#2B201A] border border-[#D95D39]/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D95D39]/20">
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-mono font-bold rounded-2xl transition-all duration-200 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white shadow-md active:scale-95"
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
            className="px-5 py-2.5 text-xs md:text-sm font-mono text-[#7A583A] hover:text-[#2B201A] bg-[#F4EFE6] hover:bg-[#E8D5B5] rounded-2xl transition-colors font-semibold"
          >
            Fermer [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
