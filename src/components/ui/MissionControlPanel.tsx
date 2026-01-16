import { memo, useMemo } from 'react';

interface MissionControlPanelProps {
    starsEarned: number;
    levelsCompleted: number;
    totalLevels: number;
    currentCoordinates?: { x: number; y: number };
}

// Following rerender-memo and rendering-hoist-jsx patterns
export const MissionControlPanel = memo<MissionControlPanelProps>(({
    starsEarned,
    levelsCompleted,
    totalLevels,
    currentCoordinates = { x: 127.4, y: 89.2 }
}) => {
    // Following rerender-derived-state: Calculate percentage once
    const completionPercentage = useMemo(
        () => Math.round((levelsCompleted / totalLevels) * 100),
        [levelsCompleted, totalLevels]
    );

    // Radar arc drawing for progress gauge
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = useMemo(
        () => circumference - (completionPercentage / 100) * circumference,
        [completionPercentage, circumference]
    );

    return (
        <div className="fixed top-8 right-8 w-64 z-20">
            {/* Glass Panel with backdrop blur */}
            <div
                className="bg-slate-900/40 backdrop-blur-md rounded-lg border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,217,255,0.3)] p-6"
            >
                {/* Header */}
                <h2
                    className="text-cyan-400 text-lg font-bold mb-6 text-center tracking-wider"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    MISSION CONTROL
                </h2>

                {/* Radar Progress Gauge */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                        {/* Background circle */}
                        <svg className="transform -rotate-90 w-32 h-32">
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                stroke="rgba(100, 116, 139, 0.3)"
                                strokeWidth="8"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                stroke="#00d9ff"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-500"
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))'
                                }}
                            />
                        </svg>

                        {/* Center percentage */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span
                                className="text-3xl font-bold text-cyan-400"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {completionPercentage}%
                            </span>
                        </div>

                        {/* Radar sweep effect */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 217, 255, 0.2) 10%, transparent 20%)',
                                animation: 'radar-sweep 4s linear infinite',
                                borderRadius: '50%',
                            }}
                        />
                    </div>
                </div>

                {/* Module Stats */}
                <div className="space-y-3 mb-4">
                    <h3 className="text-cyan-300 text-xs uppercase tracking-wider mb-2">
                        MODULE STATS
                    </h3>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Target Vector:</span>
                        <span
                            className="text-white font-semibold"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            [{levelsCompleted}, {totalLevels}, 0]
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Nav Accuracy:</span>
                        <span
                            className="text-cyan-400 font-semibold"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {completionPercentage}%
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Energy Lvl:</span>
                        <span
                            className="text-yellow-400 font-semibold"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {starsEarned * 33}%
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Payload Weight:</span>
                        <span
                            className="text-white font-semibold"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            4.5 KG
                        </span>
                    </div>
                </div>

                {/* Coordinates */}
                <div className="border-t border-cyan-500/30 pt-4 space-y-2">
                    <h3 className="text-cyan-300 text-xs uppercase tracking-wider mb-2">
                        COORDINATES:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-slate-500">X:</span>
                            <span
                                className="text-cyan-400 ml-2 font-semibold"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {currentCoordinates.x.toFixed(1)}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-500">Y:</span>
                            <span
                                className="text-cyan-400 ml-2 font-semibold"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {currentCoordinates.y.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vector Objective Diagram - Small preview */}
                <div className="mt-4 pt-4 border-t border-cyan-500/30">
                    <h3 className="text-cyan-300 text-xs uppercase tracking-wider mb-2">
                        CURRENT OBJECTIVE:
                    </h3>
                    <div className="bg-slate-950/60 rounded p-3 flex items-center justify-center">
                        <svg width="80" height="60" viewBox="0 0 80 60">
                            {/* Grid */}
                            <line x1="10" y1="50" x2="70" y2="50" stroke="#334155" strokeWidth="1" />
                            <line x1="10" y1="10" x2="10" y2="50" stroke="#334155" strokeWidth="1" />

                            {/* Vector Arrow */}
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="10"
                                    refX="9"
                                    refY="3"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 10 3, 0 6" fill="#00d9ff" />
                                </marker>
                            </defs>
                            <line
                                x1="10"
                                y1="50"
                                x2="55"
                                y2="20"
                                stroke="#00d9ff"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />

                            {/* Labels */}
                            <text x="60" y="25" fill="#00d9ff" fontSize="10" fontFamily="'JetBrains Mono', monospace">v</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Add keyframes for radar sweep */}
            <style>{`
                @keyframes radar-sweep {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
});

MissionControlPanel.displayName = 'MissionControlPanel';
