import type { SM2Card } from '../types'

export function createSM2Card(vocabId: string): SM2Card {
  return {
    vocabId,
    easiness: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: 0,
  }
}

export function reviewSM2(card: SM2Card, quality: number): SM2Card {
  const q = Math.max(0, Math.min(5, quality))
  let { easiness, interval, repetitions } = card

  if (q < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easiness)
    repetitions += 1
  }

  easiness = Math.max(1.3, easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000

  return {
    ...card,
    easiness,
    interval,
    repetitions,
    nextReview,
    lastReview: Date.now(),
  }
}

export function getDueCards(cards: Record<string, SM2Card>): SM2Card[] {
  const now = Date.now()
  return Object.values(cards).filter((c) => c.nextReview <= now)
}

export function qualityFromScore(score: number): number {
  if (score >= 95) return 5
  if (score >= 85) return 4
  if (score >= 70) return 3
  if (score >= 50) return 2
  return 1
}
