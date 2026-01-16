import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface JointConfig {
    id: string;
    type: 'revolute' | 'prismatic';
    minAngle: number;
    maxAngle: number;
    length: number;
}

interface RobotArmProps {
    joints: JointConfig[];
    angles: number[];
}

export const RobotArm: React.FC<RobotArmProps> = ({ joints, angles }) => {
    // Calculate joint positions using forward kinematics
    const jointPositions = useMemo(() => {
        const positions: { x: number; y: number; z: number; angle: number }[] = [];
        let x = 0;
        let y = 0.2; // Start at base height
        let cumulativeAngle = 0;

        for (let i = 0; i < joints.length; i++) {
            cumulativeAngle += angles[i] || 0;
            positions.push({ x, y, z: 0, angle: cumulativeAngle });

            // Calculate next position
            x += joints[i].length * Math.cos(cumulativeAngle);
            y += joints[i].length * Math.sin(cumulativeAngle);
        }

        // Add end effector position
        positions.push({ x, y, z: 0, angle: cumulativeAngle });

        return positions;
    }, [joints, angles]);

    return (
        <group>
            {joints.map((joint, i) => {
                const startPos = jointPositions[i];
                const endPos = jointPositions[i + 1];

                // Calculate segment center and rotation
                const centerX = (startPos.x + endPos.x) / 2;
                const centerY = (startPos.y + endPos.y) / 2;

                return (
                    <group key={joint.id}>
                        {/* Joint Motor */}
                        <mesh position={[startPos.x, startPos.y, 0]}>
                            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
                            <meshStandardMaterial
                                color="#FF9800"
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </mesh>

                        {/* Joint Rotation Ring */}
                        <mesh
                            position={[startPos.x, startPos.y, 0]}
                            rotation={[Math.PI / 2, 0, startPos.angle]}
                        >
                            <torusGeometry args={[0.2, 0.03, 8, 32]} />
                            <meshStandardMaterial
                                color="#FFC107"
                                emissive="#FFC107"
                                emissiveIntensity={0.3}
                            />
                        </mesh>

                        {/* Arm Segment */}
                        <mesh
                            position={[centerX, centerY, 0]}
                            rotation={[0, 0, startPos.angle]}
                        >
                            <boxGeometry args={[joint.length, 0.15, 0.15]} />
                            <meshStandardMaterial
                                color="#4B5563"
                                roughness={0.4}
                                metalness={0.6}
                            />
                        </mesh>

                        {/* Joint angle indicator arc */}
                        <JointArc
                            position={[startPos.x, startPos.y, 0]}
                            minAngle={joint.minAngle}
                            maxAngle={joint.maxAngle}
                            currentAngle={angles[i] || 0}
                            cumulativeAngle={i > 0 ? jointPositions[i - 1]?.angle || 0 : 0}
                        />
                    </group>
                );
            })}

            {/* End Effector (Gripper) */}
            <group position={[
                jointPositions[jointPositions.length - 1].x,
                jointPositions[jointPositions.length - 1].y,
                0
            ]}>
                <mesh rotation={[0, 0, jointPositions[jointPositions.length - 1].angle]}>
                    <boxGeometry args={[0.3, 0.1, 0.2]} />
                    <meshStandardMaterial color="#6366F1" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Gripper fingers */}
                <mesh
                    position={[
                        Math.cos(jointPositions[jointPositions.length - 1].angle) * 0.15,
                        Math.sin(jointPositions[jointPositions.length - 1].angle) * 0.15 + 0.1,
                        0
                    ]}
                >
                    <boxGeometry args={[0.05, 0.15, 0.1]} />
                    <meshStandardMaterial color="#818CF8" />
                </mesh>
                <mesh
                    position={[
                        Math.cos(jointPositions[jointPositions.length - 1].angle) * 0.15,
                        Math.sin(jointPositions[jointPositions.length - 1].angle) * 0.15 - 0.1,
                        0
                    ]}
                >
                    <boxGeometry args={[0.05, 0.15, 0.1]} />
                    <meshStandardMaterial color="#818CF8" />
                </mesh>
            </group>
        </group>
    );
};

interface JointArcProps {
    position: [number, number, number];
    minAngle: number;
    maxAngle: number;
    currentAngle: number;
    cumulativeAngle: number;
}

const JointArc: React.FC<JointArcProps> = ({
    position,
    minAngle,
    maxAngle,
    currentAngle,
    cumulativeAngle,
}) => {
    const arcPoints = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0, 0,                                    // Center
            0.4, 0.4,                               // Radius
            cumulativeAngle + minAngle,             // Start angle
            cumulativeAngle + maxAngle,             // End angle
            false,                                  // Clockwise
            0                                       // Rotation
        );

        const points = curve.getPoints(32);
        return points.map(p => [p.x, p.y, 0] as [number, number, number]);
    }, [minAngle, maxAngle, cumulativeAngle]);

    return (
        <group position={position}>
            {/* Range indicator arc */}
            <Line
                points={arcPoints}
                color="#4ADE80"
                opacity={0.5}
                transparent
                lineWidth={1}
            />

            {/* Current angle indicator */}
            <mesh
                position={[
                    Math.cos(cumulativeAngle + currentAngle) * 0.4,
                    Math.sin(cumulativeAngle + currentAngle) * 0.4,
                    0
                ]}
            >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#22C55E" />
            </mesh>
        </group>
    );
};
