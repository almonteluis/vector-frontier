import React from 'react';
import type { Vector3 } from '../../../lib/types';

interface WorkspaceObstacleProps {
    position: Vector3;
    size: Vector3;
}

export const WorkspaceObstacle: React.FC<WorkspaceObstacleProps> = ({
    position,
    size,
}) => {
    return (
        <group position={[position.x, position.y, position.z]}>
            {/* Main obstacle body */}
            <mesh>
                <boxGeometry args={[size.x, size.y, size.z]} />
                <meshStandardMaterial
                    color="#EF4444"
                    roughness={0.6}
                    metalness={0.2}
                    transparent
                    opacity={0.7}
                />
            </mesh>

            {/* Wireframe outline */}
            <mesh>
                <boxGeometry args={[size.x * 1.01, size.y * 1.01, size.z * 1.01]} />
                <meshBasicMaterial
                    color="#FCA5A5"
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Warning stripes on top */}
            <mesh position={[0, size.y / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[size.x, size.z]} />
                <meshBasicMaterial
                    color="#FEF08A"
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    );
};
