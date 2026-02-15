import { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '20px',
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: 'var(--bg-light)',
    borderRadius: '24px',
    padding: 'clamp(24px, 5vw, 36px)',
    maxWidth: '440px',
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)',
    animation: 'bounceIn 0.3s ease-out',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(18px, 4vw, 22px)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: 'clamp(13px, 3vw, 14px)',
    color: 'var(--text-dim)',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'var(--text)',
    fontSize: '14px',
    fontFamily: 'monospace',
    marginBottom: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  saveButton: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, var(--nice), #cc2952)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    transition: 'transform 0.2s',
  },
  deleteButton: {
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-dim)',
    borderRadius: '12px',
    fontSize: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'background 0.2s',
  },
  closeButton: {
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-dim)',
    borderRadius: '12px',
    fontSize: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'background 0.2s',
  },
  note: {
    fontSize: '12px',
    color: 'var(--text-dim)',
    marginTop: '12px',
    lineHeight: 1.5,
    opacity: 0.7,
  },
};

export default function ApiKeyModal({ onClose }) {
  const [key, setKey] = useState(() => localStorage.getItem('anthropic_api_key') || '');

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem('anthropic_api_key', key.trim());
    }
    onClose();
  };

  const handleDelete = () => {
    localStorage.removeItem('anthropic_api_key');
    setKey('');
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 style={styles.title}>⚙️ APIキー設定</h2>
        <p style={styles.desc}>
          Anthropic APIキーを入力すると、AIが生成するボケで遊べます。
          未設定でもプリセットネタで遊べます。
        </p>
        <input
          style={styles.input}
          type="password"
          placeholder="sk-ant-..."
          value={key}
          onChange={e => setKey(e.target.value)}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--nice)'}
          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
        <div style={styles.buttons}>
          <button
            style={styles.saveButton}
            onClick={handleSave}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            保存する
          </button>
          {key && (
            <button
              style={styles.deleteButton}
              onClick={handleDelete}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              削除
            </button>
          )}
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            閉じる
          </button>
        </div>
        <p style={styles.note}>
          ※ APIキーはブラウザのlocalStorageにのみ保存されます。サーバーには送信されません。
        </p>
      </div>
    </div>
  );
}
