import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { VectorArrow } from '../../game/VectorArrow';
import { BaseScene } from '../../game/BaseScene';
import { useKeyboardControls } from '../../../hooks/useKeyboardControls';
import type { BridgeLevelConfig } from '../../../lib/types';
import { LoadMarker } from './LoadMarker';
import { BridgeSpan } from './BridgeSpan';

export const BridgeScene: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const vectors = useGameStore(s => s.vectors);
    const bridgeState = useGameStore(s => s.bridgeState);

    useKeyboardControls();

    const bridgeLevel = currentLevel as BridgeLevelConfig;

    return (
        <BaseScene cameraPosition={[0, 8, 15]} cameraTarget={[0, 3, 0]} gridSize={20}>
            {/* Bridge Span Visualization */}
            {bridgeLevel.bridgeSpan && (
                <BridgeSpan
                    start={bridgeLevel.bridgeSpan.start}
                    end={bridgeLevel.bridgeSpan.end}
                />
            )}

            {/* Load Markers */}
            {bridgeLevel.loads?.map((load, i) => (
                <LoadMarker
                    key={i}
                    position={load.position}
                    force={load.force}
                    isDynamic={load.isDynamic}
                />
            ))}

            {/* Support Reaction Vectors (player-controlled) */}
            {vectors.map((v, i) => {
                // Position supports at bridge ends
                const bridgeStart = bridgeLevel.bridgeSpan?.start || { x: -5, y: 0, z: 0 };
                const bridgeEnd = bridgeLevel.bridgeSpan?.end || { x: 5, y: 0, z: 0 };

                // Distribute support vectors along bridge span
                const t = vectors.length > 1 ? i / (vectors.length - 1) : 0.5;
                const origin = {
                    x: bridgeStart.x + (bridgeEnd.x - bridgeStart.x) * t,
                    y: 0,
                    z: 0,
                };

                return (
                    <VectorArrow
                        key={v.id}
                        vectorData={{
                            ...v,
                            color: '#4CAF50', // Green for support reactions
                        }}
                        origin={origin}
                    />
                );
            })}

            {/* Equilibrium indicator at center */}
            {bridgeState && (
                <mesh position={[0, 6, 0]}>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial
                        color={bridgeState.equilibriumError < 1 ? '#4CAF50' : '#FF5252'}
                        emissive={bridgeState.equilibriumError < 1 ? '#4CAF50' : '#FF5252'}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            )}
        </BaseScene>
    );
};
