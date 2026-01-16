import type { CareerBadge } from '../types';

export const CAREER_BADGES: CareerBadge[] = [
    // ============================================
    // Abstract Module Badges
    // ============================================
    {
        id: 'abstract-beginner',
        name: 'Vector Apprentice',
        description: 'Complete your first 5 abstract puzzles',
        icon: '🎓',
        module: 'abstract',
        tier: 'bronze',
        requirements: { levelsCompleted: 5 }
    },
    {
        id: 'abstract-intermediate',
        name: 'Vector Adept',
        description: 'Earn 25 stars in abstract puzzles',
        icon: '📐',
        module: 'abstract',
        tier: 'silver',
        requirements: { starsEarned: 25 }
    },
    {
        id: 'abstract-master',
        name: 'Vector Master',
        description: 'Perfect 10 abstract puzzles',
        icon: '🏅',
        module: 'abstract',
        tier: 'gold',
        requirements: { perfectLevels: 10 }
    },

    // ============================================
    // Drone Module Badges
    // ============================================
    {
        id: 'drone-rookie',
        name: 'Junior UAV Operator',
        description: 'Complete 5 drone delivery missions',
        icon: '🛸',
        module: 'drone',
        tier: 'bronze',
        requirements: { levelsCompleted: 5 }
    },
    {
        id: 'drone-pilot',
        name: 'Senior UAV Pilot',
        description: 'Earn 25 stars in drone missions',
        icon: '🎖️',
        module: 'drone',
        tier: 'silver',
        requirements: { starsEarned: 25 }
    },
    {
        id: 'drone-master',
        name: 'Flight Operations Director',
        description: 'Perfect 8 drone missions',
        icon: '👨‍✈️',
        module: 'drone',
        tier: 'gold',
        requirements: { perfectLevels: 8 }
    },

    // ============================================
    // Bridge Module Badges
    // ============================================
    {
        id: 'bridge-trainee',
        name: 'Structural Trainee',
        description: 'Design 5 stable bridges',
        icon: '🏗️',
        module: 'bridge',
        tier: 'bronze',
        requirements: { levelsCompleted: 5 }
    },
    {
        id: 'bridge-engineer',
        name: 'Structural Engineer',
        description: 'Earn 25 stars in bridge designs',
        icon: '🌉',
        module: 'bridge',
        tier: 'silver',
        requirements: { starsEarned: 25 }
    },
    {
        id: 'bridge-master',
        name: 'Chief Engineer',
        description: 'Perfect 8 bridge designs',
        icon: '🏆',
        module: 'bridge',
        tier: 'gold',
        requirements: { perfectLevels: 8 }
    },

    // ============================================
    // Robotics Module Badges
    // ============================================
    {
        id: 'robotics-apprentice',
        name: 'Robotics Apprentice',
        description: 'Complete 5 robot arm challenges',
        icon: '🤖',
        module: 'robotics',
        tier: 'bronze',
        requirements: { levelsCompleted: 5 }
    },
    {
        id: 'robotics-technician',
        name: 'Robotics Technician',
        description: 'Earn 25 stars in robotics challenges',
        icon: '⚙️',
        module: 'robotics',
        tier: 'silver',
        requirements: { starsEarned: 25 }
    },
    {
        id: 'robotics-master',
        name: 'Automation Specialist',
        description: 'Perfect 8 robotics challenges',
        icon: '🦾',
        module: 'robotics',
        tier: 'gold',
        requirements: { perfectLevels: 8 }
    },

    // ============================================
    // Cross-Module Badges
    // ============================================
    {
        id: 'explorer',
        name: 'Vector Explorer',
        description: 'Complete at least one level in each module',
        icon: '🗺️',
        module: 'abstract',
        tier: 'bronze',
        requirements: {
            moduleSpecific: {
                abstractLevels: 1,
                droneLevels: 1,
                bridgeLevels: 1,
                roboticsLevels: 1,
            }
        }
    },
    {
        id: 'star-collector',
        name: 'Star Collector',
        description: 'Earn 100 total stars across all modules',
        icon: '⭐',
        module: 'abstract',
        tier: 'gold',
        requirements: { starsEarned: 100 }
    },
];
