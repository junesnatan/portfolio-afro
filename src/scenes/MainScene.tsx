import React from 'react';
import { Physics } from '@react-three/rapier';
import { SpawnHub } from '@/world/Hub/SpawnHub';
import { IdentityHub } from '@/world/Identity/IdentityHub';
import { DevelopmentLab } from '@/world/DevLab/DevelopmentLab';
import { CreativeStudio } from '@/world/Creative/CreativeStudio';
import { ProjectDistrict } from '@/world/Projects/ProjectDistrict';
import { ContactStation } from '@/world/Contact/ContactStation';
import { CyberPathways } from '@/world/Environment/CyberPathways';
import { AfricanScenery } from '@/world/Environment/AfricanScenery';
import { CollectiblesManager } from '@/collectibles/CollectiblesManager';
import { AmbientDust } from '@/particles/AmbientDust';
import { CharacterController } from '@/player/CharacterController';
import { CameraController } from '@/camera/CameraController';

export const MainScene: React.FC = () => {
  return (
    <>
      {/* ======================================================== */}
      {/* 1. SCENE LIGHTING & WARM AFRICAN DAYLIGHT ATMOSPHERE     */}
      {/* ======================================================== */}
      {/* Warm Ambient Sunlight Fill */}
      <ambientLight intensity={0.75} color="#FFF2E2" />

      {/* Main Golden Sun (Direct Savanna Daylight) */}
      <directionalLight
        position={[30, 45, 25]}
        intensity={2.2}
        color="#FFF4DE"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={140}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-bias={-0.0001}
      />

      {/* Warm Ochre Rim / Fill Light */}
      <directionalLight
        position={[-25, 20, -25]}
        intensity={0.65}
        color="#FDE8B3"
      />

      {/* Hemisphere Light: Warm Blue-Gold Sky over Clay Earth */}
      <hemisphereLight
        color="#FFEAD1"
        groundColor="#8C5332"
        intensity={0.55}
      />

      {/* Warm Soft Atmospheric Horizon Fog & Clear Warm Sky */}
      <color attach="background" args={['#F7EFE5']} />
      <fog attach="fog" args={['#F4E8D8', 35, 125]} />

      {/* Floating Warm Golden Savanna Dust / Sun Pollen */}
      <AmbientDust count={600} areaRadius={60} />

      {/* Stylized Infinite Savanna Clay Earth (Visual Ground Plane) */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#B58156" roughness={0.96} metalness={0.05} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. RAPIER PHYSICS SIMULATION & AFRICAN ARCHITECTURE       */}
      {/* ======================================================== */}
      <Physics gravity={[0, -18, 0]} colliders={false}>
        {/* Natural Savanna Trees, Pottery & Sculptures */}
        <AfricanScenery />

        {/* Le Patio de l'Atelier (Spawn Hub) */}
        <SpawnHub />

        {/* L'Arbre de Vie & Rotonde Identité */}
        <IdentityHub position={[0, 0, -20]} />

        {/* L'Atelier Tech & Ingénierie (Dev Lab) */}
        <DevelopmentLab position={[-25, 0, -10]} />

        {/* Le Pavillon Graphique & Création (Creative Studio) */}
        <CreativeStudio position={[25, 0, -10]} />

        {/* Quartier des Projets & Réalisations */}
        <ProjectDistrict position={[0, 0, -45]} />

        {/* L'Arbre à Palabre / Kiosque de Contact */}
        <ContactStation position={[20, 0, -35]} />

        {/* Allées en Terre Cuite & Bois Gravé */}
        <CyberPathways />

        {/* Amulettes, Cauris et Trésors Cachés */}
        <CollectiblesManager />

        {/* Stylized African Creative Protagonist */}
        <CharacterController initialPosition={[0, 1.2, 4]} />
      </Physics>

      {/* ======================================================== */}
      {/* 3. DYNAMIC THIRD-PERSON CAMERA CONTROLLER               */}
      {/* ======================================================== */}
      <CameraController />
    </>
  );
};
