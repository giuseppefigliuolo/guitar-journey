import { type ChordData, fingerColors } from '../data/chords'
import { playChordSound } from '../utils/audio'

interface ChordDiagramProps {
  chord: ChordData
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  interactive?: boolean
}

const sizeConfig = {
  sm: { width: 100, height: 130, dotR: 6, fontSize: 10, nameFontSize: 12 },
  md: { width: 140, height: 175, dotR: 8, fontSize: 12, nameFontSize: 16 },
  lg: { width: 200, height: 240, dotR: 11, fontSize: 14, nameFontSize: 20 },
}

export default function ChordDiagram({
  chord,
  size = 'md',
  showName = true,
  interactive = true,
}: ChordDiagramProps) {
  const cfg = sizeConfig[size]
  const strings = 6
  const frets = 5
  const padLeft = 24
  const padRight = 12
  const padTop = showName ? 36 : 20
  const padBottom = 10
  const gridW = cfg.width - padLeft - padRight
  const gridH = cfg.height - padTop - padBottom
  const stringSpacing = gridW / (strings - 1)
  const fretSpacing = gridH / frets

  const getX = (s: number) => padLeft + s * stringSpacing
  const getY = (f: number) => padTop + f * fretSpacing

  return (
    <div
      className={`inline-flex flex-col items-center group ${interactive ? 'cursor-pointer' : ''}`}
      onClick={() => interactive && playChordSound(chord.id)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          playChordSound(chord.id)
        }
      }}
    >
      <svg
        width={cfg.width}
        height={cfg.height}
        viewBox={`0 0 ${cfg.width} ${cfg.height}`}
        className={`${interactive ? 'transition-transform duration-200 group-hover:scale-105' : ''}`}
      >
        {/* Chord name */}
        {showName && (
          <text
            x={cfg.width / 2}
            y={14}
            textAnchor="middle"
            fill="#231f1b"
            fontSize={cfg.nameFontSize}
            fontWeight="700"
            fontFamily="'Bebas Neue', sans-serif"
            letterSpacing="0.05em"
          >
            {chord.nameIT.toUpperCase()}
          </text>
        )}

        {/* Nut (top bar) */}
        {chord.baseFret === 1 && (
          <rect
            x={padLeft - 1}
            y={padTop - 3}
            width={gridW + 2}
            height={4}
            fill="#38332d"
            rx={1}
          />
        )}

        {/* Fret lines */}
        {Array.from({ length: frets + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1={padLeft}
            y1={getY(i)}
            x2={padLeft + gridW}
            y2={getY(i)}
            stroke="#38332d"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: strings }, (_, i) => (
          <line
            key={`string-${i}`}
            x1={getX(i)}
            y1={padTop}
            x2={getX(i)}
            y2={padTop + gridH}
            stroke="#38332d"
            strokeOpacity={0.3}
            strokeWidth={i < 3 ? 1.5 : 1}
          />
        ))}

        {/* Barre */}
        {chord.barres?.map((barre, idx) => {
          const fromX = getX(strings - barre.fromString)
          const toX = getX(strings - barre.toString)
          const y = getY(barre.fret - chord.baseFret + 1) - fretSpacing / 2
          return (
            <rect
              key={`barre-${idx}`}
              x={Math.min(fromX, toX) - cfg.dotR}
              y={y - cfg.dotR * 0.7}
              width={Math.abs(toX - fromX) + cfg.dotR * 2}
              height={cfg.dotR * 1.4}
              rx={cfg.dotR * 0.7}
              fill={fingerColors[chord.fingers[strings - barre.fromString]] || '#888'}
              opacity={0.85}
            />
          )
        })}

        {/* Finger dots & open/muted indicators */}
        {chord.frets.map((fret, i) => {
          const x = getX(i)
          if (fret === -1) {
            return (
              <text
                key={`muted-${i}`}
                x={x}
                y={padTop - 8}
                textAnchor="middle"
                fill="#38332d"
                fillOpacity={0.4}
                fontSize={cfg.fontSize}
              >
                x
              </text>
            )
          }
          if (fret === 0) {
            return (
              <circle
                key={`open-${i}`}
                cx={x}
                cy={padTop - 10}
                r={cfg.dotR * 0.5}
                fill="none"
                stroke="#38332d"
                strokeOpacity={0.5}
                strokeWidth={1.5}
              />
            )
          }
          const y = getY(fret - chord.baseFret + 1) - fretSpacing / 2
          const finger = chord.fingers[i]
          const color = fingerColors[finger] || '#888'
          const isBarre = chord.barres?.some(
            (b) =>
              fret === b.fret &&
              i >= strings - b.fromString &&
              i <= strings - b.toString &&
              finger === chord.fingers[strings - b.fromString]
          )
          if (isBarre) return null
          return (
            <g key={`dot-${i}`}>
              <circle cx={x} cy={y} r={cfg.dotR} fill={color} />
              {finger > 0 && (
                <text
                  x={x}
                  y={y + cfg.fontSize * 0.35}
                  textAnchor="middle"
                  fill="white"
                  fontSize={cfg.fontSize * 0.75}
                  fontWeight="700"
                >
                  {finger}
                </text>
              )}
            </g>
          )
        })}

        {/* Base fret indicator */}
        {chord.baseFret > 1 && (
          <text
            x={padLeft - 12}
            y={getY(1) - fretSpacing / 2 + cfg.fontSize * 0.35}
            textAnchor="middle"
            fill="#38332d"
            fillOpacity={0.6}
            fontSize={cfg.fontSize * 0.85}
          >
            {chord.baseFret}
          </text>
        )}
      </svg>

      {/* Labels below */}
      {showName && (
        <div className="text-center mt-1">
          <span className="text-xs font-medium text-surface-400">
            {chord.nameEN}
          </span>
        </div>
      )}

      {/* Play hint */}
      {interactive && (
        <span className="text-[10px] opacity-0 group-hover:opacity-60 transition-opacity mt-0.5 text-surface-400">
          clicca per ascoltare
        </span>
      )}
    </div>
  )
}
