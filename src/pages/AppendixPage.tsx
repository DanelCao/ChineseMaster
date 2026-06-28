import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BASIC_STROKES, COMMON_RADICALS } from '../data/achievements'
import { getCharacterIndex, searchCharacters } from '../data/vocabulary'

export function AppendixPage() {
  const { id } = useParams()
  const [query, setQuery] = useState('')

  if (id === 'A') {
    const results = searchCharacters(query)
    const index = getCharacterIndex()
    const display = query ? results.map((v) => ({ caracter: v.caracter, pinyin: v.pinyin, significado: v.significado_es, leccion: v.leccion })) : index
    return (
      <div className="space-y-4">
        <Link to="/" className="text-imperial-red text-sm">← Inicio</Link>
        <h2 className="text-2xl font-bold">🔍 汉字索引 — Índice de caracteres</h2>
        <input className="w-full p-3 rounded-xl border border-imperial-red/30 bg-white dark:bg-slate-800" placeholder="Buscar carácter, pinyin o significado..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <p className="text-sm text-muted">{index.length} caracteres en el curso</p>
        <div className="grid gap-2 max-h-[60vh] overflow-y-auto">
          {(query ? display : index.slice(0, 50)).map((v, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <span className="text-2xl font-serif w-10">{v.caracter}</span>
              <div className="flex-1">
                <p className="font-medium">{v.pinyin}</p>
                <p className="text-sm text-muted">{v.significado}</p>
              </div>
              <Link to={`/leccion/${v.leccion}`} className="text-xs text-imperial-red">L.{v.leccion}</Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'B') {
    return (
      <div className="space-y-4">
        <Link to="/" className="text-imperial-red text-sm">← Inicio</Link>
        <h2 className="text-2xl font-bold">✍️ Trazos fundamentales</h2>
        <div className="grid gap-3">
          {BASIC_STROKES.map((s) => (
            <div key={s.nombre} className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow flex items-center gap-4">
              <span className="text-4xl font-serif text-imperial-red">{s.simbolo}</span>
              <div>
                <p className="font-bold">{s.nombre}</p>
                <p className="text-sm text-muted">{s.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'C') {
    return (
      <div className="space-y-4">
        <Link to="/" className="text-imperial-red text-sm">← Inicio</Link>
        <h2 className="text-2xl font-bold">🧩 Radicales comunes</h2>
        <div className="grid grid-cols-2 gap-3">
          {COMMON_RADICALS.map((r) => (
            <div key={r.radical} className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
              <span className="text-3xl font-serif text-imperial-red">{r.radical}</span>
              <p className="font-bold mt-1">{r.significado}</p>
              <p className="text-sm">{r.ejemplo} — {r.ejemploSignificado}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'D') {
    return (
      <div className="space-y-4">
        <Link to="/" className="text-imperial-red text-sm">← Inicio</Link>
        <h2 className="text-2xl font-bold">✅ Banco de respuestas</h2>
        <p className="text-muted">Autoevaluación: completa los ejercicios en cada lección y revisa tus respuestas en la pestaña Resumen.</p>
        <div className="p-4 rounded-xl bg-gold/20">
          <p className="font-bold">Respuestas clave de radicales:</p>
          <p className="mt-2">也 + 女 = 她 (ella) · 青 + 氵 = 清 (claro) · 子 + 女 = 好 (bueno)</p>
        </div>
      </div>
    )
  }

  return <p>Apéndice no encontrado</p>
}
