export type Vector3 = { x: number; y: number; z: number };

export interface VectorData {
    id: string;
    components: Vector3; // The current vector components
    origin?: Vector3;    // Defaults to (0,0,0) if undefined
    color: string;
    isLocked?: boolean;  // If true, player cannot modify
    label?: string;      // "v1", "v2", etc.
}

export interface LevelConfig {
    id: number;
    title: string;
    description: string;
    targetVector: Vector3;
    allowedVectors: number; // Number of vectors player can use
    tolerance: number;      // Evaluation tolerance
    maxAttempts: number;
    hints: string[];
    gridConfig?: {
        size: number;
        labels?: boolean;
    };
}

export interface GameState {
    currentLevelId: number;
    vectors: VectorData[];
    selectedVectorId: string | null;
    attemptsUsed: number;
    isGameWon: boolean;
    isHelpersVisible: boolean; // overlay helpers
}

export interface PersistenceData {
    unlockedLevelIndex: number;
    starsPerLevel: Record<number, number>; // levelId -> stars
    bestTimePerLevel: Record<number, number>;
}
