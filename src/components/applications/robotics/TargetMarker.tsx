import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3 } from '../../../lib/types';

interface TargetMarkerProps {
    position: Vector3;
    type: 'pickup' | 'place';
    isActive?: boolean;
}

export const TargetMarker: React.FC<TargetMarkerProps> = ({
    position,
    type,
    isActive = false,
}) => {
    const ringRef = useRef<THREE.Mesh>(null);

    // Animate the ring when active
    useFrame((state) => {
        if (ringRef.current && isActive) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 1.5;
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
            ringRef.current.scale.setScalar(scale);
        }
    });

    const color = type === 'pickup' ? '#4FC3F7' : '#81C784';
    const innerColor = type === 'pickup' ? '#0288D1' : '#388E3C';

    return (
        <group position={[position.x, position.y, position.z]}>
            {/* Outer ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.4, 0.06, 8, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={isActive ? color : '#000000'}
                    emissiveIntensity={isActive ? 0.5 : 0}
                    transparent
                    opacity={isActive ? 1 : 0.6}
                />
            </mesh>

            {/* Inner indicator */}
            <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color={innerColor}
                    emissive={isActive ? innerColor : '#000000'}
                    emissiveIntensity={isActive ? 0.4 : 0}
                />
            </mesh>

            {/* Type icon (simple shape) */}
            {type === 'pickup' ? (
                // Up arrow for pickup
                <mesh position={[0, 0.3, 0]}>
                    <coneGeometry args={[0.1, 0.2, 4]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            ) : (
                // Down arrow for place
                <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.1, 0.2, 4]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            )}

            {/* Vertical reference line */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, 0, -position.y, 0])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} opacity={0.3} transparent />
            </line>

            {/* Ground projection */}
            <mesh position={[0, -position.y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.25, 0.35, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};
