import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VocabItem } from '../../types'
import { shuffle, pickRandom } from '../../lib/utils'
import { speakChinese } from '../../lib/audio'

type GameProps = { vocab: VocabItem[]; onComplete?: (score: number) => void }

export function MemoryGame({ vocab, onComplete }: GameProps) {
  const items = useMemo(() => pickRandom(vocab, Math.min(6, vocab.length)), [vocab])
  const pairs = useMemo(() => shuffle(items.flatMap((v) => [
    { id: `${v.id}-c`, match: v.id, text: v.caracter, type: 'char' as const },
    { id: `${v.id}-p`, match: v.id, text: v.pinyin, type: 'py' as const },
  ])), [items])
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [score, setScore] = useState(0)

  function click(id: string, match: string) {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(match)) return
    const next = [...flipped, id]
    setFlipped(next)
    if (next.length === 2) {
      const [a, b] = next.map((fid) => pairs.find((p) => p.id === fid)!)
      if (a.match === b.match) {
        setMatched((m) => [...m, a.match])
        setScore((s) => s + 1)
        setFlipped([])
        if (matched.length + 1 === items.length) onComplete?.(100)
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {pairs.map((p) => {
        const isOpen = flipped.includes(p.id) || matched.includes(p.match)
        return (
          <motion.button
            key={p.id}
            type="button"
            className={`h-20 rounded-xl text-lg font-bold transition ${isOpen ? 'bg-imperial-red text-white' : 'bg-gold/30 hover:bg-gold/50'}`}
            onClick={() => click(p.id, p.match)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? p.text : '🀄'}
          </motion.button>
        )
      })}
      <p className="col-span-full text-center text-sm mt-2">Parejas: {score}/{items.length}</p>
    </div>
  )
}

export function TimedQuiz({ vocab, onComplete }: GameProps) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(8)
  const item = vocab[idx % vocab.length]
  const options = useMemo(() => {
    const wrong = pickRandom(vocab.filter((v) => v.id !== item.id), 3)
    return shuffle([item, ...wrong])
  }, [item, vocab])

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((tl) => (tl <= 1 ? 8 : tl - 1)), 1000)
    return () => clearInterval(t)
  }, [idx])

  function answer(v: VocabItem) {
    if (v.id === item.id) setScore((s) => s + 1)
    if (idx + 1 >= Math.min(10, vocab.length)) onComplete?.(score * 10)
    else { setIdx((i) => i + 1); setTimeLeft(8) }
  }

  return (
    <div className="text-center">
      <p className="text-sm mb-2">⏱️ {timeLeft}s</p>
      <p className="text-7xl font-serif mb-6">{item.caracter}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button key={o.id} type="button" className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow hover:shadow-md" onClick={() => answer(o)}>
            {o.significado_es}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ToneWheel({ vocab, onComplete }: GameProps) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const item = vocab[idx % vocab.length]
  const tones = [
    { t: 1, label: '1º 平 →', color: 'bg-red-500' },
    { t: 2, label: '2º 升 ↗', color: 'bg-orange-500' },
    { t: 3, label: '3º 拐 ↘↗', color: 'bg-green-500' },
    { t: 4, label: '4º 降 ↘', color: 'bg-blue-500' },
  ]

  function pick(t: number) {
    if (t === item.tono) setScore((s) => s + 1)
    speakChinese(item.caracter)
    if (idx + 1 >= 8) onComplete?.(score * 12)
    else setIdx((i) => i + 1)
  }

  return (
    <div className="text-center">
      <p className="mb-4">🎵 Escucha y elige el tono de: <strong>{item.caracter}</strong></p>
      <button type="button" className="mb-6 px-6 py-2 rounded-full bg-imperial-red text-white" onClick={() => speakChinese(item.caracter)}>
        🔊 Reproducir
      </button>
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {tones.map((tn) => (
          <button key={tn.t} type="button" className={`p-4 rounded-xl text-white font-bold ${tn.color}`} onClick={() => pick(tn.t)}>
            {tn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function FillBlankGame({ vocab, onComplete }: GameProps) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const item = vocab[idx % vocab.length]
  const ex = item.ejemplos[0]
  const blanked = ex?.chino.replace(item.caracter, '___') ?? ''
  const options = shuffle([item, ...pickRandom(vocab.filter((v) => v.id !== item.id), 3)])

  function pick(v: VocabItem) {
    if (v.id === item.id) setScore((s) => s + 1)
    if (idx + 1 >= 8) onComplete?.(score * 12)
    else setIdx((i) => i + 1)
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <p className="text-2xl mb-4 font-serif">{blanked}</p>
      <p className="text-sm text-muted mb-6">{ex?.es}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button key={o.id} type="button" className="p-4 text-3xl rounded-xl bg-gold/20 hover:bg-gold/40" onClick={() => pick(o)}>
            {o.caracter}
          </button>
        ))}
      </div>
    </div>
  )
}

export function EmojiMatchGame({ vocab, onComplete }: GameProps) {
  const items = pickRandom(vocab.filter((v) => v.emoji_tema), 6)
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const emojis = shuffle(items.map((v) => ({ id: v.id, emoji: v.emoji_tema! })))

  function pickChar(id: string) {
    if (matched.includes(id)) return
    if (!selected) setSelected(id)
    else {
      if (selected === id) { setMatched((m) => [...m, id]); if (matched.length + 1 === items.length) onComplete?.(100) }
      setSelected(null)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="grid grid-cols-3 gap-3">
        {items.map((v) => (
          <button key={v.id} type="button" className={`p-4 text-3xl rounded-xl ${matched.includes(v.id) ? 'bg-green-200' : selected === v.id ? 'ring-2 ring-imperial-red' : 'bg-white dark:bg-slate-800'}`} onClick={() => pickChar(v.id)}>
            {v.caracter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {emojis.map((e) => (
          <div key={e.id} className="p-4 text-3xl rounded-xl bg-gold/20 text-center">{e.emoji}</div>
        ))}
      </div>
    </div>
  )
}

export function RadicalBuilderGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const pairs = [
    { base: '也', radical: '女', result: '她', meaning: 'ella' },
    { base: '青', radical: '氵', result: '清', meaning: 'claro' },
    { base: '子', radical: '女', result: '好', meaning: 'bueno' },
  ]
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const p = pairs[idx]

  function pick(r: string) {
    if (r === p.radical) {
      if (idx + 1 >= pairs.length) onComplete?.(100)
      else { setIdx((i) => i + 1); setSelected(null) }
    } else setSelected(r)
  }

  return (
    <div className="text-center">
      <p className="mb-4">🧩 Arrastra el radical correcto a: <span className="text-4xl">{p.base}</span> = ?</p>
      <div className="flex justify-center gap-4 mb-6">
        {['女', '氵', '木', '口'].map((r) => (
          <button key={r} type="button" className={`text-4xl p-4 rounded-xl ${selected === r ? 'ring-2 ring-imperial-red' : ''} bg-gold/30`} onClick={() => pick(r)}>
            {r}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected === p.radical && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl font-serif text-imperial-red">
            {p.result} — {p.meaning}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ConversationGame({ vocab, onComplete }: GameProps) {
  const dialogs = [
    { q: '您好！您贵姓？', a: '我姓王', vocabId: vocab.find((v) => v.caracter.includes('王'))?.id },
    { q: '你好吗？', a: '很好', vocabId: vocab.find((v) => v.caracter === '好')?.id },
  ]
  const [idx, setIdx] = useState(0)
  const d = dialogs[idx % dialogs.length]

  function respond(text: string) {
    speakChinese(text)
    if (idx + 1 >= dialogs.length) onComplete?.(100)
    else setIdx((i) => i + 1)
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl rounded-bl-none p-4 self-start">{d.q}</div>
      <div className="flex flex-wrap gap-2 justify-end">
        {vocab.slice(0, 4).map((v) => (
          <button key={v.id} type="button" className="px-4 py-2 rounded-2xl rounded-br-none bg-imperial-red text-white" onClick={() => respond(v.caracter)}>
            {v.caracter}
          </button>
        ))}
        <button type="button" className="px-4 py-2 rounded-2xl bg-gold text-slate-900" onClick={() => respond(d.a)}>
          {d.a}
        </button>
      </div>
    </div>
  )
}

export function DictationGame({ vocab, onComplete }: GameProps) {
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const item = vocab[idx % vocab.length]

  function check() {
    if (input.trim() === item.caracter) setScore((s) => s + 1)
    setInput('')
    if (idx + 1 >= 8) onComplete?.(score * 12)
    else setIdx((i) => i + 1)
  }

  return (
    <div className="text-center max-w-sm mx-auto">
      <button type="button" className="mb-4 px-6 py-3 rounded-full bg-imperial-red text-white text-lg" onClick={() => speakChinese(item.caracter, 0.7)}>
        🎧 Escuchar ({item.pinyin})
      </button>
      <input
        className="w-full text-center text-4xl p-4 border-2 border-imperial-red/30 rounded-xl bg-white dark:bg-slate-800"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="写汉字..."
      />
      <button type="button" className="mt-4 px-6 py-2 rounded-lg bg-gold text-slate-900 font-bold" onClick={check}>Comprobar</button>
    </div>
  )
}
