import { memo, useEffect, useState, useRef } from 'react';
import type { ModuleLevelConfig } from '../../lib/types';

interface MissionBriefingTooltipProps {
    level: ModuleLevelConfig;
    levelNumber: number;
    isUnlocked: boolean;
    stars: number;
    targetRect: DOMRect | null;
    containerRef: React.RefObject<HTMLElement | null>;
}

export const MissionBriefingTooltip = memo<MissionBriefingTooltipProps>(({
    level,
    levelNumber,
    isUnlocked,
    stars,
    targetRect,
    containerRef,
}) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0, placement: 'bottom' as 'top' | 'bottom' });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!targetRect || !tooltipRef.current || !containerRef.current) return;

        const tooltip = tooltipRef.current;
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        const tooltipWidth = 280;
        const tooltipHeight = tooltip.offsetHeight || 160;
        const padding = 12;

        // Calculate centered X position
        let x = targetRect.left + targetRect.width / 2 - tooltipWidth / 2 - containerRect.left;

        // Clamp X to stay within container
        x = Math.max(padding, Math.min(x, containerRect.width - tooltipWidth - padding));

        // Determine if tooltip should be above or below
        const spaceBelow = containerRect.bottom - targetRect.bottom;
        const spaceAbove = targetRect.top - containerRect.top;

        let y: number;
        let placement: 'top' | 'bottom';

        if (spaceBelow >= tooltipHeight + padding) {
            y = targetRect.bottom - containerRect.top + padding;
            placement = 'bottom';
        } else if (spaceAbove >= tooltipHeight + padding) {
            y = targetRect.top - containerRect.top - tooltipHeight - padding;
            placement = 'top';
        } else {
            y = targetRect.bottom - containerRect.top + padding;
            placement = 'bottom';
        }

        setPosition({ x, y, placement });
        setIsVisible(true);
    }, [targetRect, containerRef]);

    if (!targetRect) return null;

    return (
        <div
            ref={tooltipRef}
            className={`
                absolute z-50 w-[280px] pointer-events-none
                transition-all duration-200 ease-out
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
            style={{
                left: position.x,
                top: position.y,
                transformOrigin: position.placement === 'bottom' ? 'top center' : 'bottom center',
            }}
            role="tooltip"
            aria-hidden="true"
        >
            <div className="bg-slate-900/95 backdrop-blur-lg rounded-lg border border-cyan-500/50 shadow-[0_0_25px_rgba(0,217,255,0.3)] overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-transparent">
                    <div className="flex items-center justify-between">
                        <span
                            className="text-cyan-400 text-xs uppercase tracking-wider"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            Mission {levelNumber.toString().padStart(2, '0')}
                        </span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3].map(star => (
                                <span
                                    key={star}
                                    className={`text-xs ${star <= stars ? 'text-yellow-400' : 'text-slate-600'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-1">
                        {level.title}
                    </h3>
                </div>

                {/* Content */}
                <div className="px-4 py-3 space-y-3">
                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {level.description}
                    </p>

                    {/* Vector Concept (if available) */}
                    {level.vectorConcept && (
                        <div className="bg-cyan-950/40 rounded-md p-3 border border-cyan-500/20">
                            <div
                                className="text-cyan-400 text-xs uppercase tracking-wider mb-1"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Vector Concept
                            </div>
                            <div className="text-white font-medium text-sm">
                                {level.vectorConcept.name}
                            </div>
                            <div className="text-slate-400 text-xs mt-1">
                                {level.vectorConcept.briefDescription}
                            </div>
                        </div>
                    )}

                    {/* Status */}
                    {!isUnlocked && (
                        <div className="flex items-center gap-2 text-red-400 text-xs">
                            <span>🔒</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                LOCKED - Complete previous missions
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-700/50 flex justify-between text-xs text-slate-500">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Tolerance: ±{level.tolerance}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Vectors: {level.allowedVectors}
                    </span>
                </div>
            </div>
        </div>
    );
});

MissionBriefingTooltip.displayName = 'MissionBriefingTooltip';
