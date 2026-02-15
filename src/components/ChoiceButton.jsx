const labels = ['A', 'B', 'C'];

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: 'clamp(14px, 3vw, 18px) clamp(16px, 4vw, 24px)',
  background: 'rgba(255,255,255,0.06)',
  border: '2px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  color: 'var(--text)',
  fontSize: 'clamp(15px, 3.5vw, 18px)',
  textAlign: 'left',
  transition: 'all 0.2s',
  lineHeight: 1.5,
};

const labelStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '14px',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.1)',
  flexShrink: 0,
};

const rankColors = {
  nice: 'var(--nice)',
  ok: 'var(--ok)',
  suka: 'var(--suka)',
};

export default function ChoiceButton({ choice, index, selected, revealed, onClick }) {
  const isThis = selected === index;
  const delay = index * 0.1;

  let style = { ...baseStyle, animationDelay: `${delay}s` };
  style.animation = `slideIn 0.4s ease-out ${delay}s both`;

  if (revealed) {
    const color = rankColors[choice.rank];
    if (choice.rank === 'nice') {
      style = {
        ...style,
        border: `2px solid ${color}`,
        background: `rgba(255, 51, 102, 0.15)`,
        boxShadow: `0 0 20px rgba(255, 51, 102, 0.2)`,
      };
    } else if (isThis && choice.rank !== 'nice') {
      style = {
        ...style,
        border: `2px solid ${color}`,
        background: choice.rank === 'ok'
          ? 'rgba(255, 179, 71, 0.1)'
          : 'rgba(74, 144, 217, 0.1)',
      };
    } else {
      style = {
        ...style,
        opacity: 0.4,
      };
    }
  } else {
    style.cursor = 'pointer';
  }

  return (
    <button
      style={style}
      onClick={revealed ? undefined : onClick}
      disabled={revealed}
      onMouseEnter={!revealed ? e => {
        e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.transform = 'translateX(4px)';
      } : undefined}
      onMouseLeave={!revealed ? e => {
        e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = 'translateX(0)';
      } : undefined}
    >
      <span style={labelStyle}>{labels[index]}</span>
      <span>{choice.text}</span>
      {revealed && choice.rank === 'nice' && <span style={{ marginLeft: 'auto' }}>✨</span>}
    </button>
  );
}
