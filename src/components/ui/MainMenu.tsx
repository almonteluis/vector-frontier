import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getLevelCount, MODULE_UNLOCK_REQUIREMENTS } from '../../lib/levels';
import type { GameModule } from '../../lib/types';
import {
    Target,
    Wind,
    Triangle,
    Bot,
    Lock,
    Trophy,
    Star,
    ChevronRight,
    Sparkles
} from 'lucide-react';

interface ModuleCardProps {
    module: GameModule;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    unlocked: boolean;
    progress: { completed: number; total: number; stars: number };
    unlockRequirement?: string;
    onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    title,
    description,
    icon,
    color,
    unlocked,
    progress,
    unlockRequirement,
    onClick,
}) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <button
            onClick={onClick}
            onMouseMove={handleMouseMove}
            disabled={!unlocked}
            className={`
                group relative w-full text-left p-6 rounded-3xl transition-all duration-500
                border backdrop-blur-sm
                ${unlocked
                    ? 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600 hover:shadow-2xl hover:-translate-y-1'
                    : 'bg-slate-900/20 border-slate-800/50 opacity-70 cursor-not-allowed'
                }
            `}
        >
            {/* Hover Glow Effect */}
            {unlocked && (
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}10, transparent 40%)`
                    }}
                />
            )}

            {/* Gradient Border Overlay for Active State */}
            {unlocked && (
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-${color}-500/30`} />
            )}

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    {/* Icon Container */}
                    <div
                        className={`
                            p-3 rounded-2xl transition-all duration-300
                            ${unlocked
                                ? `bg-${color}-500/10 text-${color}-400 group-hover:scale-110 group-hover:bg-${color}-500/20 shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)]`
                                : 'bg-slate-800 text-slate-600'
                            }
                        `}
                    >
                        {icon}
                    </div>

                    {/* Status Badge */}
                    {!unlocked ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium">
                            <Lock size={12} />
                            <span>Locked</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-400 text-xs font-medium">
                            <Star size={12} fill="currentColor" />
                            <span>{progress.stars}</span>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${unlocked ? 'text-white' : 'text-slate-500'}`}>
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        {unlockRequirement && !unlocked ? (
                            <span className="flex items-center gap-2 text-red-400/80">
                                {unlockRequirement}
                            </span>
                        ) : (
                            description
                        )}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto">
                    {unlocked && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <span>Progress</span>
                                <span>{Math.round((progress.completed / progress.total) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-${color}-500 to-${color}-400`}
                                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                                />
                            </div>
                            <div className="text-xs text-slate-600 mt-1">
                                {progress.completed} / {progress.total} missions
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

export const MainMenu: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const setActiveModule = useGameStore(s => s.setActiveModule);
    const moduleUnlocks = useGameStore(s => s.moduleUnlocks);
    const careerProgress = useGameStore(s => s.careerProgress);
    const checkModuleUnlocks = useGameStore(s => s.checkModuleUnlocks);

    React.useEffect(() => {
        checkModuleUnlocks();
    }, [checkModuleUnlocks]);

    const handleModuleSelect = (module: GameModule) => {
        if (!moduleUnlocks[module] && module !== 'abstract') {
            return;
        }
        setActiveModule(module);
        setScreen('levelSelect');
    };

    const getModuleProgress = (module: GameModule) => {
        const progress = careerProgress.moduleProgress[module];
        return {
            completed: progress.levelsCompleted,
            total: getLevelCount(module),
            stars: progress.starsEarned,
        };
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/80 to-slate-950 pointer-events-none" />

            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-7xl relative z-10 flex flex-col items-center">
                {/* Hero Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm mb-4">
                        <Sparkles size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium text-slate-300">New Modules Available</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        Vector Voyage
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Master the language of the universe through interactive challenges.
                        Start your journey from abstract concepts to advanced robotics.
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full max-w-5xl mb-16">
                    <ModuleCard
                        module="abstract"
                        title="Abstract Puzzles"
                        description="Pure vector mathematics. Visualize operations and build your foundation in a controlled environment."
                        icon={<Target size={32} />}
                        color="purple"
                        unlocked={true}
                        progress={getModuleProgress('abstract')}
                        onClick={() => handleModuleSelect('abstract')}
                    />

                    <ModuleCard
                        module="drone"
                        title="Drone Delivery"
                        description="Apply vector addition to navigate dynamic wind currents and deliver packages with precision."
                        icon={<Wind size={32} />}
                        color="cyan"
                        unlocked={moduleUnlocks.drone}
                        progress={getModuleProgress('drone')}
                        unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.drone} abstract levels`}
                        onClick={() => handleModuleSelect('drone')}
                    />

                    <ModuleCard
                        module="bridge"
                        title="Bridge Engineering"
                        description="Balance forces and calculate tension vectors to build stable structures across varying gaps."
                        icon={<Triangle size={32} />}
                        color="amber"
                        unlocked={moduleUnlocks.bridge}
                        progress={getModuleProgress('bridge')}
                        unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.bridge} abstract levels`}
                        onClick={() => handleModuleSelect('bridge')}
                    />

                    <ModuleCard
                        module="robotics"
                        title="Robotics Assembly"
                        description="Master inverse kinematics and rotational vectors to control robotic arms for precise assembly."
                        icon={<Bot size={32} />}
                        color="emerald"
                        unlocked={moduleUnlocks.robotics}
                        progress={getModuleProgress('robotics')}
                        unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.robotics} abstract levels`}
                        onClick={() => handleModuleSelect('robotics')}
                    />
                </div>

                {/* Footer Stats / Action */}
                <div className="w-full max-w-xl">
                    <button
                        onClick={() => setScreen('career')}
                        className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-1 hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="relative px-8 py-4 flex items-center justify-between bg-slate-900/50 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400">
                                    <Trophy size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-slate-400 font-medium">Career Progress</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-white">{careerProgress.totalStars}</span>
                                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm text-slate-500">Total Stars</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                                <span>View Achievements</span>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </button>

                    <p className="text-center text-slate-600 text-sm mt-6">
                        v0.9.2 Beta • Vector Engine Activated
                    </p>
                </div>
            </div>
        </div>
    );
};
