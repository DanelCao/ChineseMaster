import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Gamepad2, Trophy, Settings, Sun, Moon } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const { streak, darkMode, toggleDarkMode } = useProgress()

  const nav = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/sesion', icon: BookOpen, label: 'Estudiar' },
    { to: '/juegos', icon: Gamepad2, label: 'Juegos' },
    { to: '/logros', icon: Trophy, label: 'Logros' },
    { to: '/ajustes', icon: Settings, label: 'Ajustes' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-imperial-red/20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐼</span>
            <div>
              <h1 className="font-bold text-lg leading-tight text-imperial-red">ZhongWén Diario</h1>
              <p className="text-xs text-muted">当代中文 · Chino Contemporáneo</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-orange-500">🔥 {streak}</span>
            <button type="button" onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-imperial-red/20">
        <div className="max-w-5xl mx-auto flex justify-around py-2">
          {nav.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs transition ${pathname === to ? 'text-imperial-red font-bold' : 'text-muted'}`}
            >
              <Icon size={22} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
