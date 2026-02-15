import { useState, useEffect, useCallback } from 'react';
import ScoreBar from './ScoreBar.jsx';
import ComedianCard from './ComedianCard.jsx';
import ChoiceButton from './ChoiceButton.jsx';
import ResultCard from './ResultCard.jsx';
import LoadingState from './LoadingState.jsx';
import { fetchJoke } from '../utils/api.js';
import { shuffle } from '../utils/shuffle.js';
import fallbackJokes from '../data/fallbackJokes.js';

const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(16px, 3vw, 24px)',
    maxWidth: '640px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  backButton: {
    fontSize: '14px',
    color: 'var(--text-dim)',
    background: 'rgba(255,255,255,0.06)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'background 0.2s',
  },
  settingsButton: {
    fontSize: '20px',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-dim)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'background 0.2s',
  },
  choices: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  errorBox: {
    background: 'rgba(255, 51, 102, 0.1)',
    border: '1px solid rgba(255, 51, 102, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  errorText: {
    color: 'var(--nice)',
    fontSize: '14px',
    marginBottom: '12px',
  },
  retryButton: {
    fontSize: '14px',
    padding: '8px 24px',
    background: 'var(--nice)',
    color: 'white',
    borderRadius: '20px',
    border: 'none',
    transition: 'transform 0.2s',
  },
  modeTag: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 10px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '12px',
    display: 'inline-block',
  },
};

export default function GameScreen({ onOpenSettings, onBackToTitle }) {
  const [joke, setJoke] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [scores, setScores] = useState({ nice: 0, ok: 0, suka: 0 });
  const [usedFallbackIndices, setUsedFallbackIndices] = useState([]);
  const [usingApi, setUsingApi] = useState(false);

  const loadJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    setJoke(null);
    setSelectedIndex(null);

    const apiKey = localStorage.getItem('anthropic_api_key');

    if (apiKey) {
      try {
        const data = await fetchJoke(apiKey);
        setJoke(data);
        setShuffledChoices(shuffle(data.choices));
        setUsingApi(true);
        setLoading(false);
        return;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    // フォールバック
    setUsingApi(false);
    let availableIndices = fallbackJokes
      .map((_, i) => i)
      .filter(i => !usedFallbackIndices.includes(i));

    if (availableIndices.length === 0) {
      setUsedFallbackIndices([]);
      availableIndices = fallbackJokes.map((_, i) => i);
    }

    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const data = fallbackJokes[randomIdx];
    setUsedFallbackIndices(prev => [...prev, randomIdx]);
    setJoke(data);
    setShuffledChoices(shuffle(data.choices));
    setLoading(false);
  }, [usedFallbackIndices]);

  useEffect(() => {
    loadJoke();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChoice = useCallback((index) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const rank = shuffledChoices[index].rank;
    setScores(prev => ({ ...prev, [rank]: prev[rank] + 1 }));
  }, [selectedIndex, shuffledChoices]);

  const handleNext = useCallback(() => {
    setQuestionNumber(prev => prev + 1);
    loadJoke();
  }, [loadJoke]);

  const selectedRank = selectedIndex !== null ? shuffledChoices[selectedIndex]?.rank : null;
  const correctChoice = shuffledChoices.find(c => c.rank === 'nice');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={onBackToTitle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          ← タイトルへ
        </button>
        <button
          style={styles.settingsButton}
          onClick={onOpenSettings}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          aria-label="設定"
        >
          ⚙️
        </button>
      </div>

      <ScoreBar questionNumber={questionNumber} scores={scores} />

      {!usingApi && !loading && (
        <div style={styles.modeTag}>📦 プリセットモード（APIキー設定でAI生成に切替）</div>
      )}

      {loading && <LoadingState />}

      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
          <button
            style={styles.retryButton}
            onClick={loadJoke}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            もう一回試す
          </button>
        </div>
      )}

      {joke && !loading && (
        <>
          <ComedianCard
            comedianName={joke.comedian_name}
            setup={joke.setup}
            boke={joke.boke}
          />

          <div style={styles.choices}>
            {shuffledChoices.map((choice, i) => (
              <ChoiceButton
                key={i}
                choice={choice}
                index={i}
                selected={selectedIndex}
                revealed={selectedIndex !== null}
                onClick={() => handleChoice(i)}
              />
            ))}
          </div>

          {selectedRank && (
            <ResultCard
              rank={selectedRank}
              correctText={correctChoice?.text}
              onNext={handleNext}
            />
          )}
        </>
      )}
    </div>
  );
}
