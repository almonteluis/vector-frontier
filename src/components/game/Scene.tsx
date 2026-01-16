import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import { VectorArrow } from './VectorArrow';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';

const SceneContent: React.FC = () => {
    const currentLevel = useGameStore(s => s.currentLevel);
    const vectors = useGameStore(s => s.vectors);
    const loadLevel = useGameStore(s => s.loadLevel);
    const currentLevelIndex = useGameStore(s => s.currentLevelIndex);

    const initLevel = React.useCallback(() => loadLevel(currentLevelIndex), [loadLevel, currentLevelIndex]);

    useKeyboardControls();

    // Re-init level when component mounts
    useEffect(() => {
        initLevel();
    }, []);

    return (
        <>
            {/* Camera & Controls */}
            <PerspectiveCamera makeDefault position={[6, 5, 8]} fov={50} />
            <OrbitControls
                makeDefault
                minDistance={5}
                maxDistance={25}
                target={[0, 0, 0]}
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

            {/* Environment */}


            {/* Game Board */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial
                    color="#0F172A"
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <gridHelper args={[20, 20, 0x2A2F45, 0x2A2F45]} position={[0, 0.01, 0]} />

            {/* Origin Marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Render Target Vector */}
            {currentLevel && (
                <VectorArrow
                    targetVector={currentLevel.targetVector}
                    isTarget={true}
                />
            )}

            {/* Render Player Vectors */}
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
        </>
    );
};

export const GameScene: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-900" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas shadows dpr={[1, 2]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <color attach="background" args={['#0F172A']} />
                <React.Suspense fallback={null}>
                    <SceneContent />
                </React.Suspense>
            </Canvas>
        </div>
    );
};
