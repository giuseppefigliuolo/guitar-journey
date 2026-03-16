import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLesson, lessons } from '../data/lessons'
import { getChord } from '../data/chords'
import { useProgress } from '../hooks/useProgress'
import { playSuccessSound } from '../utils/audio'
import ChordDiagram from '../components/ChordDiagram'
import ChordTrainer from '../components/ChordTrainer'
import StrummingPattern from '../components/StrummingPattern'
import LessonTimer from '../components/LessonTimer'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  Lightbulb,
  Dumbbell,
  Music2,
  Trophy,
  Clock,
  Undo2,
} from 'lucide-react'

function SectionIcon({ type }: { type: string }) {
  switch (type) {
    case 'exercise': return <Dumbbell size={18} className="text-blue-500" />
    case 'tip': return <Lightbulb size={18} className="text-yellow-500" />
    case 'song': return <Music2 size={18} className="text-pink-500" />
    case 'challenge': return <Trophy size={18} className="text-amber-500" />
    default: return null
  }
}

function sectionStyle(type: string) {
  switch (type) {
    case 'exercise':
      return 'bg-blue-50/80 border-blue-200'
    case 'tip':
      return 'bg-yellow-50/80 border-yellow-200'
    case 'song':
      return 'bg-pink-50/80 border-pink-200'
    case 'challenge':
      return 'bg-amber-50/80 border-amber-200'
    case 'chords':
      return 'bg-brand-50/80 border-brand-200'
    default:
      return 'bg-white border-surface-200'
  }
}

function sectionLabel(type: string) {
  switch (type) {
    case 'exercise': return 'Esercizio'
    case 'tip': return 'Consiglio'
    case 'song': return 'Canzone'
    case 'challenge': return 'Sfida'
    case 'chords': return 'Accordi'
    case 'strumming': return 'Strumming'
    default: return null
  }
}

function parseDuration(dur: string): number {
  const match = dur.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 30
}

export default function LessonView() {
  const { day } = useParams<{ day: string }>()
  const navigate = useNavigate()
  const { isLessonCompleted, completeLesson, uncompleteLesson, isLessonUnlocked } = useProgress()

  const dayNum = parseInt(day || '1', 10)
  const lesson = getLesson(dayNum)

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Lezione non trovata</h2>
        <Link to="/" className="text-brand-500 hover:underline">
          Torna alla dashboard
        </Link>
      </div>
    )
  }

  const completed = isLessonCompleted(dayNum)
  const prevLesson = lessons.find((l) => l.day === dayNum - 1)
  const nextLesson = lessons.find((l) => l.day === dayNum + 1)
  const nextUnlocked = nextLesson ? isLessonUnlocked(nextLesson.day) : false

  const handleComplete = () => {
    if (!completed) {
      completeLesson(dayNum)
      playSuccessSound()
    } else {
      uncompleteLesson(dayNum)
    }
  }

  const durationMinutes = parseDuration(lesson.duration)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back nav */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Dashboard
      </Link>

      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
            Giorno {lesson.day}
          </span>
          <span className="text-surface-300">|</span>
          <span className="text-xs text-surface-400">Settimana {lesson.week}</span>
          <span className="text-surface-300">|</span>
          <span className="inline-flex items-center gap-1 text-xs text-surface-400">
            <Clock size={12} />
            {lesson.duration}
          </span>
          {lesson.isRestDay && (
            <>
              <span className="text-surface-300">|</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium border border-blue-200">
                PRATICA LIBERA
              </span>
            </>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide mb-2">
          <span className="mr-3">{lesson.icon}</span>
          {lesson.title.toUpperCase()}
        </h1>
        <p className="text-lg text-surface-500">{lesson.subtitle}</p>
      </header>

      {/* Timer */}
      <div className="mb-8 animate-fade-in stagger-1">
        <LessonTimer durationMinutes={durationMinutes} />
      </div>

      {/* Goals */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-surface-200 shadow-sm mb-8 animate-fade-in stagger-2">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-brand-500" />
          <h3 className="font-display text-xl tracking-wider text-surface-500">
            OBIETTIVI DEL GIORNO
          </h3>
        </div>
        <ul className="space-y-2">
          {lesson.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2.5 text-surface-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              <span className="text-sm sm:text-base">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {lesson.sections.map((section, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 sm:p-6 border shadow-sm animate-fade-in stagger-${Math.min(idx + 3, 7)} ${sectionStyle(section.type)}`}
          >
            {/* Section label */}
            {sectionLabel(section.type) && (
              <div className="flex items-center gap-2 mb-3">
                <SectionIcon type={section.type} />
                <span className="text-xs font-bold uppercase tracking-widest text-surface-400">
                  {sectionLabel(section.type)}
                </span>
              </div>
            )}

            {/* Section title */}
            {section.title && (
              <h3 className="font-display text-2xl sm:text-3xl tracking-wide mb-3">
                {section.title.toUpperCase()}
              </h3>
            )}

            {/* Section content */}
            <div className="text-surface-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {section.content}
            </div>

            {/* Chord diagrams */}
            {section.chordIds && section.chordIds.length > 0 && (
              <>
                <div className="flex flex-wrap gap-4 sm:gap-6 mt-5 justify-center sm:justify-start">
                  {section.chordIds.map((chordId) => {
                    const chord = getChord(chordId)
                    if (!chord) return null
                    return (
                      <ChordDiagram
                        key={chordId}
                        chord={chord}
                        size="md"
                      />
                    )
                  })}
                </div>
                {section.type === 'chords' && section.chordIds.length >= 2 && (
                  <div className="mt-5">
                    <ChordTrainer chordIds={section.chordIds} />
                  </div>
                )}
              </>
            )}

            {/* Strumming pattern */}
            {section.strummingPattern && (
              <div className="mt-5">
                <StrummingPattern pattern={section.strummingPattern} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Complete button */}
      <div className="mt-10 mb-6 animate-fade-in">
        <button
          onClick={handleComplete}
          className={`w-full py-4 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
            completed
              ? 'bg-green-50 border-2 border-green-300 text-green-600 hover:bg-green-100'
              : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30'
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 size={24} />
              Lezione completata!
              <Undo2 size={16} className="ml-2 opacity-40" />
            </>
          ) : (
            <>
              <CheckCircle2 size={24} />
              Segna come completata
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pb-8">
        {prevLesson ? (
          <Link
            to={`/lezione/${prevLesson.day}`}
            className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Giorno {prevLesson.day}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson && nextUnlocked ? (
          <Link
            to={`/lezione/${nextLesson.day}`}
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-400 transition-colors font-medium"
          >
            <span>Giorno {nextLesson.day}</span>
            <ArrowRight size={16} />
          </Link>
        ) : nextLesson ? (
          <span className="inline-flex items-center gap-2 text-sm text-surface-300">
            <span>Giorno {nextLesson.day}</span>
            <ArrowRight size={16} />
          </span>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
