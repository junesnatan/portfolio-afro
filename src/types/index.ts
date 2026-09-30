// ==========================================
// JUNES AGASSOUNON — DÉVELOPPEUR WEB & GRAPHISTE
// ==========================================

export type Vector3Array = [number, number, number];

// --- 1. PLAYER & CONTROLS ---
export type PlayerAnimation = 'idle' | 'walk' | 'run' | 'jump' | 'interact';

export interface PlayerControls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  jump: boolean;
  interact: boolean;
}

export interface PlayerState {
  position: Vector3Array;
  rotation: number;
  velocity: Vector3Array;
  animation: PlayerAnimation;
  isGrounded: boolean;
  isInteracting: boolean;
}

// --- 2. ZONES ---
export type ZoneId =
  | 'spawn'
  | 'identity'
  | 'devlab'
  | 'creativestudio'
  | 'projectdistrict'
  | 'experience'
  | 'services'
  | 'contact';

export interface ZoneConfig {
  id: ZoneId;
  name: string;
  subtitle: string;
  center: Vector3Array;
  boundsRadius: number;
  primaryColor: string;
  ambientTrack?: string;
}

// --- 3. PROJECTS ---
export type ProjectCategory = 'fullstack' | 'frontend' | 'mobile' | 'graphic_design' | 'creative_dev';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'case_study' | 'design';
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  role: string;
  year: string;
  featured: boolean;
  description: string;
  features: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  thumbnail: string;
  galleryImages: string[];
  zonePlacement: {
    zone: ZoneId;
    position: Vector3Array;
    rotation?: Vector3Array;
  };
}

// --- 4. SKILLS ---
export type SkillCategory = 'frontend' | 'backend' | 'graphic_design' | 'creative_3d' | 'tools_devops';

export interface SkillData {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  icon: string;
  description: string;
  highlighted: boolean;
}

// --- 5. EXPERIENCES & EDUCATION ---
export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

// --- 6. SERVICES ---
export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
}

// --- 7. MISSIONS & PROGRESSION ---
export type MissionStatus = 'locked' | 'active' | 'completed';

export interface MissionData {
  id: string;
  title: string;
  description: string;
  zone: ZoneId;
  status: MissionStatus;
  rewardText: string;
  order: number;
}

// --- 8. COLLECTIBLES ---
export type CollectibleType = 'code_fragment' | 'design_swatch' | 'easter_egg' | 'lore_entry';

export interface CollectibleData {
  id: string;
  name: string;
  type: CollectibleType;
  description: string;
  secretFact: string;
  position: Vector3Array;
  collected: boolean;
}

// --- 9. INTERACTIONS ---
export type InteractableType =
  | 'project'
  | 'terminal'
  | 'portal'
  | 'collectible'
  | 'contact_station'
  | 'sound_booth'
  | 'art_piece';

export interface InteractableObject {
  id: string;
  type: InteractableType;
  position: Vector3Array;
  activationRadius: number;
  label: string; // e.g., "ACCÉDER AU PROJET", "OUVRIR LA PORTE"
  dataId?: string; // id of referenced project, collectible, etc.
}

// --- 10. CAMERA MODES ---
export type CameraMode = 'gameplay' | 'cinematic' | 'showcase' | 'inspection' | 'fly';

export interface CameraState {
  mode: CameraMode;
  targetPosition: Vector3Array;
  targetLookAt: Vector3Array;
  fov: number;
  transitionDuration?: number;
}

// --- 11. GRAPHICS & PERFORMANCE ---
export type GraphicsQuality = 'low' | 'medium' | 'high';
export type RendererType = 'webgpu' | 'webgl';

export interface GraphicsSettings {
  quality: GraphicsQuality;
  rendererType: RendererType;
  shadows: boolean;
  postProcessing: boolean;
  bloom: boolean;
  dpr: number;
  particlesDensity: number; // 0.2 to 1.0
  targetFps: number;
}

export interface PerformanceMetrics {
  fps: number;
  drawCalls: number;
  triangles: number;
  memoryMB: number;
}

// --- 12. CONTACT & SOCIAL ---
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
}

export interface SocialLink {
  id: string;
  platform: 'linkedin' | 'github' | 'whatsapp' | 'email' | 'cv';
  label: string;
  url: string;
  icon: string;
}

// --- 13. AUDIO SETTINGS ---
export interface AudioSettings {
  masterVolume: number; // 0.0 to 1.0
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
}
