# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vector Voyage** (vector-frontier) is a feature-complete 3D educational puzzle game teaching vector mathematics through interactive gameplay. Players manipulate vectors using keyboard controls across four distinct learning modules, earning badges and stars as they progress through 64 levels.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + Vite production build → dist/index.html (single file)
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Architecture Overview

### Tech Stack
- **React 18 + TypeScript** - UI framework with strict type safety
- **Vite** - Build tool with hot module replacement
- **Three.js** - 3D rendering via @react-three/fiber and @react-three/drei
- **Zustand** - State management with localStorage persistence
- **Tailwind CSS** - Utility-first styling with JetBrains Mono font
- **vite-plugin-singlefile** - Compiles to single offline HTML file

### Game Modules (4 Total)
1. **Abstract** (15 levels) - Pure vector mathematics, always unlocked
2. **Drone Delivery** (15 levels) - Wind physics and battery management, unlocks after Abstract level 5
3. **Bridge Engineering** (19 levels) - Structural equilibrium and material budgeting, unlocks after Abstract level 10
4. **Robotics Assembly** (15 levels) - Forward kinematics and joint control, unlocks after Abstract level 15

### Application Screens
```
Main Menu (4 module cards with progress)
    ├→ Level Selector (hexagonal grid + Mission Control panel)
    │   └→ Game Screen (3D scene + HUD)
    │       └→ Back to Level Selector
    └→ Career Dashboard (badges, progress gauges, achievements)
        └→ Back to Main Menu
```

## Directory Structure

```
src/
├── components/
│   ├── applications/          # Module-specific 3D scenes
│   │   ├── drone/            # Wind, trajectories, delivery targets
│   │   ├── bridge/           # Spans, loads, support reactions
│   │   └── robotics/         # Robot arms, kinematics, obstacles
│   ├── game/                 # Core game components
│   │   ├── Scene.tsx         # Scene router (selects module scene)
│   │   ├── AbstractScene.tsx # Basic vector puzzle scene
│   │   ├── BaseScene.tsx     # Shared Three.js setup
│   │   └── VectorArrow.tsx   # 3D arrow visualization
│   ├── ui/                   # User interface components
│   │   ├── MainMenu.tsx      # Module selection
│   │   ├── LevelSelector.tsx # Hexagonal level grid
│   │   ├── CareerDashboard.tsx # Badges and progress
│   │   ├── GameUI.tsx        # In-game HUD
│   │   └── (dashboard components) # Hexagons, gauges, tooltips, etc.
│   └── ErrorBoundary.tsx     # Error handling
├── hooks/
│   └── useKeyboardControls.ts # Real-time vector manipulation
├── lib/
│   ├── career/
│   │   └── badges.ts         # 16 badge definitions (4 per module)
│   ├── levels/
│   │   ├── index.ts          # Level registry and utilities
│   │   ├── abstract.ts       # 15 pure vector levels
│   │   ├── drone.ts          # 15 drone delivery levels
│   │   ├── bridge.ts         # 19 bridge engineering levels
│   │   └── robotics.ts       # 15 robotics assembly levels
│   ├── theme/
│   │   └── moduleTheme.ts    # Colors, icons, gradients per module
│   └── types.ts              # TypeScript interfaces
├── store/
│   └── gameStore.ts          # Zustand store (all game state)
├── App.tsx                   # Main app router
├── main.tsx                  # React entry point
└── index.css                 # Tailwind + global styles
```

## State Management (gameStore.ts)

**Zustand store with localStorage persistence** manages all application state:

### Navigation State
- `currentScreen`: ScreenType - Current screen ('menu' | 'game' | 'levelSelect' | 'career')
- `activeModule`: GameModule - Current module ('abstract' | 'drone' | 'bridge' | 'robotics')
- `setScreen()`, `setActiveModule()` - Navigation actions

### Career System
- `careerProgress`: Tracks stars, badges, level completions per module
- `moduleUnlocks`: Boolean flags for module availability (based on abstract progress)
- `earnedBadges`: Array of earned badge IDs
- `unlockNextLevel(stars)` - Updates progress after level completion

### Game Session State
- `currentLevelIndex`, `currentLevel` - Current puzzle configuration
- `vectors`: Array of VectorData - Player-controlled vectors
- `selectedVectorId` - Currently selected vector for editing
- `attemptsDisplay` - Remaining attempts
- `isGameWon`, `isPlaying` - Game state flags
- `bestErrorThisLevel` - Tracks improvement for "near miss" feedback

### Module-Specific State
- **Drone**: `droneState` - Wind, battery, trajectory, deliveries
- **Bridge**: `bridgeState` - Placed members, loads, cost, equilibrium error
- **Robotics**: `roboticsState` - Joint angles, end effector position, sequence step

### Key Actions
- `loadLevel(index)` - Initialize level from config
- `nextLevel()` - Advance to next level
- `resetLevel()` - Restart current level
- `selectVector(id)` - Change selected vector
- `updateVector(id, updates)` - Modify vector properties
- `submitResult()` - Check win condition (routes to module-specific logic)
- Module-specific actions: `simulateWind()`, `updateJointAngle()`, etc.

## Level System

### Level Configuration (64 total levels)

**Common Properties (BaseLevelConfig)**
```typescript
{
  title: string              // Level name
  description: string        // Instructions/objective
  targetVector: Vector3      // Goal to match
  allowedVectors: number     // Number of player vectors
  tolerance: number          // Acceptable error margin
  maxAttempts: number        // Attempts allowed
  hints: string[]            // Educational hints
  vectorConcept: {           // Concept explanation
    name: string
    description: string
  }
  gridConfig?: {             // Optional grid settings
    size: number
    divisions: number
  }
}
```

**Module-Specific Extensions**

1. **AbstractLevelConfig** - Pure vector math (src/lib/levels/abstract.ts:1)
   - Just the base config, no extensions

2. **DroneLevelConfig** - Wind and battery physics (src/lib/levels/drone.ts:1)
   ```typescript
   {
     wind: { baseVelocity, variance, noiseFrequency }
     battery: { maxCapacity, drainPerUnitDistance }
     deliveryTargets: Vector3[]
     obstacles?: Obstacle[]
     movingTargets?: MovingTarget[]
     weatherEffects?: WeatherEffect
   }
   ```

3. **BridgeLevelConfig** - Structural equilibrium (src/lib/levels/bridge.ts:1)
   ```typescript
   {
     loads: Array<{ position, force, isDynamic?, pattern? }>
     materials: Array<{ name, maxTension, maxCompression, costPerUnit }>
     budget: number
     safetyFactor: number
     bridgeSpan: { start, end }
   }
   ```

4. **RoboticsLevelConfig** - Forward kinematics (src/lib/levels/robotics.ts:1)
   ```typescript
   {
     joints: Array<{ id, type, angleMin, angleMax, length }>
     pickupTarget: Vector3
     placeTarget: Vector3
     obstacles?: Obstacle[]
     sequence: Array<'pick' | 'place' | 'move'>
   }
   ```

### Module Unlocking
- Abstract: Always unlocked
- Drone: Unlocks after Abstract level 5
- Bridge: Unlocks after Abstract level 10
- Robotics: Unlocks after Abstract level 15

## Component Architecture

### 3D Scene Components (Three.js)

**Base Scene Setup** (src/components/game/BaseScene.tsx:1)
- OrbitControls for camera
- Directional and ambient lighting
- Grid helper (configurable size)
- Origin marker (small sphere at 0,0,0)

**Scene Router** (src/components/game/Scene.tsx:1)
- Selects appropriate scene based on `activeModule`
- Routes to AbstractScene, DroneScene, BridgeScene, or RoboticsScene

**Abstract Scene** (src/components/game/AbstractScene.tsx:1)
- Renders target vector (semi-transparent golden arrow)
- Renders player vectors (colored arrows)
- Uses BaseScene for setup

**Vector Arrow** (src/components/game/VectorArrow.tsx:1)
- 3D cylinder (shaft) + cone (tip)
- Click handling for selection
- Visual highlighting when selected
- Quaternion-based orientation from vector components

**Module Scenes**
- **DroneScene** (src/components/applications/drone/DroneScene.tsx:1)
  - Wind particle visualization
  - Trajectory prediction line
  - Delivery target markers (animated toruses)
  - Battery and wind info display

- **BridgeScene** (src/components/applications/bridge/BridgeScene.tsx:1)
  - Bridge span with pillars
  - Load markers (force vectors)
  - Support reaction visualizations
  - Cost and equilibrium displays

- **RoboticsScene** (src/components/applications/robotics/RoboticsScene.tsx:1)
  - Robot arm segments (forward kinematics)
  - Joint rotation controls
  - Target markers (pickup/place)
  - Workspace obstacles

### UI Components

**Navigation**
- **MainMenu** (src/components/ui/MainMenu.tsx:1) - 4 module cards with progress/lock indicators
- **LevelSelector** (src/components/ui/LevelSelector.tsx:1) - Hexagonal level grid + Mission Control panel
- **CareerDashboard** (src/components/ui/CareerDashboard.tsx:1) - Badges, progress gauges, filtering

**In-Game**
- **GameUI** (src/components/ui/GameUI.tsx:1) - HUD showing:
  - Level title and description
  - Vector component displays (X, Y, Z)
  - Attempts remaining
  - Action buttons (Submit, Reset, Next Level)
  - Feedback messages (success, near miss, failure)

**Dashboard Components** (HUD-style design)
- **HexagonalLevelCell** - Memoized hexagon button with stars, lock states
- **MissionControlPanel** - Radar gauge, stats, coordinates, objective preview
- **CircularProgressGauge** - SVG circular progress indicator
- **TacticalBackground** - Grid/topographic/circuit pattern backgrounds
- **MissionBriefingTooltip** - Hover tooltip with level details
- **ModuleAchievementCard** - Badge display with tier styling
- **ModuleFilterBar** - Filter badges by module (keyboard accessible)

## Game Logic and Controls

### Keyboard Controls (src/hooks/useKeyboardControls.ts:1)

Real-time vector manipulation via Three.js useFrame hook:

| Key | Action | Details |
|-----|--------|---------|
| **W** | Increase magnitude | Scales vector length |
| **S** | Decrease magnitude | Scales vector length |
| **A** | Rotate left (Yaw) | Y-axis rotation |
| **D** | Rotate right (Yaw) | Y-axis rotation |
| **Q** | Rotate up (Pitch) | X-axis rotation |
| **E** | Rotate down (Pitch) | X-axis rotation |
| **R** | Roll counterclockwise | Z-axis rotation |
| **F** | Roll clockwise | Z-axis rotation |
| **Shift** | Precision mode | 0.25x speed |
| **Tab** | Cycle vectors | Select next vector |
| **Enter** | Submit result | Check win condition |

### Vector Mathematics (src/store/gameStore.ts:1)

```typescript
vectorAdd(v1: Vector3, v2: Vector3): Vector3
  // Returns { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }

vectorSub(v1: Vector3, v2: Vector3): Vector3
  // Returns { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }

magnitude(v: Vector3): number
  // Returns Math.sqrt(v.x² + v.y² + v.z²)
```

### Module-Specific Submission Logic

**Abstract** (src/store/gameStore.ts:submitAbstractResult)
1. Sum all player vectors
2. Calculate error vector (resultant - target)
3. Check if magnitude(error) ≤ tolerance
4. Award stars based on attempts remaining

**Drone** (src/store/gameStore.ts:submitDroneResult)
1. Sum thrust vectors + wind force → trajectory
2. Check distance to delivery target ≤ tolerance
3. Validate battery: magnitude(thrust) × drainRate ≤ maxCapacity
4. Track deliveries completed

**Bridge** (src/store/gameStore.ts:submitBridgeResult)
1. Sum support reactions + applied loads → net force
2. Check equilibrium: magnitude(net force) ≤ tolerance
3. Validate budget: total cost ≤ budget limit
4. Check safety factors on all members

**Robotics** (src/store/gameStore.ts:submitRoboticsResult)
1. Forward kinematics: compute end effector from joint angles
2. Check distance to current target ≤ tolerance
3. Validate all joints within angle limits
4. Progress through sequence (pick → move → place)

## Theming System (src/lib/theme/moduleTheme.ts:1)

Module-specific visual constants ensure consistent styling:

```typescript
MODULE_COLORS = {
  abstract: '#EC4899',  // Magenta
  drone: '#06B6D4',     // Cyan
  bridge: '#F59E0B',    // Amber
  robotics: '#84CC16'   // Lime
}

MODULE_ICONS = {
  abstract: '🎯', drone: '🚁', bridge: '🌉', robotics: '🤖'
}

MODULE_GRADIENTS = {
  abstract: 'from-pink-500 to-purple-600',
  drone: 'from-cyan-500 to-blue-600',
  bridge: 'from-amber-500 to-orange-600',
  robotics: 'from-lime-500 to-green-600'
}

TIER_COLORS = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700'
}
```

All components use **JetBrains Mono** monospace font for technical aesthetic.

## Career Badge System (src/lib/career/badges.ts:1)

### Badge Structure
```typescript
interface CareerBadge {
  id: string
  name: string
  description: string
  icon: string  // Emoji
  module: GameModule
  tier: 'bronze' | 'silver' | 'gold'
  requirements: {
    levelsCompleted?: number
    starsEarned?: number
    perfectLevels?: number  // 3 stars per level
    moduleSpecific?: Record<string, number>
  }
}
```

### Badge Tiers (16 total - 4 per module)
- **Bronze**: 5 levels completed (entry-level achievement)
- **Silver**: 25 stars earned (intermediate mastery)
- **Gold**: 8-10 perfect levels (expert mastery)
- **Platinum** (module-specific): Special challenge requirements

### Examples
- "Vector Apprentice" (Abstract Bronze): Complete 5 abstract levels
- "Junior UAV Operator" (Drone Bronze): Complete 5 drone levels
- "Flight Operations Director" (Drone Gold): Achieve perfect score on 8 drone levels
- "Master Bridge Architect" (Bridge Gold): Achieve perfect score on 10 bridge levels

## Data Flow

### Level Loading Sequence
1. User selects level → `gameStore.setScreen('game')` + `gameStore.loadLevel(index)`
2. `loadLevel()` fetches config from `/src/lib/levels/{module}.ts`
3. Store initializes `vectors` array based on `allowedVectors`
4. Module-specific state initialized (wind, loads, joints, etc.)
5. `Scene.tsx` renders appropriate scene component

### Gameplay Loop
1. `useKeyboardControls` hook runs every frame via `useFrame()`
2. Pressed keys → calculate delta values for magnitude/rotation
3. `gameStore.updateVector(selectedVectorId, deltaValues)`
4. Updated vector components → VectorArrow recalculates quaternion
5. Three.js renders updated arrow orientation and position

### Submission Flow
1. User presses Enter → `gameStore.submitResult()`
2. Store routes to module-specific logic (submitAbstractResult, etc.)
3. Calculate resultant vector, check win condition
4. If success: `unlockNextLevel(stars)`, update career progress
5. If failure: decrement attempts, show feedback
6. UI updates based on `isGameWon` flag

## TypeScript Types (src/lib/types.ts:1)

### Core Types
```typescript
type Vector3 = { x: number; y: number; z: number }

interface VectorData {
  id: string
  components: Vector3
  origin?: Vector3       // Default [0,0,0]
  color: string
  isLocked?: boolean
  label?: string
}

type GameModule = 'abstract' | 'drone' | 'bridge' | 'robotics'
type ScreenType = 'menu' | 'game' | 'levelSelect' | 'career'
type BadgeTier = 'bronze' | 'silver' | 'gold'
```

### State Types
```typescript
interface ModuleProgress {
  levelsCompleted: number
  starsEarned: number
  perfectLevels: number
  unlockedIndex: number      // Highest unlocked level
  starsPerLevel: number[]    // Stars earned per level (0-3)
}

interface CareerProgress {
  earnedBadges: string[]
  totalStars: number
  moduleProgress: Record<GameModule, ModuleProgress>
}

interface GameState {
  // Navigation
  currentScreen: ScreenType
  activeModule: GameModule

  // Career
  careerProgress: CareerProgress
  moduleUnlocks: Record<GameModule, boolean>

  // Game session
  currentLevelIndex: number
  currentLevel: ModuleLevelConfig | null
  vectors: VectorData[]
  selectedVectorId: string | null
  attemptsDisplay: number
  isGameWon: boolean
  isPlaying: boolean

  // Module-specific state...
}
```

## Development Conventions

### Component Patterns
- **Memoization**: Use `React.memo()` for expensive components (HexagonalLevelCell, VectorArrow)
- **Callbacks**: Use `useCallback()` for event handlers to prevent re-renders
- **Memoization**: Use `useMemo()` for expensive calculations (quaternion math, trajectory calculations)
- **Composition**: Prefer composition over prop drilling (BaseScene provides shared setup)

### Styling
- **Tailwind Classes**: Primary styling method
- **Module Colors**: Always use theme constants from `moduleTheme.ts`
- **Glassmorphism**: `backdrop-blur-md bg-white/10` for overlays
- **Gradients**: Use `MODULE_GRADIENTS` for module-themed backgrounds
- **Monospace Font**: Apply `font-mono` (JetBrains Mono) for technical UI

### State Management
- **Zustand Actions**: All state changes through store actions (never mutate directly)
- **Persistence**: Use `partialize` to exclude transient state from localStorage
- **Selectors**: Use Zustand selectors for component subscriptions to minimize re-renders

### Accessibility
- **ARIA Labels**: All interactive elements have `aria-label`
- **Keyboard Navigation**: Tab order, Enter/Space activation, focus styles
- **Disabled States**: Proper `disabled` attributes and `aria-disabled`
- **Semantic HTML**: Use `<button>`, `<nav>`, `<section>` appropriately

### Performance
- **Lazy Loading**: Components split by route (future enhancement opportunity)
- **useFrame Optimization**: Avoid heavy calculations in animation loop
- **Three.js Cleanup**: Dispose geometries/materials in `useEffect` cleanup
- **Debouncing**: Keyboard controls use delta time for smooth updates

## Common Development Tasks

### Adding a New Level
1. Open `/src/lib/levels/{module}.ts`
2. Add new level config to array following interface pattern
3. Test level in game
4. Update total level count in documentation

### Creating a New Module
1. Define new GameModule type in `types.ts`
2. Create level config file in `/src/lib/levels/{module}.ts`
3. Add theme constants to `moduleTheme.ts`
4. Create scene component in `/src/components/applications/{module}/`
5. Add scene routing in `Scene.tsx`
6. Add module-specific state to `gameStore.ts`
7. Implement submission logic
8. Create 4 badges in `badges.ts`
9. Update unlock logic

### Modifying Keyboard Controls
1. Edit `/src/hooks/useKeyboardControls.ts`
2. Update key mapping in `pressedKeys` ref
3. Adjust sensitivity constants (`ROTATION_SPEED`, `MAGNITUDE_SPEED`, etc.)
4. Update documentation in this file

### Styling the Dashboard
1. All dashboard components in `/src/components/ui/`
2. Use theme constants from `moduleTheme.ts`
3. Apply JetBrains Mono font with `font-mono`
4. Follow glassmorphism pattern: `backdrop-blur-md bg-white/10`
5. Test across all 4 modules for consistent theming

## Debugging Tips

### Game Not Loading
- Check browser console for errors
- Verify level index is valid: `gameStore.currentLevelIndex < levels.length`
- Check localStorage: `localStorage.getItem('game-storage')` for corruption

### Vectors Not Updating
- Verify `selectedVectorId` is set: `gameStore.selectedVectorId !== null`
- Check keyboard event listeners in DevTools
- Ensure `isPlaying` flag is true

### Three.js Performance Issues
- Monitor FPS in browser DevTools
- Check for memory leaks: unmounted components disposing geometries
- Reduce grid size or particle count for complex scenes

### State Persistence Issues
- Clear localStorage: `localStorage.clear()`, refresh page
- Check Zustand persist config in `gameStore.ts`
- Verify partialize function excludes transient state

## Build and Deployment

### Production Build
```bash
npm run build
# Output: dist/index.html (single self-contained file)
```

### File Size Optimization
- Three.js bundle is largest dependency (~600KB)
- vite-plugin-singlefile inlines all assets
- Consider code splitting for modules if file size becomes issue

### Testing Build Locally
```bash
npm run preview
# Opens local server with production build
```

## Additional Resources

- **Three.js Docs**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/
- **Zustand**: https://docs.pmnd.rs/zustand/
- **Tailwind CSS**: https://tailwindcss.com/docs
