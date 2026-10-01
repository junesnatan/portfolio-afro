import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useDataStore } from '@/stores/useDataStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { IDENTITY_DATA } from '@/database/data';
import { ProjectData, SkillData, ProjectCategory, SkillCategory } from '@/types';
import {
  X,
  Key,
  Database,
  Cpu,
  CheckCircle,
  Mail,
  Trash2,
  Download,
  Upload,
  LogOut,
  BarChart3,
  Layers,
  FolderGit2,
  Plus,
  Edit3,
  Eye,
  RotateCcw,
  Save,
  Search,
  Sparkles,
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const isOpen = useUIStore((s) => s.isAdminOpen);
  const closeAdminModal = useUIStore((s) => s.closeAdminModal);
  const messages = useUIStore((s) => s.adminMessages);
  const markMessageRead = useUIStore((s) => s.markMessageRead);
  const deleteMessage = useUIStore((s) => s.deleteMessage);
  const showNotification = useUIStore((s) => s.showNotification);
  const openProjectModal = useUIStore((s) => s.openProjectModal);

  // Data Store CRUD hooks
  const projects = useDataStore((s) => s.projects);
  const skills = useDataStore((s) => s.skills);
  const addProject = useDataStore((s) => s.addProject);
  const updateProject = useDataStore((s) => s.updateProject);
  const deleteProject = useDataStore((s) => s.deleteProject);
  const addSkill = useDataStore((s) => s.addSkill);
  const updateSkill = useDataStore((s) => s.updateSkill);
  const deleteSkill = useDataStore((s) => s.deleteSkill);
  const resetToDefault = useDataStore((s) => s.resetToDefault);
  const importAllData = useDataStore((s) => s.importAllData);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'projects' | 'skills' | 'export'>('overview');

  // Search & Filter states
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>('all');

  // Project ADD / EDIT Modal State
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectFormMode, setProjectFormMode] = useState<'create' | 'edit'>('create');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    tagline: '',
    category: 'fullstack' as ProjectCategory,
    role: '',
    year: '2025',
    featured: true,
    description: '',
    technologies: 'TypeScript, React, Node.js',
    features: '',
    metric1Label: '',
    metric1Value: '',
    metric2Label: '',
    metric2Value: '',
    liveUrl: '',
    githubUrl: '',
  });

  // Skill ADD / EDIT Modal State
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [skillFormMode, setSkillFormMode] = useState<'create' | 'edit'>('create');
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillFormData, setSkillFormData] = useState({
    name: '',
    category: 'frontend' as SkillCategory,
    level: 85,
    description: '',
  });

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const playInteract = useAudioStore((s) => s.playInteract);
  const playSuccess = useAudioStore((s) => s.playSuccess);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = ['admin', 'junes2025', 'studio', 'agassounon', 'junes'];
    if (validPasswords.includes(passwordInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setErrorMsg('');
      playSuccess();
      showNotification('CONNEXION ADMIN VALIDÉE', 'Bienvenue sur la console d\'administration Junes AGASSOUNON.');
    } else {
      setErrorMsg('Code d\'accès incorrect. (Indice : admin)');
      playInteract();
    }
  };

  const handleClose = () => {
    playInteract();
    closeAdminModal();
  };

  // --- PROJECT CRUD HANDLERS ---
  const handleOpenCreateProject = () => {
    playInteract();
    setProjectFormMode('create');
    setEditingProjectId(null);
    setProjectFormData({
      title: '',
      tagline: '',
      category: 'fullstack',
      role: 'Full-Stack Developer & Architect',
      year: new Date().getFullYear().toString(),
      featured: true,
      description: '',
      technologies: 'TypeScript, React, TailwindCSS',
      features: 'Architecture modulaire et scalable\nInterface réactive haute performance',
      metric1Label: 'Performance',
      metric1Value: '99/100',
      metric2Label: 'Disponibilité',
      metric2Value: '99.9%',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (p: ProjectData) => {
    playInteract();
    setProjectFormMode('edit');
    setEditingProjectId(p.id);
    setProjectFormData({
      title: p.title,
      tagline: p.tagline,
      category: p.category,
      role: p.role,
      year: p.year,
      featured: p.featured,
      description: p.description,
      technologies: p.technologies.join(', '),
      features: p.features.join('\n'),
      metric1Label: p.metrics[0]?.label || '',
      metric1Value: p.metrics[0]?.value || '',
      metric2Label: p.metrics[1]?.label || '',
      metric2Value: p.metrics[1]?.value || '',
      liveUrl: p.links.find((l) => l.type === 'live')?.url || '',
      githubUrl: p.links.find((l) => l.type === 'github')?.url || '',
    });
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) return;

    const techArray = projectFormData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const featArray = projectFormData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const metrics = [];
    if (projectFormData.metric1Label && projectFormData.metric1Value) {
      metrics.push({ label: projectFormData.metric1Label, value: projectFormData.metric1Value });
    }
    if (projectFormData.metric2Label && projectFormData.metric2Value) {
      metrics.push({ label: projectFormData.metric2Label, value: projectFormData.metric2Value });
    }

    const links = [];
    if (projectFormData.liveUrl) {
      links.push({ label: 'Live Demo', url: projectFormData.liveUrl, type: 'live' as const });
    }
    if (projectFormData.githubUrl) {
      links.push({ label: 'GitHub Repository', url: projectFormData.githubUrl, type: 'github' as const });
    }

    if (projectFormMode === 'create') {
      const slug = projectFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newProj: ProjectData = {
        id: slug + '-' + Date.now().toString().slice(-4),
        slug: slug,
        title: projectFormData.title,
        tagline: projectFormData.tagline,
        category: projectFormData.category,
        role: projectFormData.role,
        year: projectFormData.year,
        featured: projectFormData.featured,
        description: projectFormData.description,
        technologies: techArray.length > 0 ? techArray : ['TypeScript'],
        features: featArray.length > 0 ? featArray : ['Conception soignée'],
        metrics: metrics.length > 0 ? metrics : [{ label: 'Statut', value: 'Déployé' }],
        links: links.length > 0 ? links : [{ label: 'GitHub', url: 'https://github.com', type: 'github' }],
        thumbnail: '/assets/projects/agripulse.webp',
        galleryImages: [],
        zonePlacement: {
          zone: 'projectdistrict',
          position: [0, 0, 0],
        },
      };
      addProject(newProj);
      playSuccess();
      showNotification('PROJET AJOUTÉ', `Le projet "${newProj.title}" a été ajouté.`);
    } else if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectFormData.title,
        tagline: projectFormData.tagline,
        category: projectFormData.category,
        role: projectFormData.role,
        year: projectFormData.year,
        featured: projectFormData.featured,
        description: projectFormData.description,
        technologies: techArray,
        features: featArray,
        metrics,
        links,
      });
      playSuccess();
      showNotification('PROJET MODIFIÉ', `Le projet "${projectFormData.title}" a été mis à jour.`);
    }

    setIsProjectFormOpen(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression du projet "${title}" ?`)) {
      playInteract();
      deleteProject(id);
      showNotification('PROJET SUPPRIMÉ', `Le projet "${title}" a été supprimé.`);
    }
  };

  // --- SKILL CRUD HANDLERS ---
  const handleOpenCreateSkill = () => {
    playInteract();
    setSkillFormMode('create');
    setEditingSkillId(null);
    setSkillFormData({
      name: '',
      category: 'frontend',
      level: 80,
      description: 'Maîtrise technique approfondie et application en production.',
    });
    setIsSkillFormOpen(true);
  };

  const handleOpenEditSkill = (s: SkillData) => {
    playInteract();
    setSkillFormMode('edit');
    setEditingSkillId(s.id);
    setSkillFormData({
      name: s.name,
      category: s.category,
      level: s.level,
      description: s.description,
    });
    setIsSkillFormOpen(true);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillFormData.name.trim()) return;

    if (skillFormMode === 'create') {
      const slug = skillFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newSkill: SkillData = {
        id: slug + '-' + Date.now().toString().slice(-4),
        name: skillFormData.name,
        category: skillFormData.category,
        level: skillFormData.level,
        description: skillFormData.description,
        icon: 'Code',
        highlighted: skillFormData.level >= 85,
      };
      addSkill(newSkill);
      playSuccess();
      showNotification('COMPÉTENCE AJOUTÉE', `La compétence "${newSkill.name}" a été ajoutée.`);
    } else if (editingSkillId) {
      updateSkill(editingSkillId, {
        name: skillFormData.name,
        category: skillFormData.category,
        level: skillFormData.level,
        description: skillFormData.description,
      });
      playSuccess();
      showNotification('COMPÉTENCE MODIFIÉE', `La compétence "${skillFormData.name}" a été mise à jour.`);
    }

    setIsSkillFormOpen(false);
  };

  const handleDeleteSkill = (id: string, name: string) => {
    if (window.confirm(`Supprimer la compétence "${name}" ?`)) {
      playInteract();
      deleteSkill(id);
      showNotification('COMPÉTENCE SUPPRIMÉE', `La compétence "${name}" a été supprimée.`);
    }
  };

  // --- EXPORT & IMPORT JSON ---
  const handleExportJSON = () => {
    playSuccess();
    const exportData = {
      exportDate: new Date().toISOString(),
      identity: IDENTITY_DATA,
      projects,
      skills,
      messagesReceived: messages,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `junes-agassounon-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('DONNÉES EXPORTÉES', 'Le fichier JSON complet a été téléchargé.');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.projects && !parsed.skills) {
        setImportStatus('Erreur : format JSON non reconnu (attendu : { projects, skills }).');
        return;
      }
      importAllData(parsed);
      playSuccess();
      setImportStatus('Importation réussie avec succès ! Données rechargées.');
      showNotification('IMPORT TERMINÉ', 'Les données du portfolio ont été mises à jour.');
      setImportJsonText('');
    } catch {
      setImportStatus('Erreur de syntaxe JSON. Veuillez vérifier votre texte.');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Voulez-vous réinitialiser tous les projets et compétences aux valeurs originales ?')) {
      resetToDefault();
      playSuccess();
      showNotification('RÉINITIALISATION', 'Le portfolio a été restauré avec ses données initiales.');
    }
  };

  if (!isOpen) return null;

  // Filtered lists
  const filteredProjects = projects.filter((p) => {
    const matchCategory = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
    const matchSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase())) ||
      p.role.toLowerCase().includes(projectSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  const filteredSkills = skills.filter((s) => {
    return skillCategoryFilter === 'all' || s.category === skillCategoryFilter;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl max-h-[92vh] h-[92vh] bg-[#FDFBF7] border-t-2 sm:border-2 border-[#D95D39]/30 rounded-t-[26px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#2B201A]">
        {/* Mobile Sheet Drag Handle */}
        <div className="w-10 h-1 bg-[#D95D39]/30 rounded-full mx-auto my-1.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#D95D39]/20 bg-[#FAF7F2] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D95D39] to-[#E76F51] text-white flex items-center justify-center font-mono font-bold shadow-md shrink-0">
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-xs sm:text-base md:text-lg font-extrabold text-[#2B201A] tracking-wide truncate">
                  CONSOLE D'ADMINISTRATION CMS
                </h2>
                <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono font-bold uppercase bg-[#D95D39]/15 text-[#D95D39] rounded-full shrink-0">
                  CRUD
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-[#7A583A] truncate hidden sm:block">
                Gestion des Projets, Compétences, Messages &amp; Sauvegardes
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 text-[#7A583A] hover:text-[#2B201A] rounded-xl hover:bg-[#F3EDE2] transition-colors active:scale-95 shrink-0"
            title="Fermer la console"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-8 max-w-md mx-auto my-auto text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D95D39]/15 border border-[#D95D39]/30 flex items-center justify-center text-[#D95D39] mx-auto mb-2 shadow-sm">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2B201A]">Authentification Requise</h3>
            <p className="text-xs text-[#7A583A] leading-relaxed">
              Veuillez saisir votre code d'accès administrateur pour déverrouiller la console de gestion Junes AGASSOUNON.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                autoFocus
                placeholder="Entrez votre mot de passe..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#D95D39]/25 rounded-xl text-sm text-center text-[#2B201A] focus:outline-none focus:border-[#D95D39] font-mono"
              />
              {errorMsg ? (
                <div className="text-xs text-rose-600 font-mono font-bold">{errorMsg}</div>
              ) : (
                <div className="text-[11px] text-[#7A583A] font-mono">
                  Code par défaut : <span className="font-bold text-[#D95D39]">admin</span>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                DÉVERROUILLER LA CONSOLE
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 px-4 md:px-6 py-2 border-b border-[#D95D39]/20 bg-[#F4EFE6] overflow-x-auto">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                { id: 'projects', label: `Projets (${projects.length})`, icon: FolderGit2 },
                { id: 'skills', label: `Compétences (${skills.length})`, icon: Layers },
                { id: 'messages', label: `Messages (${messages.length})`, count: unreadCount, icon: Mail },
                { id: 'export', label: 'Import / Export', icon: Download },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playInteract();
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl transition-colors shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-[#D95D39] text-white font-bold shadow-sm'
                        : 'text-[#4A2E1B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="px-1.5 py-0.2 bg-emerald-400 text-[#14172B] font-extrabold text-[9px] rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPasswordInput('');
                  playInteract();
                }}
                className="ml-auto text-[11px] font-mono text-[#7A583A] hover:text-rose-600 flex items-center gap-1 px-2.5 py-1 rounded-lg"
                title="Verrouiller la console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verrouiller</span>
              </button>
            </div>

            {/* Content Tabs */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 text-[#2B201A]">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="text-[10px] font-mono text-[#7A583A] uppercase font-bold">PROJETS ACTIFS</div>
                      <div className="text-2xl font-extrabold font-mono text-[#D95D39] mt-1">{projects.length}</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">Éditables en direct</div>
                    </div>
                    <div className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="text-[10px] font-mono text-[#7A583A] uppercase font-bold">COMPÉTENCES</div>
                      <div className="text-2xl font-extrabold font-mono text-[#2A9D8F] mt-1">{skills.length}</div>
                      <div className="text-[10px] font-mono text-gray-500 mt-1">5 catégories</div>
                    </div>
                    <div className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="text-[10px] font-mono text-[#7A583A] uppercase font-bold">MESSAGES CLIENTS</div>
                      <div className="text-2xl font-extrabold font-mono text-amber-600 mt-1">{messages.length}</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">{unreadCount} non lus</div>
                    </div>
                    <div className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm">
                      <div className="text-[10px] font-mono text-[#7A583A] uppercase font-bold">PERFORMANCE WEB</div>
                      <div className="text-2xl font-extrabold font-mono text-indigo-600 mt-1">60 FPS</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">100% Vectoriel SVG</div>
                    </div>
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="p-5 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7A583A] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D95D39]" />
                      Actions Rapides du CMS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                      <button
                        onClick={handleOpenCreateProject}
                        className="p-3 bg-[#FAF7F2] hover:bg-[#F3EDE2] rounded-xl border border-[#D95D39]/20 font-bold text-[#D95D39] flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Ajouter un Projet</span>
                      </button>
                      <button
                        onClick={handleOpenCreateSkill}
                        className="p-3 bg-[#FAF7F2] hover:bg-[#F3EDE2] rounded-xl border border-[#2A9D8F]/20 font-bold text-[#2A9D8F] flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Ajouter une Compétence</span>
                      </button>
                      <button
                        onClick={handleExportJSON}
                        className="p-3 bg-[#FAF7F2] hover:bg-[#F3EDE2] rounded-xl border border-amber-600/20 font-bold text-amber-700 flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger Sauvegarde JSON</span>
                      </button>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="p-5 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7A583A] flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#D95D39]" />
                      Statut du Système &amp; Persistance
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                      <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#D95D39]/10">
                        <span className="text-gray-500">Persistance :</span>
                        <div className="font-bold text-emerald-600">LocalStorage Active</div>
                      </div>
                      <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#D95D39]/10">
                        <span className="text-gray-500">Moteur Audio :</span>
                        <div className="font-bold text-emerald-600">Web Audio Synth</div>
                      </div>
                      <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#D95D39]/10">
                        <span className="text-gray-500">Mise à jour live :</span>
                        <div className="font-bold text-[#2A9D8F]">Instantanée</div>
                      </div>
                      <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#D95D39]/10">
                        <span className="text-gray-500">Quête Cauris :</span>
                        <div className="font-bold text-amber-600">4/4 Déployés</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS CRUD */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {/* Top Bar: Search, Category Filter, and Add Button */}
                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between bg-white p-3 rounded-2xl border border-[#D95D39]/15 shadow-sm">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Rechercher par titre, tech ou rôle..."
                          value={projectSearch}
                          onChange={(e) => setProjectSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F2] border border-[#D95D39]/20 rounded-xl text-xs focus:outline-none focus:border-[#D95D39]"
                        />
                      </div>
                      <select
                        value={projectCategoryFilter}
                        onChange={(e) => setProjectCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 bg-[#FAF7F2] border border-[#D95D39]/20 rounded-xl text-xs font-mono focus:outline-none"
                      >
                        <option value="all">Toutes catégories</option>
                        <option value="fullstack">Full-Stack</option>
                        <option value="frontend">Front-End</option>
                        <option value="mobile">Mobile</option>
                        <option value="graphic_design">Design Graphique</option>
                        <option value="creative_dev">Creative Tech</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleOpenCreateProject}
                        className="px-4 py-2 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>AJOUTER UN PROJET</span>
                      </button>
                    </div>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-3">
                    {filteredProjects.length === 0 ? (
                      <div className="p-8 text-center bg-white rounded-2xl border border-[#D95D39]/15 text-gray-400 font-mono text-xs">
                        Aucun projet correspondant trouvé.
                      </div>
                    ) : (
                      filteredProjects.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#D95D39]/40 transition-colors"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-extrabold text-[#2B201A]">{p.title}</h3>
                              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#D95D39]/15 text-[#D95D39] rounded-md">
                                {p.category.replace('_', ' ')}
                              </span>
                              <span className="text-[10px] font-mono text-gray-500">
                                {p.role} • {p.year}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{p.tagline}</p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {p.technologies.slice(0, 5).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-[#FAF7F2] border border-[#D95D39]/15 text-[10px] font-mono rounded-md text-[#7A583A]"
                                >
                                  {tech}
                                </span>
                              ))}
                              {p.technologies.length > 5 && (
                                <span className="text-[10px] font-mono text-gray-400 self-center">
                                  +{p.technologies.length - 5}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons: Preview, Edit, Delete */}
                          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-gray-100">
                            <button
                              onClick={() => {
                                playInteract();
                                openProjectModal(p);
                              }}
                              className="px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D95D39]/20 text-[#2B201A] rounded-xl text-xs font-mono font-bold flex items-center gap-1"
                              title="Prévisualiser dans le portfolio"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#2A9D8F]" />
                              <span>Voir</span>
                            </button>
                            <button
                              onClick={() => handleOpenEditProject(p)}
                              className="px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D95D39]/20 text-[#D95D39] rounded-xl text-xs font-mono font-bold flex items-center gap-1"
                              title="Modifier ce projet"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id, p.title)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                              title="Supprimer ce projet"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS CRUD */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  {/* Category Filter and Add Skill Button */}
                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between bg-white p-3 rounded-2xl border border-[#D95D39]/15 shadow-sm">
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      {[
                        { id: 'all', label: 'Toutes' },
                        { id: 'frontend', label: 'Front-End' },
                        { id: 'backend', label: 'Back-End' },
                        { id: 'graphic_design', label: 'Design Graphique' },
                        { id: 'creative_3d', label: '3D & Créatif' },
                        { id: 'tools_devops', label: 'DevOps & Outils' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            playInteract();
                            setSkillCategoryFilter(cat.id);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-colors shrink-0 ${
                            skillCategoryFilter === cat.id
                              ? 'bg-[#2A9D8F] text-white shadow-sm'
                              : 'bg-[#FAF7F2] text-[#4A2E1B] hover:bg-[#F3EDE2]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleOpenCreateSkill}
                      className="px-4 py-2 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-mono font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>AJOUTER UNE COMPÉTENCE</span>
                    </button>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredSkills.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 bg-white border border-[#D95D39]/15 rounded-2xl shadow-sm space-y-2.5 hover:border-[#2A9D8F]/40 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-extrabold text-sm text-[#2B201A]">{s.name}</h4>
                            <span className="text-[10px] font-mono uppercase text-[#7A583A]">
                              {s.category.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-sm font-mono font-extrabold text-[#D95D39]">{s.level}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#D95D39]/10">
                          <div
                            className="h-full bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#2A9D8F] rounded-full"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{s.description}</p>

                        <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-gray-100">
                          <button
                            onClick={() => handleOpenEditSkill(s)}
                            className="px-2 py-1 text-xs font-mono font-bold text-[#2A9D8F] hover:bg-emerald-50 rounded-lg flex items-center gap-1"
                            title="Modifier"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(s.id, s.name)}
                            className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-[#D95D39]/15 text-gray-400 font-mono text-xs">
                      Aucun message pour le moment.
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 bg-white border rounded-2xl shadow-sm transition-all ${
                          msg.read ? 'border-[#D95D39]/15 opacity-90' : 'border-[#D95D39]/40 ring-1 ring-[#D95D39]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[#D95D39] text-sm">{msg.name}</span>
                            <span className="text-gray-500 font-medium">({msg.email})</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-amber-100 text-amber-800 rounded-full">
                                NOUVEAU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7A583A]">{msg.date}</span>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-bold text-[#2B201A] mb-1 font-mono">
                            Objet : {msg.subject}
                          </div>
                        )}

                        <p className="text-xs text-[#3D2619] bg-[#FAF7F2] p-3 rounded-xl border border-[#D95D39]/10 leading-relaxed font-medium mb-3">
                          « {msg.message} »
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs font-mono">
                          <div className="flex gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Votre message')}`}
                              className="flex items-center gap-1 px-3 py-1 bg-[#2A9D8F] text-white rounded-xl text-[11px] font-bold hover:bg-[#238276] transition-colors"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Répondre par email</span>
                            </a>
                            {!msg.read && (
                              <button
                                onClick={() => {
                                  playSuccess();
                                  markMessageRead(msg.id);
                                }}
                                className="flex items-center gap-1 px-3 py-1 bg-[#FAF7F2] border border-[#D95D39]/20 text-[#2B201A] rounded-xl text-[11px] font-bold hover:bg-[#F3EDE2]"
                              >
                                <CheckCircle className="w-3 h-3 text-[#2A9D8F]" />
                                <span>Marquer comme lu</span>
                              </button>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              playInteract();
                              deleteMessage(msg.id);
                            }}
                            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="Supprimer ce message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 5: IMPORT / EXPORT & RESET */}
              {activeTab === 'export' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Export Box */}
                  <div className="p-6 bg-white border border-[#D95D39]/15 rounded-2xl text-center space-y-3 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-[#2A9D8F] mx-auto">
                      <Download className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#2B201A]">Exporter l'intégralité du Portfolio</h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-mono">
                      Générez et téléchargez une sauvegarde JSON contenant tous vos projets créés, compétences modifiées et messages clients.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
                    >
                      <Download className="w-4 h-4" />
                      <span>TÉLÉCHARGER LE FICHIER JSON</span>
                    </button>
                  </div>

                  {/* Import Box */}
                  <div className="p-6 bg-white border border-[#D95D39]/15 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-[#D95D39]" />
                      <h3 className="text-sm font-bold text-[#2B201A]">Importer des Données JSON</h3>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">
                      Collez ci-dessous le contenu d'un fichier JSON exporté pour restaurer ou synchroniser le portfolio :
                    </p>
                    <textarea
                      rows={4}
                      placeholder='{ "projects": [...], "skills": [...] }'
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      className="w-full p-3 bg-[#FAF7F2] border border-[#D95D39]/20 rounded-xl text-xs font-mono focus:outline-none focus:border-[#D95D39]"
                    />
                    {importStatus && (
                      <div className="text-xs font-mono font-bold text-[#D95D39]">{importStatus}</div>
                    )}
                    <button
                      onClick={handleImportJSON}
                      disabled={!importJsonText.trim()}
                      className="px-5 py-2 bg-[#D95D39] disabled:opacity-40 text-white font-mono font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>IMPORTER ET METTRE À JOUR</span>
                    </button>
                  </div>

                  {/* Reset Box */}
                  <div className="p-5 bg-rose-50/50 border border-rose-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold font-mono text-rose-800">Zone de Réinitialisation</h4>
                      <p className="text-[11px] text-rose-600 font-mono">
                        Rétablir les projets et compétences par défaut définis dans le code source.
                      </p>
                    </div>
                    <button
                      onClick={handleResetToDefault}
                      className="px-3 py-1.5 border border-rose-300 bg-white hover:bg-rose-100 text-rose-700 font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Réinitialiser</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUB-MODAL 1: ADD / EDIT PROJECT                          */}
        {/* ======================================================== */}
        {isProjectFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 bg-black/80 animate-fadeIn">
            <div className="bg-[#FDFBF7] border-2 border-[#D95D39] rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden text-[#2B201A]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#D95D39]/20 bg-[#FAF7F2]">
                <h3 className="font-extrabold text-base text-[#D95D39]">
                  {projectFormMode === 'create' ? '+ AJOUTER UN NOUVEAU PROJET' : 'MODIFIER LE PROJET'}
                </h3>
                <button
                  onClick={() => setIsProjectFormOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Titre du Projet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: AGRI-PULSE PLATFORM"
                      value={projectFormData.title}
                      onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none focus:border-[#D95D39]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Catégorie *</label>
                    <select
                      value={projectFormData.category}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, category: e.target.value as ProjectCategory })
                      }
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none"
                    >
                      <option value="fullstack">Full-Stack</option>
                      <option value="frontend">Front-End</option>
                      <option value="mobile">Mobile</option>
                      <option value="graphic_design">Design Graphique</option>
                      <option value="creative_dev">Creative Dev</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Accroche / Tagline *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: SaaS d'analyse agronomique par capteurs IoT en temps réel"
                    value={projectFormData.tagline}
                    onChange={(e) => setProjectFormData({ ...projectFormData, tagline: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none focus:border-[#D95D39]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Rôle *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Lead Architect & Full-Stack"
                      value={projectFormData.role}
                      onChange={(e) => setProjectFormData({ ...projectFormData, role: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Année *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 2025"
                      value={projectFormData.year}
                      onChange={(e) => setProjectFormData({ ...projectFormData, year: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Description Détaillée</label>
                  <textarea
                    rows={3}
                    placeholder="Description complète des enjeux et de la solution technique..."
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Technologies (séparées par une virgule)</label>
                  <input
                    type="text"
                    placeholder="TypeScript, React, Node.js, Three.js, PostgreSQL"
                    value={projectFormData.technologies}
                    onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Fonctionnalités Clés (1 par ligne)</label>
                  <textarea
                    rows={3}
                    placeholder="Ingestion de télémétrie en temps réel&#10;Architecture micro-services isolée"
                    value={projectFormData.features}
                    onChange={(e) => setProjectFormData({ ...projectFormData, features: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Métrique 1 (Label / Valeur)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        placeholder="Label (ex: Latence)"
                        value={projectFormData.metric1Label}
                        onChange={(e) => setProjectFormData({ ...projectFormData, metric1Label: e.target.value })}
                        className="p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Valeur (ex: < 40ms)"
                        value={projectFormData.metric1Value}
                        onChange={(e) => setProjectFormData({ ...projectFormData, metric1Value: e.target.value })}
                        className="p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Métrique 2 (Label / Valeur)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        placeholder="Label (ex: Utilisateurs)"
                        value={projectFormData.metric2Label}
                        onChange={(e) => setProjectFormData({ ...projectFormData, metric2Label: e.target.value })}
                        className="p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Valeur (ex: +10 000)"
                        value={projectFormData.metric2Value}
                        onChange={(e) => setProjectFormData({ ...projectFormData, metric2Value: e.target.value })}
                        className="p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">URL Démo Live</label>
                    <input
                      type="url"
                      placeholder="https://mon-projet.com"
                      value={projectFormData.liveUrl}
                      onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">URL GitHub</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={projectFormData.githubUrl}
                      onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D95D39]/25 rounded-xl text-[11px]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProjectFormOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>ENREGISTRER LE PROJET</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUB-MODAL 2: ADD / EDIT SKILL                            */}
        {/* ======================================================== */}
        {isSkillFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 bg-black/80 animate-fadeIn">
            <div className="bg-[#FDFBF7] border-2 border-[#2A9D8F] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden text-[#2B201A]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A9D8F]/20 bg-[#FAF7F2]">
                <h3 className="font-extrabold text-base text-[#2A9D8F]">
                  {skillFormMode === 'create' ? '+ AJOUTER UNE COMPÉTENCE' : 'MODIFIER LA COMPÉTENCE'}
                </h3>
                <button
                  onClick={() => setIsSkillFormOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="p-6 space-y-4 text-xs font-mono">
                <div>
                  <label className="block font-bold mb-1">Nom de la Compétence *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Rust & WebAssembly"
                    value={skillFormData.name}
                    onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                    className="w-full p-2 bg-white border border-[#2A9D8F]/30 rounded-xl focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Catégorie *</label>
                  <select
                    value={skillFormData.category}
                    onChange={(e) =>
                      setSkillFormData({ ...skillFormData, category: e.target.value as SkillCategory })
                    }
                    className="w-full p-2 bg-white border border-[#2A9D8F]/30 rounded-xl focus:outline-none"
                  >
                    <option value="frontend">Front-End (React, Three.js...)</option>
                    <option value="backend">Back-End (Node, Go, SQL...)</option>
                    <option value="graphic_design">Design Graphique &amp; Typo</option>
                    <option value="creative_3d">3D Temps Réel &amp; Shaders</option>
                    <option value="tools_devops">DevOps, Docker, Git</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold">Niveau de Maîtrise (%) *</label>
                    <span className="font-extrabold text-sm text-[#2A9D8F]">{skillFormData.level}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={skillFormData.level}
                    onChange={(e) => setSkillFormData({ ...skillFormData, level: parseInt(e.target.value) })}
                    className="w-full accent-[#2A9D8F] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Description Pratique</label>
                  <textarea
                    rows={3}
                    placeholder="Usage en production, frameworks maîtrisés..."
                    value={skillFormData.description}
                    onChange={(e) => setSkillFormData({ ...skillFormData, description: e.target.value })}
                    className="w-full p-2 bg-white border border-[#2A9D8F]/30 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSkillFormOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>ENREGISTRER</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
