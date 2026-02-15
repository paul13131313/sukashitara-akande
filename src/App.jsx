import { useState, useCallback } from 'react';
import TitleScreen from './components/TitleScreen.jsx';
import GameScreen from './components/GameScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('title');

  const handleStart = useCallback(() => {
    setScreen('game');
  }, []);

  const handleBackToTitle = useCallback(() => {
    setScreen('title');
  }, []);

  return (
    <>
      <div className="spotlight-bg" />
      {screen === 'title' && (
        <TitleScreen onStart={handleStart} />
      )}
      {screen === 'game' && (
        <GameScreen onBackToTitle={handleBackToTitle} />
      )}
    </>
  );
}
