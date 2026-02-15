import { useState, useCallback } from 'react';
import TitleScreen from './components/TitleScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';

export default function App() {
  const [screen, setScreen] = useState('title');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

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
        <TitleScreen
          onStart={handleStart}
          onOpenSettings={() => setShowApiKeyModal(true)}
        />
      )}
      {screen === 'game' && (
        <GameScreen
          onOpenSettings={() => setShowApiKeyModal(true)}
          onBackToTitle={handleBackToTitle}
        />
      )}
      {showApiKeyModal && (
        <ApiKeyModal onClose={() => setShowApiKeyModal(false)} />
      )}
    </>
  );
}
