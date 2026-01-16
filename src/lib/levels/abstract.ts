import type { AbstractLevelConfig } from '../types';

export const ABSTRACT_LEVELS: AbstractLevelConfig[] = [
    {
        id: 1,
        module: 'abstract',
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
        ],
        vectorConcept: {
            name: "Vector Magnitude",
            briefDescription: "The length or size of a vector, representing how far it extends from origin."
        }
    },
    {
        id: 2,
        module: 'abstract',
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
        ],
        vectorConcept: {
            name: "Vector Direction",
            briefDescription: "Vectors have both magnitude and direction, pointing in 2D or 3D space."
        }
    },
    {
        id: 3,
        module: 'abstract',
        title: "Into the Deep",
        description: "Welcome to 3D space. Use R/F to roll, or combine Pitch/Yaw.",
        targetVector: { x: 2, y: 2, z: 4 },
        allowedVectors: 1,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "The Z axis points towards/away from the camera.",
            "Check the shadow to see where you are on the ground plane."
        ],
        vectorConcept: {
            name: "3D Vectors",
            briefDescription: "Vectors in 3D space have three components: X, Y, and Z coordinates."
        }
    },
    {
        id: 4,
        module: 'abstract',
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
        ],
        vectorConcept: {
            name: "Vector Addition",
            briefDescription: "Adding vectors tip-to-tail: the result is the vector from start to final end."
        }
    },
    {
        id: 5,
        module: 'abstract',
        title: "Upward Bound",
        description: "Combine vertical and horizontal components with two vectors.",
        targetVector: { x: 4, y: 5, z: 0 },
        allowedVectors: 2,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "One vector could go purely up (Y axis).",
            "Another could go purely right (X axis).",
            "Or find another combination that works!"
        ],
        vectorConcept: {
            name: "Component Decomposition",
            briefDescription: "Any vector can be broken into perpendicular component vectors."
        }
    },
    {
        id: 6,
        module: 'abstract',
        title: "The Long Way",
        description: "Sometimes you need more vectors for precision.",
        targetVector: { x: 3, y: 3, z: 3 },
        allowedVectors: 3,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Equal components in all three directions.",
            "Each axis could have its own vector.",
            "The cube diagonal has special properties."
        ],
        vectorConcept: {
            name: "Space Diagonal",
            briefDescription: "The diagonal through a cube creates equal components in all three dimensions."
        }
    },
    {
        id: 7,
        module: 'abstract',
        title: "Negative Space",
        description: "Vectors can point in negative directions too.",
        targetVector: { x: -4, y: 2, z: 0 },
        allowedVectors: 1,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Rotate past the origin to point in -X direction.",
            "Negative X means pointing left.",
            "The magnitude is still positive (length)."
        ],
        vectorConcept: {
            name: "Negative Components",
            briefDescription: "Vector components can be negative, indicating opposite direction on that axis."
        }
    },
    {
        id: 8,
        module: 'abstract',
        title: "Opposition",
        description: "Vectors can cancel each other out.",
        targetVector: { x: 2, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "What if vectors point in opposite directions?",
            "Try (5,0,0) + (-3,0,0) = (2,0,0).",
            "Subtraction is just adding a negative."
        ],
        vectorConcept: {
            name: "Vector Subtraction",
            briefDescription: "Subtracting vectors is adding the negative: a - b = a + (-b)."
        }
    },
    {
        id: 9,
        module: 'abstract',
        title: "Diagonal Descent",
        description: "Navigate to a point below the grid plane.",
        targetVector: { x: 3, y: -2, z: 4 },
        allowedVectors: 2,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Negative Y means below the ground.",
            "Split the work between your vectors.",
            "One could handle XZ, another the Y."
        ],
        vectorConcept: {
            name: "Multi-Axis Navigation",
            briefDescription: "Complex targets require combining vectors across multiple dimensions."
        }
    },
    {
        id: 10,
        module: 'abstract',
        title: "Precision Required",
        description: "Tighter tolerance demands more careful control.",
        targetVector: { x: 4.5, y: 2.5, z: 1.5 },
        allowedVectors: 2,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "Hold Shift for precision mode (slower movement).",
            "Non-integer targets require fine tuning.",
            "Take your time with the final adjustments."
        ],
        vectorConcept: {
            name: "Precision Control",
            briefDescription: "Real-world applications often require high-precision vector calculations."
        }
    },
    {
        id: 11,
        module: 'abstract',
        title: "Triple Threat",
        description: "Three vectors, three dimensions, one target.",
        targetVector: { x: 5, y: 4, z: 3 },
        allowedVectors: 3,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "Could each vector handle one axis?",
            "Or combine them in creative ways.",
            "There are many solutions!"
        ],
        vectorConcept: {
            name: "Multiple Solutions",
            briefDescription: "Vector problems often have multiple valid solutions reaching the same result."
        }
    },
    {
        id: 12,
        module: 'abstract',
        title: "The Zigzag",
        description: "Take an indirect path to your destination.",
        targetVector: { x: 2, y: 0, z: 2 },
        allowedVectors: 3,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "The shortest path isn't required.",
            "Vectors can overshoot then correct.",
            "Try (4,0,0) + (-2,0,2) + (0,0,0)."
        ],
        vectorConcept: {
            name: "Path Independence",
            briefDescription: "Vector addition is commutative - the order doesn't change the result."
        }
    },
    {
        id: 13,
        module: 'abstract',
        title: "Symmetric Beauty",
        description: "Find a balanced solution to this symmetric target.",
        targetVector: { x: 4, y: 4, z: 4 },
        allowedVectors: 2,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "The target lies on the space diagonal.",
            "Could two vectors split this evenly?",
            "Each could be (2,2,2)."
        ],
        vectorConcept: {
            name: "Vector Symmetry",
            briefDescription: "Symmetric vectors can be split into equal parts while maintaining direction."
        }
    },
    {
        id: 14,
        module: 'abstract',
        title: "Corner Case",
        description: "Navigate to the far corner of the visible space.",
        targetVector: { x: 6, y: 3, z: -4 },
        allowedVectors: 3,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "Negative Z is behind the origin.",
            "Use all three vectors wisely.",
            "Consider the geometry of the space."
        ],
        vectorConcept: {
            name: "Spatial Reasoning",
            briefDescription: "Understanding 3D coordinate systems is key to effective vector manipulation."
        }
    },
    {
        id: 15,
        module: 'abstract',
        title: "Master Challenge",
        description: "Prove your vector mastery with tight constraints.",
        targetVector: { x: 5, y: -3, z: 4 },
        allowedVectors: 2,
        tolerance: 0.15,
        maxAttempts: 5,
        hints: [
            "Very tight tolerance - use Shift mode!",
            "Plan your approach before executing.",
            "You've learned all the skills needed."
        ],
        vectorConcept: {
            name: "Vector Mastery",
            briefDescription: "Combining all vector concepts: magnitude, direction, addition, and precision."
        }
    }
];
