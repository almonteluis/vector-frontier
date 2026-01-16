import { memo, useCallback, useRef } from 'react';

interface HexagonalLevelCellProps {
    levelNumber: number;
    isUnlocked: boolean;
    stars: number;
    isCurrentLevel: boolean;
    onClick: () => void;
    onHover?: (isHovered: boolean, rect: DOMRect | null) => void;
}

// Hexagonal clip-path for the cell
const HEXAGON_CLIP = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';

// Following rerender-memo: Extract expensive rendering into memoized component
export const HexagonalLevelCell = memo<HexagonalLevelCellProps>(({
    levelNumber,
    isUnlocked,
    stars,
    isCurrentLevel,
    onClick,
    onHover,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isCompleted = stars > 0;

    const handleMouseEnter = useCallback(() => {
        if (onHover && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            onHover(true, rect);
        }
    }, [onHover]);

    const handleMouseLeave = useCallback(() => {
        if (onHover) {
            onHover(false, null);
        }
    }, [onHover]);

    const handleFocus = useCallback(() => {
        if (onHover && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            onHover(true, rect);
        }
    }, [onHover]);

    const handleBlur = useCallback(() => {
        if (onHover) {
            onHover(false, null);
        }
    }, [onHover]);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={!isUnlocked}
            aria-label={`Level ${levelNumber}${isUnlocked ? '' : ' (Locked)'}${stars > 0 ? `, ${stars} stars earned` : ''}`}
            className={`
                relative w-28 h-32 transition-all duration-300
                ${isUnlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-50'}
            `}
            style={{
                clipPath: HEXAGON_CLIP,
            }}
        >
            {/* Hexagon Background */}
            <div
                className={`
                    absolute inset-0 transition-all duration-300
                    ${isUnlocked
                        ? isCompleted
                            ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40'
                            : 'bg-gradient-to-br from-slate-800/40 to-slate-900/40'
                        : 'bg-gradient-to-br from-red-950/30 to-slate-900/30'
                    }
                `}
                style={{
                    clipPath: HEXAGON_CLIP,
                    backdropFilter: 'blur(10px)',
                }}
            />

            {/* Hexagon Border Glow */}
            <div
                className={`
                    absolute inset-0
                    ${isUnlocked
                        ? isCurrentLevel
                            ? 'animate-pulse shadow-[0_0_20px_rgba(0,217,255,0.8)]'
                            : isCompleted
                                ? 'shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                                : 'shadow-[0_0_5px_rgba(100,116,139,0.3)]'
                        : 'shadow-[0_0_5px_rgba(239,68,68,0.2)]'
                    }
                `}
                style={{
                    clipPath: HEXAGON_CLIP,
                    border: `2px solid ${isUnlocked
                        ? isCurrentLevel || isCompleted
                            ? '#00d9ff'
                            : '#64748b'
                        : '#991b1b'
                        }`,
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {!isUnlocked && (
                    <span className="text-3xl text-red-600">🔒</span>
                )}

                {isUnlocked && (
                    <>
                        {/* Level Number with monospace font */}
                        <span
                            className="text-3xl font-bold text-white mb-2"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {levelNumber.toString().padStart(2, '0')}
                        </span>

                        {/* Stars */}
                        <div className="flex gap-1">
                            {[1, 2, 3].map(star => (
                                <span
                                    key={star}
                                    className={`text-xs ${star <= stars ? 'text-yellow-400' : 'text-slate-700'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Current Level Pulse Indicator */}
            {isUnlocked && isCurrentLevel && (
                <div
                    className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                    style={{ marginTop: '10%', marginRight: '10%' }}
                />
            )}
        </button>
    );
});

HexagonalLevelCell.displayName = 'HexagonalLevelCell';
