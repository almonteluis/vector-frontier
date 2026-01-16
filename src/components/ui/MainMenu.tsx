import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getLevelCount, MODULE_UNLOCK_REQUIREMENTS } from '../../lib/levels';
import type { GameModule } from '../../lib/types';

interface ModuleCardProps {
    module: GameModule;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: { completed: number; total: number; stars: number };
    unlockRequirement?: string;
    onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    title,
    description,
    icon,
    unlocked,
    progress,
    unlockRequirement,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={!unlocked}
            className={`
                relative p-6 rounded-xl text-left transition-all duration-300
                ${unlocked
                    ? 'bg-slate-800/80 hover:bg-slate-700/80 hover:scale-105 cursor-pointer border border-slate-700 hover:border-slate-500'
                    : 'bg-slate-900/60 cursor-not-allowed border border-slate-800 opacity-60'
                }
            `}
        >
            {/* Lock overlay for locked modules */}
            {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-xl">
                    <div className="text-center">
                        <span className="text-3xl">🔒</span>
                        <p className="text-xs text-slate-400 mt-2">{unlockRequirement}</p>
                    </div>
                </div>
            )}

            {/* Module icon */}
            <div className="text-4xl mb-3">{icon}</div>

            {/* Title and description */}
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-400 mb-4">{description}</p>

            {/* Progress */}
            {unlocked && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>{progress.completed}/{progress.total} levels</span>
                        <span className="text-yellow-400">{progress.stars} ★</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </button>
    );
};

export const MainMenu: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);
    const setActiveModule = useGameStore(s => s.setActiveModule);
    const moduleUnlocks = useGameStore(s => s.moduleUnlocks);
    const careerProgress = useGameStore(s => s.careerProgress);
    const checkModuleUnlocks = useGameStore(s => s.checkModuleUnlocks);

    // Check for unlocks on mount
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
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                    Vector Voyage
                </h1>
                <p className="text-slate-400 text-lg">Master vector mathematics through interactive challenges</p>
            </div>

            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mb-12">
                <ModuleCard
                    module="abstract"
                    title="Abstract Puzzles"
                    description="Pure vector mathematics. Build your foundation."
                    icon="🎯"
                    unlocked={true}
                    progress={getModuleProgress('abstract')}
                    onClick={() => handleModuleSelect('abstract')}
                />

                <ModuleCard
                    module="drone"
                    title="Drone Delivery"
                    description="Navigate wind and deliver packages on time."
                    icon="🛸"
                    unlocked={moduleUnlocks.drone}
                    progress={getModuleProgress('drone')}
                    unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.drone} abstract levels`}
                    onClick={() => handleModuleSelect('drone')}
                />

                <ModuleCard
                    module="bridge"
                    title="Bridge Engineering"
                    description="Balance forces and build stable structures."
                    icon="🌉"
                    unlocked={moduleUnlocks.bridge}
                    progress={getModuleProgress('bridge')}
                    unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.bridge} abstract levels`}
                    onClick={() => handleModuleSelect('bridge')}
                />

                <ModuleCard
                    module="robotics"
                    title="Robotics Assembly"
                    description="Control robot arms with precision kinematics."
                    icon="🤖"
                    unlocked={moduleUnlocks.robotics}
                    progress={getModuleProgress('robotics')}
                    unlockRequirement={`Complete ${MODULE_UNLOCK_REQUIREMENTS.robotics} abstract levels`}
                    onClick={() => handleModuleSelect('robotics')}
                />
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => setScreen('career')}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                    <span>🏆</span>
                    Career Progress
                </button>
            </div>

            {/* Total Stars */}
            <div className="mt-8 text-center">
                <div className="text-3xl text-yellow-400 font-bold">
                    {careerProgress.totalStars} ★
                </div>
                <div className="text-sm text-slate-500">Total Stars Earned</div>
            </div>
        </div>
    );
};
