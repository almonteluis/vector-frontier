import type { BridgeLevelConfig } from '../types';

// Standard materials available across levels
const STANDARD_MATERIALS = [
    {
        id: 'steel',
        name: 'Steel Beam',
        maxTension: 100,
        maxCompression: 80,
        costPerUnit: 10,
        color: '#4A5568'
    },
    {
        id: 'aluminum',
        name: 'Aluminum',
        maxTension: 60,
        maxCompression: 50,
        costPerUnit: 6,
        color: '#A0AEC0'
    },
    {
        id: 'cable',
        name: 'Steel Cable',
        maxTension: 150,
        maxCompression: 0, // Cables can't handle compression
        costPerUnit: 8,
        color: '#2D3748'
    },
    {
        id: 'wood',
        name: 'Timber',
        maxTension: 30,
        maxCompression: 40,
        costPerUnit: 3,
        color: '#8B4513'
    }
];

export const BRIDGE_LEVELS: BridgeLevelConfig[] = [
    {
        id: 201,
        module: 'bridge',
        title: "Simple Support",
        description: "Balance a single point load. The sum of forces must equal zero.",
        targetVector: { x: 0, y: 0, z: 0 }, // Equilibrium target
        allowedVectors: 2, // Support reactions
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "A 10N load pushes down at the center.",
            "Two supports must push up to balance.",
            "Total up force = total down force."
        ],
        loads: [
            { position: { x: 0, y: 5, z: 0 }, force: { x: 0, y: -10, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[3]],
        budget: 100,
        safetyFactor: 1.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Static Equilibrium",
            briefDescription: "When all forces sum to zero, a structure remains stationary and stable."
        }
    },
    {
        id: 202,
        module: 'bridge',
        title: "Off-Center Load",
        description: "The load isn't centered. Supports will have different reactions.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.5,
        maxAttempts: 5,
        hints: [
            "Load is closer to the left support.",
            "Left support carries more of the load.",
            "Moments must also balance around any point."
        ],
        loads: [
            { position: { x: -2, y: 5, z: 0 }, force: { x: 0, y: -15, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0]],
        budget: 120,
        safetyFactor: 1.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Moment Balance",
            briefDescription: "Rotational equilibrium requires balancing moments (torques) about any point."
        }
    },
    {
        id: 203,
        module: 'bridge',
        title: "Multiple Loads",
        description: "Two loads on the bridge. Find the support reactions.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Two loads: 8N and 12N at different positions.",
            "Total load = 20N distributed between supports.",
            "Position affects how load is shared."
        ],
        loads: [
            { position: { x: -3, y: 5, z: 0 }, force: { x: 0, y: -8, z: 0 } },
            { position: { x: 2, y: 5, z: 0 }, force: { x: 0, y: -12, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[1]],
        budget: 150,
        safetyFactor: 1.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Superposition",
            briefDescription: "Multiple loads can be analyzed by summing their individual effects."
        }
    },
    {
        id: 204,
        module: 'bridge',
        title: "Horizontal Forces",
        description: "Wind creates horizontal forces. Account for lateral equilibrium.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Vertical load + horizontal wind force.",
            "One support must resist horizontal force.",
            "Think about friction or fixed supports."
        ],
        loads: [
            { position: { x: 0, y: 5, z: 0 }, force: { x: 0, y: -10, z: 0 } },
            { position: { x: 0, y: 3, z: 0 }, force: { x: 3, y: 0, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0]],
        budget: 140,
        safetyFactor: 1.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "2D Force Equilibrium",
            briefDescription: "Both horizontal and vertical force components must independently sum to zero."
        }
    },
    {
        id: 205,
        module: 'bridge',
        title: "Budget Constraint",
        description: "Limited budget. Choose cheaper materials where possible.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.4,
        maxAttempts: 5,
        hints: [
            "Steel is strong but expensive.",
            "Timber works for lower loads.",
            "Stay under budget while maintaining safety."
        ],
        loads: [
            { position: { x: 0, y: 5, z: 0 }, force: { x: 0, y: -8, z: 0 } }
        ],
        materials: STANDARD_MATERIALS,
        budget: 50,
        safetyFactor: 1.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Material Selection",
            briefDescription: "Choosing materials based on force requirements and cost constraints."
        }
    },
    {
        id: 206,
        module: 'bridge',
        title: "Truss Introduction",
        description: "Internal forces in a simple truss. Balance forces at each joint.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Truss members carry axial forces only.",
            "Tension (pulling) or compression (pushing).",
            "Each joint must be in equilibrium."
        ],
        loads: [
            { position: { x: 0, y: 4, z: 0 }, force: { x: 0, y: -20, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[2]],
        budget: 200,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -4, y: 0, z: 0 }, end: { x: 4, y: 0, z: 0 } },
        vectorConcept: {
            name: "Truss Analysis",
            briefDescription: "Truss members carry only axial forces - tension or compression along their length."
        }
    },
    {
        id: 207,
        module: 'bridge',
        title: "Safety Factor",
        description: "Design for 2x the expected load. Safety matters!",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "Expected load: 15N. Design for 30N.",
            "Safety factor = 2.0 means double strength.",
            "Real bridges use factors of 1.5-3.0."
        ],
        loads: [
            { position: { x: 1, y: 5, z: 0 }, force: { x: 0, y: -15, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[1]],
        budget: 180,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Factor of Safety",
            briefDescription: "Designing structures to withstand loads greater than expected for reliability."
        }
    },
    {
        id: 208,
        module: 'bridge',
        title: "Moving Load",
        description: "A truck crosses the bridge. Design for worst-case position.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.35,
        maxAttempts: 5,
        hints: [
            "The truck moves across the span.",
            "Maximum moment occurs at center.",
            "Design supports for peak loading."
        ],
        loads: [
            {
                position: { x: 0, y: 5, z: 0 },
                force: { x: 0, y: -25, z: 0 },
                isDynamic: true,
                pattern: 'constant'
            }
        ],
        materials: [STANDARD_MATERIALS[0]],
        budget: 200,
        safetyFactor: 1.8,
        bridgeSpan: { start: { x: -6, y: 0, z: 0 }, end: { x: 6, y: 0, z: 0 } },
        vectorConcept: {
            name: "Moving Load Analysis",
            briefDescription: "Dynamic loads change position - design must handle the worst-case scenario."
        }
    },
    {
        id: 209,
        module: 'bridge',
        title: "Cable Stay",
        description: "Use cables to support the deck. Cables only work in tension!",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Cables can only pull, not push.",
            "The tower provides compression resistance.",
            "Angle affects force magnitude."
        ],
        loads: [
            { position: { x: -3, y: 2, z: 0 }, force: { x: 0, y: -12, z: 0 } },
            { position: { x: 3, y: 2, z: 0 }, force: { x: 0, y: -12, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[2]],
        budget: 250,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -6, y: 0, z: 0 }, end: { x: 6, y: 0, z: 0 } },
        vectorConcept: {
            name: "Tension-Only Members",
            briefDescription: "Cables can only resist pulling forces - they buckle under compression."
        }
    },
    {
        id: 210,
        module: 'bridge',
        title: "Three-Span Bridge",
        description: "A longer bridge with three supports. Distribute the loads.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Middle support carries more than edges.",
            "Continuous beam analysis principles.",
            "Each span affects its neighbors."
        ],
        loads: [
            { position: { x: -4, y: 5, z: 0 }, force: { x: 0, y: -10, z: 0 } },
            { position: { x: 0, y: 5, z: 0 }, force: { x: 0, y: -15, z: 0 } },
            { position: { x: 4, y: 5, z: 0 }, force: { x: 0, y: -10, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[1]],
        budget: 300,
        safetyFactor: 1.8,
        bridgeSpan: { start: { x: -8, y: 0, z: 0 }, end: { x: 8, y: 0, z: 0 } },
        vectorConcept: {
            name: "Continuous Spans",
            briefDescription: "Multi-span bridges distribute loads between supports based on position."
        }
    },
    {
        id: 211,
        module: 'bridge',
        title: "Earthquake Zone",
        description: "Horizontal seismic forces require special attention.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.3,
        maxAttempts: 5,
        hints: [
            "Seismic force acts horizontally.",
            "Both vertical and horizontal equilibrium needed.",
            "Supports must be braced against lateral movement."
        ],
        loads: [
            { position: { x: 0, y: 5, z: 0 }, force: { x: 0, y: -20, z: 0 } },
            { position: { x: 0, y: 3, z: 0 }, force: { x: 8, y: 0, z: 0 }, isDynamic: true, pattern: 'oscillating' }
        ],
        materials: STANDARD_MATERIALS,
        budget: 280,
        safetyFactor: 2.5,
        bridgeSpan: { start: { x: -5, y: 0, z: 0 }, end: { x: 5, y: 0, z: 0 } },
        vectorConcept: {
            name: "Seismic Loading",
            briefDescription: "Earthquakes create dynamic lateral forces requiring special design considerations."
        }
    },
    {
        id: 212,
        module: 'bridge',
        title: "Optimal Design",
        description: "Minimize cost while meeting all safety requirements.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Use the right material for each member.",
            "Cables for tension, beams for compression.",
            "Optimize material selection for cost."
        ],
        loads: [
            { position: { x: -2, y: 5, z: 0 }, force: { x: 0, y: -15, z: 0 } },
            { position: { x: 2, y: 5, z: 0 }, force: { x: 0, y: -15, z: 0 } }
        ],
        materials: STANDARD_MATERIALS,
        budget: 150,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -6, y: 0, z: 0 }, end: { x: 6, y: 0, z: 0 } },
        vectorConcept: {
            name: "Design Optimization",
            briefDescription: "Finding the most cost-effective solution that meets all structural requirements."
        }
    },
    {
        id: 213,
        module: 'bridge',
        title: "River Crossing",
        description: "Design a bridge over a wide river with limited support options.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 2,
        tolerance: 0.25,
        maxAttempts: 5,
        hints: [
            "Long span = higher forces in supports.",
            "Consider using cables for efficiency.",
            "Moment increases with span squared."
        ],
        loads: [
            { position: { x: 0, y: 6, z: 0 }, force: { x: 0, y: -30, z: 0 } }
        ],
        materials: [STANDARD_MATERIALS[0], STANDARD_MATERIALS[2]],
        budget: 350,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -10, y: 0, z: 0 }, end: { x: 10, y: 0, z: 0 } },
        vectorConcept: {
            name: "Long-Span Design",
            briefDescription: "Longer spans dramatically increase internal forces and design complexity."
        }
    },
    {
        id: 214,
        module: 'bridge',
        title: "Heavy Traffic",
        description: "Multiple heavy vehicles crossing simultaneously.",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.2,
        maxAttempts: 5,
        hints: [
            "Four point loads representing vehicles.",
            "Total load is significant.",
            "Distribute reactions appropriately."
        ],
        loads: [
            { position: { x: -6, y: 5, z: 0 }, force: { x: 0, y: -12, z: 0 } },
            { position: { x: -2, y: 5, z: 0 }, force: { x: 0, y: -18, z: 0 } },
            { position: { x: 2, y: 5, z: 0 }, force: { x: 0, y: -18, z: 0 } },
            { position: { x: 6, y: 5, z: 0 }, force: { x: 0, y: -12, z: 0 } }
        ],
        materials: STANDARD_MATERIALS,
        budget: 400,
        safetyFactor: 2.0,
        bridgeSpan: { start: { x: -8, y: 0, z: 0 }, end: { x: 8, y: 0, z: 0 } },
        vectorConcept: {
            name: "Distributed Loading",
            briefDescription: "Multiple loads create complex force distributions requiring careful analysis."
        }
    },
    {
        id: 215,
        module: 'bridge',
        title: "Master Engineer",
        description: "Complex loading, tight budget, high safety factor. Prove your skills!",
        targetVector: { x: 0, y: 0, z: 0 },
        allowedVectors: 3,
        tolerance: 0.15,
        maxAttempts: 5,
        hints: [
            "This is a challenging optimization problem.",
            "Every material choice matters.",
            "Balance cost, safety, and performance."
        ],
        loads: [
            { position: { x: -4, y: 6, z: 0 }, force: { x: 0, y: -20, z: 0 } },
            { position: { x: 0, y: 6, z: 0 }, force: { x: 0, y: -25, z: 0 } },
            { position: { x: 4, y: 6, z: 0 }, force: { x: 0, y: -20, z: 0 } },
            { position: { x: 0, y: 4, z: 0 }, force: { x: 5, y: 0, z: 0 } }
        ],
        materials: STANDARD_MATERIALS,
        budget: 300,
        safetyFactor: 2.5,
        bridgeSpan: { start: { x: -8, y: 0, z: 0 }, end: { x: 8, y: 0, z: 0 } },
        vectorConcept: {
            name: "Engineering Mastery",
            briefDescription: "Integrating all structural concepts: equilibrium, safety, materials, and optimization."
        }
    }
];
