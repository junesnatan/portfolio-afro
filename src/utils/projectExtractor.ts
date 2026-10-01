import { ProjectCategory, ProjectData, ProjectMetric } from '@/types';

// Common tech stack dictionary for automated detection
const KNOWN_TECHNOLOGIES: { name: string; pattern: RegExp; category: ProjectCategory }[] = [
  // Languages & Core
  { name: 'TypeScript', pattern: /\b(typescript|ts)\b/i, category: 'fullstack' },
  { name: 'JavaScript', pattern: /\b(javascript|js|es6)\b/i, category: 'frontend' },
  { name: 'Python', pattern: /\bpython\b/i, category: 'fullstack' },
  { name: 'PHP', pattern: /\bphp\b/i, category: 'fullstack' },

  // Frontend & Frameworks
  { name: 'React', pattern: /\breact(\.js)?\b/i, category: 'frontend' },
  { name: 'Next.js', pattern: /\bnext(\.js)?\b/i, category: 'frontend' },
  { name: 'Vue.js', pattern: /\bvue(\.js)?\b/i, category: 'frontend' },
  { name: 'Angular', pattern: /\bangular\b/i, category: 'frontend' },
  { name: 'Svelte', pattern: /\bsvelte\b/i, category: 'frontend' },
  { name: 'Tailwind CSS', pattern: /\btailwind(\s?css)?\b/i, category: 'frontend' },
  { name: 'HTML5 / CSS3', pattern: /\b(html5?|css3?)\b/i, category: 'frontend' },

  // Mobile
  { name: 'React Native', pattern: /\breact[\s-]native\b/i, category: 'mobile' },
  { name: 'Flutter', pattern: /\bflutter\b/i, category: 'mobile' },
  { name: 'Expo', pattern: /\bexpo\b/i, category: 'mobile' },

  // 3D & Creative
  { name: 'Three.js', pattern: /\bthree(\.js)?\b/i, category: 'creative_dev' },
  { name: 'React Three Fiber', pattern: /\b(r3f|react[\s-]three[\s-]fiber)\b/i, category: 'creative_dev' },
  { name: 'WebGL', pattern: /\bwebgl\b/i, category: 'creative_dev' },
  { name: 'WebGPU', pattern: /\bwebgpu\b/i, category: 'creative_dev' },
  { name: 'GLSL Shaders', pattern: /\b(glsl|shaders?)\b/i, category: 'creative_dev' },
  { name: 'GSAP', pattern: /\bgsap\b/i, category: 'creative_dev' },
  { name: 'Blender 3D', pattern: /\bblender\b/i, category: 'creative_dev' },

  // Backend & APIs
  { name: 'Node.js', pattern: /\bnode(\.js)?\b/i, category: 'fullstack' },
  { name: 'Express.js', pattern: /\bexpress(\.js)?\b/i, category: 'fullstack' },
  { name: 'NestJS', pattern: /\bnest(\.js)?\b/i, category: 'fullstack' },
  { name: 'FastAPI', pattern: /\bfastapi\b/i, category: 'fullstack' },
  { name: 'Django', pattern: /\bdjango\b/i, category: 'fullstack' },
  { name: 'Laravel', pattern: /\blaravel\b/i, category: 'fullstack' },
  { name: 'WebSockets', pattern: /\b(websocket|socket\.io|ws)\b/i, category: 'fullstack' },
  { name: 'GraphQL', pattern: /\bgraphql\b/i, category: 'fullstack' },
  { name: 'REST APIs', pattern: /\b(rest|api\srestful|apis?)\b/i, category: 'fullstack' },

  // Databases & Cloud
  { name: 'PostgreSQL', pattern: /\b(postgresql|postgres)\b/i, category: 'fullstack' },
  { name: 'Supabase', pattern: /\bsupabase\b/i, category: 'fullstack' },
  { name: 'TimescaleDB', pattern: /\btimescaledb\b/i, category: 'fullstack' },
  { name: 'MongoDB', pattern: /\bmongo(db)?\b/i, category: 'fullstack' },
  { name: 'Redis', pattern: /\bredis\b/i, category: 'fullstack' },
  { name: 'MySQL', pattern: /\bmysql\b/i, category: 'fullstack' },
  { name: 'Firebase', pattern: /\bfirebase\b/i, category: 'fullstack' },
  { name: 'Docker', pattern: /\bdocker\b/i, category: 'fullstack' },
  { name: 'AWS', pattern: /\b(aws|amazon\sweb\sservices)\b/i, category: 'fullstack' },
  { name: 'Vercel', pattern: /\bvercel\b/i, category: 'frontend' },
  { name: 'Stripe', pattern: /\bstripe\b/i, category: 'fullstack' },

  // Graphic Design & Branding
  { name: 'Figma', pattern: /\bfigma\b/i, category: 'graphic_design' },
  { name: 'Adobe Illustrator', pattern: /\b(illustrator|adobe\sill)\b/i, category: 'graphic_design' },
  { name: 'Adobe Photoshop', pattern: /\b(photoshop|psd)\b/i, category: 'graphic_design' },
  { name: 'InDesign', pattern: /\bindesign\b/i, category: 'graphic_design' },
  { name: 'Identité Visuelle & Logo', pattern: /\b(branding|identit[eé]\svisuelle|logotype|charte\sgraphique)\b/i, category: 'graphic_design' },
  { name: 'UI/UX Design', pattern: /\b(ui[\s/]?ux|ergonomie|wireframe|maquette)\b/i, category: 'graphic_design' },
];

export interface ExtractedProject {
  title: string;
  slug: string;
  tagline: string;
  category: ProjectCategory;
  role: string;
  year: string;
  description: string;
  features: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  suggestedLinks: { label: string; url: string; type: 'live' | 'github' }[];
}

/**
 * Parses raw text input from user and intelligently extracts
 * all project attributes ready to be inserted into the portfolio database.
 */
export function extractProjectFromText(rawText: string): ExtractedProject {
  const text = rawText.trim();
  if (!text) {
    return {
      title: 'NOUVEAU PROJET',
      slug: 'nouveau-projet',
      tagline: 'Solution web moderne et performante',
      category: 'fullstack',
      role: 'Lead Full-Stack Developer & UI Designer',
      year: new Date().getFullYear().toString(),
      description: '',
      features: ['Architecture moderne', 'Interface responsive', 'Performances optimisées'],
      technologies: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
      metrics: [
        { label: 'Performance', value: '99+' },
        { label: 'Temps de réponse', value: '< 50ms' },
      ],
      suggestedLinks: [
        { label: 'GitHub Repository', url: 'https://github.com/junesnatan', type: 'github' },
      ],
    };
  }

  // 1. EXTRACT YEAR (e.g., 2024, 2023, 2025)
  const yearMatch = text.match(/\b(201[8-9]|202[0-9])\b/);
  const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();

  // 2. EXTRACT TITLE
  let title = '';
  // Pattern: "nommé(e) X", "projet X", "intitulé X", "appelé X", or quotes "X"
  const nameMatch =
    text.match(/(?:nomm[eé]e?|appel[eé]e?|intitul[eé]e?|projet|plateforme|application)\s+([«"][^»"]+[»"]|[A-ZÀ-Ÿ0-9][A-Za-zÀ-ÿ0-9\s-]{2,25})/i) ||
    text.match(/[«"]([^»"]+)[»"]/);

  if (nameMatch && nameMatch[1]) {
    title = nameMatch[1].replace(/[«"]/g, '').trim().toUpperCase();
  } else {
    // Take first capital phrase or first few words
    const firstLine = text.split('\n')[0].replace(/^(projet|j'ai fait|création de|développement d'un[e]?)\s+/i, '');
    const words = firstLine.split(/\s+/).slice(0, 4).join(' ');
    title = (words.length > 2 ? words : 'APPLICATION INNOVANTE').toUpperCase();
  }

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // 3. DETECT TECHNOLOGIES
  const detectedTechs: string[] = [];
  const categoryScores: Record<ProjectCategory, number> = {
    fullstack: 1,
    frontend: 0,
    mobile: 0,
    graphic_design: 0,
    creative_dev: 0,
  };

  for (const tech of KNOWN_TECHNOLOGIES) {
    if (tech.pattern.test(text)) {
      if (!detectedTechs.includes(tech.name)) {
        detectedTechs.push(tech.name);
      }
      categoryScores[tech.category] = (categoryScores[tech.category] || 0) + 1;
    }
  }

  // Fallback default tech stack if none detected
  if (detectedTechs.length === 0) {
    detectedTechs.push('TypeScript', 'React', 'Node.js', 'Tailwind CSS');
  }

  // 4. DETERMINE CATEGORY
  // Specific keyword boosters
  if (/\b(mobile|react[\s-]native|flutter|ios|android|smartphone)\b/i.test(text)) {
    categoryScores.mobile += 4;
  }
  if (/\b(3d|three\.js|webgl|shaders?|blender|configurateur\s3d|r3f)\b/i.test(text)) {
    categoryScores.creative_dev += 4;
  }
  if (/\b(logo|branding|identit[eé]|affiche|charte\sgraphique|photoshop|illustrator|typograph)\b/i.test(text)) {
    categoryScores.graphic_design += 4;
  }
  if (/\b(backend|saas|api|postgresql|supabase|node|full-?stack|docker|database|bdd)\b/i.test(text)) {
    categoryScores.fullstack += 3;
  }

  let bestCategory: ProjectCategory = 'fullstack';
  let highestScore = -1;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = cat as ProjectCategory;
    }
  }

  // 5. EXTRACT OR INFER ROLE
  let role = '';
  const roleMatch = text.match(/(?:en tant que|rôle\s*:\s*|j'étais\s+|en qualité de\s+)([A-Za-zÀ-ÿ\s&/-]{4,40})(?:\.|\n|,|$)/i);
  if (roleMatch && roleMatch[1]) {
    role = roleMatch[1].trim();
  } else {
    switch (bestCategory) {
      case 'fullstack':
        role = 'Lead Full-Stack Developer & Architect';
        break;
      case 'frontend':
        role = 'Senior Frontend Developer & UI Specialist';
        break;
      case 'mobile':
        role = 'Lead Mobile & Web Application Engineer';
        break;
      case 'creative_dev':
        role = 'Creative Developer & 3D Interactive Specialist';
        break;
      case 'graphic_design':
        role = 'Directeur Artistique & Designer UI/UX';
        break;
      default:
        role = 'Développeur Web & Graphiste';
    }
  }

  // 6. EXTRACT METRICS & IMPACT
  const metrics: ProjectMetric[] = [];
  // Look for patterns like +45%, -20%, 10k+, < 45ms, 99.9%, 15 000 users, etc.
  const metricRegex = /([+<>]?\s?\d+[\d\s.,]*\s?(?:%|ms|s|k|Mo|ha|€|\$|\+|users|utilisateurs|visiteurs))/gi;
  const foundMetricValues = [...text.matchAll(metricRegex)].map((m) => m[0].trim());

  if (foundMetricValues.length > 0) {
    for (const val of foundMetricValues.slice(0, 3)) {
      // Find surrounding text to infer label
      const index = text.indexOf(val);
      const snippet = text.slice(Math.max(0, index - 35), Math.min(text.length, index + val.length + 35));

      let label = 'Impact mesuré';
      if (/temps|latence|durée|vitesse/i.test(snippet)) label = 'Temps de réponse';
      else if (/conversion|vente|chiffre/i.test(snippet)) label = 'Taux de conversion';
      else if (/eau|énergie|ressource|coût|gain/i.test(snippet)) label = 'Optimisation constatée';
      else if (/utilisateur|patient|client|visiteur|abonn/i.test(snippet)) label = 'Utilisateurs actifs';
      else if (/surface|terrain|hectare/i.test(snippet)) label = 'Périmètre couvert';
      else if (/satisfaction|note|score/i.test(snippet)) label = 'Satisfaction client';
      else if (/requ[eê]te|traffic|charge/i.test(snippet)) label = 'Trafic quotidien';

      metrics.push({ label, value: val });
    }
  }

  // If no metric was found in text, supply smart contextual suggestions
  if (metrics.length === 0) {
    if (bestCategory === 'creative_dev') {
      metrics.push({ label: 'Fluidité d\'affichage', value: '60 FPS' });
      metrics.push({ label: 'Temps de chargement 3D', value: '< 1.5s' });
    } else if (bestCategory === 'graphic_design') {
      metrics.push({ label: 'Formats vectoriels livrés', value: '100% SVG/AI' });
      metrics.push({ label: 'Satisfaction client', value: '100%' });
    } else {
      metrics.push({ label: 'Score Google Lighthouse', value: '98+' });
      metrics.push({ label: 'Temps de réponse API', value: '< 50ms' });
    }
  }

  // 7. EXTRACT FEATURES
  const features: string[] = [];
  // Look for bullet lines or numbered lines
  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[•*-]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      const cleanFeature = trimmed.replace(/^[•*-\d.)\s]+/, '').trim();
      if (cleanFeature.length > 5) {
        features.push(cleanFeature);
      }
    }
  }

  // If no explicit bullets, split on sentences that describe capabilities
  if (features.length < 2) {
    const sentences = text
      .split(/[.!?]\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15 && s.length < 150);

    for (const s of sentences) {
      if (/permet|inclut|développ|fonctionnalité|gestion|système|interface|sécuris|automatis/i.test(s)) {
        features.push(s.replace(/^(\s*[-•]\s*)/, ''));
        if (features.length >= 4) break;
      }
    }
  }

  // Fallbacks if still short
  if (features.length === 0) {
    features.push('Architecture modulaire et code propre sous ' + detectedTechs.slice(0, 2).join(' & '));
    features.push('Interface utilisateur réactive et optimisée pour tous formats d\'écrans');
    features.push('Déploiement en production avec tests et haute disponibilité');
  }

  // 8. GENERATE TAGLINE
  let tagline = '';
  // Try to find a concise sentence
  const firstSentence = text.split(/[.!?]\n|[.!?]\s+/)[0]?.trim();
  if (firstSentence && firstSentence.length > 20 && firstSentence.length < 110) {
    tagline = firstSentence;
  } else {
    // Generate one
    tagline = `Solution ${bestCategory.replace('_', ' ')} performante et intuitive conçue avec ${detectedTechs.slice(0, 3).join(', ')}`;
  }

  // 9. DESCRIPTION
  const description = text.length > 40 ? text : `${tagline}. Développé avec ${detectedTechs.join(', ')} pour répondre à des exigences élevées de performance et d'expérience utilisateur.`;

  return {
    title,
    slug,
    tagline,
    category: bestCategory,
    role,
    year,
    description,
    features: features.slice(0, 5),
    technologies: detectedTechs,
    metrics: metrics.slice(0, 3),
    suggestedLinks: [
      { label: 'Aperçu en ligne', url: 'https://github.com/junesnatan', type: 'live' },
      { label: 'Code Source (GitHub)', url: 'https://github.com/junesnatan', type: 'github' },
    ],
  };
}

/**
 * Converts an ExtractedProject into a full ProjectData ready for the store.
 */
export function buildProjectDataFromExtraction(
  extracted: ExtractedProject,
  customId?: string
): ProjectData {
  const id = customId || extracted.slug || `proj-${Date.now()}`;
  return {
    id,
    slug: extracted.slug || id,
    title: extracted.title,
    tagline: extracted.tagline,
    category: extracted.category,
    role: extracted.role,
    year: extracted.year,
    featured: true,
    description: extracted.description,
    features: extracted.features,
    technologies: extracted.technologies,
    metrics: extracted.metrics,
    links: extracted.suggestedLinks.map((l) => ({
      label: l.label,
      url: l.url,
      type: l.type,
    })),
    thumbnail: `/assets/projects/${extracted.category === 'creative_dev' ? 'lumina' : extracted.category === 'mobile' ? 'velocity' : 'agripulse'}.webp`,
    galleryImages: [],
    zonePlacement: {
      zone: 'projectdistrict',
      position: [0, 0, -40],
    },
  };
}
