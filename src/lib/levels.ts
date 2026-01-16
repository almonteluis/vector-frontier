import type { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
    {
        id: 1,
        title: "First Steps",
        description: "Align your vector to match the target. Use W/S to change magnitude.",
        targetVector: { x: 5, y: 0, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Select the yellow vector by clicking it.",
            "Use 'W' to increase length, 'S' to decrease.",
            "The target is 5 units along the X axis."
        ]
    },
    {
        id: 2,
        title: "Verticality",
        description: "Vectors can point anywhere. Rotate using A/D (Yaw) and Q/E (Pitch).",
        targetVector: { x: 3, y: 4, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "This vector has components in both X and Y.",
            "Try to match the angle first, then the length.",
            "A 3-4-5 triangle is a classic right triangle."
        ]
    },
    {
        id: 3,
        title: "Into the Deep",
        description: "Welcome to 3D space. Use R/F to roll, or combine Pitch/Yaw.",
        targetVector: { x: 2, y: 2, z: 4 },
        allowedVectors: 1,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "The Z axis points towards/away from the camera.",
            "Check the shadow to see where you are on the ground plane."
        ]
    },
    {
        id: 4,
        title: "Teamwork",
        description: "Use multiple vectors to reach the target. They add up tip-to-tail.",
        targetVector: { x: 6, y: 0, z: 2 },
        allowedVectors: 2,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "You have 2 vectors available.",
            "Maybe one can handle X and the other Z?",
            "The order doesn't matter for the result."
        ]
    }
];
