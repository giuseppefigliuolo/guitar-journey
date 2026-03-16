import { useState, useRef, useEffect, useMemo, Fragment } from 'react'
import { chords, type ChordData } from '../data/chords'
import ChordDiagram from './ChordDiagram'

const tokenMap = new Map<string, ChordData>()
for (const chord of chords) {
  tokenMap.set(chord.symbol, chord)
  if (chord.nameEN !== chord.symbol) tokenMap.set(chord.nameEN, chord)
  if (chord.id !== chord.nameEN && chord.id !== chord.symbol) tokenMap.set(chord.id, chord)
}

const sortedTokens = [...tokenMap.keys()].sort((a, b) => b.length - a.length)
const escaped = sortedTokens.map((t) =>
  t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
)
const chordPattern = new RegExp(
  `(?<![\\wÀ-ÿ])(${escaped.join('|')})(\\s*\\([A-Za-z0-9#+]+\\))?(?![\\wÀ-ÿ])`,
  'g',
)

function ChordPopover({
  chord,
  children,
}: {
  chord: ChordData
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<'above' | 'below'>('above')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>()

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
        className="cursor-pointer font-semibold border-b border-dashed transition-colors"
        style={{ color: chord.color, borderColor: `${chord.color}60` }}
      >
        {children}
      </span>
      {open && (
        <div
          ref={popoverRef}
          onMouseEnter={() => clearTimeout(hoverTimeout.current)}
          onMouseLeave={delayedHide}
          className={`absolute z-50 left-1/2 -translate-x-1/2 ${
            pos === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'
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

interface ChordTextProps {
  text: string
}

export default function ChordText({ text }: ChordTextProps) {
  const segments = useMemo(() => {
    const result: {
      type: 'text' | 'chord'
      value: string
      chord?: ChordData
    }[] = []
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
  }, [text])

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === 'chord' && seg.chord ? (
          <ChordPopover key={i} chord={seg.chord}>
            {seg.value}
          </ChordPopover>
        ) : (
          <Fragment key={i}>{seg.value}</Fragment>
        ),
      )}
    </>
  )
}
