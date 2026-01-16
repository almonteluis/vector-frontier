import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3 } from '../../../lib/types';

interface WindVisualizationProps {
    wind: Vector3;
    particleCount?: number;
    area?: number;
}

export const WindVisualization: React.FC<WindVisualizationProps> = ({
    wind,
    particleCount = 50,
    area = 15,
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const positionsRef = useRef<Float32Array>();

    // Initialize particle positions
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * area;
            pos[i * 3 + 1] = Math.random() * 5 + 1; // Height between 1-6
            pos[i * 3 + 2] = (Math.random() - 0.5) * area;
        }
        positionsRef.current = pos;
        return pos;
    }, [particleCount, area]);

    // Animate particles based on wind
    useFrame((_, delta) => {
        if (!pointsRef.current || !positionsRef.current) return;

        const pos = positionsRef.current;

        for (let i = 0; i < particleCount; i++) {
            // Move particle in wind direction
            pos[i * 3] += wind.x * delta * 2;
            pos[i * 3 + 1] += wind.y * delta * 2;
            pos[i * 3 + 2] += wind.z * delta * 2;

            // Wrap particles around the area
            const halfArea = area / 2;
            if (pos[i * 3] > halfArea) pos[i * 3] = -halfArea;
            if (pos[i * 3] < -halfArea) pos[i * 3] = halfArea;
            if (pos[i * 3 + 2] > halfArea) pos[i * 3 + 2] = -halfArea;
            if (pos[i * 3 + 2] < -halfArea) pos[i * 3 + 2] = halfArea;

            // Keep height within bounds
            if (pos[i * 3 + 1] < 0.5) pos[i * 3 + 1] = 6;
            if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = 0.5;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    // Calculate wind strength for visual intensity
    const windMagnitude = Math.sqrt(wind.x * wind.x + wind.y * wind.y + wind.z * wind.z);
    const opacity = Math.min(0.8, 0.2 + windMagnitude * 0.15);

    if (windMagnitude < 0.1) return null; // Don't show if no wind

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#4FC3F7"
                size={0.15}
                transparent
                opacity={opacity}
                sizeAttenuation
            />
        </points>
    );
};
