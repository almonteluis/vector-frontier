import { memo, useCallback, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { GameModule } from '../../lib/types';
import { MODULE_COLORS, MODULE_ICONS, MODULE_NAMES, GAME_MODULES } from '../../lib/theme/moduleTheme';

interface ModuleFilterBarProps {
    selectedModules: GameModule[] | 'all';
    onFilterChange: (modules: GameModule[] | 'all') => void;
}

export const ModuleFilterBar = memo<ModuleFilterBarProps>(({
    selectedModules,
    onFilterChange,
}) => {
    const isAll = selectedModules === 'all';
    const containerRef = useRef<HTMLDivElement>(null);

    const handleAllClick = useCallback(() => {
        onFilterChange('all');
    }, [onFilterChange]);

    const handleModuleClick = useCallback((module: GameModule) => {
        if (isAll) {
            onFilterChange([module]);
        } else {
            const modules = selectedModules as GameModule[];
            if (modules.includes(module)) {
                const newModules = modules.filter(m => m !== module);
                onFilterChange(newModules.length === 0 ? 'all' : newModules);
            } else {
                onFilterChange([...modules, module]);
            }
        }
    }, [isAll, selectedModules, onFilterChange]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        const buttons = containerRef.current?.querySelectorAll('button');
        if (!buttons) return;

        const currentIndex = Array.from(buttons).findIndex(
            btn => btn === document.activeElement
        );

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % buttons.length;
            (buttons[nextIndex] as HTMLButtonElement).focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            (buttons[prevIndex] as HTMLButtonElement).focus();
        } else if (e.key === 'Home') {
            e.preventDefault();
            (buttons[0] as HTMLButtonElement).focus();
        } else if (e.key === 'End') {
            e.preventDefault();
            (buttons[buttons.length - 1] as HTMLButtonElement).focus();
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex flex-wrap gap-2 p-3 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50"
            role="toolbar"
            aria-label="Filter achievements by module"
            onKeyDown={handleKeyDown}
        >
            {/* All button */}
            <button
                onClick={handleAllClick}
                className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isAll
                        ? 'bg-slate-600 text-white shadow-lg'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-300'
                    }
                `}
                aria-pressed={isAll}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                All
            </button>

            {/* Module filter buttons */}
            {GAME_MODULES.map(module => {
                const isSelected = !isAll && (selectedModules as GameModule[]).includes(module);
                const color = MODULE_COLORS[module];

                return (
                    <button
                        key={module}
                        onClick={() => handleModuleClick(module)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                            ${isSelected
                                ? 'text-white shadow-lg'
                                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-300'
                            }
                        `}
                        style={isSelected ? {
                            backgroundColor: `${color}30`,
                            borderColor: color,
                            border: `1px solid ${color}`,
                            boxShadow: `0 0 15px ${color}40`,
                            fontFamily: "'JetBrains Mono', monospace",
                        } : {
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                        aria-pressed={isSelected}
                    >
                        <span>{MODULE_ICONS[module]}</span>
                        <span className="hidden sm:inline">{MODULE_NAMES[module]}</span>
                    </button>
                );
            })}
        </div>
    );
});

ModuleFilterBar.displayName = 'ModuleFilterBar';
