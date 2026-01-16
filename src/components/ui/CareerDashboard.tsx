import React, { useState, useMemo, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CAREER_BADGES } from '../../lib/career/badges';
import { getLevelCount } from '../../lib/levels';
import type { GameModule } from '../../lib/types';
import { GAME_MODULES, MODULE_NAMES } from '../../lib/theme/moduleTheme';
import { CircularProgressGauge } from './CircularProgressGauge';
import { ModuleAchievementCard } from './ModuleAchievementCard';
import { ModuleFilterBar } from './ModuleFilterBar';
import { ModuleSectionHeader } from './ModuleSectionHeader';

export const CareerDashboard: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const careerProgress = useGameStore(s => s.careerProgress);

    const [filterModules, setFilterModules] = useState<GameModule[] | 'all'>('all');

    const earnedBadgeIds = useMemo(
        () => new Set(careerProgress.earnedBadges),
        [careerProgress.earnedBadges]
    );

    const handleBack = useCallback(() => {
        setScreen('menu');
    }, [setScreen]);

    // Group badges by module
    const badgesByModule = useMemo(() => {
        return CAREER_BADGES.reduce((acc, badge) => {
            if (!acc[badge.module]) {
                acc[badge.module] = [];
            }
            acc[badge.module].push(badge);
            return acc;
        }, {} as Record<GameModule, typeof CAREER_BADGES>);
    }, []);

    // Filter badges based on selected modules
    const filteredModules = useMemo(() => {
        if (filterModules === 'all') {
            return GAME_MODULES;
        }
        return filterModules;
    }, [filterModules]);

    // Calculate total stats
    const totalStats = useMemo(() => {
        let totalLevelsCompleted = 0;
        let totalMaxLevels = 0;

        GAME_MODULES.forEach(module => {
            totalLevelsCompleted += careerProgress.moduleProgress[module].levelsCompleted;
            totalMaxLevels += getLevelCount(module);
        });

        return { totalLevelsCompleted, totalMaxLevels };
    }, [careerProgress.moduleProgress]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-slate-800/60 backdrop-blur-md hover:bg-slate-700/60 rounded-lg text-cyan-400 border border-cyan-500/50 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    <span>←</span>
                    Back
                </button>

                <div className="text-center">
                    <h1
                        className="text-2xl sm:text-3xl font-bold text-white tracking-wider"
                        style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
                    >
                        Career Progress
                    </h1>
                    <p
                        className="text-cyan-400 text-xs tracking-widest mt-1"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        MISSION STATISTICS
                    </p>
                </div>

                <div className="text-right">
                    <div
                        className="text-2xl sm:text-3xl text-yellow-400 font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        {careerProgress.totalStars} ★
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Total Stars</div>
                </div>
            </div>

            {/* Module Progress Gauges */}
            <div className="max-w-5xl mx-auto w-full mb-6">
                <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-cyan-500/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(0,217,255,0.15)]">
                    <h2
                        className="text-cyan-400 text-sm font-semibold mb-4 uppercase tracking-wider text-center"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        Module Completion
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                        {GAME_MODULES.map(module => {
                            const progress = careerProgress.moduleProgress[module];
                            const maxLevels = getLevelCount(module);
                            return (
                                <CircularProgressGauge
                                    key={module}
                                    value={progress.levelsCompleted}
                                    max={maxLevels}
                                    label={MODULE_NAMES[module]}
                                    module={module}
                                    size="md"
                                />
                            );
                        })}
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-700/50">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                OVERALL PROGRESS
                            </span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                {totalStats.totalLevelsCompleted}/{totalStats.totalMaxLevels} LEVELS
                            </span>
                        </div>
                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                                style={{
                                    width: `${(totalStats.totalLevelsCompleted / totalStats.totalMaxLevels) * 100}%`,
                                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievement Filter */}
            <div className="max-w-5xl mx-auto w-full mb-4">
                <ModuleFilterBar
                    selectedModules={filterModules}
                    onFilterChange={setFilterModules}
                />
            </div>

            {/* Badges Section */}
            <div className="flex-1 max-w-5xl mx-auto w-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        Achievements
                    </h2>
                    <div
                        className="text-sm text-cyan-400"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        {careerProgress.earnedBadges.length}/{CAREER_BADGES.length} UNLOCKED
                    </div>
                </div>

                <div className="space-y-6 pb-4">
                    {filteredModules.map(module => {
                        const moduleBadges = badgesByModule[module] || [];
                        const earnedCount = moduleBadges.filter(b => earnedBadgeIds.has(b.id)).length;

                        return (
                            <div key={module}>
                                <ModuleSectionHeader
                                    module={module}
                                    badgeCount={moduleBadges.length}
                                    earnedCount={earnedCount}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {moduleBadges.map(badge => (
                                        <ModuleAchievementCard
                                            key={badge.id}
                                            badge={badge}
                                            isEarned={earnedBadgeIds.has(badge.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Stats */}
            <div className="max-w-5xl mx-auto w-full mt-4 pt-4 border-t border-slate-700/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-800/40 rounded-lg p-3">
                        <div
                            className="text-xl font-bold text-cyan-400"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {totalStats.totalLevelsCompleted}
                        </div>
                        <div className="text-xs text-slate-500 uppercase">Levels Done</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3">
                        <div
                            className="text-xl font-bold text-yellow-400"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {careerProgress.totalStars}
                        </div>
                        <div className="text-xs text-slate-500 uppercase">Stars Earned</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3">
                        <div
                            className="text-xl font-bold text-fuchsia-400"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {careerProgress.earnedBadges.length}
                        </div>
                        <div className="text-xs text-slate-500 uppercase">Badges</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
