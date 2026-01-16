import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { VectorData, Vector3 as Vec3Type } from '../../lib/types';
import { useGameStore } from '../../store/gameStore';

interface Props {
    vectorData?: VectorData;
    targetVector?: Vec3Type;
    isTarget?: boolean;
    origin?: Vec3Type;
}

const SHAFT_RADIUS = 0.06;
const TIP_RADIUS = 0.12;
const TIP_LENGTH = 0.35;

export const VectorArrow: React.FC<Props> = ({
    vectorData,
    targetVector,
    isTarget = false,
    origin = { x: 0, y: 0, z: 0 }
}) => {
    const meshRef = useRef<THREE.Group>(null);

    const selectedId = useGameStore(s => s.selectedVectorId);
    const selectVector = useGameStore(s => s.selectVector);

    const isSelected = !isTarget && vectorData?.id === selectedId;

    const components = isTarget && targetVector ? targetVector : vectorData?.components;

    if (!components) return null;

    // Calculate length and orientation
    const vec = useMemo(() => new THREE.Vector3(components.x, components.y, components.z), [components.x, components.y, components.z]);
    const length = vec.length();

    const quaternion = useMemo(() => {
        if (length < 0.001) return new THREE.Quaternion();
        const up = new THREE.Vector3(0, 1, 0);
        const direction = vec.clone().normalize();
        return new THREE.Quaternion().setFromUnitVectors(up, direction);
    }, [vec, length]);

    const color = isTarget ? '#00C853' : (vectorData?.color || '#FFD166');
    const emissive = isSelected ? '#FFE8A3' : '#000000';
    const scale = isSelected ? 1.05 : 1.0;

    const handleClick = (e: any) => {
        if (isTarget) return;
        e.stopPropagation();
        if (vectorData) {
            selectVector(vectorData.id);
        }
    };

    if (length < 0.01) return null;

    const shaftLength = Math.max(0, length - TIP_LENGTH);

    useFrame((state) => {
        if (isSelected && meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.position.y = origin.y + Math.sin(t * 2) * 0.05;
        } else if (meshRef.current) {
            meshRef.current.position.y = origin.y;
        }
    });

    return (
        <group
            ref={meshRef}
            position={[origin.x, origin.y, origin.z]}
            quaternion={quaternion}
            scale={scale}
            onClick={handleClick}
            onPointerOver={() => document.body.style.cursor = isTarget ? 'default' : 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            <mesh position={[0, shaftLength / 2, 0]}>
                <cylinderGeometry args={[SHAFT_RADIUS, SHAFT_RADIUS, shaftLength, 16]} />
                <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={isSelected ? 0.5 : 0} />
            </mesh>

            <mesh position={[0, shaftLength + (TIP_LENGTH / 2), 0]}>
                <coneGeometry args={[TIP_RADIUS, TIP_LENGTH, 16]} />
                <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={isSelected ? 0.5 : 0} />
            </mesh>

            {isSelected && (
                <mesh position={[0, length / 2, 0]}>
                    <cylinderGeometry args={[SHAFT_RADIUS * 1.4, SHAFT_RADIUS * 1.4, length, 16]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.BackSide} />
                </mesh>
            )}
        </group>
    );
};
