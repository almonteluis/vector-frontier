import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { CAREER_BADGES } from '../../lib/career/badges';
import type { GameModule, BadgeTier } from '../../lib/types';

const TIER_COLORS: Record<BadgeTier, string> = {
    bronze: 'from-amber-700 to-amber-600',
    silver: 'from-slate-400 to-slate-300',
    gold: 'from-yellow-500 to-yellow-400',
};

const TIER_BORDERS: Record<BadgeTier, string> = {
    bronze: 'border-amber-600',
    silver: 'border-slate-400',
    gold: 'border-yellow-500',
};

const MODULE_NAMES: Record<GameModule, string> = {
    abstract: 'Abstract',
    drone: 'Drone',
    bridge: 'Bridge',
    robotics: 'Robotics',
};

export const CareerDashboard: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const careerProgress = useGameStore(s => s.careerProgress);

    const earnedBadgeIds = new Set(careerProgress.earnedBadges);

    const handleBack = () => {
        setScreen('menu');
    };

    // Group badges by module
    const badgesByModule = CAREER_BADGES.reduce((acc, badge) => {
        if (!acc[badge.module]) {
            acc[badge.module] = [];
        }
        acc[badge.module].push(badge);
        return acc;
    }, {} as Record<GameModule, typeof CAREER_BADGES>);

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
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                        Career Progress
                    </h1>
                </div>

                <div className="text-right">
                    <div className="text-3xl text-yellow-400 font-bold">
                        {careerProgress.totalStars} ★
                    </div>
                    <div className="text-sm text-slate-500">Total Stars</div>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="max-w-4xl mx-auto w-full mb-8">
                <div className="grid grid-cols-4 gap-4">
                    {(['abstract', 'drone', 'bridge', 'robotics'] as GameModule[]).map(module => {
                        const progress = careerProgress.moduleProgress[module];
                        return (
                            <div key={module} className="bg-slate-800/60 rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">
                                    {module === 'abstract' ? '🎯' : module === 'drone' ? '🛸' : module === 'bridge' ? '🌉' : '🤖'}
                                </div>
                                <div className="text-lg font-bold text-white">{progress.levelsCompleted}</div>
                                <div className="text-xs text-slate-400">Levels</div>
                                <div className="text-sm text-yellow-400 mt-1">{progress.starsEarned} ★</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Badges Section */}
            <div className="flex-1 max-w-4xl mx-auto w-full overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>

                <div className="space-y-8">
                    {(['abstract', 'drone', 'bridge', 'robotics'] as GameModule[]).map(module => (
                        <div key={module}>
                            <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                {module === 'abstract' ? '🎯' : module === 'drone' ? '🛸' : module === 'bridge' ? '🌉' : '🤖'}
                                {MODULE_NAMES[module]} Achievements
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {(badgesByModule[module] || []).map(badge => {
                                    const isEarned = earnedBadgeIds.has(badge.id);

                                    return (
                                        <div
                                            key={badge.id}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all
                                                ${isEarned
                                                    ? `bg-gradient-to-br ${TIER_COLORS[badge.tier]} ${TIER_BORDERS[badge.tier]}`
                                                    : 'bg-slate-800/40 border-slate-700 opacity-50'
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">
                                                    {isEarned ? badge.icon : '🔒'}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-bold ${isEarned ? 'text-slate-900' : 'text-slate-400'}`}>
                                                        {badge.name}
                                                    </h4>
                                                    <p className={`text-sm ${isEarned ? 'text-slate-800' : 'text-slate-500'}`}>
                                                        {badge.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Requirements */}
                                            {!isEarned && (
                                                <div className="mt-3 text-xs text-slate-500">
                                                    {badge.requirements.levelsCompleted && (
                                                        <div>Complete {badge.requirements.levelsCompleted} levels</div>
                                                    )}
                                                    {badge.requirements.starsEarned && (
                                                        <div>Earn {badge.requirements.starsEarned} stars</div>
                                                    )}
                                                    {badge.requirements.perfectLevels && (
                                                        <div>Perfect {badge.requirements.perfectLevels} levels</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badge Count */}
            <div className="max-w-4xl mx-auto w-full mt-8 text-center">
                <div className="bg-slate-800/60 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">
                        {careerProgress.earnedBadges.length} / {CAREER_BADGES.length}
                    </div>
                    <div className="text-sm text-slate-400">Badges Earned</div>
                </div>
            </div>
        </div>
    );
};
