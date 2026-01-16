import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface BaseSceneProps {
    cameraPosition?: [number, number, number];
    cameraTarget?: [number, number, number];
    gridSize?: number;
    showGrid?: boolean;
    backgroundColor?: string;
    children: React.ReactNode;
}

export const BaseScene: React.FC<BaseSceneProps> = ({
    cameraPosition = [6, 5, 8],
    cameraTarget = [0, 0, 0],
    gridSize = 20,
    showGrid = true,
    children,
}) => {
    return (
        <>
            {/* Camera & Controls */}
            <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
            <OrbitControls
                makeDefault
                minDistance={5}
                maxDistance={25}
                target={cameraTarget}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />

            {/* Lighting */}
            <ambientLight intensity={0.6} color="#ffffff" />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1.2}
                castShadow
            />
            <hemisphereLight
                color="#ffffff"
                groundColor="#071033"
                intensity={0.5}
            />

            {/* Game Board */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[gridSize, gridSize]} />
                <meshStandardMaterial
                    color="#0F172A"
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Grid */}
            {showGrid && (
                <gridHelper args={[gridSize, gridSize, 0x2A2F45, 0x2A2F45]} position={[0, 0.01, 0]} />
            )}

            {/* Origin Marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Module-specific content */}
            {children}
        </>
    );
};
