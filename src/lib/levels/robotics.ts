import type { RoboticsLevelConfig } from '../types';

export const ROBOTICS_LEVELS: RoboticsLevelConfig[] = [
    {
        id: 301,
        module: 'robotics',
        title: "First Joint",
        description: "Control a single joint to reach the target position.",
        targetVector: { x: 4, y: 0, z: 0 },
        allowedVectors: 1, // Represents joint angles conceptually
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "One joint, one segment of length 4.",
            "Rotate to point at the target.",
            "The end effector follows the joint angle."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 4,
                basePosition: { x: 0, y: 0, z: 0 }
            }
        ],
        pickupTarget: { x: 4, y: 0, z: 0 },
        placeTarget: { x: 4, y: 0, z: 0 },
        vectorConcept: {
            name: "Forward Kinematics",
            briefDescription: "Calculating end position from joint angles using vector geometry."
        }
    },
    {
        id: 302,
        module: 'robotics',
        title: "Reach Up",
        description: "Point the arm upward to grab the elevated target.",
        targetVector: { x: 0, y: 4, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Target is directly above the base.",
            "90 degrees from horizontal.",
            "Joint angle represents rotation from X-axis."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 4,
                basePosition: { x: 0, y: 0, z: 0 }
            }
        ],
        pickupTarget: { x: 0, y: 4, z: 0 },
        placeTarget: { x: 0, y: 4, z: 0 },
        vectorConcept: {
            name: "Angular Position",
            briefDescription: "Joint angles determine the direction and reach of robot arm segments."
        }
    },
    {
        id: 303,
        module: 'robotics',
        title: "Two Joints",
        description: "Now you have two joints. Reach a point your first segment can't.",
        targetVector: { x: 5, y: 3, z: 0 },
        allowedVectors: 2,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "First joint: length 3, Second joint: length 3.",
            "Combined reach: 6 units max.",
            "Think about elbow position."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 3
            }
        ],
        pickupTarget: { x: 5, y: 3, z: 0 },
        placeTarget: { x: 5, y: 3, z: 0 },
        vectorConcept: {
            name: "Serial Kinematics",
            briefDescription: "Multi-joint arms add vectors tip-to-tail to reach extended positions."
        }
    },
    {
        id: 304,
        module: 'robotics',
        title: "Joint Limits",
        description: "Joints have physical limits. Work within constraints.",
        targetVector: { x: 4, y: -2, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Target is below the horizontal.",
            "Joint 2 limited to ±90 degrees.",
            "Find a valid configuration."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI / 2,
                maxAngle: Math.PI / 2,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI / 2,
                maxAngle: Math.PI / 2,
                length: 3
            }
        ],
        pickupTarget: { x: 4, y: -2, z: 0 },
        placeTarget: { x: 4, y: -2, z: 0 },
        vectorConcept: {
            name: "Joint Constraints",
            briefDescription: "Physical limits on joint rotation define the robot's reachable workspace."
        }
    },
    {
        id: 305,
        module: 'robotics',
        title: "Pick and Place",
        description: "Pick up an object and place it at a different location.",
        targetVector: { x: -3, y: 2, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "First: reach pickup at (4, 1, 0).",
            "Then: move to place at (-3, 2, 0).",
            "Two separate configurations needed."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.75,
                maxAngle: Math.PI * 0.75,
                length: 3
            }
        ],
        pickupTarget: { x: 4, y: 1, z: 0 },
        placeTarget: { x: -3, y: 2, z: 0 },
        sequence: ['pick', 'move', 'place'],
        vectorConcept: {
            name: "Task Sequencing",
            briefDescription: "Complex tasks require planning multiple arm configurations in sequence."
        }
    },
    {
        id: 306,
        module: 'robotics',
        title: "Three Joints",
        description: "More joints = more flexibility, but more complexity.",
        targetVector: { x: 3, y: 4, z: 0 },
        allowedVectors: 3,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Three short segments of length 2.",
            "Multiple solutions exist.",
            "Start from the base and work outward."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 2,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 2
            },
            {
                id: 'j3',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 2
            }
        ],
        pickupTarget: { x: 3, y: 4, z: 0 },
        placeTarget: { x: 3, y: 4, z: 0 },
        vectorConcept: {
            name: "Redundant Kinematics",
            briefDescription: "Extra joints provide multiple ways to reach the same position."
        }
    },
    {
        id: 307,
        module: 'robotics',
        title: "Avoid Obstacle",
        description: "Reach the target without colliding with the obstacle.",
        targetVector: { x: 4, y: 2, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "There's a box in the direct path.",
            "Go around, not through.",
            "Consider a higher elbow position."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 3
            }
        ],
        pickupTarget: { x: 4, y: 2, z: 0 },
        placeTarget: { x: 4, y: 2, z: 0 },
        obstacles: [
            { position: { x: 2, y: 1, z: 0 }, size: { x: 1, y: 2, z: 1 } }
        ],
        vectorConcept: {
            name: "Collision Avoidance",
            briefDescription: "Planning arm paths that avoid obstacles while reaching the target."
        }
    },
    {
        id: 308,
        module: 'robotics',
        title: "Tight Workspace",
        description: "Navigate through a constrained environment.",
        targetVector: { x: 3, y: 3, z: 0 },
        allowedVectors: 3,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Multiple obstacles define the workspace.",
            "Plan your arm configuration carefully.",
            "The path matters, not just the endpoint."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: 0,
                maxAngle: Math.PI,
                length: 2,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.6,
                maxAngle: Math.PI * 0.6,
                length: 2
            },
            {
                id: 'j3',
                type: 'revolute',
                minAngle: -Math.PI * 0.6,
                maxAngle: Math.PI * 0.6,
                length: 2
            }
        ],
        pickupTarget: { x: 3, y: 3, z: 0 },
        placeTarget: { x: 3, y: 3, z: 0 },
        obstacles: [
            { position: { x: 1, y: 2, z: 0 }, size: { x: 0.5, y: 1, z: 1 } },
            { position: { x: 2, y: 0.5, z: 0 }, size: { x: 1.5, y: 0.5, z: 1 } }
        ],
        vectorConcept: {
            name: "Workspace Analysis",
            briefDescription: "Understanding the reachable space considering obstacles and joint limits."
        }
    },
    {
        id: 309,
        module: 'robotics',
        title: "Assembly Line",
        description: "Pick from one bin, assemble at station, place in output.",
        targetVector: { x: -4, y: 1, z: 0 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Three positions: input, assembly, output.",
            "Program the sequence of movements.",
            "Each position requires different configuration."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.75,
                maxAngle: Math.PI * 0.75,
                length: 3
            }
        ],
        pickupTarget: { x: 4, y: 1, z: 0 },
        placeTarget: { x: -4, y: 1, z: 0 },
        sequence: ['pick', 'move', 'place'],
        vectorConcept: {
            name: "Motion Programming",
            briefDescription: "Defining repeatable motion sequences for automated manufacturing tasks."
        }
    },
    {
        id: 310,
        module: 'robotics',
        title: "Precision Assembly",
        description: "High-precision placement required. Tight tolerances.",
        targetVector: { x: 3.5, y: 2.5, z: 0 },
        allowedVectors: 2,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Use Shift for precision control.",
            "Small angle adjustments matter.",
            "Verify position before confirming."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 2.5
            }
        ],
        pickupTarget: { x: 3.5, y: 2.5, z: 0 },
        placeTarget: { x: 3.5, y: 2.5, z: 0 },
        precisionRequired: 0.25,
        vectorConcept: {
            name: "Precision Positioning",
            briefDescription: "Fine control of joint angles for exact end effector placement."
        }
    },
    {
        id: 311,
        module: 'robotics',
        title: "Speed Challenge",
        description: "Minimize total joint movement for faster operation.",
        targetVector: { x: 4, y: 3, z: 0 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Smaller movements = faster cycles.",
            "Find the most efficient configuration.",
            "Consider which joint to use more."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 3
            }
        ],
        pickupTarget: { x: 4, y: 3, z: 0 },
        placeTarget: { x: 4, y: 3, z: 0 },
        speedLimit: 2,
        vectorConcept: {
            name: "Cycle Time Optimization",
            briefDescription: "Minimizing joint travel reduces operation time in repetitive tasks."
        }
    },
    {
        id: 312,
        module: 'robotics',
        title: "Sorting Task",
        description: "Move items between multiple locations.",
        targetVector: { x: 0, y: 5, z: 0 },
        allowedVectors: 3,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Multiple pick and place operations.",
            "Plan an efficient route.",
            "Consider arm reach at each position."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 2.5,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.75,
                maxAngle: Math.PI * 0.75,
                length: 2
            },
            {
                id: 'j3',
                type: 'revolute',
                minAngle: -Math.PI * 0.75,
                maxAngle: Math.PI * 0.75,
                length: 1.5
            }
        ],
        pickupTarget: { x: 4, y: 2, z: 0 },
        placeTarget: { x: 0, y: 5, z: 0 },
        sequence: ['pick', 'move', 'place'],
        vectorConcept: {
            name: "Multi-Target Planning",
            briefDescription: "Coordinating arm movements to handle multiple objects efficiently."
        }
    },
    {
        id: 313,
        module: 'robotics',
        title: "Extended Reach",
        description: "Target is at maximum reach. Find the configuration.",
        targetVector: { x: 5.5, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Total arm length: 3 + 3 = 6 units.",
            "Target at 5.5 - need full extension.",
            "Both segments nearly aligned."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI / 4,
                maxAngle: Math.PI / 4,
                length: 3,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI / 3,
                maxAngle: Math.PI / 3,
                length: 3
            }
        ],
        pickupTarget: { x: 5.5, y: 0, z: 0 },
        placeTarget: { x: 5.5, y: 0, z: 0 },
        vectorConcept: {
            name: "Reach Envelope",
            briefDescription: "The boundary of all positions reachable by the robot arm."
        }
    },
    {
        id: 314,
        module: 'robotics',
        title: "Complex Path",
        description: "Navigate around obstacles to complete the task.",
        targetVector: { x: -3, y: 3, z: 0 },
        allowedVectors: 3,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Pickup at (3, 1), place at (-3, 3).",
            "Obstacles block the direct path.",
            "Plan intermediate positions."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI,
                maxAngle: Math.PI,
                length: 2.5,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 2
            },
            {
                id: 'j3',
                type: 'revolute',
                minAngle: -Math.PI * 0.8,
                maxAngle: Math.PI * 0.8,
                length: 1.5
            }
        ],
        pickupTarget: { x: 3, y: 1, z: 0 },
        placeTarget: { x: -3, y: 3, z: 0 },
        obstacles: [
            { position: { x: 0, y: 2, z: 0 }, size: { x: 2, y: 1, z: 1 } },
            { position: { x: -1, y: 0.5, z: 0 }, size: { x: 1, y: 1, z: 1 } }
        ],
        sequence: ['pick', 'move', 'place'],
        vectorConcept: {
            name: "Path Planning",
            briefDescription: "Finding collision-free paths through complex environments."
        }
    },
    {
        id: 315,
        module: 'robotics',
        title: "Master Programmer",
        description: "Complex multi-step assembly with tight constraints.",
        targetVector: { x: -4, y: 4, z: 0 },
        allowedVectors: 3,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "This requires all your skills.",
            "Plan carefully before execution.",
            "Consider workspace limitations."
        ],
        joints: [
            {
                id: 'j1',
                type: 'revolute',
                minAngle: -Math.PI * 0.9,
                maxAngle: Math.PI * 0.9,
                length: 2.5,
                basePosition: { x: 0, y: 0, z: 0 }
            },
            {
                id: 'j2',
                type: 'revolute',
                minAngle: -Math.PI * 0.7,
                maxAngle: Math.PI * 0.7,
                length: 2
            },
            {
                id: 'j3',
                type: 'revolute',
                minAngle: -Math.PI * 0.7,
                maxAngle: Math.PI * 0.7,
                length: 2
            }
        ],
        pickupTarget: { x: 4, y: 2, z: 0 },
        placeTarget: { x: -4, y: 4, z: 0 },
        obstacles: [
            { position: { x: 2, y: 3, z: 0 }, size: { x: 1, y: 1.5, z: 1 } },
            { position: { x: -2, y: 1, z: 0 }, size: { x: 1.5, y: 1, z: 1 } }
        ],
        sequence: ['pick', 'move', 'place'],
        precisionRequired: 0.2,
        vectorConcept: {
            name: "Robotics Mastery",
            briefDescription: "Integrating kinematics, path planning, and precision for complex automation."
        }
    }
];
