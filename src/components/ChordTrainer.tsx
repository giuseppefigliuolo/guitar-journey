import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, Settings, Shuffle, Volume2, VolumeX, History } from 'lucide-react'
import { chordMap } from '../data/chords'

interface ChordTrainerProps {
  chordIds: string[]
}

function getChordLabel(id: string): string {
  return chordMap.get(id)?.nameIT ?? id
}

function getChordColor(id: string): string {
  return chordMap.get(id)?.color ?? '#e88a10'
}

function speakChord(name: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(name)
  utterance.lang = 'it-IT'
  utterance.rate = 0.9
  utterance.pitch = 1.0
  utterance.volume = 1.0

  const voices = window.speechSynthesis.getVoices()
  const italianVoice = voices.find((v) => v.lang.startsWith('it'))
  if (italianVoice) utterance.voice = italianVoice

  window.speechSynthesis.speak(utterance)
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.15)
  } catch {
    // ignore
  }
}

export default function ChordTrainer({ chordIds }: ChordTrainerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [intervalSec, setIntervalSec] = useState(5)
  const [currentChord, setCurrentChord] = useState<string | null>(null)
  const [nextChord, setNextChord] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [flash, setFlash] = useState(false)

  const isPlayingRef = useRef(false)
  const intervalRef = useRef(intervalSec)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextChordRef = useRef<string | null>(null)

  useEffect(() => {
    intervalRef.current = intervalSec
  }, [intervalSec])

  const getRandomChord = useCallback(
    (exclude?: string | null) => {
      if (chordIds.length <= 1) return chordIds[0] ?? ''
      const pool = chordIds.filter((c) => c !== exclude)
      return pool[Math.floor(Math.random() * pool.length)]
    },
    [chordIds],
  )

  const step = useCallback(() => {
    if (!isPlayingRef.current) return

    const chord = nextChordRef.current ?? getRandomChord()
    const upcoming = getRandomChord(chord)
    nextChordRef.current = upcoming

    setCurrentChord(chord)
    setNextChord(upcoming)
    setHistory((prev) => [chord, ...prev].slice(0, 6))

    setFlash(true)
    setTimeout(() => setFlash(false), 300)

    playBeep()
    if (voiceEnabled) {
      setTimeout(() => speakChord(getChordLabel(chord)), 120)
    }

    timerRef.current = setTimeout(step, intervalRef.current * 1000)
  }, [getRandomChord, voiceEnabled])

  const start = useCallback(() => {
    isPlayingRef.current = true
    setIsPlaying(true)
    nextChordRef.current = null
    step()
  }, [step])

  const stop = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    window.speechSynthesis?.cancel()
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) stop()
    else start()
  }, [isPlaying, start, stop])

  useEffect(() => {
    // Preload voices
    window.speechSynthesis?.getVoices()
    return () => {
      isPlayingRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Restart loop when voiceEnabled changes while playing
  useEffect(() => {
    if (isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(step, intervalRef.current * 1000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceEnabled])

  if (chordIds.length < 2) return null

  const currentColor = currentChord ? getChordColor(currentChord) : '#e88a10'

  return (
    <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle size={16} className="text-brand-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-surface-400">
            Chord Trainer
          </span>
        </div>
        <button
          onClick={() => setVoiceEnabled((v) => !v)}
          className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors"
          title={voiceEnabled ? 'Disattiva voce' : 'Attiva voce'}
        >
          {voiceEnabled ? (
            <Volume2 size={16} className="text-surface-400" />
          ) : (
            <VolumeX size={16} className="text-surface-300" />
          )}
        </button>
      </div>

      {/* Current chord display */}
      <div
        className="relative mx-4 mb-4 rounded-xl py-8 flex flex-col items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: `${currentColor}08`,
          borderWidth: 1,
          borderColor: `${currentColor}25`,
        }}
      >
        {/* Flash overlay */}
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: currentColor,
            opacity: flash ? 0.1 : 0,
          }}
        />

        <span className="text-[10px] uppercase tracking-widest text-surface-400 mb-2">
          Suona adesso
        </span>
        <span
          className="font-display text-5xl sm:text-6xl tracking-wide transition-all duration-200"
          style={{ color: currentChord ? currentColor : undefined }}
        >
          {currentChord ? getChordLabel(currentChord).toUpperCase() : 'PRONTO?'}
        </span>
        <span className="text-xs text-surface-400 mt-2">
          {isPlaying ? 'Cambia accordo!' : 'Premi Inizia per partire'}
        </span>
      </div>

      {/* Next + History */}
      <div className="grid grid-cols-2 gap-3 mx-4 mb-4">
        <div className="bg-surface-50 rounded-xl p-3 border border-surface-100">
          <span className="text-[10px] uppercase tracking-widest text-surface-400 block mb-1">
            In arrivo
          </span>
          <span className="font-semibold text-sm" style={{ color: nextChord ? getChordColor(nextChord) : undefined }}>
            {isPlaying && nextChord ? getChordLabel(nextChord) : '---'}
          </span>
        </div>
        <div className="bg-surface-50 rounded-xl p-3 border border-surface-100">
          <div className="flex items-center gap-1 mb-1">
            <History size={10} className="text-surface-300" />
            <span className="text-[10px] uppercase tracking-widest text-surface-400">
              Recenti
            </span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {history.length > 1 ? (
              history.slice(1, 4).map((h, i) => (
                <span
                  key={`${h}-${i}`}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-surface-100 text-surface-500 font-medium"
                >
                  {getChordLabel(h)}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-surface-300 italic">Nessuno</span>
            )}
          </div>
        </div>
      </div>

      {/* Speed control */}
      <div className="mx-4 mb-4 bg-surface-50 rounded-xl p-3 border border-surface-100">
        <div className="flex items-center gap-2.5">
          <Settings size={14} className="text-surface-300 shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] font-medium text-surface-500">Velocita</span>
              <span className="text-[11px] font-bold text-brand-500">{intervalSec} sec</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={1}
              value={intervalSec}
              onChange={(e) => setIntervalSec(parseInt(e.target.value))}
              className="w-full h-1.5 bg-surface-200 rounded-full appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-surface-300">veloce</span>
              <span className="text-[9px] text-surface-300">lento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Play/Pause button */}
      <div className="px-4 pb-4">
        <button
          onClick={toggle}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            isPlaying
              ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
              : 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={18} fill="currentColor" />
              Ferma
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              Inizia
            </>
          )}
        </button>
      </div>
    </div>
  )
}
