import type { DroneLevelConfig } from '../types';

export const DRONE_LEVELS: DroneLevelConfig[] = [
    {
        id: 101,
        module: 'drone',
        title: "Calm Skies",
        description: "Your first delivery mission. No wind today - just fly straight to the target.",
        targetVector: { x: 5, y: 2, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "The delivery point is 5m east and 2m up.",
            "No wind compensation needed today.",
            "Set your thrust vector to match the target."
        ],
        wind: { base: { x: 0, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 5, y: 2, z: 0 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Displacement Vectors",
            briefDescription: "A displacement vector represents the change in position from start to end point."
        }
    },
    {
        id: 102,
        module: 'drone',
        title: "Light Breeze",
        description: "A steady easterly wind. Compensate your thrust to stay on course.",
        targetVector: { x: 5, y: 2, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Wind is pushing you 1m/s to the east (positive X).",
            "Aim slightly west to compensate.",
            "Your effective velocity = thrust + wind."
        ],
        wind: { base: { x: 1, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 5, y: 2, z: 0 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Vector Compensation",
            briefDescription: "Counteracting external forces by adding an opposing vector component."
        }
    },
    {
        id: 103,
        module: 'drone',
        title: "Cross Wind",
        description: "The wind is blowing from the north. Account for lateral drift.",
        targetVector: { x: 4, y: 3, z: 0 },
        allowedVectors: 1,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Wind: 2m/s from north (negative Z direction).",
            "You'll drift south without compensation.",
            "Crab angle: aim into the wind."
        ],
        wind: { base: { x: 0, y: 0, z: -2 }, variance: 0 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 4, y: 3, z: 0 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Crab Angle",
            briefDescription: "Angling into crosswinds to maintain a straight ground track - key in aviation."
        }
    },
    {
        id: 104,
        module: 'drone',
        title: "Headwind Challenge",
        description: "Strong headwind means you need more thrust to reach your target.",
        targetVector: { x: 6, y: 2, z: 0 },
        allowedVectors: 1,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "3m/s headwind (negative X direction).",
            "You need extra thrust to overcome it.",
            "Watch your battery - more thrust = more drain."
        ],
        wind: { base: { x: -3, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 150, drainPerUnit: 8 },
        deliveryTargets: [{ x: 6, y: 2, z: 0 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Resultant Velocity",
            briefDescription: "The actual velocity is the sum of thrust and environmental forces like wind."
        }
    },
    {
        id: 105,
        module: 'drone',
        title: "Diagonal Drift",
        description: "Wind from the southwest creates diagonal compensation requirements.",
        targetVector: { x: 5, y: 3, z: 4 },
        allowedVectors: 1,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Wind: 2m/s from SW (pushing NE).",
            "Both X and Z need compensation.",
            "Vector addition: thrust + wind = destination."
        ],
        wind: { base: { x: 2, y: 0, z: 2 }, variance: 0 },
        battery: { maxCapacity: 120, drainPerUnit: 6 },
        deliveryTargets: [{ x: 5, y: 3, z: 4 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Multi-Component Wind",
            briefDescription: "Real wind has multiple directional components requiring comprehensive compensation."
        }
    },
    {
        id: 106,
        module: 'drone',
        title: "Battery Management",
        description: "Limited battery means you must find an efficient route.",
        targetVector: { x: 4, y: 2, z: 3 },
        allowedVectors: 1,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Battery is tight - no room for detours.",
            "Direct path is most efficient.",
            "Magnitude directly affects battery drain."
        ],
        wind: { base: { x: 0, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 40, drainPerUnit: 6 },
        deliveryTargets: [{ x: 4, y: 2, z: 3 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Optimal Path",
            briefDescription: "The shortest distance between two points minimizes energy consumption."
        }
    },
    {
        id: 107,
        module: 'drone',
        title: "Multi-Drop Route",
        description: "Two delivery points - plan vectors for both destinations.",
        targetVector: { x: 7, y: 2, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "First stop: (3, 2, 0), Final: (7, 2, 0).",
            "First vector to stop 1, second to stop 2.",
            "Vectors chain tip-to-tail."
        ],
        wind: { base: { x: 0, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 3, y: 2, z: 0 }, { x: 7, y: 2, z: 0 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Waypoint Navigation",
            briefDescription: "Breaking a route into sequential vectors connecting waypoints."
        }
    },
    {
        id: 108,
        module: 'drone',
        title: "Gusty Conditions",
        description: "Variable wind adds uncertainty. The displayed wind is an average.",
        targetVector: { x: 5, y: 2, z: 3 },
        allowedVectors: 1,
        tolerance: 0.6,
        maxAttempts: 5,
        hints: [
            "Wind varies around the base value.",
            "Tolerance is higher to account for gusts.",
            "Aim for the center of acceptable range."
        ],
        wind: { base: { x: 1, y: 0, z: -1 }, variance: 0.5, noiseFrequency: 0.3 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 5, y: 2, z: 3 }],
        weatherEffects: 'rain',
        vectorConcept: {
            name: "Uncertainty & Tolerance",
            briefDescription: "Variable conditions require building margin into vector calculations."
        }
    },
    {
        id: 109,
        module: 'drone',
        title: "High Altitude Drop",
        description: "Climb high to clear obstacles, then descend to target.",
        targetVector: { x: 4, y: 0, z: 4 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Target is at ground level (y=0).",
            "Go up first, then down to destination.",
            "Two-leg route: climb then descend."
        ],
        wind: { base: { x: 0, y: 0.5, z: 0 }, variance: 0 },
        battery: { maxCapacity: 120, drainPerUnit: 6 },
        deliveryTargets: [{ x: 4, y: 0, z: 4 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Vertical Maneuvering",
            briefDescription: "Strategic altitude changes to navigate around obstacles or terrain."
        }
    },
    {
        id: 110,
        module: 'drone',
        title: "Storm Approach",
        description: "Strong, shifting winds require two-vector compensation.",
        targetVector: { x: 6, y: 3, z: 2 },
        allowedVectors: 2,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Base wind: 3m/s with high variance.",
            "Plan for average conditions.",
            "Two vectors give more control."
        ],
        wind: { base: { x: -2, y: 0.5, z: 1 }, variance: 1, noiseFrequency: 0.5 },
        battery: { maxCapacity: 150, drainPerUnit: 7 },
        deliveryTargets: [{ x: 6, y: 3, z: 2 }],
        weatherEffects: 'rain',
        vectorConcept: {
            name: "Course Correction",
            briefDescription: "Using intermediate vectors to adjust trajectory mid-flight."
        }
    },
    {
        id: 111,
        module: 'drone',
        title: "Night Delivery",
        description: "Foggy conditions - trust your instruments, not visual references.",
        targetVector: { x: 5, y: 4, z: -3 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Visibility is low but instruments work.",
            "Focus on the vector components display.",
            "Negative Z is behind starting position."
        ],
        wind: { base: { x: 1, y: 0, z: 0 }, variance: 0.3 },
        battery: { maxCapacity: 130, drainPerUnit: 6 },
        deliveryTargets: [{ x: 5, y: 4, z: -3 }],
        weatherEffects: 'fog',
        vectorConcept: {
            name: "Instrument Navigation",
            briefDescription: "Relying on numerical data when visual references are unavailable."
        }
    },
    {
        id: 112,
        module: 'drone',
        title: "Express Delivery",
        description: "Time-critical package. Optimize for shortest path under wind.",
        targetVector: { x: 8, y: 2, z: 4 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Tailwind on X-axis helps you!",
            "Use the wind to your advantage.",
            "Less thrust needed = more battery saved."
        ],
        wind: { base: { x: 2, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 100, drainPerUnit: 5 },
        deliveryTargets: [{ x: 8, y: 2, z: 4 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Tailwind Advantage",
            briefDescription: "Environmental forces can assist rather than hinder when properly utilized."
        }
    },
    {
        id: 113,
        module: 'drone',
        title: "Three-Stop Route",
        description: "Multiple deliveries in one flight. Plan your vectors carefully.",
        targetVector: { x: 9, y: 2, z: 3 },
        allowedVectors: 3,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Stops: (3,2,0) → (6,2,2) → (9,2,3).",
            "Each vector goes to next stop.",
            "Total path must stay within battery."
        ],
        wind: { base: { x: 0, y: 0, z: 0 }, variance: 0 },
        battery: { maxCapacity: 140, drainPerUnit: 5 },
        deliveryTargets: [{ x: 3, y: 2, z: 0 }, { x: 6, y: 2, z: 2 }, { x: 9, y: 2, z: 3 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Route Optimization",
            briefDescription: "Planning efficient multi-stop routes using sequential vector chains."
        }
    },
    {
        id: 114,
        module: 'drone',
        title: "Mountain Pass",
        description: "Navigate through a mountain pass with variable altitude winds.",
        targetVector: { x: 5, y: 5, z: 5 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Updraft at altitude (positive Y wind).",
            "The updraft helps your climb.",
            "Factor wind into your calculations."
        ],
        wind: { base: { x: 0, y: 1.5, z: -1 }, variance: 0.5 },
        battery: { maxCapacity: 160, drainPerUnit: 7 },
        deliveryTargets: [{ x: 5, y: 5, z: 5 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Updraft Utilization",
            briefDescription: "Vertical wind components can reduce energy needed for climbing."
        }
    },
    {
        id: 115,
        module: 'drone',
        title: "Emergency Resupply",
        description: "Critical medical supplies needed. Precision and efficiency required.",
        targetVector: { x: 7, y: 3, z: -4 },
        allowedVectors: 2,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Tight tolerance - lives depend on accuracy.",
            "Strong crosswind from the north.",
            "Use Shift for precision adjustments."
        ],
        wind: { base: { x: 0, y: 0, z: -2.5 }, variance: 0.3 },
        battery: { maxCapacity: 120, drainPerUnit: 6 },
        deliveryTargets: [{ x: 7, y: 3, z: -4 }],
        weatherEffects: 'clear',
        vectorConcept: {
            name: "Precision Delivery",
            briefDescription: "Critical applications demand exact vector calculations with minimal error."
        }
    }
];
