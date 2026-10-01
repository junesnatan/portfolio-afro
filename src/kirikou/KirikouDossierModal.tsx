import React, { useState } from 'react';
import {
  IDENTITY_DATA,
  EXPERIENCES_DATA,
  EDUCATION_DATA,
  SERVICES_DATA,
  SOCIAL_LINKS,
} from '@/database/data';
import { useDataStore } from '@/stores/useDataStore';
import { ProjectData } from '@/types';
import {
  X,
  Download,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  ExternalLink,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

interface KirikouDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: ProjectData) => void;
}

export const KirikouDossierModal: React.FC<KirikouDossierModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const projects = useDataStore((s) => s.projects);
  const skills = useDataStore((s) => s.skills);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'career' | 'services'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col bg-[#FDFBF7] border-t-2 sm:border-2 border-[#D95D39]/30 rounded-t-[26px] sm:rounded-3xl shadow-2xl overflow-hidden text-[#2B201A]">
        {/* Mobile Sheet Drag Handle */}
        <div className="w-10 h-1 bg-[#D95D39]/30 rounded-full mx-auto my-1.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-[#D95D39]/20 bg-[#FAF7F2] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D95D39] text-white flex items-center justify-center font-mono font-extrabold text-xs sm:text-base shadow-md shrink-0">
              JA
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-lg md:text-xl font-extrabold text-[#2B201A] truncate">
                  {IDENTITY_DATA.name}
                </h1>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase bg-[#2A9D8F]/15 text-[#2A9D8F] rounded-full shrink-0">
                  DISPO
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-[#7A583A] truncate">
                {IDENTITY_DATA.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="/assets/cv-junes-agassounon.pdf"
              download
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold bg-gradient-to-r from-[#D95D39] to-[#E76F51] text-white rounded-xl shadow-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TÉLÉCHARGER CV</span>
              <span className="sm:hidden">CV</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors active:scale-95"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-3 sm:px-6 py-2 border-b border-[#D95D39]/20 bg-[#F4EFE6] overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'profile', label: 'Profil' },
            { id: 'projects', label: `Projets (${projects.length})` },
            { id: 'skills', label: `Compétences (${skills.length})` },
            { id: 'career', label: 'Parcours' },
            { id: 'services', label: 'Services' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 text-[11px] sm:text-xs font-mono rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#D95D39] text-white font-bold shadow-sm'
                  : 'text-[#4A2E1B] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 text-[#2B201A]">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl sm:rounded-3xl shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-[#2B201A] mb-1.5">Présentation Synthétique</h2>
                <p className="text-[#3D2619] leading-relaxed text-xs sm:text-sm md:text-base font-medium">
                  {IDENTITY_DATA.bio}
                </p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#D95D39]/15 text-[11px] sm:text-xs font-mono text-[#7A583A] italic">
                  "{IDENTITY_DATA.philosophy}"
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {IDENTITY_DATA.stats.map((stat, i) => (
                  <div key={i} className="p-2.5 sm:p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl sm:rounded-2xl text-center shadow-sm">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#D95D39]">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs font-mono text-[#7A583A] mt-0.5 sm:mt-1 uppercase font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Fast Contact Channels */}
              <div className="p-3.5 sm:p-5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl sm:rounded-3xl shadow-sm">
                <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-2.5 sm:mb-3 font-bold">
                  Canaux de Contact Direct
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 p-2 sm:p-2.5 bg-[#FDFBF7] hover:bg-[#F3EDE2] border border-[#D95D39]/20 rounded-xl text-[11px] sm:text-xs font-mono transition-colors shadow-sm font-semibold truncate"
                    >
                      {link.platform === 'email' && <Mail className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />}
                      {link.platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />}
                      {link.platform === 'github' && <Github className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />}
                      {link.platform === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />}
                      {link.platform === 'cv' && <Download className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />}
                      <span className="truncate">{link.label.split(' ')[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 sm:p-5 bg-[#FAF7F2] border border-[#D95D39]/15 hover:border-[#D95D39]/50 rounded-2xl sm:rounded-3xl transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase bg-[#D95D39]/15 text-[#D95D39] rounded-full font-bold">
                        {proj.category.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-[#7A583A]">{proj.year}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#2B201A] mb-1">{proj.title}</h3>
                    <p className="text-xs text-[#4A2E1B] mb-2.5 sm:mb-3 font-medium">{proj.tagline}</p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {proj.technologies.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono bg-[#E8D5B5]/60 text-[#2B201A] rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#D95D39]/15">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="text-xs font-mono font-bold text-[#D95D39] hover:underline"
                    >
                      Ouvrir la fiche complète &rarr;
                    </button>
                    {proj.links[0] && (
                      <a
                        href={proj.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#7A583A] hover:text-[#2B201A] flex items-center gap-1 font-medium"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Démo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 sm:p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl sm:rounded-2xl flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#2B201A]">{skill.name}</span>
                    <span className="text-xs font-mono font-extrabold text-[#D95D39]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-[#E8D5B5] rounded-full overflow-hidden mb-1.5 sm:mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-[#D95D39] to-[#2A9D8F] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#7A583A]">{skill.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CAREER */}
          {activeTab === 'career' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-2 sm:mb-3 flex items-center gap-1.5 font-bold">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95D39]" />
                  Expériences Professionnelles
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {EXPERIENCES_DATA.map((exp) => (
                    <div key={exp.id} className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl sm:rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#7A583A] mb-1">
                        <span>{exp.period}</span>
                        <span>{exp.location}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#2B201A]">{exp.role}</h4>
                      <div className="text-[11px] sm:text-xs font-mono text-[#D95D39] font-bold mb-1.5">{exp.company}</div>
                      <p className="text-xs text-[#4A2E1B] mb-2 font-medium leading-relaxed">{exp.description}</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="text-[11px] sm:text-xs text-[#4A2E1B] flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-2 sm:mb-3 flex items-center gap-1.5 font-bold">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95D39]" />
                  Diplômes &amp; Formations
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {EDUCATION_DATA.map((edu) => (
                    <div key={edu.id} className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-xl sm:rounded-2xl shadow-sm">
                      <div className="text-[11px] sm:text-xs font-mono text-[#7A583A] mb-1">{edu.period}</div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#2B201A]">{edu.degree}</h4>
                      <div className="text-[11px] sm:text-xs font-mono text-[#2A9D8F] font-bold mb-1">{edu.institution}</div>
                      <p className="text-xs text-[#4A2E1B] leading-relaxed font-medium">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {SERVICES_DATA.map((srv) => (
                <div key={srv.id} className="p-3.5 sm:p-5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#2B201A] mb-0.5">{srv.title}</h3>
                    <p className="text-[11px] sm:text-xs text-[#D95D39] font-mono font-bold mb-1.5">{srv.subtitle}</p>
                    <p className="text-xs text-[#4A2E1B] leading-relaxed mb-3 font-medium">{srv.description}</p>
                    <div className="space-y-1.5 mb-3">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="text-[11px] sm:text-xs text-[#4A2E1B] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t border-[#D95D39]/15 text-[10px] sm:text-[11px] font-mono text-[#2A9D8F] font-bold">
                    Livrables : {srv.deliverables.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
