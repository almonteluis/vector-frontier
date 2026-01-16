# Vector Voyage

**Vector Voyage** is an interactive 3D puzzle game designed to teach vector mathematics through intuition and visualization. 
Built with **React**, **Three.js**, and **TypeScript**.

## Features

- **3D Vector Manipulation**: Control Magnitude, Yaw, Pitch, and Roll in real-time.
- **Progressive Levels**: Master concepts from simple alignment to complex 3D addition.
- **Offline First**: The entire game compiles to a single HTML file (`dist/index.html`) that works without an internet connection.
- **Responsive Design**: Polished UI with real-time feedback and animations.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
   *Note: If you encounter version conflicts, use `npm install --legacy-peer-deps`.*

### Development

Run the development server:
```bash
npm run dev
```

### Building for Production

Compile the game into a single HTML file:
```bash
npm run build
```
The output file will be located at `dist/index.html`. You can open this file directly in any modern web browser.

## key Controls

| Key | Action |
|-----|--------|
| **W / S** | Increase / Decrease Magnitude |
| **A / D** | Rotate Yaw (Left/Right) |
| **Q / E** | Rotate Pitch (Up/Down) |
| **R / F** | Rotate Roll (Tilt) |
| **Shift** | Hold for Precision Mode |
| **Tab** | Cycle between Vectors |
| **Enter** | Submit Solution |

## Tech Stack

- **Framework**: React 18, Vite
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **State**: Zustand (with Persistence)
- **Styling**: Tailwind CSS
