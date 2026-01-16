import { memo } from 'react';
import type { GameModule } from '../../lib/types';
import { MODULE_COLORS, MODULE_ICONS, MODULE_NAMES } from '../../lib/theme/moduleTheme';

interface ModuleSectionHeaderProps {
    module: GameModule;
    badgeCount: number;
    earnedCount: number;
}

export const ModuleSectionHeader = memo<ModuleSectionHeaderProps>(({
    module,
    badgeCount,
    earnedCount,
}) => {
    const color = MODULE_COLORS[module];
    const icon = MODULE_ICONS[module];
    const name = MODULE_NAMES[module];

    return (
        <div
            className="sticky top-0 z-10 py-3 px-4 mb-4 bg-slate-900/80 backdrop-blur-md rounded-lg border-l-4 flex items-center justify-between"
            style={{ borderLeftColor: color }}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    {name} Achievements
                </h3>
            </div>

            <div
                className="text-sm px-3 py-1 rounded-full bg-slate-800/60"
                style={{
                    color,
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                {earnedCount}/{badgeCount}
            </div>
        </div>
    );
});

ModuleSectionHeader.displayName = 'ModuleSectionHeader';
