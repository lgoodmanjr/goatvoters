import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import { categories, eloUpdate, getRandomPair } from '../data'

function getInitialCatIndex() {
  const hash = window.location.hash.replace('#', '').toLowerCase()
  if (hash) {
    const index = categories.findIndex(c => c.id === hash)
    if (index !== -1) return index
  }
  return 0
}

function initScores() {
  const scores = {}
  categories.forEach(cat => {
    scores[cat.id] = cat.contestants.map(() => 1000)
  })
  return scores
}

function initVoteCounts() {
  const counts = {}
  categories.forEach(cat => { counts[cat.id] = 0 })
  return counts
}

export function useVoting() {
  const [scores, setScores] = useState(initScores)
  const [voteCounts, setVoteCounts] = useState(initVoteCounts)
  const [activeCatIndex, setActiveCatIndex] = useState(getInitialCatIndex)
  const [pair, setPair] = useState(() => getRandomPair(categories[getInitialCatIndex()].contestants.length))
  const [voted, setVoted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const activeCat = categories[activeCatIndex]
useEffect(() => {
    async function loadScores() {
      try {
        const { data, error } = await supabase
          .from('contestants')
          .select('id, elo_score, category_id')
        if (error) throw error
        if (data && data.length > 0) {
          const newScores = initScores()
          data.forEach(row => {
            const cat = categories.find(c => c.id === row.category_id)
            if (!cat) return
            const idx = cat.contestants.findIndex(c => c.id === row.id)
            if (idx !== -1) newScores[row.category_id][idx] = row.elo_score
          })
          setScores(newScores)
        }
        const { data: votesData } = await supabase
          .from('votes')
          .select('category_id')
        if (votesData) {
          const counts = initVoteCounts()
          votesData.forEach(v => {
            if (counts[v.category_id] !== undefined) counts[v.category_id]++
          })
          setVoteCounts(counts)
        }
      } catch (err) {
        console.log('Running in local mode')
      } finally {
        setLoading(false)
      }
    }
    loadScores()
  }, [])

  const switchCategory = useCallback((index) => {
    setActiveCatIndex(index)
    setPair(getRandomPair(categories[index].contestants.length))
    setVoted(false)
    setSelectedIndex(null)
    window.location.hash = categories[index].id
  }, [])

  const vote = useCallback(async (winnerLocalIdx) => {
    if (voted) return
    const cat = activeCat
    const [a, b] = pair
    const loserLocalIdx = winnerLocalIdx === a ? b : a
    const newScores = { ...scores }
    newScores[cat.id] = eloUpdate(scores[cat.id], winnerLocalIdx, loserLocalIdx)
    setScores(newScores)
    setVoteCounts(prev => ({ ...prev, [cat.id]: prev[cat.id] + 1 }))
    setSelectedIndex(winnerLocalIdx)
    setVoted(true)

    setTimeout(() => {
      setVoted(false)
      setSelectedIndex(null)
      setPair(getRandomPair(cat.contestants.length))
    }, 1600)

    try {
      const winner = cat.contestants[winnerLocalIdx]
      const loser = cat.contestants[loserLocalIdx]
      await Promise.all([
        supabase.from('contestants').upsert({
          id: winner.id,
          name: winner.name,
          category_id: cat.id,
          elo_score: newScores[cat.id][winnerLocalIdx]
        }),
        supabase.from('contestants').upsert({
          id: loser.id,
          name: loser.name,
          category_id: cat.id,
          elo_score: newScores[cat.id][loserLocalIdx]
        }),
        supabase.from('votes').insert({
          category_id: cat.id,
          winner_id: winner.id,
          loser_id: loser.id
        })
      ])
    } catch (err) {
      console.log('Local mode')
    }
  }, [voted, activeCat, pair, scores])

  const nextPair = useCallback(() => {
    setVoted(false)
    setSelectedIndex(null)
    setPair(getRandomPair(activeCat.contestants.length))
  }, [activeCat])

  const getRankings = useCallback((catIndex) => {
    const cat = categories[catIndex]
    return cat.contestants
      .map((c, i) => ({ ...c, score: scores[cat.id][i], index: i }))
      .sort((a, b) => b.score - a.score)
  }, [scores])

  return {
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
  }
}
