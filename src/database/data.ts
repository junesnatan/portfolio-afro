import {
  ProjectData,
  SkillData,
  ExperienceData,
  EducationData,
  ServiceData,
  MissionData,
  CollectibleData,
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

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'agri-pulse',
    slug: 'agri-pulse-saas',
    title: 'AGRI-PULSE PLATFORM',
    tagline: 'SaaS d\'analyse agronomique par capteurs IoT et imagerie satellite en temps réel',
    category: 'fullstack',
    role: 'Lead Architect & Full-Stack Engineer',
    year: '2024',
    featured: true,
    description: 'Plateforme complète d\'optimisation des rendements agricoles combinant streaming de télémétrie IoT, cartographie géospatiale dynamique (WebGIS), calcul prédictif météo et tableau de bord de pilotage agronomique.',
    features: [
      'Ingestion de données de capteurs en temps réel via WebSockets & TimescaleDB',
      'Cartographie interactive haute précision avec couches thermiques NDVI',
      'Alertes automatisées par SMS/Push sur les risques de gel ou de sécheresse',
      'Exportation automatisée de rapports d\'audit agronomique certifiés PDF',
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'Three.js / WebGL', 'Docker', 'AWS'],
    metrics: [
      { label: 'Surface surveillée', value: '+45 000 ha' },
      { label: 'Temps de réponse API', value: '< 45ms' },
      { label: 'Économie d\'eau constatée', value: '-22%' },
    ],
    links: [
      { label: 'Live Demo', url: 'https://github.com', type: 'live' },
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' },
    ],
    thumbnail: '/assets/projects/agripulse.webp',
    galleryImages: [],
    zonePlacement: {
      zone: 'projectdistrict',
      position: [-10, 0, -42],
    },
  },
  {
    id: 'lumina-luxury',
    slug: 'lumina-luxury-ecommerce',
    title: 'LUMINA LUXURY ATELIER',
    tagline: 'Expérience e-commerce 3D haut de gamme avec configurateur temps réel WebGL',
    category: 'creative_dev',
    role: 'Creative Developer & UI/UX Designer',
    year: '2024',
    featured: true,
    description: 'Boutique en ligne immersive pour haute horlogerie et maroquinerie de prestige. Permet la personnalisation complète en 3D temps réel (textures KTX2, gravure laser dynamique, matériaux PBR sur-mesure) avec intégration fluide Stripe & Shopify Storefront API.',
    features: [
      'Configurateur 3D temps réel avec matériaux PBR et reflets d\'environnement HDR',
      'Optimisation meshopt / Draco assurant un premier affichage sous 1.2 seconde',
      'Micro-interactions GSAP et transitions de page fluides sans rechargement',
      'Checkout sécurisé Stripe avec validation instantanée des stocks',
    ],
    technologies: ['React', 'Three.js', 'React Three Fiber', 'GLSL Shaders', 'Shopify Storefront', 'TailwindCSS', 'GSAP'],
    metrics: [
      { label: 'Taux de conversion', value: '+38%' },
      { label: 'FPS moyen Desktop/Mobile', value: '60 / 60' },
      { label: 'Poids du modèle 3D optimisé', value: '1.4 Mo' },
    ],
    links: [
      { label: 'Live Experience', url: 'https://github.com', type: 'live' },
      { label: 'Source Code', url: 'https://github.com', type: 'github' },
    ],
    thumbnail: '/assets/projects/lumina.webp',
    galleryImages: [],
    zonePlacement: {
      zone: 'projectdistrict',
      position: [0, 0, -48],
    },
  },
  {
    id: 'velocity-fleet',
    slug: 'velocity-fleet-os',
    title: 'VELOCITY MOBILITY OS',
    tagline: 'Centrale de supervision et régulation de flottes de transport urbain autonome',
    category: 'fullstack',
    role: 'Full-Stack Developer & Data Visualizer',
    year: '2023',
    featured: true,
    description: 'Interface de contrôle mission critique pour opérateurs de véhicules de transport urbain. Affichage en 3D volumétrique des corridors de transit, télémétrie batterie, calcul d\'itinéraires multi-agents et gestion des incidents en direct.',
    features: [
      'Rendu de 5000+ véhicules simultanés via GPU Instancing',
      'Moteur d\'optimisation de dispatching algorithmique en Rust/WASM',
      'Système d\'authentification multi-niveaux et journalisation d\'audit inviolable',
      'Tableau de bord modulaire personnalisable en drag-and-drop',
    ],
    technologies: ['TypeScript', 'Next.js', 'Go', 'WebSockets', 'Three.js', 'Redis', 'Kubernetes'],
    metrics: [
      { label: 'Flotte gérée', value: '5 200 unités' },
      { label: 'Disponibilité système', value: '99.99%' },
      { label: 'Latence télémétrie', value: '18ms' },
    ],
    links: [
      { label: 'Case Study', url: 'https://github.com', type: 'case_study' },
      { label: 'Code Review', url: 'https://github.com', type: 'github' },
    ],
    thumbnail: '/assets/projects/velocity.webp',
    galleryImages: [],
    zonePlacement: {
      zone: 'projectdistrict',
      position: [10, 0, -42],
    },
  },
  {
    id: 'kroma-identity',
    slug: 'kroma-brand-identity',
    title: 'KROMA DESIGN IDENTITY',
    tagline: 'Système d\'identité visuelle complète, typographie générative et charte de marque',
    category: 'graphic_design',
    role: 'Art Director & Brand Designer',
    year: '2024',
    featured: true,
    description: 'Conception de la direction artistique globale pour un studio de production audio-visuelle : logotype dynamique génératif, système graphique vectoriel de 400+ composants, affiches sérigraphiques et déclinaisons motion design.',
    features: [
      'Système de logo modulaire s\'adaptant aux variations de fréquences sonores',
      'Typographie sur-mesure à contraste élevé avec jeu complet de glyphes',
      'Charte graphique print & digital complète (guidelines, papeterie, signalétique)',
      'Animations de marque en vectoriel Lottie pour intégration web fluide',
    ],
    technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Blender', 'Cinema 4D'],
    metrics: [
      { label: 'Composants graphiques', value: '450+' },
      { label: 'Distinctions design', value: 'Design Award 2024' },
      { label: 'Portée de la campagne', value: '+1.2M vues' },
    ],
    links: [
      { label: 'Consulter la Charte', url: 'https://github.com', type: 'case_study' },
    ],
    thumbnail: '/assets/projects/kroma.webp',
    galleryImages: [],
    zonePlacement: {
      zone: 'creativestudio',
      position: [25, 0, -10],
    },
  },
];

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

export const MISSIONS_DATA: MissionData[] = [
  {
    id: 'm-1',
    title: 'INITIALISATION DU MONDE',
    description: 'Découvrez vos contrôles et faites vos premiers pas dans le Spawn Nexus.',
    zone: 'spawn',
    status: 'active',
    rewardText: 'Accès débloqué aux zones périphériques',
    order: 1,
  },
  {
    id: 'm-2',
    title: 'DÉCOUVRIR LE DÉVELOPPEUR',
    description: 'Rendez-vous dans l\'Identity Core pour consulter la biographie et vision de Junes.',
    zone: 'identity',
    status: 'locked',
    rewardText: 'Archive biographique débloquée',
    order: 2,
  },
  {
    id: 'm-3',
    title: 'EXPLORER LE DEV LAB',
    description: 'Inspectez les serveurs technologiques et le tableau des compétences Full-Stack.',
    zone: 'devlab',
    status: 'locked',
    rewardText: 'Matrice des compétences 100% analysée',
    order: 3,
  },
  {
    id: 'm-4',
    title: 'VISITER LA GALERIE DESIGN',
    description: 'Consultez les créations graphiques dans le Creative Studio.',
    zone: 'creativestudio',
    status: 'locked',
    rewardText: 'Galerie d\'art graphique déverrouillée',
    order: 4,
  },
  {
    id: 'm-5',
    title: 'INSPECTER UN PROJET DÉPLOYÉ',
    description: 'Interagissez avec l\'un des terminaux 3D du Project District.',
    zone: 'projectdistrict',
    status: 'locked',
    rewardText: 'Fiche technique de projet ouverte',
    order: 5,
  },
  {
    id: 'm-6',
    title: 'ÉTABLIR LA TRANSMISSION',
    description: 'Activez la Tour de Contact pour transmettre un message ou télécharger le CV.',
    zone: 'contact',
    status: 'locked',
    rewardText: 'Canaux de transmission directe ouverts',
    order: 6,
  },
];

export const COLLECTIBLES_DATA: CollectibleData[] = [
  {
    id: 'col-ts',
    name: 'Fragment de Code : Strict Mode',
    type: 'code_fragment',
    description: 'Un éclat d\'or numérique contenant l\'essence de TypeScript sans aucun "any".',
    secretFact: 'Junes AGASSOUNON configure tous ses projets en strict: true pour éliminer les bugs de runtime avant la production.',
    position: [0, 1.2, -15],
    collected: false,
  },
  {
    id: 'col-palette',
    name: 'Prisme Chromatique',
    type: 'design_swatch',
    description: 'Un cristal réfractant la lumière turquoise et dorée du studio.',
    secretFact: 'Le contraste des couleurs respecte scrupuleusement la norme WCAG AAA pour une lisibilité parfaite.',
    position: [18, 1.2, -8],
    collected: false,
  },
  {
    id: 'col-shader',
    name: 'Noyau Holographique',
    type: 'easter_egg',
    description: 'Un algorithme d\'ondes sinusoïdales oscillant en temps réel.',
    secretFact: 'Les shaders personnalisés de ce portfolio calculent les déformations directement sur la carte graphique (GPU).',
    position: [-18, 1.2, -8],
    collected: false,
  },
  {
    id: 'col-coffee',
    name: 'Tasse Cyber-Caféine',
    type: 'lore_entry',
    description: 'Le carburant indispensable des sessions de Creative Coding nocturnes.',
    secretFact: 'Plus de 10 000 lignes de code ont été rédigées avec précision pour forger ce monde virtuel.',
    position: [0, 1.2, -38],
    collected: false,
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
    url: 'https://github.com/junes-agassounon',
    icon: 'Github',
  },
  {
    id: 'whatsapp',
    platform: 'whatsapp',
    label: 'WhatsApp Direct',
    url: 'https://wa.me/33600000000',
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
