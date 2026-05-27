import React from 'react'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import VotingCard from './components/VotingCard'
import Leaderboard from './components/Leaderboard'
import Divider from './components/Divider'
import { useVoting } from './hooks/useVoting.jsx'
import { categories } from './data'

export default function App() {
  const {
    activeCat,
    activeCatIndex,
    pair,
    voted,
    selectedIndex,
    loading,
    voteCounts,
    switchCategory,
    vote,
    nextPair,
    getRankings,
  } = useVoting()

  const rankings = getRankings(activeCatIndex)

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          letterSpacing: '4px',
        }}>
          <span style={{ color: 'var(--orange)' }}>GOAT</span>
          <span style={{ color: 'var(--text)' }}>VOTERS</span>
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          animation: 'pulse 1.5s ease infinite',
        }}>
          Loading rankings...
        </div>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '520px',
      margin: '0 auto',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      <CategoryNav
        activeCatIndex={activeCatIndex}
        onSwitch={switchCategory}
      />
      <div style={{ animation: 'fadeUp 0.3s ease both' }} key={activeCat.id}>
        <VotingCard
          activeCat={activeCat}
          pair={pair}
          voted={voted}
          selectedIndex={selectedIndex}
          voteCount={voteCounts[activeCat.id]}
          onVote={vote}
          onNext={nextPair}
          onSkip={nextPair}
        />
        <Divider />
        <Leaderboard
          rankings={rankings}
          catLabel={activeCat.label}
        />
      </div>
    </div>
  )
}
