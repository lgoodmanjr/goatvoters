import React from 'react'

export default function Header() {
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
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
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
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-tertiary)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Who's the greatest?
      </div>
    </header>
  )
}
