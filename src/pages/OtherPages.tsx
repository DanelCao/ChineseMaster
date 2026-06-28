import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { getVocabByLesson } from '../data/vocabulary'
import { MemoryGame, DictationGame, ToneWheel } from '../components/games/MiniGames'
import { FlashCard3D } from '../components/FlashCard3D'
import { WritingGrid } from '../components/WritingGrid'
import { speakChinese } from '../lib/audio'

const STEPS = [
  { name: 'Calentamiento', emoji: '🔥', mins: 2 },
  { name: 'Contenido nuevo', emoji: '📖', mins: 10 },
  { name: 'Escritura', emoji: '✍️', mins: 5 },
  { name: 'Minijuego', emoji: '🎮', mins: 5 },
  { name: 'Conversación', emoji: '💬', mins: 3 },
  { name: 'Resumen', emoji: '⭐', mins: 2 },
]

export function DailySession() {
  const { currentLesson, completeLessonActivity } = useProgress()
  const [step, setStep] = useState(0)
  const vocab = getVocabByLesson(currentLesson)
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const current = STEPS[step]
  const item = vocab[cardIdx]

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else completeLessonActivity(currentLesson, 8, 25)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">📅 Sesión diaria</h2>
        <p className="text-muted">Rutina recomendada · 15-30 min</p>
      </div>

      <div className="flex gap-1">
        {STEPS.map((s, i) => (
          <div key={s.name} className={`flex-1 h-1.5 rounded-full ${i <= step ? 'bg-imperial-red' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-xl font-bold mb-1">{current.emoji} {current.name}</h3>
        <p className="text-sm text-muted mb-6">~{current.mins} min</p>

        {step === 0 && <MemoryGame vocab={vocab.slice(0, 10)} onComplete={() => next()} />}
        {step === 1 && item && (
          <div>
            <FlashCard3D item={item} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
            <div className="flex justify-center gap-3 mt-4">
              <button type="button" className="px-4 py-2 rounded-lg bg-imperial-red text-white" onClick={() => speakChinese(item.caracter, 0.7)}>🔊 Shadowing</button>
              <button type="button" className="px-4 py-2 rounded-lg bg-gold" onClick={() => { setCardIdx((i) => i + 1); setFlipped(false) }}>Siguiente →</button>
            </div>
          </div>
        )}
        {step === 2 && <WritingGrid character={item?.caracter} onAccuracy={() => next()} />}
        {step === 3 && <ToneWheel vocab={vocab} onComplete={() => next()} />}
        {step === 4 && <DictationGame vocab={vocab.slice(0, 5)} onComplete={() => next()} />}
        {step === 5 && (
          <div className="text-center space-y-4">
            <p className="text-5xl">🎉</p>
            <p className="text-xl font-bold">¡Sesión completada!</p>
            <button type="button" className="px-6 py-3 rounded-xl bg-imperial-red text-white" onClick={() => { completeLessonActivity(currentLesson, 8, 25); setStep(0) }}>
              Finalizar
            </button>
          </div>
        )}

        {step < 5 && step !== 1 && step !== 2 && step !== 3 && step !== 4 && (
          <button type="button" className="mt-4 w-full py-2 rounded-lg bg-slate-200 dark:bg-slate-700" onClick={next}>Continuar →</button>
        )}
      </motion.div>

      <Link to={`/leccion/${currentLesson}`} className="block text-center text-imperial-red text-sm">
        Ir a Lección {currentLesson} completa →
      </Link>
    </div>
  )
}

export function GamesHub() {
  const { currentLesson } = useProgress()
  const vocab = getVocabByLesson(currentLesson)
  const [game, setGame] = useState<string | null>(null)
  const games = [
    { id: 'memory', name: '🧠 Memorama', comp: MemoryGame },
    { id: 'tone', name: '🎵 Rueda de tonos', comp: ToneWheel },
    { id: 'dictation', name: '🎧 Dictado', comp: DictationGame },
  ]

  const selected = games.find((g) => g.id === game)
  const GameComp = selected?.comp

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🎮 Minijuegos</h2>
      <p className="text-muted">Vocabulario de Lección {currentLesson}</p>
      {!game ? (
        <div className="grid grid-cols-2 gap-3">
          {games.map((g) => (
            <button key={g.id} type="button" onClick={() => setGame(g.id)} className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow hover:shadow-lg transition text-lg font-bold">
              {g.name}
            </button>
          ))}
        </div>
      ) : GameComp ? (
        <div>
          <button type="button" className="text-sm text-imperial-red mb-4" onClick={() => setGame(null)}>← Volver</button>
          <GameComp vocab={vocab} onComplete={() => setGame(null)} />
        </div>
      ) : null}
    </div>
  )
}

export function Achievements() {
  const { achievements, streak, totalCharactersLearned, writingAccuracyGlobal } = useProgress()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🏆 Logros</h2>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl shadow ${a.unlocked ? 'bg-gradient-to-br from-gold/40 to-gold/10 border-2 border-gold' : 'bg-slate-100 dark:bg-slate-800 opacity-50'}`}
          >
            <span className="text-3xl">{a.emoji}</span>
            <p className="font-bold mt-2 text-sm">{a.titulo}</p>
            <p className="text-xs text-muted">{a.descripcion}</p>
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
        <h3 className="font-bold mb-3">📊 Estadísticas</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <p>🔥 Racha: <strong>{streak} días</strong></p>
          <p>🈵 Caracteres: <strong>{totalCharactersLearned}</strong></p>
          <p>✍️ Escritura: <strong>{writingAccuracyGlobal}%</strong></p>
        </div>
      </div>
    </div>
  )
}

export function Settings() {
  const { dailyGoal, setDailyGoal, reminderEnabled, reminderHour, darkMode, toggleDarkMode } = useProgress()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">⚙️ Ajustes</h2>
      <section className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow space-y-4">
        <h3 className="font-bold">Meta diaria</h3>
        <div className="flex gap-2">
          {[10, 20, 30].map((n) => (
            <button key={n} type="button" onClick={() => setDailyGoal({ type: 'characters', target: n })} className={`px-4 py-2 rounded-lg ${dailyGoal.target === n ? 'bg-imperial-red text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
              {n} chars
            </button>
          ))}
        </div>
      </section>
      <section className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
        <button type="button" onClick={toggleDarkMode} className="w-full text-left">
          {darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </section>
      <section className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
        <p className="text-sm text-muted">🔔 Recordatorio diario: {reminderEnabled ? `activado (${reminderHour}:00)` : 'desactivado'}</p>
        <p className="text-xs text-muted mt-2">Los recordatorios push requieren permiso del navegador.</p>
      </section>
    </div>
  )
}
