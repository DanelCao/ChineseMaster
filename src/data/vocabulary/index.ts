import { getLesson0, getLesson1 } from './part1'
import { getLesson2, getLesson3, getLesson4 } from './part2'
import { getLesson5, getLesson6, getLesson7, getLesson8 } from './part3'
import { getLesson9, getLesson10, getLesson11 } from './part4'
import { getLesson12, getLesson13, getLesson14, getLesson15, getLesson16, getLesson17, getLesson18, getLesson19, getLesson20 } from './part5'
import type { VocabItem } from '../../types'

const LESSON_GETTERS: Record<number, () => VocabItem[]> = {
  0: getLesson0, 1: getLesson1, 2: getLesson2, 3: getLesson3, 4: getLesson4,
  5: getLesson5, 6: getLesson6, 7: getLesson7, 8: getLesson8, 9: getLesson9,
  10: getLesson10, 11: getLesson11, 12: getLesson12, 13: getLesson13, 14: getLesson14,
  15: getLesson15, 16: getLesson16, 17: getLesson17, 18: getLesson18, 19: getLesson19,
  20: getLesson20,
}

export const ALL_VOCABULARY: VocabItem[] = Object.values(LESSON_GETTERS).flatMap((fn) => fn())

export function getVocabByLesson(lessonId: number): VocabItem[] {
  return LESSON_GETTERS[lessonId]?.() ?? []
}

export function getVocabById(id: string): VocabItem | undefined {
  return ALL_VOCABULARY.find((v) => v.id === id)
}

export function searchCharacters(query: string): VocabItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return ALL_VOCABULARY
  return ALL_VOCABULARY.filter(
    (v) =>
      v.caracter.includes(q) ||
      v.pinyin.toLowerCase().includes(q) ||
      v.significado_es.toLowerCase().includes(q),
  )
}

export function getCharacterIndex(): { caracter: string; leccion: number; pinyin: string; significado: string }[] {
  return ALL_VOCABULARY.map((v) => ({
    caracter: v.caracter,
    leccion: v.leccion,
    pinyin: v.pinyin,
    significado: v.significado_es,
  }))
}
