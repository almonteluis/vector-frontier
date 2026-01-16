import type { GameModule, ModuleLevelConfig, LevelConfig } from '../types';
import { ABSTRACT_LEVELS } from './abstract';
import { DRONE_LEVELS } from './drone';
import { BRIDGE_LEVELS } from './bridge';
import { ROBOTICS_LEVELS } from './robotics';

// Level registry organized by module
export const LEVEL_REGISTRY: Record<GameModule, ModuleLevelConfig[]> = {
    abstract: ABSTRACT_LEVELS,
    drone: DRONE_LEVELS,
    bridge: BRIDGE_LEVELS,
    robotics: ROBOTICS_LEVELS,
};

// Get all levels for a specific module
export function getLevelsForModule(module: GameModule): ModuleLevelConfig[] {
    return LEVEL_REGISTRY[module] || [];
}

// Get a specific level by module and index
export function getLevel(module: GameModule, index: number): ModuleLevelConfig | undefined {
    return LEVEL_REGISTRY[module]?.[index];
}

// Get total level count for a module
export function getLevelCount(module: GameModule): number {
    return LEVEL_REGISTRY[module]?.length || 0;
}

// Module unlock requirements (abstract level index needed to unlock each module)
export const MODULE_UNLOCK_REQUIREMENTS: Record<GameModule, number> = {
    abstract: 0,   // Always unlocked
    drone: 5,      // Complete abstract level 5
    bridge: 10,    // Complete abstract level 10
    robotics: 15,  // Complete abstract level 15
};

// Check if a module should be unlocked based on abstract progress
export function shouldModuleBeUnlocked(module: GameModule, abstractLevelUnlocked: number): boolean {
    return abstractLevelUnlocked >= MODULE_UNLOCK_REQUIREMENTS[module];
}

// Legacy export for backward compatibility
// Maps to abstract levels with optional module field
export const LEVELS: LevelConfig[] = ABSTRACT_LEVELS.map(level => ({
    ...level,
    module: undefined, // Remove module field for backward compatibility
}));

// Re-export individual level arrays for direct access
export { ABSTRACT_LEVELS, DRONE_LEVELS, BRIDGE_LEVELS, ROBOTICS_LEVELS };
