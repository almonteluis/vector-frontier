import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { VectorArrow } from '../../game/VectorArrow';
import { BaseScene } from '../../game/BaseScene';
import { useKeyboardControls } from '../../../hooks/useKeyboardControls';
import type { DroneLevelConfig } from '../../../lib/types';
import { WindVisualization } from './WindVisualization';
import { TrajectoryLine } from './TrajectoryLine';
import { DeliveryTarget } from './DeliveryTarget';

export const DroneScene: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const vectors = useGameStore(s => s.vectors);
    const droneState = useGameStore(s => s.droneState);

    useKeyboardControls();

    const droneLevel = currentLevel as DroneLevelConfig;
    const wind = droneState?.currentWind || { x: 0, y: 0, z: 0 };

    // Calculate effective trajectory (thrust + wind)
    let thrustResultant = { x: 0, y: 0, z: 0 };
    vectors.forEach(v => {
        thrustResultant.x += v.components.x;
        thrustResultant.y += v.components.y;
        thrustResultant.z += v.components.z;
    });

    const effectiveTrajectory = {
        x: thrustResultant.x + wind.x,
        y: thrustResultant.y + wind.y,
        z: thrustResultant.z + wind.z,
    };

    return (
        <BaseScene cameraPosition={[8, 6, 10]} gridSize={25}>
            {/* Wind Visualization */}
            <WindVisualization wind={wind} />

            {/* Delivery Targets */}
            {droneLevel.deliveryTargets?.map((target, i) => (
                <DeliveryTarget key={i} position={target} index={i} />
            ))}

            {/* Trajectory Preview (effective path including wind) */}
            <TrajectoryLine
                start={{ x: 0, y: 0, z: 0 }}
                end={effectiveTrajectory}
                color="#00FF88"
                dashed={true}
            />

            {/* Wind Vector (visualization) */}
            <VectorArrow
                targetVector={wind}
                isTarget={true}
                color="#4FC3F7"
                opacity={0.6}
            />

            {/* Render Player Thrust Vectors */}
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
