import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    LevelConfig,
    VectorData,
    Vector3,
    GameModule,
    ScreenType,
    ModuleLevelConfig,
    ModuleProgress,
    CareerProgress,
    DroneState,
    BridgeState,
    RoboticsState,
    SubmitResult,
    DroneLevelConfig,
    BridgeLevelConfig,
    RoboticsLevelConfig,
} from '../lib/types';
import { LEVELS, getLevelsForModule, shouldModuleBeUnlocked } from '../lib/levels';

// Simple ID generator
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initialize empty module progress
const createEmptyModuleProgress = (): ModuleProgress => ({
    levelsCompleted: 0,
    starsEarned: 0,
    perfectLevels: 0,
    unlockedIndex: 0,
    starsPerLevel: {},
});

// Initialize career progress
const createInitialCareerProgress = (): CareerProgress => ({
    earnedBadges: [],
    totalStars: 0,
    moduleProgress: {
        abstract: createEmptyModuleProgress(),
        drone: createEmptyModuleProgress(),
        bridge: createEmptyModuleProgress(),
        robotics: createEmptyModuleProgress(),
    },
});

interface GameStore {
    // === Navigation State ===
    currentScreen: ScreenType;
    activeModule: GameModule;

    // === Module Unlocks ===
    moduleUnlocks: Record<GameModule, boolean>;

    // === Legacy Persistence (for backward compatibility) ===
    unlockedLevelIndex: number;
    starsPerLevel: Record<number, number>;

    // === Career Progress ===
    careerProgress: CareerProgress;

    // === Session State ===
    currentLevelIndex: number;
    currentLevel: ModuleLevelConfig | LevelConfig;
    vectors: VectorData[];
    selectedVectorId: string | null;
    attemptsDisplay: number;
    isGameWon: boolean;
    isPlaying: boolean;
    bestErrorThisLevel: number;

    // === Module-Specific State ===
    droneState: DroneState | null;
    bridgeState: BridgeState | null;
    roboticsState: RoboticsState | null;

    // === Navigation Actions ===
    setScreen: (screen: ScreenType) => void;
    setActiveModule: (module: GameModule) => void;

    // === Module Actions ===
    checkModuleUnlocks: () => void;

    // === Level Actions ===
    loadLevel: (index: number) => void;
    nextLevel: () => void;
    resetLevel: () => void;

    // === Vector Actions ===
    selectVector: (id: string | null) => void;
    updateVector: (id: string, updates: Partial<VectorData>) => void;

    // === Game Actions ===
    submitResult: () => SubmitResult;
    unlockNextLevel: (stars: number) => void;

    // === Drone-Specific Actions ===
    updateDroneState: (updates: Partial<DroneState>) => void;
    simulateWind: (deltaTime: number) => void;

    // === Bridge-Specific Actions ===
    updateBridgeState: (updates: Partial<BridgeState>) => void;

    // === Robotics-Specific Actions ===
    updateRoboticsState: (updates: Partial<RoboticsState>) => void;
    updateJointAngle: (jointIndex: number, angle: number) => void;
}

// Vector math utilities
export const vectorAdd = (v1: Vector3, v2: Vector3): Vector3 => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z
});

export const vectorSub = (v1: Vector3, v2: Vector3): Vector3 => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z
});

export const magnitude = (v: Vector3): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            // === Navigation State ===
            currentScreen: 'menu',
            activeModule: 'abstract',

            // === Module Unlocks ===
            moduleUnlocks: {
                abstract: true,
                drone: false,
                bridge: false,
                robotics: false,
            },

            // === Legacy Persistence ===
            unlockedLevelIndex: 0,
            starsPerLevel: {},

            // === Career Progress ===
            careerProgress: createInitialCareerProgress(),

            // === Session State ===
            currentLevelIndex: 0,
            currentLevel: LEVELS[0],
            vectors: [],
            selectedVectorId: null,
            attemptsDisplay: LEVELS[0].maxAttempts,
            isGameWon: false,
            isPlaying: false,
            bestErrorThisLevel: Infinity,

            // === Module-Specific State ===
            droneState: null,
            bridgeState: null,
            roboticsState: null,

            // === Navigation Actions ===
            setScreen: (screen) => set({ currentScreen: screen }),

            setActiveModule: (module) => {
                const { moduleUnlocks, checkModuleUnlocks } = get();
                checkModuleUnlocks();

                if (!moduleUnlocks[module] && module !== 'abstract') {
                    return; // Can't switch to locked module
                }

                set({
                    activeModule: module,
                    currentLevelIndex: 0,
                    isPlaying: false,
                    isGameWon: false,
                    droneState: null,
                    bridgeState: null,
                    roboticsState: null,
                });
            },

            // === Module Actions ===
            checkModuleUnlocks: () => {
                const { careerProgress } = get();
                const abstractUnlocked = careerProgress.moduleProgress.abstract.unlockedIndex;

                set({
                    moduleUnlocks: {
                        abstract: true,
                        drone: shouldModuleBeUnlocked('drone', abstractUnlocked),
                        bridge: shouldModuleBeUnlocked('bridge', abstractUnlocked),
                        robotics: shouldModuleBeUnlocked('robotics', abstractUnlocked),
                    }
                });
            },

            // === Level Actions ===
            loadLevel: (index) => {
                const { activeModule } = get();
                const levels = getLevelsForModule(activeModule);
                const level = levels[index];

                if (!level) return;

                const initialVectors: VectorData[] = Array.from({ length: level.allowedVectors }).map((_, i) => ({
                    id: generateId(),
                    components: { x: 0, y: 0.1, z: 0 },
                    color: '#FFD166',
                    label: `v${i + 1}`
                }));

                // Initialize module-specific state
                let droneState: DroneState | null = null;
                let bridgeState: BridgeState | null = null;
                let roboticsState: RoboticsState | null = null;

                if (activeModule === 'drone' && 'wind' in level) {
                    const droneLevel = level as DroneLevelConfig;
                    droneState = {
                        currentWind: { ...droneLevel.wind.base },
                        batteryRemaining: droneLevel.battery.maxCapacity,
                        deliveriesCompleted: 0,
                        trajectoryPreview: [],
                        isFlying: false,
                    };
                } else if (activeModule === 'bridge' && 'loads' in level) {
                    const bridgeLevel = level as BridgeLevelConfig;
                    bridgeState = {
                        placedMembers: [],
                        currentLoads: bridgeLevel.loads.map(l => ({
                            position: { ...l.position },
                            force: { ...l.force },
                        })),
                        totalCost: 0,
                        equilibriumError: Infinity,
                        selectedMaterialId: bridgeLevel.materials[0]?.id || null,
                    };
                } else if (activeModule === 'robotics' && 'joints' in level) {
                    const roboticsLevel = level as RoboticsLevelConfig;
                    roboticsState = {
                        jointAngles: roboticsLevel.joints.map(() => 0),
                        endEffectorPosition: { x: 0, y: 0, z: 0 },
                        heldObject: false,
                        sequenceStep: 0,
                        programmedSequence: [],
                    };
                }

                set({
                    currentLevelIndex: index,
                    currentLevel: level,
                    vectors: initialVectors,
                    selectedVectorId: initialVectors[0]?.id || null,
                    attemptsDisplay: level.maxAttempts,
                    isGameWon: false,
                    isPlaying: true,
                    bestErrorThisLevel: Infinity,
                    droneState,
                    bridgeState,
                    roboticsState,
                });
            },

            nextLevel: () => {
                const { currentLevelIndex, activeModule, loadLevel } = get();
                const levels = getLevelsForModule(activeModule);
                if (currentLevelIndex < levels.length - 1) {
                    loadLevel(currentLevelIndex + 1);
                }
            },

            resetLevel: () => {
                const { currentLevelIndex, loadLevel } = get();
                loadLevel(currentLevelIndex);
            },

            // === Vector Actions ===
            selectVector: (id) => set({ selectedVectorId: id }),

            updateVector: (id, updates) => {
                set((state) => ({
                    vectors: state.vectors.map(v => v.id === id ? { ...v, ...updates } : v)
                }));
            },

            // === Game Actions ===
            submitResult: () => {
                const { activeModule } = get();

                switch (activeModule) {
                    case 'drone':
                        return submitDroneResult(get, set);
                    case 'bridge':
                        return submitBridgeResult(get, set);
                    case 'robotics':
                        return submitRoboticsResult(get, set);
                    default:
                        return submitAbstractResult(get, set);
                }
            },

            unlockNextLevel: (stars) => {
                const { currentLevelIndex, activeModule, careerProgress, checkModuleUnlocks } = get();
                const nextIndex = currentLevelIndex + 1;

                // Update module progress
                const moduleProgress = { ...careerProgress.moduleProgress[activeModule] };
                moduleProgress.unlockedIndex = Math.max(moduleProgress.unlockedIndex, nextIndex);
                moduleProgress.starsPerLevel = {
                    ...moduleProgress.starsPerLevel,
                    [currentLevelIndex]: Math.max(moduleProgress.starsPerLevel[currentLevelIndex] || 0, stars)
                };

                // Calculate total stars for this module
                moduleProgress.starsEarned = Object.values(moduleProgress.starsPerLevel).reduce((a, b) => a + b, 0);
                moduleProgress.levelsCompleted = Object.keys(moduleProgress.starsPerLevel).length;

                // Check for perfect level (3 stars)
                if (stars === 3) {
                    moduleProgress.perfectLevels = Object.values(moduleProgress.starsPerLevel).filter(s => s === 3).length;
                }

                // Calculate total stars across all modules
                const newModuleProgress = {
                    ...careerProgress.moduleProgress,
                    [activeModule]: moduleProgress,
                };
                const totalStars = Object.values(newModuleProgress).reduce((sum, mp) => sum + mp.starsEarned, 0);

                set((state) => ({
                    // Legacy fields for backward compatibility
                    unlockedLevelIndex: activeModule === 'abstract'
                        ? Math.max(state.unlockedLevelIndex, nextIndex)
                        : state.unlockedLevelIndex,
                    starsPerLevel: activeModule === 'abstract'
                        ? { ...state.starsPerLevel, [currentLevelIndex]: Math.max(state.starsPerLevel[currentLevelIndex] || 0, stars) }
                        : state.starsPerLevel,
                    // New career progress
                    careerProgress: {
                        ...state.careerProgress,
                        totalStars,
                        moduleProgress: newModuleProgress,
                    },
                }));

                // Check if new modules should be unlocked
                checkModuleUnlocks();
            },

            // === Drone-Specific Actions ===
            updateDroneState: (updates) => {
                set((state) => ({
                    droneState: state.droneState ? { ...state.droneState, ...updates } : null
                }));
            },

            simulateWind: (_deltaTime) => {
                const { currentLevel, droneState } = get();
                if (!droneState || !('wind' in currentLevel)) return;

                const droneLevel = currentLevel as DroneLevelConfig;
                const { base, variance, noiseFrequency = 0.1 } = droneLevel.wind;

                // Simple wind variation using sine waves (simplex noise would be better)
                const time = Date.now() * 0.001 * noiseFrequency;
                const variationX = Math.sin(time) * variance;
                const variationY = Math.sin(time * 1.3) * variance * 0.5;
                const variationZ = Math.sin(time * 0.7) * variance;

                set({
                    droneState: {
                        ...droneState,
                        currentWind: {
                            x: base.x + variationX,
                            y: base.y + variationY,
                            z: base.z + variationZ,
                        }
                    }
                });
            },

            // === Bridge-Specific Actions ===
            updateBridgeState: (updates) => {
                set((state) => ({
                    bridgeState: state.bridgeState ? { ...state.bridgeState, ...updates } : null
                }));
            },

            // === Robotics-Specific Actions ===
            updateRoboticsState: (updates) => {
                set((state) => ({
                    roboticsState: state.roboticsState ? { ...state.roboticsState, ...updates } : null
                }));
            },

            updateJointAngle: (jointIndex, angle) => {
                const { roboticsState, currentLevel } = get();
                if (!roboticsState || !('joints' in currentLevel)) return;

                const roboticsLevel = currentLevel as RoboticsLevelConfig;
                const joint = roboticsLevel.joints[jointIndex];
                if (!joint) return;

                // Clamp to joint limits
                const clampedAngle = Math.max(joint.minAngle, Math.min(joint.maxAngle, angle));

                const newAngles = [...roboticsState.jointAngles];
                newAngles[jointIndex] = clampedAngle;

                // Calculate forward kinematics to get end effector position
                let x = 0, y = 0;
                let cumulativeAngle = 0;
                for (let i = 0; i < roboticsLevel.joints.length; i++) {
                    cumulativeAngle += newAngles[i];
                    x += roboticsLevel.joints[i].length * Math.cos(cumulativeAngle);
                    y += roboticsLevel.joints[i].length * Math.sin(cumulativeAngle);
                }

                set({
                    roboticsState: {
                        ...roboticsState,
                        jointAngles: newAngles,
                        endEffectorPosition: { x, y, z: 0 },
                    }
                });
            },
        }),
        {
            name: 'vector-voyage-storage',
            partialize: (state) => ({
                // Legacy fields
                unlockedLevelIndex: state.unlockedLevelIndex,
                starsPerLevel: state.starsPerLevel,
                // New module system
                activeModule: state.activeModule,
                moduleUnlocks: state.moduleUnlocks,
                careerProgress: state.careerProgress,
            }),
        }
    )
);

// === Module-Specific Submit Functions ===

function submitAbstractResult(
    get: () => GameStore,
    set: (partial: Partial<GameStore> | ((state: GameStore) => Partial<GameStore>)) => void
): SubmitResult {
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
        const improvementRatio = bestErrorThisLevel !== Infinity
            ? (bestErrorThisLevel - errorMag) / bestErrorThisLevel
            : 0;
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
}

function submitDroneResult(
    get: () => GameStore,
    set: (partial: Partial<GameStore> | ((state: GameStore) => Partial<GameStore>)) => void
): SubmitResult {
    const { vectors, currentLevel, droneState, unlockNextLevel, bestErrorThisLevel } = get();

    if (!droneState || !('wind' in currentLevel)) {
        return submitAbstractResult(get, set);
    }

    const droneLevel = currentLevel as DroneLevelConfig;
    const wind = droneState.currentWind;

    // Sum all thrust vectors
    let thrustResultant: Vector3 = { x: 0, y: 0, z: 0 };
    vectors.forEach(v => {
        thrustResultant = vectorAdd(thrustResultant, v.components);
    });

    // Apply wind to get effective trajectory
    const effectiveVector = vectorAdd(thrustResultant, wind);

    // Check if reaches first delivery target
    const target = droneLevel.deliveryTargets[0];
    const errorVector = vectorSub(target, effectiveVector);
    const errorMag = magnitude(errorVector);

    // Check battery
    const thrustMagnitude = magnitude(thrustResultant);
    const batteryUsed = thrustMagnitude * droneLevel.battery.drainPerUnit;
    const batteryDepleted = batteryUsed > droneLevel.battery.maxCapacity;

    const success = errorMag <= droneLevel.tolerance && !batteryDepleted;

    let isNearMiss = false;
    if (!success && !batteryDepleted) {
        const improvementRatio = bestErrorThisLevel !== Infinity
            ? (bestErrorThisLevel - errorMag) / bestErrorThisLevel
            : 0;
        const absoluteClose = errorMag <= droneLevel.tolerance * 1.5;

        if (improvementRatio >= 0.35 || absoluteClose) {
            isNearMiss = true;
        }
    }

    set((state) => ({
        bestErrorThisLevel: Math.min(state.bestErrorThisLevel, errorMag),
        droneState: state.droneState ? {
            ...state.droneState,
            batteryRemaining: droneLevel.battery.maxCapacity - batteryUsed,
        } : null,
    }));

    if (success) {
        const stars = 3;
        unlockNextLevel(stars);
        set({ isGameWon: true, isPlaying: false });
    } else {
        set((state) => ({ attemptsDisplay: Math.max(0, state.attemptsDisplay - 1) }));
    }

    return { success, errorVector, magnitudeError: errorMag, isNearMiss, batteryDepleted };
}

function submitBridgeResult(
    get: () => GameStore,
    set: (partial: Partial<GameStore> | ((state: GameStore) => Partial<GameStore>)) => void
): SubmitResult {
    const { vectors, currentLevel, bridgeState, unlockNextLevel, bestErrorThisLevel } = get();

    if (!bridgeState || !('loads' in currentLevel)) {
        return submitAbstractResult(get, set);
    }

    const bridgeLevel = currentLevel as BridgeLevelConfig;

    // For bridge levels, vectors represent support reactions
    // Sum all support forces
    let supportResultant: Vector3 = { x: 0, y: 0, z: 0 };
    vectors.forEach(v => {
        supportResultant = vectorAdd(supportResultant, v.components);
    });

    // Sum all applied loads
    let loadResultant: Vector3 = { x: 0, y: 0, z: 0 };
    bridgeLevel.loads.forEach(load => {
        loadResultant = vectorAdd(loadResultant, load.force);
    });

    // Equilibrium: supports + loads should equal zero
    const netForce = vectorAdd(supportResultant, loadResultant);
    const equilibriumError = magnitude(netForce);

    // Check budget
    const budgetExceeded = bridgeState.totalCost > bridgeLevel.budget;

    const success = equilibriumError <= bridgeLevel.tolerance && !budgetExceeded;

    let isNearMiss = false;
    if (!success && !budgetExceeded) {
        const improvementRatio = bestErrorThisLevel !== Infinity
            ? (bestErrorThisLevel - equilibriumError) / bestErrorThisLevel
            : 0;
        const absoluteClose = equilibriumError <= bridgeLevel.tolerance * 1.5;

        if (improvementRatio >= 0.35 || absoluteClose) {
            isNearMiss = true;
        }
    }

    set((state) => ({
        bestErrorThisLevel: Math.min(state.bestErrorThisLevel, equilibriumError),
        bridgeState: state.bridgeState ? {
            ...state.bridgeState,
            equilibriumError,
        } : null,
    }));

    if (success) {
        const stars = 3;
        unlockNextLevel(stars);
        set({ isGameWon: true, isPlaying: false });
    } else {
        set((state) => ({ attemptsDisplay: Math.max(0, state.attemptsDisplay - 1) }));
    }

    return { success, errorVector: netForce, magnitudeError: equilibriumError, isNearMiss, budgetExceeded };
}

function submitRoboticsResult(
    get: () => GameStore,
    set: (partial: Partial<GameStore> | ((state: GameStore) => Partial<GameStore>)) => void
): SubmitResult {
    const { currentLevel, roboticsState, unlockNextLevel, bestErrorThisLevel } = get();

    if (!roboticsState || !('joints' in currentLevel)) {
        return submitAbstractResult(get, set);
    }

    const roboticsLevel = currentLevel as RoboticsLevelConfig;
    const { endEffectorPosition, jointAngles, sequenceStep } = roboticsState;

    // Determine current target based on sequence
    const currentTarget = sequenceStep === 0 ? roboticsLevel.pickupTarget : roboticsLevel.placeTarget;

    const errorVector = vectorSub(currentTarget, endEffectorPosition);
    const errorMag = magnitude(errorVector);

    // Check joint limits
    let jointLimitViolation = false;
    for (let i = 0; i < roboticsLevel.joints.length; i++) {
        const joint = roboticsLevel.joints[i];
        const angle = jointAngles[i];
        if (angle < joint.minAngle || angle > joint.maxAngle) {
            jointLimitViolation = true;
            break;
        }
    }

    const success = errorMag <= roboticsLevel.tolerance && !jointLimitViolation;

    let isNearMiss = false;
    if (!success && !jointLimitViolation) {
        const improvementRatio = bestErrorThisLevel !== Infinity
            ? (bestErrorThisLevel - errorMag) / bestErrorThisLevel
            : 0;
        const absoluteClose = errorMag <= roboticsLevel.tolerance * 1.5;

        if (improvementRatio >= 0.35 || absoluteClose) {
            isNearMiss = true;
        }
    }

    set((state) => ({
        bestErrorThisLevel: Math.min(state.bestErrorThisLevel, errorMag),
    }));

    if (success) {
        const stars = 3;
        unlockNextLevel(stars);
        set({ isGameWon: true, isPlaying: false });
    } else {
        set((state) => ({ attemptsDisplay: Math.max(0, state.attemptsDisplay - 1) }));
    }

    return { success, errorVector, magnitudeError: errorMag, isNearMiss, jointLimitViolation };
}
