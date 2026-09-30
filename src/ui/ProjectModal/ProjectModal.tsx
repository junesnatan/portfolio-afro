import React, { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const selectedProject = useUIStore((s) => s.selectedProject);
  const closeModal = useUIStore((s) => s.closeModal);
  const playInteract = useAudioStore((s) => s.playInteract);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'project_detail') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'project_detail' || !selectedProject) return null;

  const handleClose = () => {
    playInteract();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl text-[#2B201A] p-6 md:p-8 font-sans">
        {/* Top Header Bar */}
        <div className="flex items-start justify-between border-b border-[#D95D39]/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase bg-[#D95D39]/15 text-[#D95D39] border border-[#D95D39]/30 rounded-lg">
                {selectedProject.category.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-[#7A583A]">
                ANNÉE : {selectedProject.year}
              </span>
              <span className="text-xs font-mono text-[#2A9D8F] font-bold">
                • {selectedProject.role}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2B201A] flex items-center gap-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm md:text-base text-[#4A2E1B] mt-1 font-medium">
              {selectedProject.tagline}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2.5 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors"
            title="Fermer (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Project Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {selectedProject.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl flex flex-col justify-between shadow-sm"
            >
              <span className="text-xs font-mono text-[#7A583A] uppercase tracking-wider font-semibold">
                {metric.label}
              </span>
              <span className="text-lg md:text-xl font-extrabold font-mono text-[#D95D39] mt-1">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative Description */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-2 flex items-center gap-2 font-bold">
            <Layers className="w-4 h-4 text-[#D95D39]" />
            Architecture &amp; Vision du Projet
          </h3>
          <p className="text-sm md:text-base text-[#3D2619] leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#D95D39]/15">
            {selectedProject.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-3 font-bold">
            Ingénierie &amp; Points Forts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedProject.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 bg-[#FAF7F2] rounded-xl border border-[#D95D39]/15 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-[#3D2619] font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Badges */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-2.5 font-bold">
            Stack Technique
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1 text-xs font-mono font-medium bg-[#FAF7F2] text-[#2B201A] border border-[#D95D39]/25 rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D95D39]/20">
          <div className="flex flex-wrap gap-3">
            {selectedProject.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-mono font-bold rounded-xl transition-all duration-200 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white shadow-md active:scale-95"
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
            onClick={handleClose}
            className="px-5 py-2.5 text-xs md:text-sm font-mono text-[#4A2E1B] hover:text-[#2B201A] bg-[#F4EFE6] hover:bg-[#E8D5B5] rounded-xl border border-[#D95D39]/20 transition-colors font-medium"
          >
            Fermer l'aperçu [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
