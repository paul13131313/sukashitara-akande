const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  curtainTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    background: 'linear-gradient(to bottom, #8B0000, #4a0000)',
    borderBottom: '8px solid #FFD700',
    zIndex: 1,
  },
  curtainLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '100%',
    background: 'linear-gradient(to right, #8B0000, transparent)',
    zIndex: 1,
  },
  curtainRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40px',
    height: '100%',
    background: 'linear-gradient(to left, #8B0000, transparent)',
    zIndex: 1,
  },
  spotlight: {
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.12), transparent 70%)',
    animation: 'spotlight 3s ease-in-out infinite',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    animation: 'slideUp 0.8s ease-out',
  },
  mic: {
    fontSize: 'clamp(60px, 15vw, 100px)',
    display: 'block',
    marginBottom: '20px',
    animation: 'float 2.5s ease-in-out infinite',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(32px, 8vw, 56px)',
    lineHeight: 1.3,
    marginBottom: '16px',
    textShadow: '0 0 40px rgba(255, 51, 102, 0.5), 0 2px 4px rgba(0,0,0,0.5)',
  },
  titleAccent: {
    color: 'var(--nice)',
  },
  subtitle: {
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    color: 'var(--text-dim)',
    marginBottom: '48px',
    lineHeight: 1.6,
  },
  startButton: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(18px, 4vw, 24px)',
    padding: '16px 48px',
    background: 'linear-gradient(135deg, var(--nice), #cc2952)',
    color: 'white',
    borderRadius: '50px',
    animation: 'glow 2s ease-in-out infinite',
    transition: 'transform 0.2s',
    border: 'none',
  },
};

export default function TitleScreen({ onStart }) {
  return (
    <div style={styles.container}>
      <div style={styles.curtainTop} />
      <div style={styles.curtainLeft} />
      <div style={styles.curtainRight} />
      <div style={styles.spotlight} />
      <div style={styles.content}>
        <span style={styles.mic}>🎤</span>
        <h1 style={styles.title}>
          スカしたら<br />
          <span style={styles.titleAccent}>あかんで</span>
        </h1>
        <p style={styles.subtitle}>
          芸人のボケにツッコめ！<br />
          スカしたら…あかんで？
        </p>
        <button
          style={styles.startButton}
          onClick={onStart}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          舞台に上がる →
        </button>
      </div>
    </div>
  );
}
