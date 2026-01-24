import { useGameStore } from './store/gameStore';
import { GameScene } from './components/game/Scene';
import { GameUI } from './components/ui/GameUI';
import { MainMenu } from './components/ui/MainMenu';
import { LevelSelector } from './components/ui/LevelSelector';
import { CareerDashboard } from './components/ui/CareerDashboard';

function App() {
  const currentScreen = useGameStore(s => s.currentScreen);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-backgroundTop flex flex-col text-textPrimary"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0F172A'
      }}
    >
      {/* Main Menu */}
      {currentScreen === 'menu' && <MainMenu />}

      {/* Level Selection */}
      {currentScreen === 'levelSelect' && <LevelSelector />}

      {/* Career Dashboard */}
      {currentScreen === 'career' && <CareerDashboard />}

      {/* Game Screen */}
      {currentScreen === 'game' && (
        <main className="flex-1 relative z-0 w-full h-full">
          <GameScene />
          <GameUI />
        </main>
      )}
    </div>
  );
}

export default App;
