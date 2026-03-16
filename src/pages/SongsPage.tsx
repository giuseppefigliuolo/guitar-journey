import { useState } from 'react'
import { Play, Star, Music } from 'lucide-react'
import { songs, getSongChordIds } from '../data/songs'
import { chordMap } from '../data/chords'
import PlayAlong from '../components/PlayAlong'
import type { Song } from '../data/songs'

const difficultyLabel = ['', 'Facile', 'Medio', 'Difficile'] as const
const difficultyColor = ['', '#22c55e', '#f59e0b', '#ef4444'] as const

export default function SongsPage() {
  const [activeSong, setActiveSong] = useState<Song | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-6 sm:mb-8 animate-fade-in">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2">
          CANZONI
        </h1>
        <p className="text-surface-500 text-base sm:text-lg">
          Canzoni facili da suonare con la chitarra — premi Play Along per esercitarti
        </p>
      </header>

      {activeSong ? (
        <div className="animate-fade-in">
          <PlayAlong song={activeSong} onClose={() => setActiveSong(null)} />
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 animate-fade-in stagger-1">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={() => setActiveSong(song)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SongCard({ song, onPlay }: { song: Song; onPlay: () => void }) {
  const chordIds = getSongChordIds(song)

  return (
    <div className="bg-white rounded-xl border border-surface-200 hover:border-surface-300 hover:shadow-sm transition-all duration-200 overflow-hidden">
      <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4">
        {/* Play button */}
        <button
          onClick={onPlay}
          className="shrink-0 w-11 h-11 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-sm hover:bg-brand-600 transition-all active:scale-95"
        >
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </button>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-surface-800 truncate">
              {song.title}
            </h3>
            {song.capo > 0 && (
              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium border border-amber-200">
                Capo {song.capo}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-surface-400 truncate mt-0.5">
            {song.artist}
          </p>

          {/* Chord pills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {chordIds.map((id) => {
              const cd = chordMap.get(id)
              return (
                <span
                  key={id}
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                  style={{
                    backgroundColor: cd ? `${cd.color}15` : '#f3f4f6',
                    color: cd?.color ?? '#6b7280',
                  }}
                >
                  {cd?.nameIT ?? id}
                </span>
              )
            })}
          </div>
        </div>

        {/* Right: difficulty + sections */}
        <div className="shrink-0 text-right">
          <div className="flex items-center gap-0.5 justify-end mb-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < song.difficulty ? difficultyColor[song.difficulty] : 'none'}
                stroke={i < song.difficulty ? difficultyColor[song.difficulty] : '#d1d5db'}
                strokeWidth={2}
              />
            ))}
          </div>
          <span
            className="text-[10px] font-medium"
            style={{ color: difficultyColor[song.difficulty] }}
          >
            {difficultyLabel[song.difficulty]}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-surface-400 mt-1 justify-end">
            <Music size={10} />
            <span>{song.bpm} BPM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
