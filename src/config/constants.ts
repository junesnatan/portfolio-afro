import { GraphicsSettings, ZoneConfig } from '@/types';

// ==========================================
// JUNES AGASSOUNON — CORE CONSTANTS
// ==========================================

export const APP_NAME = "Junes AGASSOUNON";
export const APP_SUBTITLE = "DÉVELOPPEUR WEB & GRAPHISTE";

export const DEFAULT_GRAPHICS_SETTINGS: GraphicsSettings = {
  quality: 'high',
  rendererType: 'webgl', // Auto-promoted to webgpu if supported
  shadows: true,
  postProcessing: true,
  bloom: true,
  dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
  particlesDensity: 1.0,
  targetFps: 60,
};

export const ZONES: Record<string, ZoneConfig> = {
  spawn: {
    id: 'spawn',
    name: 'SPAWN PROTOCOL',
    subtitle: 'NEXUS CENTRAL & INITIALISATION',
    center: [0, 0, 0],
    boundsRadius: 10,
    primaryColor: '#00f0ff',
  },
  identity: {
    id: 'identity',
    name: 'IDENTITY CORE',
    subtitle: 'PROFIL, PHILOSOPHIE & PARCOURS',
    center: [0, 0, -20],
    boundsRadius: 12,
    primaryColor: '#38bdf8',
  },
  devlab: {
    id: 'devlab',
    name: 'DEVELOPMENT LAB',
    subtitle: 'ARCHITECTURE, ENGINES & FULL-STACK',
    center: [-25, 0, -10],
    boundsRadius: 14,
    primaryColor: '#059669',
  },
  creativestudio: {
    id: 'creativestudio',
    name: 'CREATIVE STUDIO',
    subtitle: 'BRANDING, TYPOGRAPHIE & ART DIRECTION',
    center: [25, 0, -10],
    boundsRadius: 14,
    primaryColor: '#eab308',
  },
  projectdistrict: {
    id: 'projectdistrict',
    name: 'PROJECT DISTRICT',
    subtitle: 'APPLICATIONS & RÉALISATIONS DÉPLOYÉES',
    center: [0, 0, -45],
    boundsRadius: 20,
    primaryColor: '#818cf8',
  },
  services: {
    id: 'services',
    name: 'SERVICES STATION',
    subtitle: 'SOLUTIONS SUR-MESURE & EXPERTISES',
    center: [-20, 0, -35],
    boundsRadius: 12,
    primaryColor: '#10b981',
  },
  contact: {
    id: 'contact',
    name: 'TRANSMISSION TOWER',
    subtitle: 'CONNECTIVITÉ & PRÉPARATION DE PROJET',
    center: [20, 0, -35],
    boundsRadius: 12,
    primaryColor: '#00f0ff',
  },
};

export const INITIAL_PLAYER_POSITION: [number, number, number] = [0, 0.9, 4];
export const PLAYER_SPEED = 6.0;
export const PLAYER_RUN_MULTIPLIER = 1.7;
export const CAMERA_OFFSET: [number, number, number] = [0, 2.5, 5.0];
