import React, { useState } from 'react'

export default function Leaderboard({ rankings, catLabel, wlRecords }) {
  const [expandedId, setExpandedId] = useState(null)
  const maxScore = rankings[0]?.score || 1000
  const minScore = rankings[rankings.length - 1]?.score || 1000
  const range = maxScore - minScore || 1

  function toggleExpand(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

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
          {rankings.length} contestants · tap for record
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
          const isExpanded = expandedId === c.id
          const record = wlRecords?.[c.id] || { wins: 0, losses: 0 }
          const total = record.wins + record.losses
          const winPct = total > 0 ? Math.round((record.wins / total) * 100) : 0

          return (
            <div key={c.id}>
              <div
                onClick={() => toggleExpand(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderBottom: (!isExpanded && i < rankings.length - 1) ? '1px solid var(--border)' : 'none',
                  background: isExpanded ? 'rgba(216,90,48,0.08)' : isTop3 ? 'rgba(216,90,48,0.04)' : 'transparent',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background 0.15s ease',
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
                    background: 'var(--border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: pct + '%',
                      height: '100%',
                      background: isTop3 ? 'var(--orange)' : 'var(--text-tertiary)',
                      borderRadius: '2px',
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-tertiary)',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '36px',
                    textAlign: 'right',
                  }}>
                    {Math.round(c.score)}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: isExpanded ? 'var(--orange)' : 'var(--text-tertiary)',
                    transition: 'transform 0.2s ease, color 0.2s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    lineHeight: 1,
                  }}>
                    ▾
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  padding: '10px 14px 12px 54px',
                  borderBottom: i < rankings.length - 1 ? '1px solid var(--border)' : 'none',
                  background: 'rgba(216,90,48,0.04)',
                }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1 }}>
                        {record.wins}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', marginTop: '2px' }}>
                        WINS
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)', lineHeight: 1 }}>
                        {record.losses}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', marginTop: '2px' }}>
                        LOSSES
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                        {total > 0 ? winPct + '%' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', marginTop: '2px' }}>
                        WIN %
                      </div>
                    </div>
                    {total > 0 && (
                      <div style={{ flex: 1 }}>
                        <div style={{
                          height: '6px',
                          background: 'var(--border)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: winPct + '%',
                            height: '100%',
                            background: 'var(--orange)',
                            borderRadius: '3px',
                          }} />
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '3px' }}>
                          {total} matchup{total !== 1 ? 's' : ''}
                        </div>
                      </div>
                    )}
                    {total === 0 && (
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                        No matchups yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
