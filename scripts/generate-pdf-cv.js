import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('CV - Junes AGASSOUNON - Developpeur Web & Graphiste');
  pdfDoc.setAuthor('Junes AGASSOUNON');
  pdfDoc.setSubject('Curriculum Vitae Professionnel');
  pdfDoc.setKeywords(['Developpeur Web', 'Full-Stack', 'Graphiste', 'React', 'TypeScript', 'Node.js', 'UI/UX']);

  // A4 dimensions: 595.28 x 841.89 points
  const width = 595.28;
  const height = 841.89;
  const page = pdfDoc.addPage([width, height]);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette Couleurs
  const cDark = rgb(0.12, 0.08, 0.05); // #1E150D
  const cPrimary = rgb(0.85, 0.36, 0.22); // Terracotta #D95D39
  const cSecondary = rgb(0.16, 0.62, 0.56); // Teal #2A9D8F
  const cMuted = rgb(0.45, 0.40, 0.36); // #73665C
  const cLightBg = rgb(0.98, 0.97, 0.95); // #FAF7F2
  const cBorder = rgb(0.91, 0.86, 0.80); // Border

  // Header Background Accent Card
  page.drawRectangle({
    x: 30,
    y: height - 125,
    width: width - 60,
    height: 95,
    color: cLightBg,
    borderColor: cBorder,
    borderWidth: 1,
  });

  // Top Terracotta Bar
  page.drawRectangle({
    x: 30,
    y: height - 34,
    width: width - 60,
    height: 4,
    color: cPrimary,
  });

  // Monogram Box "JA"
  page.drawRectangle({
    x: 45,
    y: height - 110,
    width: 60,
    height: 60,
    color: cPrimary,
  });
  page.drawText('JA', {
    x: 60,
    y: height - 93,
    size: 24,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  // Header Title
  page.drawText('JUNES AGASSOUNON', {
    x: 120,
    y: height - 68,
    size: 20,
    font: fontBold,
    color: cDark,
  });

  page.drawText('DEVELOPPEUR WEB FULL-STACK & GRAPHISTE', {
    x: 120,
    y: height - 85,
    size: 10.5,
    font: fontBold,
    color: cPrimary,
  });

  // Contact Info Line
  const contactText = 'Email: junes.agassounon@gmail.com  |  Tel: +229 01 51 45 68 03  |  Paris / Remote  |  github.com/junesnatan';
  page.drawText(contactText, {
    x: 120,
    y: height - 105,
    size: 8.2,
    font: fontRegular,
    color: cMuted,
  });

  // Profile / Summary Section
  const summaryY = height - 142;
  page.drawText('PROFIL PROFESSIONNEL', {
    x: 30,
    y: summaryY,
    size: 11,
    font: fontBold,
    color: cPrimary,
  });
  page.drawLine({
    start: { x: 185, y: summaryY + 3 },
    end: { x: width - 30, y: summaryY + 3 },
    color: cBorder,
    thickness: 1,
  });

  const bioLine1 = "Developpeur Web Full-Stack et Graphiste cumulant 5+ annees d'experience dans la conception d'applications";
  const bioLine2 = "modernes, reactives et performantes. Double profil alliant maitrise technique rigoureuse (TypeScript, React, Node.js,";
  const bioLine3 = "PostgreSQL) et direction artistique soignee (UI/UX, identites de marque, interfaces web au pixel pres).";

  page.drawText(bioLine1, { x: 30, y: summaryY - 16, size: 8.5, font: fontRegular, color: cDark });
  page.drawText(bioLine2, { x: 30, y: summaryY - 28, size: 8.5, font: fontRegular, color: cDark });
  page.drawText(bioLine3, { x: 30, y: summaryY - 40, size: 8.5, font: fontRegular, color: cDark });

  // Two-column layout
  // Left Column (Width: 175) -> x: 30 to 205
  // Right Column (Width: 335) -> x: 230 to width - 30 (565)
  const leftX = 30;
  const rightX = 225;
  const colY = summaryY - 65;

  // ----------------------------------------------------
  // LEFT COLUMN: COMPETENCES, FORMATION, LANGUES, ATOUTS
  // ----------------------------------------------------
  let curLeftY = colY;

  // Section Competences
  page.drawText('COMPETENCES CLES', { x: leftX, y: curLeftY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: leftX + 115, y: curLeftY + 3 }, end: { x: 210, y: curLeftY + 3 }, color: cBorder, thickness: 1 });
  curLeftY -= 14;

  const skillGroups = [
    { title: 'Frontend & UI', items: 'React, TypeScript, Next.js, Tailwind CSS, Three.js' },
    { title: 'Backend & Donnees', items: 'Node.js, Express, PostgreSQL, Supabase, APIs REST' },
    { title: 'Graphisme & Design', items: 'UI/UX, Illustrator, Photoshop, Identite de marque, Typo' },
    { title: 'Outils & DevOps', items: 'Git, Docker, CI/CD GitHub, Vite, Vercel, Supabase' },
  ];

  for (const group of skillGroups) {
    page.drawText(group.title, { x: leftX, y: curLeftY, size: 8.5, font: fontBold, color: cDark });
    curLeftY -= 11;
    page.drawText(group.items, { x: leftX, y: curLeftY, size: 7.6, font: fontRegular, color: cMuted });
    curLeftY -= 14;
  }

  curLeftY -= 6;

  // Section Formation
  page.drawText('FORMATION', { x: leftX, y: curLeftY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: leftX + 70, y: curLeftY + 3 }, end: { x: 210, y: curLeftY + 3 }, color: cBorder, thickness: 1 });
  curLeftY -= 14;

  page.drawText('Master Expert Digital & Web', { x: leftX, y: curLeftY, size: 8.5, font: fontBold, color: cDark });
  curLeftY -= 10;
  page.drawText('Ecole Superieure du Digital (2018 - 2020)', { x: leftX, y: curLeftY, size: 7.5, font: fontOblique, color: cMuted });
  curLeftY -= 14;

  page.drawText('Licence Informatique & Systemes', { x: leftX, y: curLeftY, size: 8.5, font: fontBold, color: cDark });
  curLeftY -= 10;
  page.drawText('Universite de Technologie (2015 - 2018)', { x: leftX, y: curLeftY, size: 7.5, font: fontOblique, color: cMuted });
  curLeftY -= 18;

  // Section Langues
  page.drawText('LANGUES', { x: leftX, y: curLeftY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: leftX + 55, y: curLeftY + 3 }, end: { x: 210, y: curLeftY + 3 }, color: cBorder, thickness: 1 });
  curLeftY -= 13;

  page.drawText('Francais : Bilingue / Langue maternelle', { x: leftX, y: curLeftY, size: 7.8, font: fontRegular, color: cDark });
  curLeftY -= 11;
  page.drawText('Anglais : Professionnel / Technique', { x: leftX, y: curLeftY, size: 7.8, font: fontRegular, color: cDark });
  curLeftY -= 18;

  // Section Atouts
  page.drawText('POINTS FORTS', { x: leftX, y: curLeftY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: leftX + 75, y: curLeftY + 3 }, end: { x: 210, y: curLeftY + 3 }, color: cBorder, thickness: 1 });
  curLeftY -= 13;

  const points = [
    '- Code propre & TypeScript strict',
    "- Rigueur d'architecture logicielle",
    '- Sensibilite graphique & typographique',
    '- Respect rigoureux des delais',
    '- Relation client claire et transparente',
  ];
  for (const pt of points) {
    page.drawText(pt, { x: leftX, y: curLeftY, size: 7.6, font: fontRegular, color: cDark });
    curLeftY -= 12;
  }

  // ----------------------------------------------------
  // RIGHT COLUMN: EXPERIENCES & PROJETS MAJEURS
  // ----------------------------------------------------
  let curRightY = colY;

  page.drawText('EXPERIENCES PROFESSIONNELLES', { x: rightX, y: curRightY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: rightX + 180, y: curRightY + 3 }, end: { x: width - 30, y: curRightY + 3 }, color: cBorder, thickness: 1 });
  curRightY -= 16;

  // Experience 1
  page.drawText('Lead Full-Stack Developer & Creative Technologist', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: cDark });
  page.drawText('2022 - Present', { x: width - 95, y: curRightY, size: 8, font: fontBold, color: cSecondary });
  curRightY -= 11;
  page.drawText('NEXUS DIGITAL STUDIO - Paris / Remote', { x: rightX, y: curRightY, size: 8, font: fontOblique, color: cMuted });
  curRightY -= 13;

  const exp1Bullets = [
    "- Direction technique d'applications web SaaS a forte volumetrie (100k+ requetes/jour)",
    "- Conception d'un configurateur 3D temps reel generant +40% de conversion",
    "- Architecture backend sous Node.js & Supabase PostgreSQL avec Row Level Security",
    "- Mise en place d'un Design System React & Tailwind partage entre plusieurs equipes",
  ];
  for (const b of exp1Bullets) {
    page.drawText(b, { x: rightX + 5, y: curRightY, size: 8, font: fontRegular, color: cDark });
    curRightY -= 11;
  }
  curRightY -= 8;

  // Experience 2
  page.drawText('Senior Frontend Developer & UI Designer', { x: rightX, y: curRightY, size: 9.5, font: fontBold, color: cDark });
  page.drawText('2020 - 2022', { x: width - 95, y: curRightY, size: 8, font: fontBold, color: cSecondary });
  curRightY -= 11;
  page.drawText('ATELIER AURA - Paris', { x: rightX, y: curRightY, size: 8, font: fontOblique, color: cMuted });
  curRightY -= 13;

  const exp2Bullets = [
    "- Developpement de 15+ applications web avec scores Google Lighthouse 99+",
    "- Integration de micro-animations interactives GSAP et interfaces ergonomiques",
    "- Elaboration complete de chartes graphiques de marques (logos, palettes, typographies)",
    "- Optimisation des temps de chargement reduisant la bande passante de 65%",
  ];
  for (const b of exp2Bullets) {
    page.drawText(b, { x: rightX + 5, y: curRightY, size: 8, font: fontRegular, color: cDark });
    curRightY -= 11;
  }
  curRightY -= 14;

  // Projets Cles
  page.drawText('PROJETS EMBLEMATIQUES RECENTS', { x: rightX, y: curRightY, size: 10, font: fontBold, color: cPrimary });
  page.drawLine({ start: { x: rightX + 175, y: curRightY + 3 }, end: { x: width - 30, y: curRightY + 3 }, color: cBorder, thickness: 1 });
  curRightY -= 16;

  const projectsList = [
    {
      title: 'AGRI-PULSE PLATFORM (SaaS AgTech IoT)',
      desc: "Plateforme d'analyse agronomique combinant telemetrie IoT, cartographie WebGIS et predictions meteo. Stack: TypeScript, React, Node.js, TimescaleDB, Docker.",
    },
    {
      title: 'LUMINA LUXURY ATELIER (E-Commerce 3D)',
      desc: "Boutique interactive pour haute horlogerie avec rendu PBR temps reel et checkout Stripe securise. Stack: React Three Fiber, WebGL, TailwindCSS.",
    },
    {
      title: 'PORTFOLIO IMMERSIF AFRO (Web Application)',
      desc: "Experience web culturelle interactive 2D/3D avec ambiance sonore mandingue et gestion dynamique du contenu. Stack: React 18, TypeScript, Tailwind, Zustand.",
    },
  ];

  for (const proj of projectsList) {
    page.drawText(proj.title, { x: rightX, y: curRightY, size: 8.8, font: fontBold, color: cDark });
    curRightY -= 11;
    page.drawText(proj.desc, { x: rightX + 5, y: curRightY, size: 7.7, font: fontRegular, color: cMuted });
    curRightY -= 16;
  }

  // Footer Note
  page.drawLine({ start: { x: 30, y: 35 }, end: { x: width - 30, y: 35 }, color: cBorder, thickness: 1 });
  page.drawText('Curriculum Vitae officiel - Junes AGASSOUNON - Portfolio en ligne disponible sur GitHub', {
    x: 30,
    y: 22,
    size: 7.5,
    font: fontRegular,
    color: cMuted,
  });
  page.drawText('Disponible pour opportunites Freelance & CDI', {
    x: width - 215,
    y: 22,
    size: 7.5,
    font: fontBold,
    color: cSecondary,
  });

  // Ensure public/assets directory exists
  const publicAssetsDir = path.resolve(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(publicAssetsDir, 'cv-junes-agassounon.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('✅ PDF generated successfully at:', outputPath);
}

generateCV().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
