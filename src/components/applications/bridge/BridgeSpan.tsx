import React from 'react';
import * as THREE from 'three';
import type { Vector3 } from '../../../lib/types';

interface BridgeSpanProps {
    start: Vector3;
    end: Vector3;
    deckHeight?: number;
}

export const BridgeSpan: React.FC<BridgeSpanProps> = ({
    start,
    end,
    deckHeight = 0.2,
}) => {
    // Calculate span length
    const spanLength = Math.sqrt(
        Math.pow(end.x - start.x, 2) +
        Math.pow(end.y - start.y, 2) +
        Math.pow(end.z - start.z, 2)
    );

    // Calculate center position
    const center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2 + deckHeight / 2,
        z: (start.z + end.z) / 2,
    };

    // Calculate rotation to align deck with span
    const direction = new THREE.Vector3(
        end.x - start.x,
        end.y - start.y,
        end.z - start.z
    ).normalize();

    const angle = Math.atan2(direction.z, direction.x);

    return (
        <group>
            {/* Bridge Deck */}
            <mesh
                position={[center.x, center.y, center.z]}
                rotation={[0, -angle, 0]}
            >
                <boxGeometry args={[spanLength, deckHeight, 2]} />
                <meshStandardMaterial
                    color="#5D4E37"
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>

            {/* Left Support Pillar */}
            <mesh position={[start.x, start.y - 1, start.z]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshStandardMaterial
                    color="#6B7280"
                    roughness={0.6}
                    metalness={0.4}
                />
            </mesh>

            {/* Right Support Pillar */}
            <mesh position={[end.x, end.y - 1, end.z]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshStandardMaterial
                    color="#6B7280"
                    roughness={0.6}
                    metalness={0.4}
                />
            </mesh>

            {/* Support indicators (triangles at base) */}
            <mesh position={[start.x, -0.1, start.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.4, 0.3, 3]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>

            <mesh position={[end.x, -0.1, end.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.4, 0.3, 3]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>

            {/* Span measurement line */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                            start.x, -0.5, start.z,
                            end.x, -0.5, end.z
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#888888" opacity={0.5} transparent />
            </line>
        </group>
    );
};
