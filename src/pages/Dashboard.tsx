import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Lock, Star } from 'lucide-react'
import { getMainLessons, getAppendices } from '../data/lessons'
import { useProgress } from '../context/ProgressContext'

export function Dashboard() {
  const { isLessonUnlocked, getLessonCompletion, streak, todayCharacters, dailyGoal, totalCharactersLearned } = useProgress()
  const mainLessons = getMainLessons()
  const appendices = getAppendices()

  const goalProgress = dailyGoal.type === 'characters'
    ? Math.min(100, (todayCharacters / dailyGoal.target) * 100)
    : 50

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 bg-gradient-to-br from-imperial-red via-red-700 to-red-900 text-white shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">¡Bienvenido de nuevo! 🐉</h2>
            <p className="opacity-90 mt-1">Tu camino hacia el chino mandarín</p>
          </div>
          <span className="text-4xl">🔥{streak}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{totalCharactersLearned}</p>
            <p className="text-xs opacity-80">Caracteres</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{streak}</p>
            <p className="text-xs opacity-80">Racha días</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{todayCharacters}/{dailyGoal.target}</p>
            <p className="text-xs opacity-80">Meta hoy</p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${goalProgress}%` }} />
        </div>
      </motion.section>

      <section>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">📚 Camino de aprendizaje</h3>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-imperial-red via-gold to-porcelain rounded-full" />
          <div className="space-y-4">
            {mainLessons.map((lesson, i) => {
              const unlocked = isLessonUnlocked(lesson.id)
              const pct = getLessonCompletion(lesson.id)
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="relative pl-14"
                >
                  <div className={`absolute left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm z-10 ${unlocked ? 'bg-imperial-red text-white shadow-lg' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    {unlocked ? lesson.emoji.split('').slice(0, 1) : <Lock size={14} />}
                  </div>
                  {unlocked ? (
                    <Link to={`/leccion/${lesson.id}`} className="block p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition border border-imperial-red/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{lesson.titulo}</p>
                          <p className="text-sm text-muted">{lesson.tema}</p>
                        </div>
                        <span className="text-2xl">{lesson.emoji}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                          <div className="h-full bg-imperial-red rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs">{pct}%</span>
                        {pct >= 80 && <Star size={14} className="text-gold fill-gold" />}
                      </div>
                    </Link>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 opacity-60">
                      <p className="font-bold">{lesson.titulo}</p>
                      <p className="text-sm">Completa el 80% de la lección anterior</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">📎 Apéndices</h3>
        <div className="grid grid-cols-2 gap-3">
          {appendices.map((a) => (
            <Link key={a.id} to={`/apendice/${a.apendiceId}`} className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow border border-porcelain/50 hover:border-imperial-red/30 transition">
              <span className="text-2xl">{a.emoji}</span>
              <p className="font-bold mt-1 text-sm">{a.titulo}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
