const styles = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  questionBadge: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(14px, 3vw, 18px)',
    background: 'linear-gradient(135deg, var(--nice), #cc2952)',
    padding: '6px 16px',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
  },
  scores: {
    display: 'flex',
    gap: '16px',
    fontSize: 'clamp(14px, 3vw, 16px)',
  },
  scoreItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  scoreCount: {
    fontWeight: 700,
    minWidth: '16px',
    textAlign: 'center',
  },
};

export default function ScoreBar({ questionNumber, scores }) {
  return (
    <div style={styles.bar}>
      <div style={styles.questionBadge}>第{questionNumber}問</div>
      <div style={styles.scores}>
        <div style={styles.scoreItem}>
          <span>🎯</span>
          <span style={{ ...styles.scoreCount, color: 'var(--nice)' }}>{scores.nice}</span>
        </div>
        <div style={styles.scoreItem}>
          <span>😏</span>
          <span style={{ ...styles.scoreCount, color: 'var(--ok)' }}>{scores.ok}</span>
        </div>
        <div style={styles.scoreItem}>
          <span>💀</span>
          <span style={{ ...styles.scoreCount, color: 'var(--suka)' }}>{scores.suka}</span>
        </div>
      </div>
    </div>
  );
}
