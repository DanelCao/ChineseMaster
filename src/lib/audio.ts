let voicesLoaded = false
let zhVoice: SpeechSynthesisVoice | null = null

function loadVoices(): void {
  if (voicesLoaded) return
  const voices = speechSynthesis.getVoices()
  zhVoice =
    voices.find((v) => v.lang.startsWith('zh') && v.name.includes('Google')) ??
    voices.find((v) => v.lang.startsWith('zh-CN')) ??
    voices.find((v) => v.lang.startsWith('zh')) ??
    null
  voicesLoaded = true
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = loadVoices
  loadVoices()
}

export function speakChinese(text: string, rate = 1): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('TTS no disponible'))
      return
    }
    loadVoices()
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = rate
    if (zhVoice) utterance.voice = zhVoice
    utterance.onend = () => resolve()
    utterance.onerror = () => reject(new Error('Error de audio'))
    speechSynthesis.speak(utterance)
  })
}

export function speakSpanish(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve()
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-ES'
    utterance.rate = 0.95
    utterance.onend = () => resolve()
    speechSynthesis.speak(utterance)
  })
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}

export function isSpeechRecognitionSupported(): boolean {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

export function listenChinese(onResult: (text: string, confidence: number) => void, onError?: (msg: string) => void): () => void {
  const Win = window as Window & { webkitSpeechRecognition?: new () => SpeechRecognition; SpeechRecognition?: new () => SpeechRecognition }
  const SpeechRecognitionCtor = Win.webkitSpeechRecognition ?? Win.SpeechRecognition
  if (!SpeechRecognitionCtor) {
    onError?.('Reconocimiento de voz no disponible en este navegador')
    return () => {}
  }

  const recognition = new SpeechRecognitionCtor()
  recognition.lang = 'zh-CN'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[0][0]
    onResult(result.transcript, result.confidence)
  }

  recognition.onerror = () => onError?.('No se pudo reconocer la voz')

  recognition.start()
  return () => recognition.stop()
}

export async function shadowingMode(items: { text: string; pinyin: string; meaning: string }[], rate = 0.85): Promise<void> {
  for (const item of items) {
    await speakChinese(item.text, rate)
    await new Promise((r) => setTimeout(r, 800))
  }
}

export async function audioOnlySession(items: { text: string; pinyin: string; meaning: string }[]): Promise<void> {
  for (const item of items) {
    await speakChinese(`${item.text}。${item.pinyin}`, 0.8)
    await speakSpanish(item.meaning)
    await new Promise((r) => setTimeout(r, 1200))
  }
}
