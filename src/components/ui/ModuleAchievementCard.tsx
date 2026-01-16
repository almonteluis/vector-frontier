import { memo } from 'react';
import type { CareerBadge } from '../../lib/types';
import { MODULE_COLORS, MODULE_GLOW_STYLES, TIER_COLORS, TIER_BORDERS } from '../../lib/theme/moduleTheme';

interface ModuleAchievementCardProps {
    badge: CareerBadge;
    isEarned: boolean;
    isNewlyEarned?: boolean;
}

export const ModuleAchievementCard = memo<ModuleAchievementCardProps>(({
    badge,
    isEarned,
    isNewlyEarned = false,
}) => {
    const moduleColor = MODULE_COLORS[badge.module];
    const moduleGlow = MODULE_GLOW_STYLES[badge.module];

    return (
        <div
            className={`
                p-4 rounded-xl border-2 transition-all duration-300
                ${isEarned
                    ? `bg-gradient-to-br ${TIER_COLORS[badge.tier]} ${TIER_BORDERS[badge.tier]} ${moduleGlow}`
                    : 'bg-slate-800/60 border-slate-600/50'
                }
                ${isNewlyEarned ? 'animate-badge-unlock' : ''}
            `}
            style={isEarned ? {
                boxShadow: `0 0 20px ${moduleColor}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
            } : undefined}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`text-3xl transition-all ${!isEarned ? 'grayscale opacity-60' : ''}`}
                    style={!isEarned ? { filter: 'grayscale(100%) brightness(0.7)' } : undefined}
                >
                    {isEarned ? badge.icon : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                    <h4
                        className={`font-bold truncate ${
                            isEarned ? 'text-slate-900' : 'text-slate-400'
                        }`}
                    >
                        {badge.name}
                    </h4>
                    <p
                        className={`text-sm line-clamp-2 ${
                            isEarned ? 'text-slate-800' : 'text-slate-500'
                        }`}
                    >
                        {badge.description}
                    </p>
                </div>
            </div>

            {/* Requirements for locked badges */}
            {!isEarned && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 text-xs text-slate-400 space-y-1">
                    {badge.requirements.levelsCompleted && (
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            Complete {badge.requirements.levelsCompleted} levels
                        </div>
                    )}
                    {badge.requirements.starsEarned && (
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            Earn {badge.requirements.starsEarned} stars
                        </div>
                    )}
                    {badge.requirements.perfectLevels && (
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            Perfect {badge.requirements.perfectLevels} levels
                        </div>
                    )}
                </div>
            )}

            {/* Tier indicator for earned badges */}
            {isEarned && (
                <div className="mt-3 flex justify-end">
                    <span
                        className={`
                            text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded
                            ${badge.tier === 'gold' ? 'bg-yellow-900/50 text-yellow-300' : ''}
                            ${badge.tier === 'silver' ? 'bg-slate-700/50 text-slate-200' : ''}
                            ${badge.tier === 'bronze' ? 'bg-amber-900/50 text-amber-300' : ''}
                        `}
                    >
                        {badge.tier}
                    </span>
                </div>
            )}
        </div>
    );
});

ModuleAchievementCard.displayName = 'ModuleAchievementCard';
