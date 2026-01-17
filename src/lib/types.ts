export type Vector3 = { x: number; y: number; z: number };

export interface VectorData {
    id: string;
    components: Vector3; // The current vector components
    origin?: Vector3;    // Defaults to (0,0,0) if undefined
    color: string;
    isLocked?: boolean;  // If true, player cannot modify
    label?: string;      // "v1", "v2", etc.
}

// ============================================
// Module System Types
// ============================================

export type GameModule = 'abstract' | 'drone' | 'bridge' | 'robotics';

export type ScreenType = 'landing' | 'menu' | 'game' | 'levelSelect' | 'career';

// ============================================
// Level Configuration Types
// ============================================

// Vector concept for educational tooltips
export interface VectorConcept {
    name: string;
    briefDescription: string;
}

// Base level config (shared across all modules)
export interface BaseLevelConfig {
    id: number;
    title: string;
    description: string;
    targetVector: Vector3;
    allowedVectors: number; // Number of vectors player can use
    tolerance: number;      // Evaluation tolerance
    maxAttempts: number;
    hints: string[];
    vectorConcept?: VectorConcept;
    gridConfig?: {
        size: number;
        labels?: boolean;
    };
}

// Abstract level (original game mode)
export interface AbstractLevelConfig extends BaseLevelConfig {
    module: 'abstract';
}

// Drone-specific level configuration
export interface DroneLevelConfig extends BaseLevelConfig {
    module: 'drone';
    wind: {
        base: Vector3;
        variance: number;           // For changing wind conditions
        noiseFrequency?: number;    // How quickly wind changes
    };
    battery: {
        maxCapacity: number;
        drainPerUnit: number;       // Energy per unit distance
    };
    deliveryTargets: Vector3[];
    obstacles?: { position: Vector3; radius: number }[];
    movingTargets?: { start: Vector3; velocity: Vector3 }[];
    weatherEffects?: 'clear' | 'rain' | 'fog';
}

// Bridge-specific level configuration
export interface BridgeLevelConfig extends BaseLevelConfig {
    module: 'bridge';
    loads: {
        position: Vector3;
        force: Vector3;
        isDynamic?: boolean;
        pattern?: 'constant' | 'oscillating' | 'random';
    }[];
    materials: {
        id: string;
        name: string;
        maxTension: number;
        maxCompression: number;
        costPerUnit: number;
        color: string;
    }[];
    budget: number;
    safetyFactor: number;
    bridgeSpan: { start: Vector3; end: Vector3 };
}

// Robotics-specific level configuration
export interface RoboticsLevelConfig extends BaseLevelConfig {
    module: 'robotics';
    joints: {
        id: string;
        type: 'revolute' | 'prismatic';
        minAngle: number;
        maxAngle: number;
        length: number;         // Arm segment length
        basePosition?: Vector3; // For first joint
    }[];
    pickupTarget: Vector3;
    placeTarget: Vector3;
    obstacles?: { position: Vector3; size: Vector3 }[];
    sequence?: ('pick' | 'place' | 'move')[];
    speedLimit?: number;
    precisionRequired?: number;
}

// Legacy LevelConfig for backward compatibility
export interface LevelConfig extends BaseLevelConfig {
    module?: 'abstract';
}

// Union type for all level configs
export type ModuleLevelConfig =
    | AbstractLevelConfig
    | DroneLevelConfig
    | BridgeLevelConfig
    | RoboticsLevelConfig;

// ============================================
// Module-Specific State Types
// ============================================

export interface DroneState {
    currentWind: Vector3;
    batteryRemaining: number;
    deliveriesCompleted: number;
    trajectoryPreview: Vector3[];
    isFlying: boolean;
}

export interface BridgeMember {
    id: string;
    start: Vector3;
    end: Vector3;
    materialId: string;
}

export interface BridgeState {
    placedMembers: BridgeMember[];
    currentLoads: { position: Vector3; force: Vector3 }[];
    totalCost: number;
    equilibriumError: number;
    selectedMaterialId: string | null;
}

export interface RoboticsState {
    jointAngles: number[];
    endEffectorPosition: Vector3;
    heldObject: boolean;
    sequenceStep: number;
    programmedSequence: { jointAngles: number[]; action?: 'pick' | 'place' }[];
}

// ============================================
// Career System Types
// ============================================

export type BadgeTier = 'bronze' | 'silver' | 'gold';

export interface CareerBadge {
    id: string;
    name: string;
    description: string;
    icon: string;
    module: GameModule;
    tier: BadgeTier;
    requirements: {
        levelsCompleted?: number;
        starsEarned?: number;
        perfectLevels?: number;     // 3 stars with max attempts remaining
        moduleSpecific?: Record<string, number>;
    };
}

export interface ModuleProgress {
    levelsCompleted: number;
    starsEarned: number;
    perfectLevels: number;
    unlockedIndex: number;
    starsPerLevel: Record<number, number>;
}

export interface CareerProgress {
    earnedBadges: string[];         // Badge IDs
    totalStars: number;
    moduleProgress: Record<GameModule, ModuleProgress>;
}

// ============================================
// Submit Result Types
// ============================================

export interface SubmitResult {
    success: boolean;
    errorVector: Vector3;
    magnitudeError: number;
    isNearMiss: boolean;
    // Module-specific feedback
    batteryDepleted?: boolean;      // Drone
    budgetExceeded?: boolean;       // Bridge
    jointLimitViolation?: boolean;  // Robotics
}

// ============================================
// Legacy Types (for backward compatibility)
// ============================================

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
