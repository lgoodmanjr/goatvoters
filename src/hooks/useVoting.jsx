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
          data.
