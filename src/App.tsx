import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { LessonPage } from './pages/LessonPage'
import { DailySession, GamesHub, Achievements, Settings } from './pages/OtherPages'
import { AppendixPage } from './pages/AppendixPage'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leccion/:id" element={<LessonPage />} />
            <Route path="/sesion" element={<DailySession />} />
            <Route path="/juegos" element={<GamesHub />} />
            <Route path="/logros" element={<Achievements />} />
            <Route path="/ajustes" element={<Settings />} />
            <Route path="/apendice/:id" element={<AppendixPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProgressProvider>
  )
}
