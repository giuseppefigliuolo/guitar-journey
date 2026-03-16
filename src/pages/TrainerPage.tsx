import { useState } from 'react'
import { chords, type ChordData } from '../data/chords'
import ChordDiagram from '../components/ChordDiagram'
import ChordTrainer from '../components/ChordTrainer'
import { Dices, Check, X, RotateCcw } from 'lucide-react'

const typeGroups: { label: string; types: ChordData['type'][] }[] = [
  { label: 'Maggiori', types: ['major'] },
  { label: 'Minori', types: ['minor'] },
  { label: 'Settime', types: ['seventh'] },
  { label: 'Sospesi', types: ['suspended'] },
  { label: 'Altri', types: ['power', 'other'] },
]

const presets: { label: string; ids: string[] }[] = [
  { label: 'Sett. 1 — Basi', ids: ['A', 'Am', 'E', 'Em', 'D', 'Dm', 'C', 'G'] },
  { label: 'Sett. 2 — Ritmo + Settime', ids: ['A', 'Am', 'E', 'Em', 'D', 'Dm', 'C', 'G', 'A7', 'D7', 'E7'] },
  { label: 'Sett. 3 — WYWH', ids: ['C', 'D', 'Am', 'G', 'Em'] },
  { label: 'Sett. 4 — Repertorio', ids: ['A', 'Am', 'E', 'Em', 'D', 'Dm', 'C', 'G', 'A7', 'D7', 'E7', 'Asus4', 'Dsus2', 'Dsus4'] },
  { label: 'Base (4 accordi)', ids: ['A', 'Am', 'E', 'Em'] },
  { label: 'Rock classico', ids: ['Em', 'G', 'C', 'D', 'Am'] },
  { label: 'Progressione blues', ids: ['A7', 'D7', 'E7'] },
  { label: 'Accordi sospesi', ids: ['A', 'Asus4', 'D', 'Dsus2', 'Dsus4'] },
  { label: 'Tutto!', ids: chords.map((c) => c.id) },
]

export default function TrainerPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(['A', 'Am', 'E', 'Em', 'D', 'Dm', 'C', 'G']),
  )
  const [randomMode, setRandomMode] = useState(false)

  const toggleChord = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const applyPreset = (ids: string[]) => {
    setSelectedIds(new Set(ids))
  }

  const selectAll = () => setSelectedIds(new Set(chords.map((c) => c.id)))
  const selectNone = () => setSelectedIds(new Set())

  const [randomIds, setRandomIds] = useState<string[]>([])

  const activeIds = randomMode ? randomIds : Array.from(selectedIds)

  const [trainerKey, setTrainerKey] = useState(0)

  const startRandomRound = () => {
    const count = Math.max(2, Math.min(selectedIds.size, 6))
    const pool = chords.map((c) => c.id)
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setRandomIds(shuffled.slice(0, count))
    setRandomMode(true)
    setTrainerKey((k) => k + 1)
  }

  const hasEnough = randomMode ? true : selectedIds.size >= 2

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-6 sm:mb-8 animate-fade-in">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2">
          CHORD TRAINER
        </h1>
        <p className="text-surface-500 text-base sm:text-lg">
          Seleziona gli accordi e allenati con il drill random
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
        {/* Left: chord selection */}
        <div className="space-y-5 animate-fade-in stagger-1">
          {/* Presets */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 sm:p-5">
            <h3 className="font-display text-lg tracking-wider text-surface-500 mb-3">
              PRESET VELOCI
            </h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => {
                const isActive =
                  preset.ids.length === selectedIds.size &&
                  preset.ids.every((id) => selectedIds.has(id))
                return (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.ids)}
                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[40px] ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-surface-50 text-surface-600 border border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Random mode */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg tracking-wider text-surface-500">
                RANDOM MODE
              </h3>
              <Dices size={20} className="text-brand-400" />
            </div>
            <p className="text-sm text-surface-400 mb-3">
              Pesca accordi casuali da tutta la libreria. Ogni round e una sorpresa!
            </p>
            <button
              onClick={startRandomRound}
              className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-surface-800 text-white hover:bg-surface-900 transition-all active:scale-[0.98] min-h-[48px]"
            >
              <Dices size={18} />
              Nuovo round random
            </button>
            {randomMode && (
              <button
                onClick={() => setRandomMode(false)}
                className="w-full mt-2 py-2 rounded-xl text-xs font-medium text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={12} />
                Torna alla selezione manuale
              </button>
            )}
          </div>

          {/* Manual selection */}
          {!randomMode && (
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg tracking-wider text-surface-500">
                  SELEZIONE ACCORDI
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={selectAll}
                    className="text-[11px] font-medium text-brand-500 hover:text-brand-600 px-2 py-1 rounded hover:bg-brand-50 transition-colors"
                  >
                    Tutti
                  </button>
                  <button
                    onClick={selectNone}
                    className="text-[11px] font-medium text-surface-400 hover:text-surface-600 px-2 py-1 rounded hover:bg-surface-50 transition-colors"
                  >
                    Nessuno
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {typeGroups.map((group) => {
                  const groupChords = chords.filter((c) =>
                    group.types.includes(c.type),
                  )
                  if (groupChords.length === 0) return null

                  return (
                    <div key={group.label}>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-surface-300 block mb-2">
                        {group.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {groupChords.map((chord) => {
                          const selected = selectedIds.has(chord.id)
                          return (
                            <button
                              key={chord.id}
                              onClick={() => toggleChord(chord.id)}
                              className={`relative flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-lg text-sm font-medium transition-all min-h-[40px] ${
                                selected
                                  ? 'text-white shadow-sm'
                                  : 'bg-surface-50 text-surface-500 border border-surface-200 hover:border-surface-300'
                              }`}
                              style={
                                selected
                                  ? { backgroundColor: chord.color }
                                  : undefined
                              }
                            >
                              {selected ? (
                                <Check size={14} strokeWidth={3} />
                              ) : (
                                <span
                                  className="w-3.5 h-3.5 rounded-full border-2"
                                  style={{ borderColor: chord.color }}
                                />
                              )}
                              {chord.nameIT}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-surface-100 text-center">
                <span className="text-xs text-surface-400">
                  {selectedIds.size} accordi selezionati
                  {selectedIds.size < 2 && (
                    <span className="text-red-400 ml-1">(minimo 2)</span>
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Preview of selected chords (only on large screens) */}
          {!randomMode && selectedIds.size > 0 && (
            <div className="hidden lg:block bg-white rounded-2xl border border-surface-200 shadow-sm p-4 sm:p-5">
              <h3 className="font-display text-lg tracking-wider text-surface-500 mb-3">
                ACCORDI SELEZIONATI
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {Array.from(selectedIds).map((id) => {
                  const chord = chords.find((c) => c.id === id)
                  if (!chord) return null
                  return <ChordDiagram key={id} chord={chord} size="sm" />
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: trainer (sticky on desktop) */}
        <div className="lg:sticky lg:top-20 lg:self-start animate-fade-in stagger-2">
          {hasEnough ? (
            <div>
              {randomMode && (
                <div className="mb-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-800 text-white text-xs font-bold">
                  <Dices size={14} />
                  RANDOM MODE — {activeIds.length} accordi
                </div>
              )}
              <ChordTrainer key={trainerKey} chordIds={activeIds} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8 text-center">
              <X size={32} className="mx-auto mb-3 text-surface-300" />
              <p className="text-sm text-surface-500 font-medium">
                Seleziona almeno 2 accordi per iniziare
              </p>
              <p className="text-xs text-surface-300 mt-1">
                Oppure prova il Random Mode!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
