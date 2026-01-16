import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Vector3 } from '../../../lib/types';

interface LoadMarkerProps {
    position: Vector3;
    force: Vector3;
    isDynamic?: boolean;
}

export const LoadMarker: React.FC<LoadMarkerProps> = ({
    position,
    force,
    isDynamic = false,
}) => {
    const arrowRef = useRef<THREE.Group>(null);

    // Animate dynamic loads
    useFrame((state) => {
        if (arrowRef.current && isDynamic) {
            // Subtle pulsing for dynamic loads
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
            arrowRef.current.scale.setScalar(scale);
        }
    });

    // Calculate force direction and magnitude
    const forceMag = Math.sqrt(force.x * force.x + force.y * force.y + force.z * force.z);
    const forceDir = {
        x: force.x / forceMag,
        y: force.y / forceMag,
        z: force.z / forceMag,
    };

    // Arrow length proportional to force magnitude
    const arrowLength = Math.min(forceMag * 0.2, 3);

    // Calculate rotation to point arrow in force direction
    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3(forceDir.x, forceDir.y, forceDir.z);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);

    const color = isDynamic ? '#FFA726' : '#FF5252';

    return (
        <group position={[position.x, position.y, position.z]} ref={arrowRef}>
            {/* Force arrow shaft */}
            <mesh quaternion={quaternion}>
                <cylinderGeometry args={[0.05, 0.05, arrowLength, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Force arrow head */}
            <mesh
                position={[
                    forceDir.x * arrowLength * 0.5,
                    forceDir.y * arrowLength * 0.5,
                    forceDir.z * arrowLength * 0.5,
                ]}
                quaternion={quaternion}
            >
                <coneGeometry args={[0.12, 0.3, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Application point indicator */}
            <mesh>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color="#FFFFFF"
                    emissive="#FFFFFF"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Force magnitude label background */}
            <mesh position={[0.5, 0, 0]}>
                <planeGeometry args={[0.8, 0.4]} />
                <meshBasicMaterial
                    color="#1A1A2E"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};
