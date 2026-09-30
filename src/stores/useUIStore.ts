import { create } from 'zustand';
import { ProjectData, InteractableObject } from '@/types';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}

export type ActiveModal =
  | null
  | 'project_detail'
  | 'contact'
  | 'recruiter_mode'
  | 'settings'
  | 'controls'
  | 'signature_cinematic';

interface UIStore {
  // Modals & Panels
  activeModal: ActiveModal;
  selectedProject: ProjectData | null;
  openProjectModal: (project: ProjectData) => void;
  openContactModal: () => void;
  openSettingsModal: () => void;
  openControlsModal: () => void;
  openSignatureCinematic: () => void;
  closeModal: () => void;

  // Admin CMS Modal
  isAdminOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  adminMessages: AdminMessage[];
  addAdminMessage: (msg: { name: string; email: string; message: string; subject?: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Recruiter Mode Toggle
  isRecruiterMode: boolean;
  toggleRecruiterMode: (force?: boolean) => void;

  // In-Game Interaction Prompts
  nearbyInteractable: InteractableObject | null;
  setNearbyInteractable: (interactable: InteractableObject | null) => void;

  // Onscreen notifications
  notification: { title: string; subtitle?: string } | null;
  showNotification: (title: string, subtitle?: string) => void;
  clearNotification: () => void;

  // Performance HUD
  showFpsCounter: boolean;
  toggleFpsCounter: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeModal: null,
  selectedProject: null,

  openProjectModal: (project) =>
    set({ activeModal: 'project_detail', selectedProject: project }),

  openContactModal: () =>
    set({ activeModal: 'contact' }),

  openSettingsModal: () =>
    set({ activeModal: 'settings' }),

  openControlsModal: () =>
    set({ activeModal: 'controls' }),

  openSignatureCinematic: () =>
    set({ activeModal: 'signature_cinematic' }),

  closeModal: () =>
    set({ activeModal: null, selectedProject: null }),

  // Admin CMS Modal
  isAdminOpen: false,
  openAdminModal: () => set({ isAdminOpen: true }),
  closeAdminModal: () => set({ isAdminOpen: false }),
  adminMessages: [
    {
      id: '1',
      name: 'Claire V.',
      email: 'claire.v@studio-artefact.fr',
      subject: 'Opportunité Lead Creative Tech',
      message: 'Bonjour Junes, votre portfolio est exceptionnel. Nous recherchons un profil hybride Full-Stack & Creative Developer pour piloter nos nouvelles expériences web.',
      date: 'Aujourd\'hui 14:20',
      read: false,
    },
    {
      id: '2',
      name: 'Thomas Morel',
      email: 't.morel@agritech-ventures.com',
      subject: 'Collaboration SaaS IoT Agri-Pulse',
      message: 'Nous serions très intéressés pour collaborer sur une architecture similaire à Agri-Pulse pour la télémétrie de nos capteurs connectés en Afrique de l\'Ouest.',
      date: 'Hier 18:45',
      read: true,
    },
  ],
  addAdminMessage: (msg) =>
    set((state) => ({
      adminMessages: [
        {
          id: Date.now().toString(),
          name: msg.name,
          email: msg.email,
          subject: msg.subject || 'Nouveau contact via Portfolio',
          message: msg.message,
          date: 'À l\'instant',
          read: false,
        },
        ...state.adminMessages,
      ],
    })),
  markMessageRead: (id) =>
    set((state) => ({
      adminMessages: state.adminMessages.map((m) =>
        m.id === id ? { ...m, read: true } : m
      ),
    })),
  deleteMessage: (id) =>
    set((state) => ({
      adminMessages: state.adminMessages.filter((m) => m.id !== id),
    })),

  isRecruiterMode: false,
  toggleRecruiterMode: (force) =>
    set((state) => ({
      isRecruiterMode: force !== undefined ? force : !state.isRecruiterMode,
      activeModal:
        force === true || (force === undefined && !state.isRecruiterMode)
          ? 'recruiter_mode'
          : null,
    })),

  nearbyInteractable: null,
  setNearbyInteractable: (interactable) =>
    set({ nearbyInteractable: interactable }),

  notification: null,
  showNotification: (title, subtitle) => {
    set({ notification: { title, subtitle } });
    setTimeout(() => {
      set({ notification: null });
    }, 4500);
  },
  clearNotification: () => set({ notification: null }),

  showFpsCounter: true,
  toggleFpsCounter: () =>
    set((state) => ({ showFpsCounter: !state.showFpsCounter })),
}));
