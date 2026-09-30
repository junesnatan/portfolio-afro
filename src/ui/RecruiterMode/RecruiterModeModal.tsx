import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import {
  IDENTITY_DATA,
  PROJECTS_DATA,
  SKILLS_DATA,
  EXPERIENCES_DATA,
  EDUCATION_DATA,
  SERVICES_DATA,
  SOCIAL_LINKS,
} from '@/database/data';
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
import { SkillCategory } from '@/types';

export const RecruiterModeModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const openProjectModal = useUIStore((s) => s.openProjectModal);
  const playInteract = useAudioStore((s) => s.playInteract);

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'career' | 'services'>('profile');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<SkillCategory | 'all'>('all');

  if (activeModal !== 'recruiter_mode') return null;

  const handleClose = () => {
    playInteract();
    closeModal();
  };

  const filteredSkills =
    skillCategoryFilter === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === skillCategoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl overflow-hidden text-[#2B201A]">
        {/* Top Recruiter Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D95D39]/20 bg-[#FAF7F2]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#D95D39] text-white flex items-center justify-center font-mono font-extrabold text-lg shadow-md">
              JA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[#2B201A] tracking-wide">
                  {IDENTITY_DATA.name}
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30 rounded-full">
                  DISPONIBLE
                </span>
              </div>
              <p className="text-xs font-mono text-[#7A583A]">
                {IDENTITY_DATA.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/assets/cv-junes-agassounon.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white rounded-xl transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              TÉLÉCHARGER CV
            </a>

            <button
              onClick={handleClose}
              className="p-2 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors"
              title="Retourner à l'univers"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#D95D39]/20 bg-[#F4EFE6] overflow-x-auto">
          {[
            { id: 'profile', label: 'Profil & Bio' },
            { id: 'projects', label: `Projets (${PROJECTS_DATA.length})` },
            { id: 'skills', label: `Compétences (${SKILLS_DATA.length})` },
            { id: 'career', label: 'Parcours & Formation' },
            { id: 'services', label: 'Offres & Services' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playInteract();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 text-xs font-mono font-semibold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#D95D39] text-white shadow-sm'
                  : 'text-[#4A2E1B] hover:text-[#2B201A] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-[#2B201A]">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl shadow-sm">
                <h2 className="text-lg font-bold text-[#2B201A] mb-2">Présentation Synthétique</h2>
                <p className="text-[#3D2619] leading-relaxed text-sm md:text-base font-medium">
                  {IDENTITY_DATA.bio}
                </p>
                <div className="mt-4 pt-4 border-t border-[#D95D39]/15 text-xs font-mono text-[#7A583A] italic">
                  "{IDENTITY_DATA.philosophy}"
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {IDENTITY_DATA.stats.map((stat, i) => (
                  <div key={i} className="p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl text-center shadow-sm">
                    <div className="text-2xl font-extrabold font-mono text-[#D95D39]">{stat.value}</div>
                    <div className="text-xs font-mono text-[#7A583A] mt-1 uppercase font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Fast Contact Channels */}
              <div className="p-6 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl shadow-sm">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-4 font-bold">
                  Canaux de Contact Direct
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#FDFBF7] hover:bg-[#F3EDE2] border border-[#D95D39]/20 rounded-xl text-xs font-mono transition-colors shadow-sm"
                    >
                      {link.platform === 'email' && <Mail className="w-4 h-4 text-[#D95D39]" />}
                      {link.platform === 'linkedin' && <Linkedin className="w-4 h-4 text-[#D95D39]" />}
                      {link.platform === 'github' && <Github className="w-4 h-4 text-[#D95D39]" />}
                      {link.platform === 'whatsapp' && <MessageCircle className="w-4 h-4 text-[#2A9D8F]" />}
                      {link.platform === 'cv' && <Download className="w-4 h-4 text-[#D95D39]" />}
                      <span className="font-bold text-[#2B201A]">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-[#FAF7F2] border border-[#D95D39]/15 hover:border-[#D95D39]/50 rounded-2xl transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-[#D95D39]/15 text-[#D95D39] border border-[#D95D39]/30 rounded-lg font-bold">
                        {proj.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono text-[#7A583A]">{proj.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2B201A] mb-1">{proj.title}</h3>
                    <p className="text-xs text-[#4A2E1B] mb-3 font-medium">{proj.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies.slice(0, 5).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-mono bg-[#E8D5B5]/60 text-[#2B201A] rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#D95D39]/15">
                    <button
                      onClick={() => openProjectModal(proj)}
                      className="text-xs font-mono font-bold text-[#D95D39] hover:underline flex items-center gap-1"
                    >
                      Inspecter la fiche complète &rarr;
                    </button>
                    {proj.links[0] && (
                      <a
                        href={proj.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#7A583A] hover:text-[#2B201A] flex items-center gap-1 font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Lien direct
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'frontend', label: 'Frontend & UI' },
                  { id: 'backend', label: 'Backend & Cloud' },
                  { id: 'creative_3d', label: '3D & Shaders' },
                  { id: 'graphic_design', label: 'Design Graphique' },
                  { id: 'tools_devops', label: 'DevOps & Outils' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSkillCategoryFilter(cat.id as typeof skillCategoryFilter)}
                    className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-colors ${
                      skillCategoryFilter === cat.id
                        ? 'bg-[#D95D39] text-white font-bold shadow-sm'
                        : 'bg-[#FAF7F2] text-[#4A2E1B] hover:bg-[#F3EDE2] border border-[#D95D39]/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl flex flex-col justify-between shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-[#2B201A]">{skill.name}</span>
                      <span className="text-xs font-mono font-extrabold text-[#D95D39]">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[#E8D5B5] rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-[#D95D39] to-[#2A9D8F] rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#7A583A]">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CAREER */}
          {activeTab === 'career' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Experiences */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-3 flex items-center gap-2 font-bold">
                  <Briefcase className="w-4 h-4 text-[#D95D39]" />
                  Expériences Professionnelles
                </h3>
                <div className="space-y-3">
                  {EXPERIENCES_DATA.map((exp) => (
                    <div key={exp.id} className="p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between text-xs font-mono text-[#7A583A] mb-1 font-medium">
                        <span>{exp.period}</span>
                        <span>{exp.location}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#2B201A]">{exp.role}</h4>
                      <div className="text-xs font-mono text-[#D95D39] font-bold mb-2">{exp.company}</div>
                      <p className="text-xs text-[#4A2E1B] mb-3 leading-relaxed font-medium">{exp.description}</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="text-xs text-[#4A2E1B] flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#7A583A] mb-3 flex items-center gap-2 font-bold">
                  <GraduationCap className="w-4 h-4 text-[#D95D39]" />
                  Diplômes &amp; Formations
                </h3>
                <div className="space-y-3">
                  {EDUCATION_DATA.map((edu) => (
                    <div key={edu.id} className="p-4 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="text-xs font-mono text-[#7A583A] mb-1 font-medium">{edu.period}</div>
                      <h4 className="text-base font-bold text-[#2B201A]">{edu.degree}</h4>
                      <div className="text-xs font-mono text-[#2A9D8F] font-bold mb-2">{edu.institution}</div>
                      <p className="text-xs text-[#4A2E1B] leading-relaxed font-medium">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICES_DATA.map((srv) => (
                <div key={srv.id} className="p-5 bg-[#FAF7F2] border border-[#D95D39]/15 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="text-base font-bold text-[#2B201A] mb-1">{srv.title}</h3>
                    <p className="text-xs text-[#D95D39] font-mono font-bold mb-2">{srv.subtitle}</p>
                    <p className="text-xs text-[#4A2E1B] leading-relaxed mb-4 font-medium">{srv.description}</p>

                    <div className="space-y-1.5 mb-4">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="text-xs text-[#4A2E1B] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D95D39]/15 text-[11px] font-mono text-[#2A9D8F] font-bold">
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
