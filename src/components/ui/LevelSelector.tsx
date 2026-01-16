import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getLevelsForModule } from '../../lib/levels';
import type { GameModule } from '../../lib/types';

const MODULE_TITLES: Record<GameModule, string> = {
    abstract: 'Abstract Puzzles',
    drone: 'Drone Delivery',
    bridge: 'Bridge Engineering',
    robotics: 'Robotics Assembly',
};

const MODULE_ICONS: Record<GameModule, string> = {
    abstract: '🎯',
    drone: '🛸',
    bridge: '🌉',
    robotics: '🤖',
};

export const LevelSelector: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const activeModule = useGameStore(s => s.activeModule);
    const loadLevel = useGameStore(s => s.loadLevel);
    const careerProgress = useGameStore(s => s.careerProgress);

    const levels = getLevelsForModule(activeModule);
    const moduleProgress = careerProgress.moduleProgress[activeModule];

    const handleLevelSelect = (index: number) => {
        if (index > moduleProgress.unlockedIndex) return;
        loadLevel(index);
        setScreen('game');
    };

    const handleBack = () => {
        setScreen('menu');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors flex items-center gap-2"
                >
                    <span>←</span>
                    Back
                </button>

                <div className="text-center">
                    <div className="text-3xl mb-2">{MODULE_ICONS[activeModule]}</div>
                    <h1 className="text-2xl font-bold text-white">{MODULE_TITLES[activeModule]}</h1>
                </div>

                <div className="text-right">
                    <div className="text-2xl text-yellow-400 font-bold">
                        {moduleProgress.starsEarned} ★
                    </div>
                    <div className="text-sm text-slate-500">Module Stars</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto w-full mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>{moduleProgress.levelsCompleted} / {levels.length} levels completed</span>
                    <span>{Math.round((moduleProgress.levelsCompleted / levels.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(moduleProgress.levelsCompleted / levels.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Level Grid */}
            <div className="flex-1 max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {levels.map((level, index) => {
                        const isUnlocked = index <= moduleProgress.unlockedIndex;
                        const stars = moduleProgress.starsPerLevel[index] || 0;
                        const isCompleted = stars > 0;

                        return (
                            <button
                                key={level.id}
                                onClick={() => handleLevelSelect(index)}
                                disabled={!isUnlocked}
                                className={`
                                    relative p-4 rounded-xl transition-all duration-300 aspect-square flex flex-col items-center justify-center
                                    ${isUnlocked
                                        ? isCompleted
                                            ? 'bg-slate-700/80 hover:bg-slate-600/80 border border-green-600/50 hover:border-green-500'
                                            : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-slate-500'
                                        : 'bg-slate-900/60 cursor-not-allowed border border-slate-800 opacity-50'
                                    }
                                `}
                            >
                                {/* Lock icon for locked levels */}
                                {!isUnlocked && (
                                    <span className="text-2xl text-slate-600">🔒</span>
                                )}

                                {/* Level number */}
                                {isUnlocked && (
                                    <>
                                        <span className="text-2xl font-bold text-white mb-2">
                                            {index + 1}
                                        </span>

                                        {/* Stars */}
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3].map(star => (
                                                <span
                                                    key={star}
                                                    className={`text-sm ${star <= stars ? 'text-yellow-400' : 'text-slate-600'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Current level indicator */}
                                {isUnlocked && !isCompleted && index === moduleProgress.unlockedIndex && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Level Info Panel (shows when hovering) */}
            <div className="max-w-4xl mx-auto w-full mt-8">
                <div className="bg-slate-800/60 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">
                        Click on an unlocked level to start playing
                    </p>
                </div>
            </div>
        </div>
    );
};
