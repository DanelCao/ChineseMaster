import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import type { VocabItem } from '../types'
import { getToneMark } from '../lib/utils'
import { speakChinese } from '../lib/audio'

interface Props {
  item: VocabItem
  flipped?: boolean
  onFlip?: () => void
}

export function FlashCard3D({ item, flipped = false, onFlip }: Props) {
  const marked = getToneMark(item.pinyin, item.tono)

  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto cursor-pointer" onClick={onFlip}>
      <motion.div
        className="relative w-full h-72 preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 backface-hidden rounded-2xl card-3d flex flex-col items-center justify-center p-6 bg-gradient-to-br from-imperial-red to-red-800 text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-8xl font-serif drop-shadow-lg">{item.caracter}</span>
          <span className="mt-4 text-2xl opacity-90">{item.emoji_tema}</span>
        </div>
        <div
          className="absolute inset-0 backface-hidden rounded-2xl card-3d flex flex-col items-start justify-center p-6 bg-gradient-to-br from-porcelain to-blue-100 dark:from-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-3xl font-bold text-imperial-red">{marked}</p>
          <p className="text-lg mt-1">{item.significado_es}</p>
          <p className="text-sm mt-2 opacity-70">Trazos: {item.trazos} · Radicales: {item.radicales.join(' + ')}</p>
          {item.origen_pictografico && (
            <p className="text-xs mt-2 italic text-gold-dark">📜 {item.origen_pictografico}</p>
          )}
          {item.nota_cultural && <p className="text-xs mt-1 opacity-80">💡 {item.nota_cultural}</p>}
          <p className="mt-3 text-sm border-t pt-2 w-full">{item.ejemplos[0]?.chino}</p>
          <p className="text-xs opacity-70">{item.ejemplos[0]?.es}</p>
          <button
            type="button"
            className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-imperial-red text-white text-sm hover:bg-red-700"
            onClick={(e) => { e.stopPropagation(); speakChinese(item.caracter) }}
          >
            <Volume2 size={16} /> Escuchar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function AudioButton({ text, slow = false, label = '🔊' }: { text: string; slow?: boolean; label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold/20 hover:bg-gold/40 text-sm transition"
      onClick={() => speakChinese(text, slow ? 0.7 : 1)}
    >
      {label}
    </button>
  )
}
