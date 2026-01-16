import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { RotateCcw, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import type { Vector3, GameModule } from '../../lib/types';

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

export const GameUI: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const vectors = useGameStore(s => s.vectors);
    const selectedVectorId = useGameStore(s => s.selectedVectorId);
    const attemptsDisplay = useGameStore(s => s.attemptsDisplay);
    const isGameWon = useGameStore(s => s.isGameWon);
    const submitResult = useGameStore(s => s.submitResult);
    const nextLevel = useGameStore(s => s.nextLevel);
    const resetLevel = useGameStore(s => s.resetLevel);
    const setScreen = useGameStore(s => s.setScreen);
    const activeModule = useGameStore(s => s.activeModule);
    const droneState = useGameStore(s => s.droneState);
    const currentLevelIndex = useGameStore(s => s.currentLevelIndex);

    const [lastResult, setLastResult] = useState<{ success: boolean, errorMag: number, isNearMiss: boolean } | null>(null);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (shake) {
            const t = setTimeout(() => setShake(false), 300);
            return () => clearTimeout(t);
        }
    }, [shake]);

    const selectedVector = vectors.find(v => v.id === selectedVectorId);

    const handleSubmit = () => {
        const res = submitResult();
        setLastResult({ success: res.success, errorMag: res.magnitudeError, isNearMiss: res.isNearMiss });

        if (!res.success) {
            setShake(true);
        }
    };

    const formatMag = (v: Vector3) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z).toFixed(1);

    return (
        <>
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out; }
      `}</style>

            {/* Top Left: Level Info */}
            <div className="absolute top-4 left-4 p-4 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white max-w-md border border-white/10 shadow-xl">
                {/* Back Button */}
                <button
                    onClick={() => setScreen('levelSelect')}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-2 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Levels
                </button>

                {/* Module Title */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{MODULE_ICONS[activeModule]}</span>
                    <h1 className="text-lg font-bold text-primary">{MODULE_TITLES[activeModule]}</h1>
                </div>

                {/* Level Info */}
                <div className="flex items-baseline gap-2">
                    <h2 className="text-md text-vector">Level {currentLevelIndex + 1}: {currentLevel.title}</h2>
                </div>
                <p className="text-sm text-gray-300 mt-2">{currentLevel.description}</p>

                {/* Module-specific info */}
                {activeModule === 'drone' && droneState && (
                    <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Battery</span>
                            <span className={droneState.batteryRemaining < 30 ? 'text-red-400' : 'text-green-400'}>
                                {droneState.batteryRemaining.toFixed(0)}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all ${droneState.batteryRemaining < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                                style={{ width: `${droneState.batteryRemaining}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Wind</span>
                            <span className="text-blue-400">
                                ({droneState.currentWind.x.toFixed(1)}, {droneState.currentWind.y.toFixed(1)}, {droneState.currentWind.z.toFixed(1)})
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Sidebar */}
            <aside className={clsx(
                "absolute right-0 top-0 bottom-0 w-80 bg-slate-900/90 backdrop-blur-md border-l border-white/10 p-6 flex flex-col text-white shadow-2xl transition-transform",
                shake && "animate-shake"
            )}>

                {/* Target */}
                <section className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Target Vector</h3>
                    <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
                        <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm mb-2">
                            <div className="text-red-400">x: {currentLevel.targetVector.x}</div>
                            <div className="text-green-400">y: {currentLevel.targetVector.y}</div>
                            <div className="text-blue-400">z: {currentLevel.targetVector.z}</div>
                        </div>
                        <div className="text-center text-xs text-gray-400 border-t border-slate-700 pt-2">
                            Magnitude: <span className="text-white">{formatMag(currentLevel.targetVector)}</span>
                        </div>
                    </div>
                </section>

                {/* Selected Vector */}
                <section className="mb-6 flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-vector mb-2">Selected Vector</h3>
                    {selectedVector ? (
                        <div className="bg-slate-800 p-3 rounded-md border border-vector/20">
                            <div className="text-center mb-2 font-semibold text-vector">{selectedVector.label}</div>
                            <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm mb-2">
                                <div className="text-red-400">x: {selectedVector.components.x.toFixed(1)}</div>
                                <div className="text-green-400">y: {selectedVector.components.y.toFixed(1)}</div>
                                <div className="text-blue-400">z: {selectedVector.components.z.toFixed(1)}</div>
                            </div>
                            <div className="text-center text-xs text-gray-400 border-t border-slate-700 pt-2">
                                Magnitude: <span className="text-white">{formatMag(selectedVector.components)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 italic text-sm">No vector selected</div>
                    )}
                </section>

                {/* Status / Feedback */}
                <section className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Attempts</span>
                        <span className={clsx("font-mono font-bold", attemptsDisplay < 2 ? "text-red-500" : "text-white")}>
                            {attemptsDisplay} / {currentLevel.maxAttempts}
                        </span>
                    </div>

                    {lastResult && !isGameWon && (
                        <div className={clsx(
                            "p-3 rounded text-sm mb-4 animate-pulse transition-colors",
                            lastResult.success ? "bg-green-900/50 text-green-200" : (lastResult.isNearMiss ? "bg-yellow-900/50 text-yellow-200" : "bg-red-900/50 text-red-200")
                        )}>
                            {lastResult.success && "Success!"}
                            {!lastResult.success && lastResult.isNearMiss && `Close! Missed by ${lastResult.errorMag.toFixed(2)}`}
                            {!lastResult.success && !lastResult.isNearMiss && `Missed by ${lastResult.errorMag.toFixed(2)} units`}
                        </div>
                    )}

                    {isGameWon && (
                        <div className="p-4 bg-green-600 rounded text-center mb-4 shadow-lg scale-105 transform transition-all">
                            <div className="text-lg font-bold mb-1">Level Complete!</div>
                            <div className="text-sm opacity-90">Great job!</div>
                        </div>
                    )}
                </section>

                {/* Actions */}
                <div className="mt-auto space-y-3">
                    {!isGameWon ? (
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors shadow-lg active:transform active:scale-95"
                        >
                            <Check size={18} /> Check Solution
                        </button>
                    ) : (
                        <button
                            onClick={nextLevel}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors shadow-lg animate-bounce"
                        >
                            Next Level <ChevronRight size={18} />
                        </button>
                    )}

                    <button
                        onClick={resetLevel}
                        className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm rounded flex items-center justify-center gap-2 transition-colors"
                    >
                        <RotateCcw size={14} /> Reset Vector
                    </button>
                </div>
            </aside>

            {/* Bottom Hint Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur rounded-full px-6 py-2 border border-white/5 text-xs text-gray-400 flex gap-6 select-none pointer-events-none">
                <span className="flex items-center gap-1"><span className="text-white font-bold">Click</span> Select</span>
                <span className="flex items-center gap-1"><span className="text-white font-bold">W/S</span> Length</span>
                <span className="flex items-center gap-1"><span className="text-white font-bold">A/D</span> Yaw</span>
                <span className="flex items-center gap-1"><span className="text-white font-bold">Q/E</span> Pitch</span>
                <span className="flex items-center gap-1"><span className="text-white font-bold">R/F</span> Roll</span>
                <span className="flex items-center gap-1"><span className="text-white font-bold">Enter</span> Submit</span>
            </div>

        </>
    );
};
