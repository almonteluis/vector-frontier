import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { BaseScene } from '../../game/BaseScene';
import { useKeyboardControls } from '../../../hooks/useKeyboardControls';
import type { RoboticsLevelConfig } from '../../../lib/types';
import { RobotArm } from './RobotArm';
import { TargetMarker } from './TargetMarker';
import { WorkspaceObstacle } from './WorkspaceObstacle';

export const RoboticsScene: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const roboticsState = useGameStore(s => s.roboticsState);

    useKeyboardControls();

    const roboticsLevel = currentLevel as RoboticsLevelConfig;

    return (
        <BaseScene cameraPosition={[8, 6, 8]} cameraTarget={[0, 2, 0]} gridSize={15}>
            {/* Robot Base Platform */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[1, 1.2, 0.2, 32]} />
                <meshStandardMaterial
                    color="#374151"
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* Robot Arm */}
            {roboticsLevel.joints && roboticsState && (
                <RobotArm
                    joints={roboticsLevel.joints}
                    angles={roboticsState.jointAngles}
                />
            )}

            {/* Pickup Target */}
            {roboticsLevel.pickupTarget && (
                <TargetMarker
                    position={roboticsLevel.pickupTarget}
                    type="pickup"
                    isActive={roboticsState?.sequenceStep === 0}
                />
            )}

            {/* Place Target */}
            {roboticsLevel.placeTarget && (
                <TargetMarker
                    position={roboticsLevel.placeTarget}
                    type="place"
                    isActive={roboticsState?.sequenceStep === 1}
                />
            )}

            {/* Obstacles */}
            {roboticsLevel.obstacles?.map((obstacle, i) => (
                <WorkspaceObstacle
                    key={i}
                    position={obstacle.position}
                    size={obstacle.size}
                />
            ))}

            {/* End Effector Position Indicator */}
            {roboticsState && (
                <mesh position={[
                    roboticsState.endEffectorPosition.x,
                    roboticsState.endEffectorPosition.y,
                    roboticsState.endEffectorPosition.z
                ]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        color={roboticsState.heldObject ? '#4CAF50' : '#FFD166'}
                        emissive={roboticsState.heldObject ? '#4CAF50' : '#FFD166'}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            )}
        </BaseScene>
    );
};
