import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3 } from '../../../lib/types';

interface DeliveryTargetProps {
    position: Vector3;
    index?: number;
    completed?: boolean;
}

export const DeliveryTarget: React.FC<DeliveryTargetProps> = ({
    position,
    completed = false,
}) => {
    const ringRef = useRef<THREE.Mesh>(null);

    // Animate the ring
    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
            // Pulse effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            ringRef.current.scale.setScalar(scale);
        }
    });

    const color = completed ? '#00C853' : '#FF6B6B';

    return (
        <group position={[position.x, position.y, position.z]}>
            {/* Target marker - torus ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.5, 0.08, 8, 24]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Center point */}
            <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Target number indicator */}
            <mesh position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Vertical line to ground */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, 0, -position.y, 0])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} opacity={0.4} transparent />
            </line>

            {/* Ground marker */}
            <mesh position={[0, -position.y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.3, 0.5, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};
