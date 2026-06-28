import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { UserProgress, LessonProgress, DailyGoal } from '../types'
import { DEFAULT_ACHIEVEMENTS } from '../data/achievements'
import { loadFromStorage, saveToStorage, todayKey } from '../lib/utils'
import { createSM2Card, reviewSM2, qualityFromScore } from '../lib/sm2'
import { getVocabByLesson } from '../data/vocabulary'

const defaultProgress = (): UserProgress => ({
  currentLesson: 0,
  unlockedLessons: [0],
  lessonProgress: {},
  sm2Cards: {},
  streak: 0,
  lastStudyDate: null,
  studyDates: [],
  totalCharactersLearned: 0,
  dailyGoal: { type: 'characters', target: 10 },
  todayMinutes: 0,
  todayCharacters: 0,
  achievements: DEFAULT_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })),
  writingAccuracyGlobal: 0,
  pronunciationAccuracyGlobal: 0,
  darkMode: false,
  reminderEnabled: false,
  reminderHour: 9,
})

interface ProgressCtx extends UserProgress {
  completeLessonActivity: (lessonId: number, charsLearned?: number, minutes?: number) => void
  updateLessonProgress: (lessonId: number, update: Partial<LessonProgress>) => void
  reviewVocab: (vocabId: string, score: number) => void
  unlockAchievement: (id: string) => void
  setDailyGoal: (goal: DailyGoal) => void
  toggleDarkMode: () => void
  isLessonUnlocked: (id: number) => boolean
  getLessonCompletion: (id: number) => number
  resetTodayIfNeeded: () => void
}

const ProgressContext = createContext<ProgressCtx | null>(null)

function ensureLessonProgress(p: UserProgress, id: number): LessonProgress {
  if (!p.lessonProgress[id]) {
    p.lessonProgress[id] = {
      lessonId: id,
      completed: false,
      completionPercent: 0,
      writingAccuracy: 0,
      pronunciationAccuracy: 0,
      vocabMastered: [],
      exercisesDone: 0,
      gamesPlayed: 0,
    }
  }
  return p.lessonProgress[id]
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserProgress>(() => loadFromStorage(defaultProgress()))

  useEffect(() => {
    saveToStorage(state)
    if (state.darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [state])

  useEffect(() => {
    const today = todayKey()
    if (state.lastStudyDate !== today) {
      setState((s) => ({ ...s, todayMinutes: 0, todayCharacters: 0 }))
    }
  }, [state.lastStudyDate])

  const unlockAchievement = (id: string) => {
    setState((s) => ({
      ...s,
      achievements: s.achievements.map((a) =>
        a.id === id && !a.unlocked ? { ...a, unlocked: true, unlockedAt: Date.now() } : a,
      ),
    }))
  }

  const checkAchievements = (s: UserProgress) => {
    const lp = s.lessonProgress
    if (lp[0]?.completionPercent >= 80) unlockAchievement('first-steps')
    if (lp[1]?.completionPercent >= 80) unlockAchievement('icebreaker')
    if (s.totalCharactersLearned >= 100) unlockAchievement('chars-100')
    if (s.writingAccuracyGlobal >= 70) unlockAchievement('writer-bronze')
    if (s.writingAccuracyGlobal >= 85) unlockAchievement('writer-silver')
    if (s.writingAccuracyGlobal >= 95) unlockAchievement('writer-gold')
    if (s.streak >= 7) unlockAchievement('streak-7')
    if (s.streak >= 30) unlockAchievement('streak-30')
    if (s.streak >= 100) unlockAchievement('streak-100')
    const allDone = Array.from({ length: 21 }, (_, i) => lp[i]?.completionPercent >= 80).every(Boolean)
    if (allDone) unlockAchievement('polyglot')
    if (lp[20]?.completed) unlockAchievement('hsk1')
  }

  const completeLessonActivity = (lessonId: number, charsLearned = 1, minutes = 5) => {
    setState((s) => {
      const copy = structuredClone(s)
      const today = todayKey()
      const lp = ensureLessonProgress(copy, lessonId)
      lp.completionPercent = Math.min(100, lp.completionPercent + 5)
      if (lp.completionPercent >= 80) lp.completed = true

      const vocab = getVocabByLesson(lessonId)
      const newMastered = vocab.slice(0, charsLearned).map((v) => v.id)
      lp.vocabMastered = [...new Set([...lp.vocabMastered, ...newMastered])]

      copy.totalCharactersLearned = Math.max(copy.totalCharactersLearned, copy.totalCharactersLearned + charsLearned)
      copy.todayCharacters += charsLearned
      copy.todayMinutes += minutes

      if (copy.lastStudyDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yKey = yesterday.toISOString().slice(0, 10)
        copy.streak = copy.lastStudyDate === yKey ? copy.streak + 1 : 1
        copy.lastStudyDate = today
        if (!copy.studyDates.includes(today)) copy.studyDates = [...copy.studyDates, today]
      }

      if (lp.completed && !copy.unlockedLessons.includes(lessonId + 1) && lessonId < 20) {
        copy.unlockedLessons = [...copy.unlockedLessons, lessonId + 1]
      }

      newMastered.forEach((id) => {
        if (!copy.sm2Cards[id]) copy.sm2Cards[id] = createSM2Card(id)
      })

      checkAchievements(copy)
      return copy
    })
  }

  const updateLessonProgress = (lessonId: number, update: Partial<LessonProgress>) => {
    setState((s) => {
      const copy = structuredClone(s)
      const lp = ensureLessonProgress(copy, lessonId)
      Object.assign(lp, update)
      if (update.writingAccuracy) {
        copy.writingAccuracyGlobal = Math.round((copy.writingAccuracyGlobal + update.writingAccuracy) / 2)
      }
      if (update.pronunciationAccuracy) {
        copy.pronunciationAccuracyGlobal = Math.round((copy.pronunciationAccuracyGlobal + update.pronunciationAccuracy) / 2)
      }
      return copy
    })
  }

  const reviewVocab = (vocabId: string, score: number) => {
    setState((s) => {
      const copy = structuredClone(s)
      const card = copy.sm2Cards[vocabId] ?? createSM2Card(vocabId)
      copy.sm2Cards[vocabId] = reviewSM2(card, qualityFromScore(score))
      return copy
    })
  }

  const setDailyGoal = (goal: DailyGoal) => setState((s) => ({ ...s, dailyGoal: goal }))
  const toggleDarkMode = () => setState((s) => ({ ...s, darkMode: !s.darkMode }))
  const isLessonUnlocked = (id: number) => state.unlockedLessons.includes(id)
  const getLessonCompletion = (id: number) => state.lessonProgress[id]?.completionPercent ?? 0
  const resetTodayIfNeeded = () => {
    const today = todayKey()
    if (state.lastStudyDate !== today) {
      setState((s) => ({ ...s, todayMinutes: 0, todayCharacters: 0 }))
    }
  }

  const value = useMemo(
    () => ({
      ...state,
      completeLessonActivity,
      updateLessonProgress,
      reviewVocab,
      unlockAchievement,
      setDailyGoal,
      toggleDarkMode,
      isLessonUnlocked,
      getLessonCompletion,
      resetTodayIfNeeded,
    }),
    [state],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
