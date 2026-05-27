import React from 'react'
import { categories } from '../data'

export default function CategoryNav({ activeCatIndex, onSwitch }) {
  return (
    <nav style={{
      display: 'flex',
      gap: '8px',
      padding: '1rem 1.25rem',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {categories.map((cat, i) => {
        const active = i === activeCatIndex
        return (
          <button
            key={cat.id}
            onClick={() => onSwitch(i)}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: active ? 'none' : '1px solid var(--border)',
              background: active ? 'var(--orange)' : 'var(--surface)',
              color: active ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: active ? 600 : 400,
              fontFamily: 'var(--font-body)',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
              letterSpacing: active ? '0.01em' : 0,
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        )
      })}
    </nav>
  )
}
