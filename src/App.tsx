import { GameScene } from './components/game/Scene';
import { GameUI } from './components/ui/GameUI';

function App() {
  return (
    <div className="relative w-full h-screen flex flex-col bg-backgroundTop text-textPrimary overflow-hidden" style={{ width: '100vw', height: '100vh', backgroundColor: '#0F172A' }}>
      <main className="flex-1 relative z-0 w-full h-full">
        <GameScene />
        <GameUI />
      </main>
    </div>
  );
}

export default App;
