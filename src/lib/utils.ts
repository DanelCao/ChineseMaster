const STORAGE_KEY = 'zhongwen-diario-progress'

export function loadFromStorage<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) } as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(data: T): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count)
}

export function getToneMark(pinyin: string, tone: number): string {
  const toneMarks: Record<string, string[]> = {
    a: ['ā', 'á', 'ǎ', 'à', 'a'],
    e: ['ē', 'é', 'ě', 'è', 'e'],
    i: ['ī', 'í', 'ǐ', 'ì', 'i'],
    o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
    u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
    ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
  }

  if (tone === 5 || tone === 0) return pinyin

  const lower = pinyin.toLowerCase()
  const vowels = ['a', 'e', 'o', 'u', 'ü', 'v']
  let target = -1

  if (lower.includes('a')) target = lower.indexOf('a')
  else if (lower.includes('e')) target = lower.indexOf('e')
  else if (lower.includes('ou')) target = lower.indexOf('o')
  else {
    for (let i = lower.length - 1; i >= 0; i--) {
      if (vowels.includes(lower[i])) {
        target = i
        break
      }
    }
  }

  if (target === -1) return pinyin

  const char = lower[target] === 'v' ? 'ü' : lower[target]
  const marked = toneMarks[char]?.[tone - 1] ?? char
  return pinyin.slice(0, target) + marked + pinyin.slice(target + 1)
}
