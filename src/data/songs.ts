export interface SongChord {
  id: string
  beats: number
}

export interface SongSection {
  name: string
  chords: SongChord[]
}

export interface Song {
  id: string
  title: string
  artist: string
  difficulty: 1 | 2 | 3
  bpm: number
  capo: number
  sections: SongSection[]
}

function ch(id: string, beats = 4): SongChord {
  return { id, beats }
}

export const songs: Song[] = [
  {
    id: 'horse-with-no-name',
    title: 'Horse With No Name',
    artist: 'America',
    difficulty: 1,
    bpm: 120,
    capo: 0,
    sections: [
      {
        name: 'Intro',
        chords: [ch('Em', 8), ch('Dsus2', 8), ch('Em', 8), ch('Dsus2', 8)],
      },
      {
        name: 'Strofa',
        chords: [
          ch('Em'), ch('Dsus2'), ch('Em'), ch('Dsus2'),
          ch('Em'), ch('Dsus2'), ch('Em'), ch('Dsus2'),
        ],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('Em'), ch('Dsus2'), ch('Em'), ch('Dsus2'),
          ch('Em'), ch('Dsus2'), ch('Em'), ch('Dsus2'),
        ],
      },
    ],
  },
  {
    id: 'knockin-on-heavens-door',
    title: "Knockin' on Heaven's Door",
    artist: 'Bob Dylan',
    difficulty: 1,
    bpm: 68,
    capo: 0,
    sections: [
      {
        name: 'Intro',
        chords: [ch('G'), ch('D'), ch('Am', 8), ch('G'), ch('D'), ch('C', 8)],
      },
      {
        name: 'Strofa',
        chords: [ch('G'), ch('D'), ch('Am', 8), ch('G'), ch('D'), ch('C', 8)],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('G'), ch('D'), ch('Am', 8),
          ch('G'), ch('D'), ch('C', 8),
          ch('G'), ch('D'), ch('Am', 8),
          ch('G'), ch('D'), ch('C', 8),
        ],
      },
    ],
  },
  {
    id: 'wish-you-were-here',
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    difficulty: 2,
    bpm: 62,
    capo: 0,
    sections: [
      {
        name: 'Intro',
        chords: [
          ch('Em', 8), ch('G', 8), ch('Em', 8), ch('G', 8), ch('Am', 8), ch('Em', 8), ch('G', 8),
        ],
      },
      {
        name: 'Strofa',
        chords: [
          ch('C'), ch('D'), ch('Am'), ch('G'),
          ch('C'), ch('D'), ch('Am'), ch('G'),
        ],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('C'), ch('D'), ch('Am'), ch('G'),
          ch('C'), ch('D'), ch('Am'), ch('G'),
        ],
      },
    ],
  },
  {
    id: 'wonderwall',
    title: 'Wonderwall',
    artist: 'Oasis',
    difficulty: 2,
    bpm: 87,
    capo: 2,
    sections: [
      {
        name: 'Strofa',
        chords: [
          ch('Em7'), ch('G'), ch('Dsus4'), ch('A'),
          ch('Em7'), ch('G'), ch('Dsus4'), ch('A'),
        ],
      },
      {
        name: 'Pre-ritornello',
        chords: [ch('Cadd9'), ch('D'), ch('Em7', 8)],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('Cadd9'), ch('Em7'), ch('G'), ch('Em7'),
          ch('Cadd9'), ch('Em7'), ch('G'), ch('Em7'),
        ],
      },
    ],
  },
  {
    id: 'creep',
    title: 'Creep',
    artist: 'Radiohead',
    difficulty: 1,
    bpm: 92,
    capo: 0,
    sections: [
      {
        name: 'Strofa',
        chords: [
          ch('G', 8), ch('Am', 8), ch('C', 8), ch('Em', 8),
          ch('G', 8), ch('Am', 8), ch('C', 8), ch('Em', 8),
        ],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('G', 8), ch('Am', 8), ch('C', 8), ch('Em', 8),
          ch('G', 8), ch('Am', 8), ch('C', 8), ch('Em', 8),
        ],
      },
    ],
  },
  {
    id: 'about-a-girl',
    title: 'About a Girl',
    artist: 'Nirvana',
    difficulty: 1,
    bpm: 143,
    capo: 0,
    sections: [
      {
        name: 'Strofa',
        chords: [
          ch('Em'), ch('G'), ch('Em'), ch('G'),
          ch('Em'), ch('G'), ch('Em'), ch('G'),
        ],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('C'), ch('G'), ch('C'), ch('G'),
          ch('Em'), ch('G'), ch('Em'), ch('G'),
        ],
      },
    ],
  },
  {
    id: 'black-hole-sun',
    title: 'Black Hole Sun',
    artist: 'Soundgarden',
    difficulty: 3,
    bpm: 108,
    capo: 0,
    sections: [
      {
        name: 'Strofa',
        chords: [
          ch('G'), ch('F'), ch('Em'), ch('Dm'),
          ch('G'), ch('F'), ch('Em'), ch('Dm'),
        ],
      },
      {
        name: 'Pre-ritornello',
        chords: [ch('C'), ch('D'), ch('G'), ch('Em')],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('D'), ch('G'), ch('A'), ch('Em'),
          ch('C'), ch('D'), ch('G', 8),
        ],
      },
    ],
  },
  {
    id: 'zombie',
    title: 'Zombie',
    artist: 'The Cranberries',
    difficulty: 1,
    bpm: 83,
    capo: 0,
    sections: [
      {
        name: 'Strofa',
        chords: [
          ch('Em', 8), ch('C', 8), ch('G', 8), ch('D', 8),
          ch('Em', 8), ch('C', 8), ch('G', 8), ch('D', 8),
        ],
      },
      {
        name: 'Ritornello',
        chords: [
          ch('Em', 8), ch('C', 8), ch('G', 8), ch('D', 8),
          ch('Em', 8), ch('C', 8), ch('G', 8), ch('D', 8),
        ],
      },
    ],
  },
]

export function getSong(id: string): Song | undefined {
  return songs.find((s) => s.id === id)
}

export function getSongChordIds(song: Song): string[] {
  const ids = new Set<string>()
  for (const section of song.sections) {
    for (const chord of section.chords) {
      ids.add(chord.id)
    }
  }
  return Array.from(ids)
}
