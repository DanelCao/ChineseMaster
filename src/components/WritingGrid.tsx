import { useRef, useEffect, useState } from 'react'
import { Eraser } from 'lucide-react'

interface Props {
  character?: string
  onAccuracy?: (score: number) => void
}

export function WritingGrid({ character = '一', onAccuracy }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [strokes, setStrokes] = useState<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const size = 280
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)
    drawGrid(ctx, size)
  }, [])

  function drawGrid(ctx: CanvasRenderingContext2D, size: number) {
    ctx.clearRect(0, 0, size, size)
    ctx.strokeStyle = '#c41e3a33'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, size, size)
    ctx.beginPath()
    ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size)
    ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2)
    ctx.moveTo(0, 0); ctx.lineTo(size, size)
    ctx.moveTo(size, 0); ctx.lineTo(0, size)
    ctx.stroke()
    ctx.fillStyle = '#c41e3a22'
    ctx.font = '120px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(character, size / 2, size / 2)
  }

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    setDrawing(true)
    setStrokes((s) => s + 1)
    const ctx = canvasRef.current!.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = '#1a1a2e'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing) return
    e.preventDefault()
    const ctx = canvasRef.current!.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function endDraw() {
    if (drawing && strokes > 0) {
      const score = Math.min(100, 60 + strokes * 8)
      onAccuracy?.(score)
    }
    setDrawing(false)
  }

  function clear() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    drawGrid(ctx, 280)
    setStrokes(0)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted">Cuadrícula 米字格 — Calca el carácter: <strong>{character}</strong></p>
      <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-imperial-red/30">
        <canvas
          ref={canvasRef}
          className="touch-none bg-white cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      <button type="button" onClick={clear} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm">
        <Eraser size={16} /> Borrar
      </button>
    </div>
  )
}
