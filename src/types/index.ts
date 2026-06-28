export interface ExampleSentence {
  chino: string
  pinyin: string
  es: string
}

export interface VocabItem {
  id: string
  leccion: number
  caracter: string
  pinyin: string
  tono: 1 | 2 | 3 | 4 | 5
  significado_es: string
  trazos: number
  radicales: string[]
  nota_cultural?: string
  origen_pictografico?: string
  ejemplos: ExampleSentence[]
  emoji_tema?: string
  strokeOrder?: string[]
}

export interface LessonMeta {
  id: number
  titulo: string
  tema: string
  emoji: string
  objetivo: string
  tipo: 'leccion' | 'apendice'
  apendiceId?: 'A' | 'B' | 'C' | 'D'
}

export interface SM2Card {
  vocabId: string
  easiness: number
  interval: number
  repetitions: number
  nextReview: number
  lastReview: number
}

export interface LessonProgress {
  lessonId: number
  completed: boolean
  completionPercent: number
  writingAccuracy: number
  pronunciationAccuracy: number
  vocabMastered: string[]
  exercisesDone: number
  gamesPlayed: number
}

export interface Achievement {
  id: string
  titulo: string
  descripcion: string
  emoji: string
  unlocked: boolean
  unlockedAt?: number
}

export interface DailyGoal {
  type: 'minutes' | 'characters'
  target: number
}

export interface UserProgress {
  currentLesson: number
  unlockedLessons: number[]
  lessonProgress: Record<number, LessonProgress>
  sm2Cards: Record<string, SM2Card>
  streak: number
  lastStudyDate: string | null
  studyDates: string[]
  totalCharactersLearned: number
  dailyGoal: DailyGoal
  todayMinutes: number
  todayCharacters: number
  achievements: Achievement[]
  writingAccuracyGlobal: number
  pronunciationAccuracyGlobal: number
  darkMode: boolean
  reminderEnabled: boolean
  reminderHour: number
}

export type GameType =
  | 'memory'
  | 'missing'
  | 'timed'
  | 'stroke'
  | 'dictation'
  | 'radical'
  | 'emoji'
  | 'tone'
  | 'fillblank'
  | 'conversation'

export type ExerciseType =
  | 'addRadical'
  | 'writeRadical'
  | 'completeStrokes'
  | 'wordFormation'
  | 'pinyinDictation'
  | 'sentenceGuess'

export interface RadicalInfo {
  radical: string
  significado: string
  ejemplo: string
  ejemploSignificado: string
}

export interface StrokeBasic {
  nombre: string
  simbolo: string
  descripcion: string
}
