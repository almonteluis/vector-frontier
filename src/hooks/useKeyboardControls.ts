import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

const CONTROL_KEYS = ['w', 's', 'a', 'd', 'q', 'e', 'r', 'f', 'shift', 'enter', 'tab', 'z', 'h', 'escape'];

export const useKeyboardControls = () => {
    const pressedKeys = useRef<Set<string>>(new Set());

    const updateVector = useGameStore(s => s.updateVector);
    const submitResult = useGameStore(s => s.submitResult);

    // Handle key down/up for state
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (CONTROL_KEYS.includes(key)) {
                pressedKeys.current.add(key);

                // One-shot actions
                if (key === 'tab') {
                    e.preventDefault();
                    cycleSelection(e.shiftKey);
                }
                if (key === 'enter') {
                    submitResult();
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            pressedKeys.current.delete(e.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [submitResult]);

    const cycleSelection = (reverse: boolean) => {
        const state = useGameStore.getState();
        const ids = state.vectors.map(v => v.id);
        if (ids.length === 0) return;

        const currentIndex = state.selectedVectorId ? ids.indexOf(state.selectedVectorId) : -1;
        let nextIndex;
        if (reverse) {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = ids.length - 1;
        } else {
            nextIndex = (currentIndex + 1) % ids.length;
        }
        state.selectVector(ids[nextIndex]);
    };

    // Continuous Updates
    useFrame((_state, delta) => {
        const sId = useGameStore.getState().selectedVectorId;
        if (!sId) return;

        // Find mutable copy or just read current
        const currentVector = useGameStore.getState().vectors.find(v => v.id === sId);
        if (!currentVector) return;

        const keys = pressedKeys.current;
        if (keys.size === 0) return;

        let changed = false;
        let v = new THREE.Vector3(currentVector.components.x, currentVector.components.y, currentVector.components.z);

        // Constants
        const isPrecision = keys.has('shift');
        const multiplier = isPrecision ? 0.25 : 1.0;
        const magSpeed = 2.5 * multiplier * delta;
        const rotSpeed = THREE.MathUtils.degToRad(90) * multiplier * delta;

        // Magnitude (W/S)
        if (keys.has('w')) {
            const len = v.length();
            if (len < 0.01) {
                v.set(0, 0.1, 0);
            } else {
                v.setLength(len + magSpeed);
            }
            changed = true;
        }
        if (keys.has('s')) {
            const len = v.length();
            if (len > magSpeed) {
                v.setLength(len - magSpeed);
            } else {
                v.setLength(0.001);
            }
            changed = true;
        }

        // Rotation
        if (keys.has('a') || keys.has('d')) {
            const angle = rotSpeed * (keys.has('a') ? 1 : -1);
            v.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            changed = true;
        }
        if (keys.has('q') || keys.has('e')) {
            const angle = rotSpeed * (keys.has('q') ? 1 : -1);
            v.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle);
            changed = true;
        }
        if (keys.has('r') || keys.has('f')) {
            const angle = rotSpeed * (keys.has('r') ? 1 : -1);
            v.applyAxisAngle(new THREE.Vector3(0, 0, 1), angle);
            changed = true;
        }

        if (changed) {
            updateVector(sId, { components: { x: v.x, y: v.y, z: v.z } });
        }
    });
};
