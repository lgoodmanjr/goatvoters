import React, { useState } from 'react'

export default function Header({ onHome, catId, lastVote }) {
  const [shared, setShared] = useState(false)

  function handleRefresh() {
    window.location.reload()
  }

  function handleShare() {
    const categoryUrl = `https://goatvoters.com/#${catId}`
    const text = lastVote
      ? `I just voted ${lastVote.winner} over ${lastVote.loser} on GOATVoters. Do you agree? 🐐`
      : `Who's the GOAT? Come vote and see the live rankings! 🐐`
    if (navigator.share) {
      navigator.share({ title: 'GOATVoters', text, url: categoryUrl })
    } else {
      navigator.clipboard.writeText(`${text} ${categoryUrl}`)
        .then(() => {
          setShared(true)
          setTimeout(() => setShared(false), 2000)
        })
    }
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleShare}
          style={{
            fontSize: '13px',
            color: shared ? 'var(--orange)' : 'var(--text-secondary)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            padding: '5px 12px',
            cursor: 'pointer',
          }}
        >
          {shared ? 'Copied! ✓' : 'Share 🔗'}
        </button>
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
          }}
        >
          ↻
        </button>
      </div>
    </header>
  )
}
