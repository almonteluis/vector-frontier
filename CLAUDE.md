# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + Vite production build → dist/index.html (single file)
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Architecture

Vector Voyage is a 3D puzzle game teaching vector mathematics. Players manipulate vectors using keyboard controls to match target vectors.

### Tech Stack
- React 18 + TypeScript + Vite
- Three.js via @react-three/fiber and @react-three/drei for 3D rendering
- Zustand for state management (with localStorage persistence)
- Tailwind CSS for styling
- vite-plugin-singlefile compiles everything to a single offline HTML file

### Key Source Files

**State Management**
- `src/store/gameStore.ts` - Zustand store containing all game state: level progress, vector data, selection, and game logic (vector math for addition/subtraction, win condition checking with tolerance)

**3D Scene**
- `src/components/game/Scene.tsx` - Main Three.js canvas setup with camera, lighting, grid, and renders target + player vectors
- `src/components/game/VectorArrow.tsx` - 3D arrow component (cylinder shaft + cone tip) with selection highlighting and click handling

**UI**
- `src/components/ui/GameUI.tsx` - HUD overlay showing level info, vector components, attempts, feedback messages, and action buttons

**Game Data**
- `src/lib/levels.ts` - Level configurations array (target vectors, allowed vectors, tolerance, hints)
- `src/lib/types.ts` - TypeScript interfaces for Vector3, VectorData, LevelConfig, GameState

**Controls**
- `src/hooks/useKeyboardControls.ts` - Keyboard input handling using useFrame for continuous updates. W/S for magnitude, A/D for yaw, Q/E for pitch, R/F for roll, Shift for precision mode, Tab to cycle vectors, Enter to submit

### Data Flow
1. `gameStore.loadLevel()` initializes vectors for current level
2. `useKeyboardControls` hook reads pressed keys each frame and calls `gameStore.updateVector()`
3. Vector components flow to `VectorArrow` which computes Three.js quaternion for orientation
4. `gameStore.submitResult()` sums player vectors, compares to target within tolerance, updates win state
