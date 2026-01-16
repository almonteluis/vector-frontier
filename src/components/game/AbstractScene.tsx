import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { VectorArrow } from './VectorArrow';
import { BaseScene } from './BaseScene';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';

export const AbstractScene: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const vectors = useGameStore(s => s.vectors);

    useKeyboardControls();

    return (
        <BaseScene>
            {/* Render Target Vector */}
            {currentLevel && (
                <VectorArrow
                    targetVector={currentLevel.targetVector}
                    isTarget={true}
                />
            )}

            {/* Render Player Vectors (tip-to-tail chaining) */}
            {vectors.map((v, i) => {
                let origin = { x: 0, y: 0, z: 0 };
                for (let j = 0; j < i; j++) {
                    origin.x += vectors[j].components.x;
                    origin.y += vectors[j].components.y;
                    origin.z += vectors[j].components.z;
                }

                return (
                    <VectorArrow
                        key={v.id}
                        vectorData={v}
                        origin={origin}
                    />
                );
            })}
        </BaseScene>
    );
};
