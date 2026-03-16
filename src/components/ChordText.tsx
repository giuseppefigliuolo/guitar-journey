import { useState, useRef, useEffect, useMemo, useCallback, Fragment } from 'react'
import { Play, Square } from 'lucide-react'
import { chords, type ChordData } from '../data/chords'
import { playChordSound } from '../utils/audio'
import ChordDiagram from './ChordDiagram'

const tokenMap = new Map<string, ChordData>()
for (const chord of chords) {
  tokenMap.set(chord.symbol, chord)
  if (chord.nameEN !== chord.symbol) tokenMap.set(chord.nameEN, chord)
  if (chord.id !== chord.nameEN && chord.id !== chord.symbol)
    tokenMap.set(chord.id, chord)
}

const sortedTokens = Array.from(tokenMap.keys()).sort((a, b) => b.length - a.length)
const escaped = sortedTokens.map((t) =>
  t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
)
const chordPattern = new RegExp(
  `(?<![\\wÀ-ÿ])(${escaped.join('|')})(\\s*\\([A-Za-z0-9#+]+\\))?(?![\\wÀ-ÿ])`,
  'g',
)

type Segment = { type: 'text'; value: string } | { type: 'chord'; value: string; chord: ChordData }

type Group =
  | Segment
  | { type: 'progression'; segments: Segment[]; chordIds: string[] }

function parseSegments(text: string): Segment[] {
  const result: Segment[] = []
  let lastIndex = 0
  chordPattern.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = chordPattern.exec(text)) !== null) {
    const token = match[1]
    const chord = tokenMap.get(token)
    if (!chord) continue

    if (match.index > lastIndex) {
      result.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    result.push({ type: 'chord', value: match[0], chord })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    result.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return result
}

function groupProgressions(segments: Segment[]): Group[] {
  const groups: Group[] = []
  let i = 0

  while (i < segments.length) {
    if (segments[i].type === 'chord') {
      const chordSeg = segments[i] as Extract<Segment, { type: 'chord' }>
      const chordIds: string[] = [chordSeg.chord.id]
      let j = i + 1

      while (j + 1 < segments.length) {
        const textSeg = segments[j]
        const nextSeg = segments[j + 1]
        if (
          textSeg.type === 'text' &&
          /[→↔]/.test(textSeg.value) &&
          !/\n/.test(textSeg.value) &&
          nextSeg.type === 'chord'
        ) {
          chordIds.push((nextSeg as Extract<Segment, { type: 'chord' }>).chord.id)
          j += 2
        } else {
          break
        }
      }

      if (chordIds.length >= 2) {
        groups.push({
          type: 'progression',
          segments: segments.slice(i, j),
          chordIds,
        })
        i = j
      } else {
        groups.push(segments[i])
        i++
      }
    } else {
      groups.push(segments[i])
      i++
    }
  }

  return groups
}

function ChordPopover({
  chord,
  children,
  highlighted,
}: {
  chord: ChordData
  children: React.ReactNode
  highlighted?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<'above' | 'below'>('above')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = () => {
    clearTimeout(hoverTimeout.current)
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos(rect.top > 260 ? 'above' : 'below')
    }
    setOpen(true)
  }

  const delayedHide = () => {
    hoverTimeout.current = setTimeout(() => setOpen(false), 150)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (open) setOpen(false)
    else show()
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler, true)
    return () => document.removeEventListener('pointerdown', handler, true)
  }, [open])

  useEffect(() => () => clearTimeout(hoverTimeout.current), [])

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        onClick={handleClick}
        onMouseEnter={show}
        onMouseLeave={delayedHide}
        className={`cursor-pointer font-semibold border-b border-dashed transition-all duration-200 ${highlighted
            ? 'rounded px-1 -mx-0.5 scale-110 inline-block'
            : ''
          }`}
        style={{
          color: chord.color,
          borderColor: `${chord.color}60`,
          backgroundColor: highlighted ? `${chord.color}18` : undefined,
        }}
      >
        {children}
      </span>
      {open && (
        <div
          ref={popoverRef}
          onMouseEnter={() => clearTimeout(hoverTimeout.current)}
          onMouseLeave={delayedHide}
          className={`absolute z-50 left-1/2 -translate-x-1/2 ${pos === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
        >
          <div className="bg-white rounded-xl border border-surface-200 shadow-xl p-2 animate-fade-in">
            <ChordDiagram chord={chord} size="sm" />
          </div>
        </div>
      )}
    </span>
  )
}

function ProgressionGroup({
  segments,
  chordIds,
}: {
  segments: Segment[]
  chordIds: string[]
}) {
  const [playingIdx, setPlayingIdx] = useState(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stoppedRef = useRef(false)

  const playStep = useCallback(
    (idx: number) => {
      if (stoppedRef.current || idx >= chordIds.length) {
        setPlayingIdx(-1)
        return
      }
      setPlayingIdx(idx)
      playChordSound(chordIds[idx])
      timerRef.current = setTimeout(() => playStep(idx + 1), 1200)
    },
    [chordIds],
  )

  const play = useCallback(() => {
    stoppedRef.current = false
    playStep(0)
  }, [playStep])

  const stop = useCallback(() => {
    stoppedRef.current = true
    clearTimeout(timerRef.current)
    setPlayingIdx(-1)
  }, [])

  useEffect(
    () => () => {
      stoppedRef.current = true
      clearTimeout(timerRef.current)
    },
    [],
  )

  const isPlaying = playingIdx >= 0
  let chordCounter = 0

  return (
    <span className="inline">
      {segments.map((seg, i) => {
        if (seg.type === 'chord') {
          const idx = chordCounter++
          return (
            <ChordPopover
              key={i}
              chord={seg.chord}
              highlighted={idx === playingIdx}
            >
              {seg.value}
            </ChordPopover>
          )
        }
        return <Fragment key={i}>{seg.value}</Fragment>
      })}
      <button
        onClick={isPlaying ? stop : play}
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ml-1.5 align-middle transition-all ${isPlaying
            ? 'bg-red-100 text-red-500 hover:bg-red-200'
            : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
          }`}
        title={isPlaying ? 'Ferma' : 'Ascolta progressione'}
      >
        {isPlaying ? (
          <Square size={10} fill="currentColor" />
        ) : (
          <Play size={10} fill="currentColor" className="ml-0.5" />
        )}
      </button>
    </span>
  )
}

export default function ChordText({ text }: { text: string }) {
  const groups = useMemo(() => {
    const segments = parseSegments(text)
    return groupProgressions(segments)
  }, [text])

  return (
    <>
      {groups.map((group, i) => {
        if ('segments' in group && group.type === 'progression') {
          return (
            <ProgressionGroup
              key={i}
              segments={group.segments}
              chordIds={group.chordIds}
            />
          )
        }
        if (group.type === 'chord' && 'chord' in group) {
          return (
            <ChordPopover key={i} chord={group.chord}>
              {group.value}
            </ChordPopover>
          )
        }
        return <Fragment key={i}>{group.value}</Fragment>
      })}
    </>
  )
}
