import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  Github,
  Globe,
  Check,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Code,
} from 'lucide-react';
import { IDENTITY_DATA, EXPERIENCES_DATA, EDUCATION_DATA } from '@/database/data';
import { useDataStore } from '@/stores/useDataStore';

interface CurriculumVitaeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumVitaeModal: React.FC<CurriculumVitaeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const projects = useDataStore((s) => s.projects);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('junes.agassounon@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn font-sans select-text">
      {/* Container */}
      <div className="relative w-full max-w-4xl h-[95vh] sm:h-[92vh] flex flex-col bg-[#FDFBF7] border-t-2 sm:border-2 border-[#D95D39]/30 rounded-t-[26px] sm:rounded-3xl shadow-2xl overflow-hidden text-[#2B201A]">
        {/* Mobile handle */}
        <div className="w-10 h-1 bg-[#D95D39]/30 rounded-full mx-auto my-2 sm:hidden shrink-0 print:hidden" />

        {/* Toolbar Header (hidden when printing) */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#D95D39]/20 bg-[#FAF7F2] shrink-0 print:hidden">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D95D39] to-[#E76F51] text-white flex items-center justify-center font-mono font-extrabold text-xs sm:text-sm shadow-sm shrink-0">
              JA
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-base font-extrabold text-[#2B201A] truncate">
                Curriculum Vitae — {IDENTITY_DATA.name}
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-[#7A583A] truncate">
                Format Officiel • Développeur Web &amp; Graphiste
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct PDF Download */}
            <a
              href="/assets/cv-junes-agassounon.pdf"
              download="CV-Junes-Agassounon.pdf"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold bg-[#D95D39] hover:bg-[#E76F51] text-white rounded-xl shadow-sm transition-all active:scale-95"
              title="Télécharger le fichier PDF sur votre appareil"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TÉLÉCHARGER PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            {/* Print / Save to PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#6E3719] border border-[#E9C46A] rounded-xl shadow-sm transition-all active:scale-95"
              title="Imprimer ou enregistrer en PDF via le navigateur"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">IMPRIMER</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors active:scale-95"
              title="Fermer le CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable A4 Canvas */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#FAF7F2]/60 print:p-0 print:bg-white print:overflow-visible">
          <div
            id="printable-cv-page"
            className="max-w-3xl mx-auto bg-white border border-[#D95D39]/20 rounded-2xl shadow-lg p-5 sm:p-8 md:p-10 print:border-none print:shadow-none print:p-0 print:max-w-none"
          >
            {/* Top decorative accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#2A9D8F] rounded-full mb-6 print:mb-4" />

            {/* Header Document */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#D95D39]/15">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D95D39] to-[#E76F51] text-white flex items-center justify-center font-mono font-extrabold text-2xl sm:text-3xl shadow-md border-2 border-[#E9C46A]/50 shrink-0">
                  JA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1C120C] tracking-tight">
                      JUNES AGASSOUNON
                    </h1>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#2A9D8F]/15 text-[#2A9D8F] rounded-full border border-[#2A9D8F]/30 print:hidden">
                      DISPONIBLE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#D95D39] uppercase tracking-wider mt-0.5">
                    Développeur Web Full-Stack &amp; Graphiste
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#7A583A] font-medium mt-1">
                    5+ ans d'expérience • Paris / Cotonou / Remote
                  </p>
                </div>
              </div>

              {/* Contact Information Box */}
              <div className="flex flex-col gap-1.5 text-xs font-mono text-[#4A2E1B] bg-[#FAF7F2] p-3 rounded-xl border border-[#D95D39]/15 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 hover:text-[#D95D39] text-left transition-colors"
                  title="Cliquer pour copier l'email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />
                  <span className="truncate">junes.agassounon@gmail.com</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  ) : (
                    <span className="text-[9px] opacity-60 print:hidden">(copier)</span>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />
                  <span>+229 01 51 45 68 03</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />
                  <span>github.com/junesnatan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                  <span>portfolio-afro.vercel.app</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="my-5 p-3.5 sm:p-4 bg-[#FAF7F2] rounded-xl border-l-4 border-[#D95D39] text-xs sm:text-sm text-[#3D2619] leading-relaxed">
              <p className="font-medium">
                Développeur Web et Graphiste passionné, je conçois des applications web modernes, rapides et intuitives, avec un design visuel soigné qui marque les esprits. Du front-end interactif au back-end robuste, chaque projet est pensé pour créer un vrai impact pour vos utilisateurs et votre activité.
              </p>
            </div>

            {/* 2-Column Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
              {/* Left Column: Skills, Education, Languages (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                {/* Technical Skills */}
                <div>
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#D95D39]/20 mb-3">
                    <Code className="w-4 h-4 text-[#D95D39]" />
                    <h3 className="text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider text-[#1C120C]">
                      Compétences Clés
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold mb-1">
                        <span>Frontend (React, TS, Next.js)</span>
                        <span className="text-[#D95D39]">95%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8D5B5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#D95D39] rounded-full w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold mb-1">
                        <span>Backend (Node, Express, PostgreSQL)</span>
                        <span className="text-[#D95D39]">90%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8D5B5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2A9D8F] rounded-full w-[90%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold mb-1">
                        <span>Graphisme &amp; UI (Illustrator, Figma)</span>
                        <span className="text-[#D95D39]">95%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8D5B5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E76F51] rounded-full w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold mb-1">
                        <span>3D &amp; Créatif (Three.js, WebGL)</span>
                        <span className="text-[#D95D39]">88%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8D5B5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E9C46A] rounded-full w-[88%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold mb-1">
                        <span>DevOps &amp; Outils (Git, Docker, CI/CD)</span>
                        <span className="text-[#D95D39]">85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8D5B5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#238276] rounded-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formations */}
                <div>
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#D95D39]/20 mb-3">
                    <GraduationCap className="w-4 h-4 text-[#D95D39]" />
                    <h3 className="text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider text-[#1C120C]">
                      Formations &amp; Diplômes
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {EDUCATION_DATA.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="font-extrabold text-[#1C120C] leading-snug">
                          {edu.degree}
                        </div>
                        <div className="text-[11px] font-mono text-[#D95D39] font-bold">
                          {edu.institution}
                        </div>
                        <div className="text-[10px] font-mono opacity-70">
                          {edu.period}
                        </div>
                        <p className="text-[11px] text-[#4A2E1B] mt-0.5">
                          {edu.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Langues & Atouts */}
                <div>
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#D95D39]/20 mb-3">
                    <Sparkles className="w-4 h-4 text-[#D95D39]" />
                    <h3 className="text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider text-[#1C120C]">
                      Langues &amp; Points Forts
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold">Français :</span>
                      <span className="font-mono text-[#2A9D8F] font-bold">Langue maternelle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Anglais :</span>
                      <span className="font-mono text-[#2A9D8F] font-bold">Technique &amp; Pro</span>
                    </div>
                    <div className="pt-2 border-t border-[#D95D39]/10 space-y-1 text-[11px] text-[#3D2619]">
                      <div>✓ Architecture logicielle propre &amp; typage strict</div>
                      <div>✓ Rigueur de livraison et respect des délais</div>
                      <div>✓ Communication transparente avec le client</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Experiences & Major Projects (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                {/* Expériences Professionnelles */}
                <div>
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#D95D39]/20 mb-3">
                    <Briefcase className="w-4 h-4 text-[#D95D39]" />
                    <h3 className="text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider text-[#1C120C]">
                      Expériences Professionnelles
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {EXPERIENCES_DATA.map((exp) => (
                      <div key={exp.id} className="relative pl-3 border-l-2 border-[#D95D39]/40 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className="font-extrabold text-sm text-[#1C120C]">
                            {exp.role}
                          </h4>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#D95D39]/15 text-[#D95D39] rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[#7A583A] font-semibold mb-1">
                          {exp.company} • {exp.location}
                        </div>
                        <p className="text-[11px] text-[#3D2619] mb-1.5 leading-relaxed">
                          {exp.description}
                        </p>
                        <ul className="space-y-1 text-[10.5px] text-[#3D2619]">
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#D95D39] font-bold">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projets Emblématiques */}
                <div>
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#D95D39]/20 mb-3">
                    <Layers className="w-4 h-4 text-[#D95D39]" />
                    <h3 className="text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider text-[#1C120C]">
                      Projets Emblématiques Récents
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {projects.length === 0 ? (
                      <p className="text-[11px] text-[#7A583A] italic p-3 rounded-xl bg-[#FAF7F2] border border-dashed border-[#D95D39]/20">
                        Aucun projet publié dans la base de données pour le moment.
                      </p>
                    ) : (
                      projects.slice(0, 3).map((proj) => (
                        <div
                          key={proj.id}
                          className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D95D39]/15 text-xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-[#1C120C] text-[12px]">
                              {proj.title}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-[#2A9D8F]/15 text-[#2A9D8F] font-bold rounded">
                              {proj.category.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[#4A2E1B] mb-1.5 leading-tight">
                            {proj.tagline}
                          </p>
                          <div className="flex flex-wrap gap-1 text-[9px] font-mono text-[#7A583A]">
                            {proj.technologies.slice(0, 5).map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-white rounded border border-[#D95D39]/10">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-8 pt-3 border-t border-[#D95D39]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#7A583A]">
              <span>Curriculum Vitae officiel • Junes AGASSOUNON</span>
              <span className="text-[#2A9D8F] font-bold">Disponible immédiatement • CDI / Freelance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
