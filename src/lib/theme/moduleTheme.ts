import type { GameModule, BadgeTier } from '../types';

export const MODULE_COLORS: Record<GameModule, string> = {
    abstract: '#d946ef',
    drone: '#00d9ff',
    bridge: '#f59e0b',
    robotics: '#84cc16',
};

export const MODULE_NAMES: Record<GameModule, string> = {
    abstract: 'Abstract',
    drone: 'Drone',
    bridge: 'Bridge',
    robotics: 'Robotics',
};

export const MODULE_ICONS: Record<GameModule, string> = {
    abstract: '🎯',
    drone: '🛸',
    bridge: '🌉',
    robotics: '🤖',
};

export const MODULE_TITLES: Record<GameModule, string> = {
    abstract: 'Abstract Puzzles',
    drone: 'Drone Delivery',
    bridge: 'Bridge Engineering',
    robotics: 'Robotics Assembly',
};

export const MODULE_SUBTITLES: Record<GameModule, string> = {
    abstract: 'VECTOR LOGIC ENGAGED',
    drone: 'VECTOR NAVIGATION ENGAGED',
    bridge: 'STRUCTURAL ANALYSIS ENGAGED',
    robotics: 'MECHANICAL SYSTEMS ENGAGED',
};

export const MODULE_GRADIENTS: Record<GameModule, string> = {
    abstract: 'from-fuchsia-500/20 to-purple-600/20',
    drone: 'from-cyan-500/20 to-blue-600/20',
    bridge: 'from-amber-500/20 to-orange-600/20',
    robotics: 'from-lime-500/20 to-green-600/20',
};

export const MODULE_BORDER_COLORS: Record<GameModule, string> = {
    abstract: 'border-module-abstract',
    drone: 'border-module-drone',
    bridge: 'border-module-bridge',
    robotics: 'border-module-robotics',
};

export const MODULE_TEXT_COLORS: Record<GameModule, string> = {
    abstract: 'text-module-abstract',
    drone: 'text-module-drone',
    bridge: 'text-module-bridge',
    robotics: 'text-module-robotics',
};

export const MODULE_GLOW_STYLES: Record<GameModule, string> = {
    abstract: 'shadow-[0_0_15px_rgba(217,70,239,0.5)]',
    drone: 'shadow-[0_0_15px_rgba(0,217,255,0.5)]',
    bridge: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    robotics: 'shadow-[0_0_15px_rgba(132,204,22,0.5)]',
};

export const TIER_COLORS: Record<BadgeTier, string> = {
    bronze: 'from-amber-700 to-amber-600',
    silver: 'from-slate-400 to-slate-300',
    gold: 'from-yellow-500 to-yellow-400',
};

export const TIER_BORDERS: Record<BadgeTier, string> = {
    bronze: 'border-amber-600',
    silver: 'border-slate-400',
    gold: 'border-yellow-500',
};

export const GAME_MODULES: GameModule[] = ['abstract', 'drone', 'bridge', 'robotics'];
