import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LevelConfig, VectorData, Vector3 } from '../lib/types';
import { LEVELS } from '../lib/levels';

// Simple ID generator
const generateId = () => Math.random().toString(36).substring(2, 9);

interface GameStore {
    // Persistence
    unlockedLevelIndex: number;
    starsPerLevel: Record<number, number>;

    // Session State
    currentLevelIndex: number;
    currentLevel: LevelConfig;
    vectors: VectorData[];
    selectedVectorId: string | null;
    attemptsDisplay: number;
    isGameWon: boolean;
    isPlaying: boolean;
    bestErrorThisLevel: number; // For near-miss calculation

    // Actions
    loadLevel: (index: number) => void;
    nextLevel: () => void;
    resetLevel: () => void;

    selectVector: (id: string | null) => void;
    updateVector: (id: string, updates: Partial<VectorData>) => void;
    // addVector: () => void;

    submitResult: () => { success: boolean; errorVector: Vector3, magnitudeError: number, isNearMiss: boolean };

    unlockNextLevel: (stars: number) => void;
}

const vectorAdd = (v1: Vector3, v2: Vector3): Vector3 => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z
});

const vectorSub = (v1: Vector3, v2: Vector3): Vector3 => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z
});

const magnitude = (v: Vector3): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            unlockedLevelIndex: 0,
            starsPerLevel: {},

            currentLevelIndex: 0,
            currentLevel: LEVELS[0],
            vectors: [],
            selectedVectorId: null,
            attemptsDisplay: LEVELS[0].maxAttempts,
            isGameWon: false,
            isPlaying: false,
            bestErrorThisLevel: Infinity,

            loadLevel: (index) => {
                const level = LEVELS[index];
                if (!level) return;

                const initialVectors: VectorData[] = Array.from({ length: level.allowedVectors }).map((_, i) => ({
                    id: generateId(),
                    components: { x: 0, y: 0.1, z: 0 },
                    color: '#FFD166',
                    label: `v${i + 1}`
                }));

                set({
                    currentLevelIndex: index,
                    currentLevel: level,
                    vectors: initialVectors,
                    selectedVectorId: initialVectors[0].id,
                    attemptsDisplay: level.maxAttempts,
                    isGameWon: false,
                    isPlaying: true,
                    bestErrorThisLevel: Infinity
                });
            },

            nextLevel: () => {
                const { currentLevelIndex, loadLevel } = get();
                if (currentLevelIndex < LEVELS.length - 1) {
                    loadLevel(currentLevelIndex + 1);
                }
            },

            resetLevel: () => {
                const { currentLevelIndex, loadLevel } = get();
                loadLevel(currentLevelIndex);
            },

            selectVector: (id) => set({ selectedVectorId: id }),

            updateVector: (id, updates) => {
                set((state) => ({
                    vectors: state.vectors.map(v => v.id === id ? { ...v, ...updates } : v)
                }));
            },

            submitResult: () => {
                const { vectors, currentLevel, unlockNextLevel, bestErrorThisLevel } = get();
                // Sum all player vectors
                let resultant: Vector3 = { x: 0, y: 0, z: 0 };
                vectors.forEach(v => {
                    resultant = vectorAdd(resultant, v.components);
                });

                const errorVector = vectorSub(currentLevel.targetVector, resultant);
                const errorMag = magnitude(errorVector);
                const success = errorMag <= currentLevel.tolerance;

                let isNearMiss = false;
                if (!success) {
                    // Near-miss logic
                    // 1. Improvement >= 35% compared to best error
                    // 2. Or |E| <= tolerance * 1.5
                    const improvementRatio = bestErrorThisLevel !== Infinity ? (bestErrorThisLevel - errorMag) / bestErrorThisLevel : 0;
                    const absoluteClose = errorMag <= currentLevel.tolerance * 1.5;

                    if (improvementRatio >= 0.35 || absoluteClose) {
                        isNearMiss = true;
                    }
                }

                set((state) => ({
                    bestErrorThisLevel: Math.min(state.bestErrorThisLevel, errorMag)
                }));

                if (success) {
                    const stars = 3;
                    unlockNextLevel(stars);
                    set({ isGameWon: true, isPlaying: false });
                } else {
                    set((state) => ({ attemptsDisplay: Math.max(0, state.attemptsDisplay - 1) }));
                }

                return { success, errorVector, magnitudeError: errorMag, isNearMiss };
            },

            unlockNextLevel: (stars) => {
                set((state) => {
                    const nextIndex = state.currentLevelIndex + 1;
                    const newUnlocked = Math.max(state.unlockedLevelIndex, nextIndex);
                    return {
                        unlockedLevelIndex: newUnlocked,
                        starsPerLevel: { ...state.starsPerLevel, [state.currentLevelIndex]: Math.max(state.starsPerLevel[state.currentLevelIndex] || 0, stars) }
                    };
                });
            }

        }),
        {
            name: 'vector-voyage-storage',
            partialize: (state) => ({
                unlockedLevelIndex: state.unlockedLevelIndex,
                starsPerLevel: state.starsPerLevel
            }),
        }
    )
);
