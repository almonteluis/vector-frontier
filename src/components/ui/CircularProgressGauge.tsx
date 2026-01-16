import { memo, useMemo } from 'react';
import type { GameModule } from '../../lib/types';
import { MODULE_COLORS, MODULE_ICONS } from '../../lib/theme/moduleTheme';

interface CircularProgressGaugeProps {
    value: number;
    max: number;
    label: string;
    module: GameModule;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

const SIZE_CONFIG = {
    sm: { width: 80, radius: 30, strokeWidth: 4, fontSize: 'text-lg' },
    md: { width: 100, radius: 38, strokeWidth: 6, fontSize: 'text-xl' },
    lg: { width: 120, radius: 45, strokeWidth: 8, fontSize: 'text-2xl' },
};

export const CircularProgressGauge = memo<CircularProgressGaugeProps>(({
    value,
    max,
    label,
    module,
    size = 'md',
    showIcon = true,
}) => {
    const config = SIZE_CONFIG[size];
    const color = MODULE_COLORS[module];
    const icon = MODULE_ICONS[module];

    const percentage = useMemo(
        () => max > 0 ? Math.round((value / max) * 100) : 0,
        [value, max]
    );

    const circumference = 2 * Math.PI * config.radius;
    const strokeDashoffset = useMemo(
        () => circumference - (percentage / 100) * circumference,
        [percentage, circumference]
    );

    const center = config.width / 2;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: config.width, height: config.width }}>
                <svg
                    className="transform -rotate-90"
                    width={config.width}
                    height={config.width}
                >
                    {/* Background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={config.radius}
                        stroke="rgba(100, 116, 139, 0.3)"
                        strokeWidth={config.strokeWidth}
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={config.radius}
                        stroke={color}
                        strokeWidth={config.strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-700 ease-out gauge-fill-animation"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color}80)`,
                        }}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    {showIcon && (
                        <span className="text-lg mb-0.5">{icon}</span>
                    )}
                    <span
                        className={`font-bold ${config.fontSize}`}
                        style={{
                            color,
                            fontFamily: "'JetBrains Mono', monospace",
                            textShadow: `0 0 10px ${color}50`,
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>

            {/* Label */}
            <span
                className="mt-2 text-xs text-slate-400 uppercase tracking-wider text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                {label}
            </span>
        </div>
    );
});

CircularProgressGauge.displayName = 'CircularProgressGauge';
