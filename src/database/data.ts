import {
  ProjectData,
  SkillData,
  ExperienceData,
  EducationData,
  ServiceData,
  SocialLink,
} from '@/types';

// ==========================================
// JUNES AGASSOUNON — PORTFOLIO OFFICIEL
// ==========================================

export const IDENTITY_DATA = {
  name: "Junes AGASSOUNON",
  title: "DÉVELOPPEUR WEB & GRAPHISTE",
  location: "Paris / Cotonou / Remote",
  bio: "Développeur Web et Graphiste passionné, je conçois des applications web modernes, rapides et intuitives, avec un design visuel soigné qui marque les esprits. Du front-end interactif au back-end robuste, chaque projet est pensé pour créer un vrai impact pour vos utilisateurs et votre activité.",
  philosophy: "Le design capte l'attention, le code concrétise l'expérience. J'aime allier créativité visuelle et rigueur technique pour livrer des solutions propres, performantes et faciles à faire grandir.",
  stats: [
    { label: "Années d'expérience", value: "5+" },
    { label: "Projets livrés", value: "35+" },
    { label: "Taux de satisfaction", value: "100%" },
    { label: "Rigueur technique", value: "100% Propre" },
  ],
};

export const PROJECTS_DATA: ProjectData[] = [];


export const SKILLS_DATA: SkillData[] = [
  // Frontend & Web
  { id: 'ts', name: 'TypeScript', category: 'frontend', level: 95, icon: 'FileCode2', description: 'Typage strict, architectures modulaires, generics avancés.', highlighted: true },
  { id: 'react', name: 'React / Next.js', category: 'frontend', level: 95, icon: 'Atom', description: 'State management, SSR/SSG, micro-frontends, hooks custom.', highlighted: true },
  { id: 'three', name: 'Three.js / R3F', category: 'creative_3d', level: 90, icon: 'Box', description: 'Scènes 3D immersives, GPU instancing, shaders custom, WebGPU.', highlighted: true },
  { id: 'glsl', name: 'GLSL / Shaders', category: 'creative_3d', level: 85, icon: 'Sparkles', description: 'Effets de distorsion, dissolve, hologrammes, bruits procéduraux.', highlighted: true },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 95, icon: 'Palette', description: 'Design systems ultra-rapides, animations fluides, responsive pur.', highlighted: false },

  // Backend & Architecture
  { id: 'node', name: 'Node.js / Express', category: 'backend', level: 90, icon: 'Server', description: 'APIs RESTful, WebSockets, microservices haute disponibilité.', highlighted: true },
  { id: 'postgres', name: 'PostgreSQL / Supabase', category: 'backend', level: 90, icon: 'Database', description: 'Modélisation relationnelle, RLS, fonctions SQL, triggers temps réel.', highlighted: true },
  { id: 'graphql', name: 'GraphQL / REST', category: 'backend', level: 85, icon: 'Network', description: 'Schémas stricts, requêtes optimisées, gestion de cache.', highlighted: false },

  // Graphic Design & Creative Arts (Création Vectorielle, Print & Code UI)
  { id: 'graphic_art', name: 'Graphisme & Identité Visuelle', category: 'graphic_design', level: 95, icon: 'Palette', description: 'Logotypes vectoriels, chartes de marque, affiches, typographie sur-mesure (Illustrator, Photoshop, InDesign).', highlighted: true },
  { id: 'code_ui', name: 'UI/UX forgé au Code', category: 'graphic_design', level: 92, icon: 'Layout', description: 'Interfaces élégantes taillées au pixel près directement en CSS/Tailwind sans détours.', highlighted: true },
  { id: 'branding', name: 'Brand Identity', category: 'graphic_design', level: 90, icon: 'PenTool', description: 'Univers visuels cohérents, grilles typographiques, guides de marque pérennes.', highlighted: true },
  { id: 'blender', name: 'Blender 3D', category: 'creative_3d', level: 85, icon: 'Layers', description: 'Modélisation low/high poly, bake textures, optimisation glTF/GLB.', highlighted: true },

  // DevOps & Tools
  { id: 'docker', name: 'Docker / CI-CD', category: 'tools_devops', level: 85, icon: 'Cpu', description: 'Conteneurisation, pipelines GitHub Actions, déploiements automatisés.', highlighted: false },
  { id: 'git', name: 'Git & Workflow', category: 'tools_devops', level: 95, icon: 'GitBranch', description: 'Gitflow strict, revues de code, tests automatisés.', highlighted: false },
];

export const EXPERIENCES_DATA: ExperienceData[] = [
  {
    id: 'exp-1',
    company: 'NEXUS DIGITAL STUDIO',
    role: 'Lead Full-Stack Developer & Creative Technologist',
    period: '2022 — Présent',
    location: 'Paris / Hybride',
    description: 'Direction technique du développement d\'applications web complexes et d\'expériences 3D interactives primées pour des marques internationales.',
    achievements: [
      'Conception d\'un moteur 3D temps réel pour configurateurs de produits générant +40% de conversion',
      'Architecture d\'un backend multi-tenant sous Supabase et Node.js supportant 100k+ requêtes/jour',
      'Mise en place d\'un Design System transversal partagé entre 4 équipes de développement',
    ],
    technologies: ['TypeScript', 'React', 'Three.js', 'PostgreSQL', 'WebSockets', 'TailwindCSS'],
  },
  {
    id: 'exp-2',
    company: 'ATELIER AURA',
    role: 'Senior Frontend Developer & UI Designer',
    period: '2020 — 2022',
    location: 'Paris',
    description: 'Création d\'interfaces web immersives, de plateformes SaaS et de refontes de marques complètes.',
    achievements: [
      'Développement de 15+ applications web avec 99+ au score Google Lighthouse',
      'Optimisation des pipelines d\'actifs 3D réduisant les temps de chargement de 65%',
    ],
    technologies: ['React', 'Next.js', 'GSAP', 'WebGL', 'Illustrator', 'Photoshop'],
  },
];

export const EDUCATION_DATA: EducationData[] = [
  {
    id: 'edu-1',
    institution: 'ÉCOLE SUPÉRIEURE DU DIGITAL & DU DESIGN',
    degree: 'Master Expert en Développement Web & Direction Artistique',
    period: '2018 — 2020',
    description: 'Double cursus combinant génie logiciel avancé, infographie 3D temps réel et ergonomie cognitive.',
  },
  {
    id: 'edu-2',
    institution: 'UNIVERSITÉ DE TECHNOLOGIE',
    degree: 'Licence Informatique & Systèmes Numériques',
    period: '2015 — 2018',
    description: 'Fondations algorithmiques, structures de données, programmation système et bases de données relationnelles.',
  },
];

export const SERVICES_DATA: ServiceData[] = [
  {
    id: 'srv-1',
    title: 'Développement Web Full-Stack & SaaS',
    subtitle: 'Architectures robustes, sécurisées et scalables',
    description: 'Conception intégrale de vos applications web et plateformes métier : de la modélisation de base de données (PostgreSQL, Supabase) à l\'interface réactive haute performance (React, TypeScript, Next.js).',
    icon: 'Terminal',
    features: [
      'APIs RESTful et temps réel WebSockets',
      'Authentification sécurisée avec rôles et Row Level Security',
      'Paiements Stripe & intégrations tierces',
      'Dashboard d\'administration et analytics sur-mesure',
    ],
    deliverables: ['Code source testé & documenté', 'Déploiement Cloud automatisé', 'Garantie de maintenance'],
  },
  {
    id: 'srv-2',
    title: 'Expériences Web 3D & Creative Development',
    subtitle: 'Portfolios et sites de marque mémorables',
    description: 'Création d\'univers 3D interactifs dans le navigateur (Three.js, WebGPU, Shaders) alliant fluidité 60 FPS, narration visuelle et compatibilité totale mobile.',
    icon: 'Box',
    features: [
      'Configurateurs de produits 3D temps réel',
      'Scénographies et transitions de caméras cinématiques',
      'Shaders visuels sur-mesure (hologrammes, dissolve)',
      'Optimisation draco/ktx2 pour chargement ultra-rapide',
    ],
    deliverables: ['Scène 3D optimisée', 'Pipeline d\'actifs automatisé', 'Compatibilité WebGL & WebGPU'],
  },
  {
    id: 'srv-3',
    title: 'Graphisme & Identité de Marque',
    subtitle: 'Univers visuels singuliers & interfaces taillées au pixel près',
    description: 'Élaboration de chartes graphiques complètes, logotypes vectoriels, affiches d\'art, typographies sur-mesure et intégration d\'interfaces directement au code sans maquettes intermédiaires.',
    icon: 'Palette',
    features: [
      'Identité visuelle, logo & typographie personnalisée',
      'Chartes graphiques print & web complètes (guidelines, palettes, déclinaisons)',
      'Affiches, papeterie et supports visuels haute résolution',
      'Intégration d\'interfaces réactives directement forgées en CSS & Tailwind',
    ],
    deliverables: ['Fichiers sources vectoriels (AI, PSD, PDF)', 'Exportations graphiques prêtes pour le web et le print', 'Brand Guidelines complètes'],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    platform: 'email',
    label: 'Email Direct',
    url: 'mailto:junes.agassounon@gmail.com',
    icon: 'Mail',
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/junes-agassounon',
    icon: 'Linkedin',
  },
  {
    id: 'github',
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/junesnatan',
    icon: 'Github',
  },
  {
    id: 'whatsapp',
    platform: 'whatsapp',
    label: 'WhatsApp Direct',
    url: 'https://wa.me/2290151456803',
    icon: 'MessageCircle',
  },
  {
    id: 'cv',
    platform: 'cv',
    label: 'Télécharger Dossier (PDF)',
    url: '/assets/cv-junes-agassounon.pdf',
    icon: 'Download',
  },
];
