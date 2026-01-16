import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import type { Vector3 } from '../../../lib/types';

interface TrajectoryLineProps {
    start: Vector3;
    end: Vector3;
    color?: string;
    dashed?: boolean;
    opacity?: number;
}

export const TrajectoryLine: React.FC<TrajectoryLineProps> = ({
    start,
    end,
    color = '#00FF88',
    dashed = false,
    opacity = 0.6,
}) => {
    const points = useMemo(() => {
        return [
            [start.x, start.y, start.z] as [number, number, number],
            [end.x, end.y, end.z] as [number, number, number],
        ];
    }, [start, end]);

    return (
        <Line
            points={points}
            color={color}
            lineWidth={2}
            dashed={dashed}
            dashSize={0.3}
            gapSize={0.15}
            opacity={opacity}
            transparent
        />
    );
};
