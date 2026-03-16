import { useState } from 'react'
import { chords, type ChordData } from '../data/chords'
import ChordDiagram from '../components/ChordDiagram'
import { Search, Filter } from 'lucide-react'

const typeFilters: { value: ChordData['type'] | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'major', label: 'Maggiori' },
  { value: 'minor', label: 'Minori' },
  { value: 'seventh', label: 'Settime' },
  { value: 'suspended', label: 'Sospesi' },
]

const difficultyColors: Record<string, string> = {
  facile: 'bg-green-50 text-green-600 border-green-200',
  medio: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  difficile: 'bg-red-50 text-red-600 border-red-200',
}

export default function ChordLibrary() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ChordData['type'] | 'all'>('all')

  const filtered = chords.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.nameIT.toLowerCase().includes(search.toLowerCase()) ||
      c.nameEN.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || c.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6 sm:mb-8 animate-fade-in">
        <h1 className="font-display text-3xl sm:text-5xl tracking-wide mb-2">
          LIBRERIA ACCORDI
        </h1>
        <p className="text-surface-500 text-base sm:text-lg">
          Tutti gli accordi del corso — clicca per ascoltare il suono
        </p>
      </header>

      {/* Reference table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-surface-200 shadow-sm mb-8 animate-fade-in stagger-1">
        <h3 className="font-display text-2xl tracking-wide mb-4">
          TABELLA RIFERIMENTO IT / EN
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="py-2 px-3 text-left font-bold text-brand-600">Italiano</th>
                <th className="py-2 px-3 text-left font-bold text-blue-500">English</th>
                <th className="py-2 px-3 text-left font-bold text-surface-500">Simbolo</th>
                <th className="py-2 px-3 text-left font-bold text-surface-500">Tipo</th>
                <th className="py-2 px-3 text-left font-bold text-surface-500">Difficolta</th>
              </tr>
            </thead>
            <tbody>
              {chords.map((chord) => (
                <tr
                  key={chord.id}
                  className="border-b border-surface-100 hover:bg-surface-50 transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-surface-800">{chord.nameIT}</td>
                  <td className="py-2.5 px-3 text-surface-500">{chord.nameEN}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                      style={{ backgroundColor: `${chord.color}15`, color: chord.color }}
                    >
                      {chord.symbol}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-surface-500 capitalize">
                    {chord.type === 'major' ? 'maggiore' : chord.type === 'minor' ? 'minore' : chord.type === 'seventh' ? 'settima' : chord.type === 'suspended' ? 'sospeso' : chord.type}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${difficultyColors[chord.difficulty]}`}>
                      {chord.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in stagger-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Cerca accordo (es. Do, Am, Sol...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-surface-200 rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder:text-surface-300 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-surface-400 shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto">
            {typeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap min-h-[40px] ${
                  typeFilter === f.value
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white text-surface-500 border border-surface-200 hover:border-surface-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chord grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in stagger-3">
        {filtered.map((chord) => (
          <div
            key={chord.id}
            className="bg-white rounded-2xl p-4 border border-surface-200 hover:border-surface-300 hover:shadow-md transition-all flex flex-col items-center"
          >
            <ChordDiagram chord={chord} size="md" />
            <div className="mt-2 text-center">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${difficultyColors[chord.difficulty]}`}>
                {chord.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-surface-400">
          <p className="text-lg">Nessun accordo trovato</p>
          <p className="text-sm mt-1">Prova a cambiare i filtri di ricerca</p>
        </div>
      )}

      {/* Finger legend */}
      <div className="mt-10 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm animate-fade-in">
        <h3 className="font-display text-2xl tracking-wide mb-4">LEGENDA DITA</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { finger: 1, name: 'Indice', color: '#3b82f6' },
            { finger: 2, name: 'Medio', color: '#22c55e' },
            { finger: 3, name: 'Anulare', color: '#f59e0b' },
            { finger: 4, name: 'Mignolo', color: '#ef4444' },
          ].map(({ finger, name, color }) => (
            <div key={finger} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                {finger}
              </div>
              <span className="text-sm text-surface-600">{name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-surface-400 flex items-center justify-center">
              <span className="text-[10px] text-surface-400">o</span>
            </div>
            <span className="text-sm text-surface-600">Corda a vuoto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-surface-400 text-sm font-bold">
              x
            </div>
            <span className="text-sm text-surface-600">Corda muta</span>
          </div>
        </div>
      </div>
    </div>
  )
}
