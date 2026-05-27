import React from 'react'

export default function Leaderboard({ rankings, catLabel }) {
  const maxScore = rankings[0]?.score || 1000
  const minScore = rankings[rankings.length - 1]?.score || 1000
  const range = maxScore - minScore || 1

  return (
    <div style={{ padding: '0 1.25rem 2rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          letterSpacing: '2px',
          color: 'var(--text)',
        }}>
          RANKINGS
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.05em',
        }}>
          {rankings.length} contestants
        </div>
      </div>
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        {rankings.map((c, i) => {
          const pct = Math.round(((c.score - minScore) / range) * 100)
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null
          const isTop3 = i < 3

          return (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderBottom: i < rankings.length - 1 ? '1px solid var(--border)' : 'none',
                background: isTop3 ? 'rgba(216,90,48,0.04)' : 'transparent',
              }}
            >
              <div style={{
                width: '28px',
                textAlign: 'center',
                flexShrink: 0,
                fontSize: medal ? '16px' : '12px',
                color: 'var(--text-tertiary)',
                fontWeight: 600,
              }}>
                {medal || (i + 1)}
              </div>
              <div style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1 }}>
                {c.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: isTop3 ? 600 : 500,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  marginTop: '1px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {c.sub}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div style={{
                  width: '72px',
                  height: '4px',
                  background: 'var(--surface3)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: isTop3 ? 'var(--orange)' : 'rgba(255,255,255,0.2)',
                    borderRadius: '2px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  width: '34px',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {c.score}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
