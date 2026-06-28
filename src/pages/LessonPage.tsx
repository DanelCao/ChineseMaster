import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getLesson } from '../data/lessons'
import { getVocabByLesson } from '../data/vocabulary'
import { FlashCard3D } from '../components/FlashCard3D'
import { WritingGrid } from '../components/WritingGrid'
import { MemoryGame, TimedQuiz, ToneWheel, FillBlankGame, DictationGame, ConversationGame, RadicalBuilderGame } from '../components/games/MiniGames'
import { useProgress } from '../context/ProgressContext'
import { WORD_FORMATIONS } from '../data/achievements'

const TABS = ['Intro', 'Vocabulario', 'Escritura', 'Ejercicios', 'Juegos', 'Resumen'] as const

export function LessonPage() {
  const { id } = useParams()
  const lessonId = Number(id)
  const lesson = getLesson(lessonId)
  const vocab = getVocabByLesson(lessonId)
  const { completeLessonActivity, updateLessonProgress, getLessonCompletion, isLessonUnlocked } = useProgress()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Intro')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!lesson || !isLessonUnlocked(lessonId)) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">🔒</p>
        <p>Esta lección aún no está desbloqueada.</p>
        <Link to="/" className="text-imperial-red mt-4 inline-block">Volver al inicio</Link>
      </div>
    )
  }

  const current = vocab[cardIdx]
  const pct = getLessonCompletion(lessonId)

  function nextCard() { setFlipped(false); setCardIdx((i) => (i + 1) % vocab.length) }
  function prevCard() { setFlipped(false); setCardIdx((i) => (i - 1 + vocab.length) % vocab.length) }

  function onGameComplete(score: number) {
    completeLessonActivity(lessonId, 2, 5)
    updateLessonProgress(lessonId, { gamesPlayed: 1, pronunciationAccuracy: score })
  }

  return (
    <div>
      <Link to="/" className="text-sm text-imperial-red flex items-center gap-1 mb-4"><ChevronLeft size={16} /> Volver</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{lesson.emoji}</span>
        <div>
          <h2 className="text-2xl font-bold">{lesson.titulo}</h2>
          <p className="text-muted">{lesson.tema}</p>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto mb-6 pb-1">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${tab === t ? 'bg-imperial-red text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {tab === 'Intro' && (
            <div className="text-center py-8 space-y-4">
              <motion.span className="text-8xl block" animate={{ rotateY: [0, 360] }} transition={{ duration: 2 }}>{lesson.emoji}</motion.span>
              <h3 className="text-xl font-bold">{lesson.objetivo}</h3>
              <p className="text-muted">{vocab.length} caracteres · Progreso: {pct}%</p>
              <button type="button" className="px-6 py-3 rounded-xl bg-imperial-red text-white font-bold" onClick={() => setTab('Vocabulario')}>
                Comenzar lección →
              </button>
            </div>
          )}

          {tab === 'Vocabulario' && current && (
            <div>
              <FlashCard3D item={current} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
              <div className="flex justify-center gap-4 mt-6">
                <button type="button" onClick={prevCard} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700"><ChevronLeft /></button>
                <span className="self-center text-sm">{cardIdx + 1}/{vocab.length}</span>
                <button type="button" onClick={() => { nextCard(); completeLessonActivity(lessonId, 1, 2) }} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700"><ChevronRight /></button>
              </div>
            </div>
          )}

          {tab === 'Escritura' && (
            <WritingGrid character={current?.caracter ?? '一'} onAccuracy={(s) => { updateLessonProgress(lessonId, { writingAccuracy: s }); completeLessonActivity(lessonId, 1, 3) }} />
          )}

          {tab === 'Ejercicios' && (
            <div className="space-y-8">
              <ExerciseBlock title="1. Añadir radical" desc="Combina radical + carácter base">
                <RadicalBuilderGame onComplete={onGameComplete} />
              </ExerciseBlock>
              <ExerciseBlock title="4. Formación de palabras (组词)" desc={`Base: ${WORD_FORMATIONS[0]?.base}`}>
                <div className="flex flex-wrap gap-2 justify-center">
                  {WORD_FORMATIONS[0]?.words.map((w, i) => (
                    <span key={w} className="px-4 py-2 rounded-xl bg-gold/30 text-lg font-serif">{w} — {WORD_FORMATIONS[0].meanings[i]}</span>
                  ))}
                </div>
              </ExerciseBlock>
              <ExerciseBlock title="5. Dictado pinyin → carácter" desc="Escucha y escribe">
                <DictationGame vocab={vocab} onComplete={onGameComplete} />
              </ExerciseBlock>
              <ExerciseBlock title="6. Inferencia de significado (猜一猜)" desc="Adivina antes de revelar">
                <FillBlankGame vocab={vocab} onComplete={onGameComplete} />
              </ExerciseBlock>
            </div>
          )}

          {tab === 'Juegos' && (
            <div className="space-y-8">
              <GameBlock title="🧠 Memorama"><MemoryGame vocab={vocab} onComplete={onGameComplete} /></GameBlock>
              <GameBlock title="⏱️ Carrera contrarreloj"><TimedQuiz vocab={vocab} onComplete={onGameComplete} /></GameBlock>
              <GameBlock title="🎵 Rueda de tonos"><ToneWheel vocab={vocab} onComplete={onGameComplete} /></GameBlock>
              <GameBlock title="💬 Conversación simulada"><ConversationGame vocab={vocab} onComplete={onGameComplete} /></GameBlock>
            </div>
          )}

          {tab === 'Resumen' && (
            <div className="text-center py-8 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">⭐</motion.div>
              <h3 className="text-2xl font-bold">¡Lección completada!</h3>
              <p>Progreso: {pct}% · {vocab.length} caracteres estudiados</p>
              <div className="flex justify-center gap-1">
                {[1,2,3].map((s) => <span key={s} className={`text-3xl ${pct >= s * 30 ? '' : 'opacity-30'}`}>⭐</span>)}
              </div>
              <button type="button" className="px-6 py-3 rounded-xl bg-gold text-slate-900 font-bold" onClick={() => completeLessonActivity(lessonId, 5, 10)}>
                Marcar sesión completada
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ExerciseBlock({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-muted mb-4">{desc}</p>
      {children}
    </div>
  )
}

function GameBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
      <h4 className="font-bold mb-4">{title}</h4>
      {children}
    </div>
  )
}
