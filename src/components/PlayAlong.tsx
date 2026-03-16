import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, Repeat, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react'
import { chordMap } from '../data/chords'
import { playChordSound, playClickSound } from '../utils/audio'
import ChordDiagram from './ChordDiagram'
import type { Song, SongSection } from '../data/songs'

interface PlayAlongProps {
  song: Song
  onClose: () => void
}

export default function PlayAlong({ song, onClose }: PlayAlongProps) {
  const [sectionIdx, setSectionIdx] = useState(0)
  const [chordIdx, setChordIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpmScale, setBpmScale] = useState(100)
  const [loop, setLoop] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [beatCount, setBeatCount] = useState(0)

  const isPlayingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionIdxRef = useRef(sectionIdx)
  const chordIdxRef = useRef(chordIdx)
  const bpmScaleRef = useRef(bpmScale)
  const loopRef = useRef(loop)
  const soundEnabledRef = useRef(soundEnabled)

  useEffect(() => { sectionIdxRef.current = sectionIdx }, [sectionIdx])
  useEffect(() => { chordIdxRef.current = chordIdx }, [chordIdx])
  useEffect(() => { bpmScaleRef.current = bpmScale }, [bpmScale])
  useEffect(() => { loopRef.current = loop }, [loop])
  useEffect(() => { soundEnabledRef.current = soundEnabled }, [soundEnabled])

  const section: SongSection = song.sections[sectionIdx]
  const currentChord = section.chords[chordIdx]
  const chordData = currentChord ? chordMap.get(currentChord.id) : undefined
  const effectiveBpm = Math.round(song.bpm * bpmScale / 100)
  const beatMs = 60_000 / effectiveBpm

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const playCurrentChord = useCallback((chordId: string) => {
    if (soundEnabledRef.current) {
      playChordSound(chordId)
    }
  }, [])

  const scheduleBeat = useCallback((beatInChord: number, ci: number, si: number) => {
    if (!isPlayingRef.current) return

    const sec = song.sections[si]
    const chord = sec.chords[ci]

    if (beatInChord === 0) {
      setChordIdx(ci)
      setSectionIdx(si)
      setBeatCount(0)
      playCurrentChord(chord.id)
    } else {
      setBeatCount(beatInChord)
      playClickSound()
    }

    const nextBeat = beatInChord + 1
    if (nextBeat < chord.beats) {
      timerRef.current = setTimeout(() => scheduleBeat(nextBeat, ci, si), beatMs)
    } else {
      const nextCi = ci + 1
      if (nextCi < sec.chords.length) {
        timerRef.current = setTimeout(() => scheduleBeat(0, nextCi, si), beatMs)
      } else {
        const nextSi = si + 1
        if (nextSi < song.sections.length) {
          timerRef.current = setTimeout(() => scheduleBeat(0, 0, nextSi), beatMs)
        } else if (loopRef.current) {
          timerRef.current = setTimeout(() => scheduleBeat(0, 0, si), beatMs)
        } else {
          timerRef.current = setTimeout(() => {
            isPlayingRef.current = false
            setIsPlaying(false)
          }, beatMs)
        }
      }
    }
  }, [song, beatMs, playCurrentChord])

  const start = useCallback(() => {
    isPlayingRef.current = true
    setIsPlaying(true)
    scheduleBeat(0, chordIdxRef.current, sectionIdxRef.current)
  }, [scheduleBeat])

  const stop = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    clearTimer()
    setBeatCount(0)
  }, [clearTimer])

  const toggle = useCallback(() => {
    if (isPlaying) stop()
    else start()
  }, [isPlaying, start, stop])

  const goToSection = useCallback((idx: number) => {
    clearTimer()
    setSectionIdx(idx)
    setChordIdx(0)
    setBeatCount(0)
    sectionIdxRef.current = idx
    chordIdxRef.current = 0
    if (isPlayingRef.current) {
      scheduleBeat(0, 0, idx)
    }
  }, [clearTimer, scheduleBeat])

  const restart = useCallback(() => {
    clearTimer()
    setChordIdx(0)
    setBeatCount(0)
    chordIdxRef.current = 0
    if (isPlayingRef.current) {
      scheduleBeat(0, 0, sectionIdxRef.current)
    }
  }, [clearTimer, scheduleBeat])

  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      clearTimer()
    }
  }, [clearTimer])

  useEffect(() => {
    if (isPlayingRef.current) {
      clearTimer()
      scheduleBeat(0, chordIdxRef.current, sectionIdxRef.current)
    }
  // Restart the timer loop when BPM changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpmScale])

  const currentColor = chordData?.color ?? '#6b7280'

  return (
    <div className="bg-white rounded-2xl border border-surface-200 shadow-lg overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-surface-100">
        <div className="flex items-center justify-between mb-1">
          <div className="min-w-0">
            <h3 className="font-display text-lg sm:text-xl tracking-wide truncate">{song.title.toUpperCase()}</h3>
            <p className="text-sm text-surface-400">{song.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-3 text-xs font-medium text-surface-400 hover:text-surface-600 px-3 py-2 rounded-lg hover:bg-surface-50 transition-colors"
          >
            Chiudi
          </button>
        </div>
        {song.capo > 0 && (
          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium border border-amber-200">
            Capo {song.capo}
          </span>
        )}
      </div>

      {/* Section selector */}
      <div className="px-4 sm:px-5 pt-3 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {song.sections.map((sec, i) => (
            <button
              key={i}
              onClick={() => goToSection(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                i === sectionIdx
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-surface-50 text-surface-500 border border-surface-200 hover:border-surface-300'
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chord timeline */}
      <div className="px-4 sm:px-5 py-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {section.chords.map((ch, i) => {
            const cd = chordMap.get(ch.id)
            const isActive = i === chordIdx
            const color = cd?.color ?? '#6b7280'
            return (
              <button
                key={i}
                onClick={() => {
                  setChordIdx(i)
                  chordIdxRef.current = i
                  setBeatCount(0)
                  if (isPlayingRef.current) {
                    clearTimer()
                    scheduleBeat(0, i, sectionIdxRef.current)
                  } else {
                    playCurrentChord(ch.id)
                  }
                }}
                className={`relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md scale-110'
                    : 'bg-surface-50 border border-surface-200 hover:border-surface-300'
                }`}
                style={isActive ? { backgroundColor: color } : { color }}
              >
                {cd?.nameIT ?? ch.id}
                {ch.beats !== 4 && (
                  <span className={`absolute -top-1.5 -right-1.5 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                    isActive ? 'bg-white/30 text-white' : 'bg-surface-200 text-surface-500'
                  }`}>
                    {ch.beats}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Beat indicator */}
      {isPlaying && currentChord && (
        <div className="px-4 sm:px-5 pb-2">
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: currentChord.beats }, (_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-100"
                style={{
                  backgroundColor: i <= beatCount ? currentColor : undefined,
                  opacity: i <= beatCount ? 1 : 0.2,
                  border: `2px solid ${currentColor}`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Current chord diagram */}
      <div className="flex justify-center py-3">
        {chordData ? (
          <div
            className="rounded-xl p-3 transition-all duration-300"
            style={{ backgroundColor: `${currentColor}08`, border: `1px solid ${currentColor}20` }}
          >
            <ChordDiagram chord={chordData} size="md" />
          </div>
        ) : (
          <div className="text-sm text-surface-400 py-8">Premi Play per iniziare</div>
        )}
      </div>

      {/* BPM control */}
      <div className="mx-4 sm:mx-5 mb-3 bg-surface-50 rounded-xl p-3 border border-surface-100">
        <div className="flex justify-between mb-1.5">
          <span className="text-[11px] font-medium text-surface-500">Velocità</span>
          <span className="text-[11px] font-bold text-brand-500">{effectiveBpm} BPM ({bpmScale}%)</span>
        </div>
        <input
          type="range"
          min={50}
          max={150}
          step={5}
          value={bpmScale}
          onChange={(e) => setBpmScale(parseInt(e.target.value))}
          className="w-full h-1.5 bg-surface-200 rounded-full appearance-none cursor-pointer accent-brand-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-surface-300">50%</span>
          <span className="text-[9px] text-surface-300">150%</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-5 pb-4 flex items-center gap-2">
        <button
          onClick={restart}
          className="p-2.5 rounded-xl bg-surface-50 border border-surface-200 hover:bg-surface-100 transition-colors"
          title="Ricomincia sezione"
        >
          <SkipBack size={16} className="text-surface-500" />
        </button>
        <button
          onClick={toggle}
          className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            isPlaying
              ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
              : 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm'
          }`}
        >
          {isPlaying ? (
            <><Pause size={18} fill="currentColor" /> Pausa</>
          ) : (
            <><Play size={18} fill="currentColor" /> Play Along</>
          )}
        </button>
        <button
          onClick={() => {
            const nextSi = (sectionIdx + 1) % song.sections.length
            goToSection(nextSi)
          }}
          className="p-2.5 rounded-xl bg-surface-50 border border-surface-200 hover:bg-surface-100 transition-colors"
          title="Prossima sezione"
        >
          <SkipForward size={16} className="text-surface-500" />
        </button>
        <button
          onClick={() => setLoop((v) => !v)}
          className={`p-2.5 rounded-xl border transition-colors ${
            loop
              ? 'bg-brand-50 border-brand-200 text-brand-500'
              : 'bg-surface-50 border-surface-200 text-surface-400 hover:bg-surface-100'
          }`}
          title={loop ? 'Loop attivo' : 'Loop disattivato'}
        >
          <Repeat size={16} />
        </button>
        <button
          onClick={() => setSoundEnabled((v) => !v)}
          className={`p-2.5 rounded-xl border transition-colors ${
            soundEnabled
              ? 'bg-brand-50 border-brand-200 text-brand-500'
              : 'bg-surface-50 border-surface-200 text-surface-400 hover:bg-surface-100'
          }`}
          title={soundEnabled ? 'Suono attivo' : 'Suono disattivato'}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </div>
  )
}
