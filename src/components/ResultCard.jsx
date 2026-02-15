const resultData = {
  nice: {
    emoji: '🎯',
    title: 'ナイスツッコミ！',
    color: 'var(--nice)',
    bg: 'linear-gradient(135deg, rgba(255, 51, 102, 0.2), rgba(255, 51, 102, 0.05))',
  },
  ok: {
    emoji: '😏',
    title: 'まあまあツッコミ',
    color: 'var(--ok)',
    bg: 'linear-gradient(135deg, rgba(255, 179, 71, 0.2), rgba(255, 179, 71, 0.05))',
  },
  suka: {
    emoji: '💀',
    title: 'スカしたらあかんで！',
    color: 'var(--suka)',
    bg: 'linear-gradient(135deg, rgba(74, 144, 217, 0.2), rgba(74, 144, 217, 0.05))',
  },
};

const styles = {
  card: {
    borderRadius: '20px',
    padding: 'clamp(24px, 5vw, 32px)',
    textAlign: 'center',
    animation: 'bounceIn 0.5s ease-out',
    marginTop: '16px',
    marginBottom: '16px',
  },
  emoji: {
    fontSize: 'clamp(48px, 12vw, 72px)',
    display: 'block',
    marginBottom: '8px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(20px, 5vw, 28px)',
    marginBottom: '12px',
  },
  correctLabel: {
    fontSize: 'clamp(12px, 3vw, 14px)',
    color: 'var(--text-dim)',
    marginBottom: '4px',
  },
  correctText: {
    fontSize: 'clamp(15px, 3.5vw, 18px)',
    fontWeight: 700,
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    display: 'inline-block',
  },
  nextButton: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(16px, 3.5vw, 18px)',
    padding: '14px 36px',
    background: 'linear-gradient(135deg, var(--nice), #cc2952)',
    color: 'white',
    borderRadius: '50px',
    marginTop: '20px',
    transition: 'transform 0.2s',
    border: 'none',
  },
};

export default function ResultCard({ rank, correctText, onNext }) {
  const data = resultData[rank];

  return (
    <div style={{ ...styles.card, background: data.bg, border: `2px solid ${data.color}` }}>
      <span style={styles.emoji}>{data.emoji}</span>
      <div style={{ ...styles.title, color: data.color }}>{data.title}</div>
      {rank !== 'nice' && correctText && (
        <div>
          <div style={styles.correctLabel}>正解のツッコミ：</div>
          <div style={{ ...styles.correctText, color: 'var(--nice)' }}>「{correctText}」</div>
        </div>
      )}
      <button
        style={styles.nextButton}
        onClick={onNext}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        次のボケへ →
      </button>
    </div>
  );
}
