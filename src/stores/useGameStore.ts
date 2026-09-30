import { create } from 'zustand';
import {
  PlayerAnimation,
  PlayerState,
  Vector3Array,
  ZoneId,
  MissionData,
  CollectibleData,
} from '@/types';
import {
  MISSIONS_DATA,
  COLLECTIBLES_DATA,
} from '@/database/data';
import { INITIAL_PLAYER_POSITION } from '@/config/constants';

interface GameStore {
  // Player
  player: PlayerState;
  setPlayerPosition: (position: Vector3Array) => void;
  setPlayerRotation: (rotation: number) => void;
  setPlayerAnimation: (animation: PlayerAnimation) => void;
  setPlayerGrounded: (grounded: boolean) => void;

  // World & Progression
  currentZone: ZoneId;
  setCurrentZone: (zone: ZoneId) => void;
  visitedZones: Set<ZoneId>;

  // Missions
  missions: MissionData[];
  completeMission: (missionId: string) => void;

  // Collectibles
  collectibles: CollectibleData[];
  collectItem: (collectibleId: string) => void;

  // Signature World Transformation
  worldEvolutionStage: number; // 0: Init, 1: Identity, 2: Dev, 3: Design, 4: Projects, 5: Transformed
  advanceEvolutionStage: (stage: number) => void;

  // Calculated Stats
  getExplorationPercentage: () => number;
  resetProgress: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  player: {
    position: INITIAL_PLAYER_POSITION,
    rotation: 0,
    velocity: [0, 0, 0],
    animation: 'idle',
    isGrounded: true,
    isInteracting: false,
  },

  setPlayerPosition: (position) =>
    set((state) => ({ player: { ...state.player, position } })),

  setPlayerRotation: (rotation) =>
    set((state) => ({ player: { ...state.player, rotation } })),

  setPlayerAnimation: (animation) =>
    set((state) => {
      if (state.player.animation === animation) return state;
      return { player: { ...state.player, animation } };
    }),

  setPlayerGrounded: (isGrounded) =>
    set((state) => ({ player: { ...state.player, isGrounded } })),

  currentZone: 'spawn',
  setCurrentZone: (currentZone) =>
    set((state) => {
      const nextVisited = new Set(state.visitedZones);
      nextVisited.add(currentZone);

      // Check mission completions based on zones
      let nextMissions = [...state.missions];
      if (currentZone === 'identity') {
        nextMissions = nextMissions.map((m) =>
          m.id === 'm-2' ? { ...m, status: 'completed' as const } : m
        );
      } else if (currentZone === 'devlab') {
        nextMissions = nextMissions.map((m) =>
          m.id === 'm-3' ? { ...m, status: 'completed' as const } : m
        );
      } else if (currentZone === 'creativestudio') {
        nextMissions = nextMissions.map((m) =>
          m.id === 'm-4' ? { ...m, status: 'completed' as const } : m
        );
      } else if (currentZone === 'contact') {
        nextMissions = nextMissions.map((m) =>
          m.id === 'm-6' ? { ...m, status: 'completed' as const } : m
        );
      }

      return {
        currentZone,
        visitedZones: nextVisited,
        missions: nextMissions,
      };
    }),

  visitedZones: new Set<ZoneId>(['spawn']),

  missions: MISSIONS_DATA,
  completeMission: (missionId) =>
    set((state) => {
      const updated = state.missions.map((m) =>
        m.id === missionId ? { ...m, status: 'completed' as const } : m
      );
      return { missions: updated };
    }),

  collectibles: COLLECTIBLES_DATA,
  collectItem: (collectibleId) =>
    set((state) => {
      const updated = state.collectibles.map((c) =>
        c.id === collectibleId ? { ...c, collected: true } : c
      );
      return { collectibles: updated };
    }),

  worldEvolutionStage: 0,
  advanceEvolutionStage: (stage) =>
    set((state) => ({
      worldEvolutionStage: Math.max(state.worldEvolutionStage, stage),
    })),

  getExplorationPercentage: () => {
    const state = get();
    const totalZones = 7;
    const visitedCount = state.visitedZones.size;
    const completedMissions = state.missions.filter(
      (m) => m.status === 'completed'
    ).length;
    const collectedCount = state.collectibles.filter((c) => c.collected).length;

    const zoneScore = (visitedCount / totalZones) * 40;
    const missionScore = (completedMissions / state.missions.length) * 40;
    const collectibleScore =
      (collectedCount / (state.collectibles.length || 1)) * 20;

    return Math.min(100, Math.round(zoneScore + missionScore + collectibleScore));
  },

  resetProgress: () =>
    set({
      visitedZones: new Set<ZoneId>(['spawn']),
      missions: MISSIONS_DATA,
      collectibles: COLLECTIBLES_DATA,
      worldEvolutionStage: 0,
    }),
}));
