import React from 'react'

function ContestantCard({ contestant, state, onClick }) {
  const isWinner = state === 'winner'
  const isLoser = state === 'loser'
  const isNeutral = state === 'neutral'

  return (
    <button
      onClick={onClick}
      disabled={state === 'winner' || state === 'loser'}
      style={{
        flex: 1,
        minHeight: '180px',
        padding: '1.5rem 1rem',
        borderRadius: 'var(--radius)',
        border: isWinner
          ? '2px solid var(--orange)'
          : '1px solid var(--border)',
        background: isWinner
          ? 'rgba(216, 90, 48, 0.12)'
          : isLoser
          ? 'var(--surface)'
          : 'var(--surface2)',
        cursor: isNeutral ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'all 0.2s ease',
        opacity: isLoser ? 0.35 : 1,
        transform: isWinner ? 'scale(1.02)' : 'scale(1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'var(--orange)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '3px 8px',
          borderRadius: 'var(--radius-pill)',
          textTransform: 'uppercase',
        }}>
          Your pick
        </div>
      )}
      <div style={{ fontSize: '42px', lineHeight: 1 }}>{contestant.emoji}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '15px',
          fontWeight: 600,
          color: isWinner ? '#fff' : 'var(--text)',
          lineHeight: 1.3,
          marginBottom: '4px',
        }}>
          {contestant.name}
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          lineHeight: 1.4,
        }}>
          {contestant.sub}
        </div>
      </div>
    </button>
  )
}

export default function VotingCard({ activeCat, pair, voted, selectedIndex, voteCount, onVote, onNext, onSkip }) {
  const [a, b] = pair
  const cA = activeCat.contestants[a]
  const cB = activeCat.contestants[b]

  const stateA = !voted ? 'neutral' : selectedIndex === a ? 'winner' : 'loser'
  const stateB = !voted ? 'neutral' : selectedIndex === b ? 'winner' : 'loser'

  function handleShare() {
    const winner = selectedIndex === a ? cA : cB
    const loser = selectedIndex === a ? cB : cA
    const text = `I just voted ${winner.name} over ${loser.name} on GOATVoters. Cast your vote! 🐐 goatvoters.com`
    if (navigator.share) {
      navigator.share({ title: 'GOATVoters', text, url: 'https://goatvoters.com' })
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'))
    }
  }

  return (
    <div style={{ padding: '0 1.25rem' }}>
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          letterSpacing: '2px',
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          {activeCat.title.toUpperCase()}
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '4px',
        }}>
          {activeCat.subtitle}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch', marginBottom: '1rem' }}>
        <ContestantCard contestant={cA} state={stateA} onClick={() => onVote(a)} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: '36px',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--text-tertiary)',
            letterSpacing: '1px',
          }}>VS</span>
        </div>
        <ContestantCard contestant={cB} state={stateB} onClick={() => onVote(b)} />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          {voteCount.toLocaleString()} vote{voteCount !== 1 ? 's' : ''} cast
        </span>
        {voted ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleShare}
              style={{
                padding: '7px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                
