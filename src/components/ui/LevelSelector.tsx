import React, { useCallback, useState, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getLevelsForModule } from '../../lib/levels';
import type { ModuleLevelConfig } from '../../lib/types';
import { MODULE_TITLES, MODULE_SUBTITLES } from '../../lib/theme/moduleTheme';
import { HexagonalLevelCell } from './HexagonalLevelCell';
import { MissionControlPanel } from './MissionControlPanel';
import { TacticalBackground } from './TacticalBackground';
import { MissionBriefingTooltip } from './MissionBriefingTooltip';

interface HoveredLevel {
    level: ModuleLevelConfig;
    index: number;
    rect: DOMRect;
}

export const LevelSelector: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const activeModule = useGameStore(s => s.activeModule);
    const loadLevel = useGameStore(s => s.loadLevel);
    const careerProgress = useGameStore(s => s.careerProgress);

    const levels = getLevelsForModule(activeModule);
    const moduleProgress = careerProgress.moduleProgress[activeModule];

    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredLevel, setHoveredLevel] = useState<HoveredLevel | null>(null);

    // Following rerender-functional-setstate: Use useCallback for stable references
    const handleLevelSelect = useCallback((index: number) => {
        if (index > moduleProgress.unlockedIndex) return;
        loadLevel(index);
        setScreen('game');
    }, [moduleProgress.unlockedIndex, loadLevel, setScreen]);

    const handleBack = useCallback(() => {
        setScreen('menu');
    }, [setScreen]);

    const handleLevelHover = useCallback((
        isHovered: boolean,
        rect: DOMRect | null,
        level: ModuleLevelConfig,
        index: number
    ) => {
        if (isHovered && rect) {
            setHoveredLevel({ level, index, rect });
        } else {
            setHoveredLevel(null);
        }
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden">
            {/* Tactical Background */}
            <TacticalBackground />

            {/* Corner Coordinates */}
            <div
                className="absolute top-4 left-4 text-cyan-400 text-xs opacity-70 z-10"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                <div>SYS.COORD: 48-73</div>
            </div>

            <div
                className="absolute top-4 right-80 text-cyan-400 text-xs opacity-70 z-10"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                <div>TIME: 14:35:22</div>
                <div className="text-slate-500">DATE: 2048.11.20</div>
            </div>

            <div
                className="absolute bottom-4 left-4 text-slate-600 text-xs opacity-50 z-10"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                SYSTEM DIAGNOSTICS: NORMAL
            </div>

            <div
                className="absolute bottom-4 right-4 text-slate-600 text-xs opacity-50 z-10"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                NETWORK STATUS: SECURE // LOW LATENCY
            </div>

            {/* Mission Control Panel */}
            <MissionControlPanel
                starsEarned={moduleProgress.starsEarned}
                levelsCompleted={moduleProgress.levelsCompleted}
                totalLevels={levels.length}
            />

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen p-8">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/60 rounded-lg text-cyan-400 border border-cyan-500/50 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        <span>←</span>
                        ABORT MISSION
                    </button>

                    {/* Module Title */}
                    <div className="text-center">
                        <h1
                            className="text-4xl font-bold text-white mb-1 tracking-wider"
                            style={{
                                textShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
                            }}
                        >
                            {MODULE_TITLES[activeModule]}
                        </h1>
                        <p
                            className="text-cyan-400 text-sm tracking-widest"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {MODULE_SUBTITLES[activeModule]}
                        </p>
                    </div>

                    {/* Star count */}
                    <div className="text-right">
                        <div
                            className="text-3xl text-yellow-400 font-bold"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {moduleProgress.starsEarned} ★
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                            Total Stars
                        </div>
                    </div>
                </div>

                {/* Drone Visual Panel (Left side) */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-72 z-10">
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-lg border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(0,217,255,0.2)] p-6">
                        <img
                            src="/drone.png"
                            alt="Drone Model"
                            className="w-full h-auto drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                        />
                        <div className="mt-4 space-y-1 text-xs">
                            <p
                                className="text-cyan-400"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                DRONE MODEL: VECTRON X-1
                            </p>
                            <p className="text-slate-500">STATUS: ACTIVE // READY</p>
                            <p className="text-slate-500">VECTOR LOCK: ENGAGED</p>
                        </div>
                    </div>
                </div>

                {/* Level Grid - Hexagonal Path */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-6 items-center">
                            {levels.map((level, index) => {
                                const isUnlocked = index <= moduleProgress.unlockedIndex;
                                const stars = moduleProgress.starsPerLevel[index] || 0;
                                const isCurrentLevel = index === moduleProgress.unlockedIndex && stars === 0;

                                return (
                                    <HexagonalLevelCell
                                        key={level.id}
                                        levelNumber={index + 1}
                                        isUnlocked={isUnlocked}
                                        stars={stars}
                                        isCurrentLevel={isCurrentLevel}
                                        onClick={() => handleLevelSelect(index)}
                                        onHover={(isHovered, rect) =>
                                            handleLevelHover(isHovered, rect, level, index)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="mt-8 max-w-2xl mx-auto w-full">
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-lg border border-cyan-500/30 p-4 text-center shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                        <p className="text-cyan-300 text-sm">
                            <span
                                className="font-bold"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                [{moduleProgress.levelsCompleted}/{levels.length}]
                            </span>{' '}
                            MISSIONS COMPLETED // SELECT UNLOCKED HEXAGON TO ENGAGE
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Briefing Tooltip */}
            {hoveredLevel && (
                <MissionBriefingTooltip
                    level={hoveredLevel.level}
                    levelNumber={hoveredLevel.index + 1}
                    isUnlocked={hoveredLevel.index <= moduleProgress.unlockedIndex}
                    stars={moduleProgress.starsPerLevel[hoveredLevel.index] || 0}
                    targetRect={hoveredLevel.rect}
                    containerRef={containerRef}
                />
            )}
        </div>
    );
};
