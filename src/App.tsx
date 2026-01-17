import { useGameStore } from './store/gameStore';
import { GameScene } from './components/game/Scene';
import { GameUI } from './components/ui/GameUI';
import { MainMenu } from './components/ui/MainMenu';
import { LevelSelector } from './components/ui/LevelSelector';
import { CareerDashboard } from './components/ui/CareerDashboard';
import { LandingPage } from './components/ui/LandingPage';

function App() {
  const currentScreen = useGameStore(s => s.currentScreen);

  return (
    <div
      className={`relative w-full flex flex-col text-textPrimary ${currentScreen === 'landing'
          ? 'min-h-screen overflow-y-auto bg-[#F0F2F5]'
          : 'h-screen overflow-hidden bg-backgroundTop'
        }`}
      style={{
        width: '100vw',
        height: currentScreen === 'landing' ? 'auto' : '100vh',
        backgroundColor: currentScreen === 'landing' ? '#F0F2F5' : '#0F172A'
      }}
    >
      {/* Landing Page */}
      {currentScreen === 'landing' && <LandingPage />}

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
