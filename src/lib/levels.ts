// Re-export from new modular level system for backward compatibility
export {
    LEVELS,
    LEVEL_REGISTRY,
    getLevelsForModule,
    getLevel,
    getLevelCount,
    MODULE_UNLOCK_REQUIREMENTS,
    shouldModuleBeUnlocked,
    ABSTRACT_LEVELS,
    DRONE_LEVELS,
    BRIDGE_LEVELS,
    ROBOTICS_LEVELS,
} from './levels/index';
