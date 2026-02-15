import { useState, useEffect, useCallback } from 'react';
import ScoreBar from './ScoreBar.jsx';
import ComedianCard from './ComedianCard.jsx';
import ChoiceButton from './ChoiceButton.jsx';
import ResultCard from './ResultCard.jsx';
import { shuffle } from '../utils/shuffle.js';
import jokes from '../data/fallbackJokes.js';

const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(16px, 3vw, 24px)',
    maxWidth: '640px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
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
  choices: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
};

export default function GameScreen({ onBackToTitle }) {
  const [joke, setJoke] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [scores, setScores] = useState({ nice: 0, ok: 0, suka: 0 });
  const [usedIndices, setUsedIndices] = useState([]);

  const loadJoke = useCallback(() => {
    setJoke(null);
    setSelectedIndex(null);

    let availableIndices = jokes
      .map((_, i) => i)
      .filter(i => !usedIndices.includes(i));

    if (availableIndices.length === 0) {
      setUsedIndices([]);
      availableIndices = jokes.map((_, i) => i);
    }

    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const data = jokes[randomIdx];
    setUsedIndices(prev => [...prev, randomIdx]);
    setJoke(data);
    setShuffledChoices(shuffle(data.choices));
  }, [usedIndices]);

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
      </div>

      <ScoreBar questionNumber={questionNumber} scores={scores} />

      {joke && (
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
