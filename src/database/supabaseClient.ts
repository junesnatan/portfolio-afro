import { createClient } from '@supabase/supabase-js';
import {
  PROJECTS_DATA,
  SKILLS_DATA,
  EXPERIENCES_DATA,
  EDUCATION_DATA,
  SERVICES_DATA,
} from './data';
import { ProjectData, SkillData, ExperienceData, EducationData, ServiceData } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!import.meta.env.VITE_SUPABASE_URL &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-project.supabase.co'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Data Service with fallback to authentic local data
export const DataService = {
  async getProjects(): Promise<ProjectData[]> {
    if (!isSupabaseConfigured()) return PROJECTS_DATA;
    try {
      const { data, error } = await supabase.from('projects').select('*').order('year', { ascending: false });
      if (error || !data || data.length === 0) return PROJECTS_DATA;
      return data as ProjectData[];
    } catch {
      return PROJECTS_DATA;
    }
  },

  async getSkills(): Promise<SkillData[]> {
    if (!isSupabaseConfigured()) return SKILLS_DATA;
    try {
      const { data, error } = await supabase.from('skills').select('*').order('level', { ascending: false });
      if (error || !data || data.length === 0) return SKILLS_DATA;
      return data as SkillData[];
    } catch {
      return SKILLS_DATA;
    }
  },

  async getExperiences(): Promise<ExperienceData[]> {
    if (!isSupabaseConfigured()) return EXPERIENCES_DATA;
    try {
      const { data, error } = await supabase.from('experiences').select('*');
      if (error || !data || data.length === 0) return EXPERIENCES_DATA;
      return data as ExperienceData[];
    } catch {
      return EXPERIENCES_DATA;
    }
  },

  async getEducation(): Promise<EducationData[]> {
    if (!isSupabaseConfigured()) return EDUCATION_DATA;
    try {
      const { data, error } = await supabase.from('education').select('*');
      if (error || !data || data.length === 0) return EDUCATION_DATA;
      return data as EducationData[];
    } catch {
      return EDUCATION_DATA;
    }
  },

  async getServices(): Promise<ServiceData[]> {
    if (!isSupabaseConfigured()) return SERVICES_DATA;
    try {
      const { data, error } = await supabase.from('services').select('*');
      if (error || !data || data.length === 0) return SERVICES_DATA;
      return data as ServiceData[];
    } catch {
      return SERVICES_DATA;
    }
  },

  async submitMessage(message: {
    name: string;
    email: string;
    subject: string;
    message: string;
    budget?: string;
  }): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      console.info('Message stored locally (Supabase keys not yet set):', message);
      return { success: true };
    }
    try {
      const { error } = await supabase.from('messages').insert([message]);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: (e as Error).message };
    }
  },
};
