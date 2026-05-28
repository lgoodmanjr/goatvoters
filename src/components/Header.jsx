import React from 'react'

export default function Header({ onHome }) {
  function handleRefresh() {
    window.location.reload()
  }

  return (
    <header style={{
      padding: '1rem 1.25rem 0.75rem',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 100,
    }}>
      <button
        onClick={onHome}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          letterSpacing: '2px',
          color: 'var(--orange)',
          lineHeight: 1,
        }}>GOAT</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          letterSpacing: '2px',
          color: 'var(--text)',
          lineHeight: 1,
        }}>VOTERS</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleRefresh}
          style={{
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            padding: '5px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          ↻ Refresh
        </button>
        <div style={{
          fontSize: '11px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Who's the greatest?
        </div>
      </div>
    </header>
  )
}
