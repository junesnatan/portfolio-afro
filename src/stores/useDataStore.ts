import { create } from 'zustand';
import { ProjectData, SkillData } from '@/types';
import { PROJECTS_DATA, SKILLS_DATA } from '@/database/data';

const STORAGE_PROJECTS_KEY = 'ja_portfolio_projects_v2';
const STORAGE_SKILLS_KEY = 'ja_portfolio_skills_v2';

function loadProjectsFromStorage(): ProjectData[] {
  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse projects from storage', e);
  }
  return PROJECTS_DATA;
}

function loadSkillsFromStorage(): SkillData[] {
  try {
    const raw = localStorage.getItem(STORAGE_SKILLS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse skills from storage', e);
  }
  return SKILLS_DATA;
}

interface DataStore {
  projects: ProjectData[];
  skills: SkillData[];

  // Projects CRUD
  addProject: (project: ProjectData) => void;
  updateProject: (id: string, updated: Partial<ProjectData>) => void;
  deleteProject: (id: string) => void;

  // Skills CRUD
  addSkill: (skill: SkillData) => void;
  updateSkill: (id: string, updated: Partial<SkillData>) => void;
  deleteSkill: (id: string) => void;

  // Global actions
  resetToDefault: () => void;
  importAllData: (data: { projects?: ProjectData[]; skills?: SkillData[] }) => void;
}

export const useDataStore = create<DataStore>((set, get) => ({
  projects: loadProjectsFromStorage(),
  skills: loadSkillsFromStorage(),

  addProject: (project) => {
    const next = [project, ...get().projects];
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ projects: next });
  },

  updateProject: (id, updated) => {
    const next = get().projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ projects: next });
  },

  deleteProject: (id) => {
    const next = get().projects.filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ projects: next });
  },

  addSkill: (skill) => {
    const next = [...get().skills, skill];
    try {
      localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ skills: next });
  },

  updateSkill: (id, updated) => {
    const next = get().skills.map((s) => (s.id === id ? { ...s, ...updated } : s));
    try {
      localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ skills: next });
  },

  deleteSkill: (id) => {
    const next = get().skills.filter((s) => s.id !== id);
    try {
      localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    set({ skills: next });
  },

  resetToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_PROJECTS_KEY);
      localStorage.removeItem(STORAGE_SKILLS_KEY);
    } catch (e) {
      console.error(e);
    }
    set({ projects: PROJECTS_DATA, skills: SKILLS_DATA });
  },

  importAllData: (data) => {
    const nextProjects = data.projects && Array.isArray(data.projects) ? data.projects : get().projects;
    const nextSkills = data.skills && Array.isArray(data.skills) ? data.skills : get().skills;
    try {
      if (data.projects) localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(nextProjects));
      if (data.skills) localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(nextSkills));
    } catch (e) {
      console.error(e);
    }
    set({ projects: nextProjects, skills: nextSkills });
  },
}));
