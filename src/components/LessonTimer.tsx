import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Timer, Volume2 } from 'lucide-react'

interface LessonTimerProps {
  durationMinutes: number
}

function playTimerEndSound() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const now = ctx.currentTime

  const melody = [
    { freq: 523.25, start: 0, dur: 0.2 },
    { freq: 659.25, start: 0.25, dur: 0.2 },
    { freq: 783.99, start: 0.5, dur: 0.2 },
    { freq: 1046.5, start: 0.75, dur: 0.5 },
    { freq: 783.99, start: 1.4, dur: 0.15 },
    { freq: 1046.5, start: 1.6, dur: 0.6 },
  ]

  melody.forEach(({ freq, start, dur }) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now + start)
    gain.gain.setValueAtTime(0, now + start)
    gain.gain.linearRampToValueAtTime(0.25, now + start + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now + start)
    osc.stop(now + start + dur + 0.1)
  })
}

function playTickSound() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1200, now)
  gain.gain.setValueAtTime(0.08, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.06)
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function LessonTimer({ durationMinutes }: LessonTimerProps) {
  const totalSeconds = durationMinutes * 60
  const [remaining, setRemaining] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const progress = 1 - remaining / totalSeconds
  const circumference = 2 * Math.PI * 54

  const stop = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (isFinished) return
    setIsRunning(true)
  }, [isFinished])

  const reset = useCallback(() => {
    stop()
    setRemaining(totalSeconds)
    setIsFinished(false)
  }, [stop, totalSeconds])

  const toggle = useCallback(() => {
    if (isRunning) stop()
    else start()
  }, [isRunning, stop, start])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stop()
          setIsFinished(true)
          playTimerEndSound()
          return 0
        }
        if (prev <= 11 && prev > 1) {
          playTickSound()
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, stop])

  useEffect(() => {
    setRemaining(totalSeconds)
    setIsFinished(false)
    setIsRunning(false)
  }, [totalSeconds])

  return (
    <div className={`bg-white rounded-2xl border shadow-sm transition-all duration-500 ${isFinished ? 'border-green-300 shadow-green-100' : isRunning ? 'border-brand-300 shadow-brand-100' : 'border-surface-200'}`}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Timer size={16} className="text-brand-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-surface-400">
            Timer lezione
          </span>
        </div>

        <div className="flex items-center gap-5">
          {/* Circular progress */}
          <div className="relative shrink-0">
            <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#eeebe6"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={isFinished ? '#22c55e' : isRunning ? '#e88a10' : '#b5aea5'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-display text-3xl tracking-wider ${isFinished ? 'text-green-500' : 'text-surface-800'}`}>
                {formatTime(remaining)}
              </span>
              {isFinished && (
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
                  Finito!
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-2 flex-1">
            <button
              onClick={toggle}
              disabled={isFinished}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                isFinished
                  ? 'bg-green-50 text-green-500 border border-green-200 cursor-default'
                  : isRunning
                    ? 'bg-surface-100 text-surface-700 border border-surface-200 hover:bg-surface-200'
                    : 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm'
              }`}
            >
              {isFinished ? (
                <>
                  <Volume2 size={16} />
                  Sessione completata
                </>
              ) : isRunning ? (
                <>
                  <Pause size={16} />
                  Pausa
                </>
              ) : (
                <>
                  <Play size={16} />
                  {remaining < totalSeconds ? 'Riprendi' : 'Inizia'}
                </>
              )}
            </button>

            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-all"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <p className="text-[11px] text-surface-300 text-center mt-0.5">
              {durationMinutes} min di pratica
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
