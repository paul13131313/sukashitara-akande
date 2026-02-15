const styles = {
  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    padding: 'clamp(20px, 5vw, 32px)',
    marginBottom: '24px',
    border: '1px solid rgba(255,255,255,0.08)',
    animation: 'slideUp 0.5s ease-out',
  },
  comedianName: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  mic: {
    fontSize: '24px',
  },
  name: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(16px, 4vw, 20px)',
    color: 'var(--gold)',
  },
  setup: {
    fontSize: 'clamp(14px, 3.5vw, 16px)',
    color: 'var(--text-dim)',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  boke: {
    fontSize: 'clamp(18px, 4.5vw, 24px)',
    fontWeight: 700,
    lineHeight: 1.6,
    padding: '16px',
    background: 'rgba(255, 215, 0, 0.05)',
    borderRadius: '12px',
    borderLeft: '4px solid var(--gold)',
  },
};

export default function ComedianCard({ comedianName, setup, boke }) {
  return (
    <div style={styles.card}>
      <div style={styles.comedianName}>
        <span style={styles.mic}>🎤</span>
        <span style={styles.name}>{comedianName}</span>
      </div>
      <p style={styles.setup}>{setup}</p>
      <div style={styles.boke}>「{boke}」</div>
    </div>
  );
}
