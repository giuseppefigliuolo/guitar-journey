export interface ChordData {
  id: string
  nameIT: string
  nameEN: string
  symbol: string
  type: 'major' | 'minor' | 'seventh' | 'suspended' | 'power' | 'other'
  difficulty: 'facile' | 'medio' | 'difficile'
  /** Fret positions for strings 6(E) to 1(e). -1 = muted, 0 = open */
  frets: [number, number, number, number, number, number]
  /** Finger assignments: 0 = none, 1-4 = index to pinky */
  fingers: [number, number, number, number, number, number]
  /** Starting fret (for barre chords) */
  baseFret: number
  /** Barre across strings if applicable */
  barres?: { fret: number; fromString: number; toString: number }[]
  color: string
}

export const chords: ChordData[] = [
  // --- MAJOR OPEN CHORDS ---
  {
    id: 'C',
    nameIT: 'Do',
    nameEN: 'C',
    symbol: 'Do',
    type: 'major',
    difficulty: 'facile',
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    baseFret: 1,
    color: '#e88a10',
  },
  {
    id: 'D',
    nameIT: 'Re',
    nameEN: 'D',
    symbol: 'Re',
    type: 'major',
    difficulty: 'facile',
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    baseFret: 1,
    color: '#ef4444',
  },
  {
    id: 'E',
    nameIT: 'Mi',
    nameEN: 'E',
    symbol: 'Mi',
    type: 'major',
    difficulty: 'facile',
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    baseFret: 1,
    color: '#22c55e',
  },
  {
    id: 'G',
    nameIT: 'Sol',
    nameEN: 'G',
    symbol: 'Sol',
    type: 'major',
    difficulty: 'facile',
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    baseFret: 1,
    color: '#3b82f6',
  },
  {
    id: 'A',
    nameIT: 'La',
    nameEN: 'A',
    symbol: 'La',
    type: 'major',
    difficulty: 'facile',
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    baseFret: 1,
    color: '#a855f7',
  },
  {
    id: 'F',
    nameIT: 'Fa',
    nameEN: 'F',
    symbol: 'Fa',
    type: 'major',
    difficulty: 'difficile',
    frets: [1, 1, 2, 3, 3, 1],
    fingers: [1, 1, 2, 4, 3, 1],
    baseFret: 1,
    barres: [{ fret: 1, fromString: 6, toString: 1 }],
    color: '#f97316',
  },

  // --- MINOR OPEN CHORDS ---
  {
    id: 'Am',
    nameIT: 'La minore',
    nameEN: 'Am',
    symbol: 'La-',
    type: 'minor',
    difficulty: 'facile',
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    baseFret: 1,
    color: '#8b5cf6',
  },
  {
    id: 'Em',
    nameIT: 'Mi minore',
    nameEN: 'Em',
    symbol: 'Mi-',
    type: 'minor',
    difficulty: 'facile',
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    baseFret: 1,
    color: '#10b981',
  },
  {
    id: 'Dm',
    nameIT: 'Re minore',
    nameEN: 'Dm',
    symbol: 'Re-',
    type: 'minor',
    difficulty: 'facile',
    frets: [-1, -1, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
    baseFret: 1,
    color: '#ec4899',
  },

  // --- SEVENTH CHORDS ---
  {
    id: 'A7',
    nameIT: 'La settima',
    nameEN: 'A7',
    symbol: 'La7',
    type: 'seventh',
    difficulty: 'facile',
    frets: [-1, 0, 2, 0, 2, 0],
    fingers: [0, 0, 2, 0, 3, 0],
    baseFret: 1,
    color: '#c084fc',
  },
  {
    id: 'E7',
    nameIT: 'Mi settima',
    nameEN: 'E7',
    symbol: 'Mi7',
    type: 'seventh',
    difficulty: 'facile',
    frets: [0, 2, 0, 1, 0, 0],
    fingers: [0, 2, 0, 1, 0, 0],
    baseFret: 1,
    color: '#34d399',
  },
  {
    id: 'D7',
    nameIT: 'Re settima',
    nameEN: 'D7',
    symbol: 'Re7',
    type: 'seventh',
    difficulty: 'facile',
    frets: [-1, -1, 0, 2, 1, 2],
    fingers: [0, 0, 0, 2, 1, 3],
    baseFret: 1,
    color: '#fb7185',
  },

  // --- SUSPENDED CHORDS ---
  {
    id: 'Asus4',
    nameIT: 'La sospeso 4',
    nameEN: 'Asus4',
    symbol: 'Lasus4',
    type: 'suspended',
    difficulty: 'medio',
    frets: [-1, 0, 2, 2, 3, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    baseFret: 1,
    color: '#d8b4fe',
  },
  {
    id: 'Dsus2',
    nameIT: 'Re sospeso 2',
    nameEN: 'Dsus2',
    symbol: 'Resus2',
    type: 'suspended',
    difficulty: 'medio',
    frets: [-1, -1, 0, 2, 3, 0],
    fingers: [0, 0, 0, 1, 3, 0],
    baseFret: 1,
    color: '#fda4af',
  },
  {
    id: 'Dsus4',
    nameIT: 'Re sospeso 4',
    nameEN: 'Dsus4',
    symbol: 'Resus4',
    type: 'suspended',
    difficulty: 'medio',
    frets: [-1, -1, 0, 2, 3, 3],
    fingers: [0, 0, 0, 1, 2, 3],
    baseFret: 1,
    color: '#f9a8d4',
  },

  // --- SPECIAL / SONG-SPECIFIC ---
  {
    id: 'Gsus4',
    nameIT: 'Sol sospeso 4',
    nameEN: 'Gsus4',
    symbol: 'Solsus4',
    type: 'suspended',
    difficulty: 'medio',
    frets: [3, 3, 0, 0, 1, 3],
    fingers: [3, 4, 0, 0, 1, 2],
    baseFret: 1,
    color: '#60a5fa',
  },
  {
    id: 'Cadd9',
    nameIT: 'Do add 9',
    nameEN: 'Cadd9',
    symbol: 'Doadd9',
    type: 'other',
    difficulty: 'medio',
    frets: [-1, 3, 2, 0, 3, 0],
    fingers: [0, 2, 1, 0, 3, 0],
    baseFret: 1,
    color: '#fbbf24',
  },
  {
    id: 'Em7',
    nameIT: 'Mi minore settima',
    nameEN: 'Em7',
    symbol: 'Mi-7',
    type: 'seventh',
    difficulty: 'facile',
    frets: [0, 2, 0, 0, 0, 0],
    fingers: [0, 1, 0, 0, 0, 0],
    baseFret: 1,
    color: '#2dd4bf',
  },
]

export const chordMap = new Map(chords.map((c) => [c.id, c]))

export function getChord(id: string): ChordData | undefined {
  return chordMap.get(id)
}

export const fingerColors: Record<number, string> = {
  1: '#3b82f6', // blue - index
  2: '#22c55e', // green - middle
  3: '#f59e0b', // amber - ring
  4: '#ef4444', // red - pinky
}

export const fingerLabels: Record<number, string> = {
  1: 'Indice',
  2: 'Medio',
  3: 'Anulare',
  4: 'Mignolo',
}
