import React, { useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import { AbstractScene } from './AbstractScene';
import { DroneScene } from '../applications/drone/DroneScene';
import { BridgeScene } from '../applications/bridge/BridgeScene';
import { RoboticsScene } from '../applications/robotics/RoboticsScene';

const SceneRouter: React.FC = () => {
    const activeModule = useGameStore(s => s.activeModule);
    const loadLevel = useGameStore(s => s.loadLevel);
    const currentLevelIndex = useGameStore(s => s.currentLevelIndex);
    const isPlaying = useGameStore(s => s.isPlaying);

    // Load level when entering game mode
    useEffect(() => {
        if (!isPlaying) {
            loadLevel(currentLevelIndex);
        }
    }, []);

    // Select the appropriate scene based on active module
    const SceneComponent = useMemo(() => {
        switch (activeModule) {
            case 'drone':
                return DroneScene;
            case 'bridge':
                return BridgeScene;
            case 'robotics':
                return RoboticsScene;
            default:
                return AbstractScene;
        }
    }, [activeModule]);

    return <SceneComponent />;
};

export const GameScene: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-900" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas shadows dpr={[1, 2]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <color attach="background" args={['#0F172A']} />
                <React.Suspense fallback={null}>
                    <SceneRouter />
                </React.Suspense>
            </Canvas>
        </div>
    );
};
