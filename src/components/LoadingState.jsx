const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '20px',
  },
  mic: {
    fontSize: '48px',
    animation: 'float 1.5s ease-in-out infinite',
  },
  text: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    color: 'var(--text-dim)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export default function LoadingState() {
  return (
    <div style={styles.container}>
      <span style={styles.mic}>🎤</span>
      <div style={styles.text}>芸人がネタ考え中...</div>
    </div>
  );
}
