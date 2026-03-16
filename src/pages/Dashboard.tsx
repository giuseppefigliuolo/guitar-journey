import { Link } from 'react-router-dom'
import { weeks, getLessonsByWeek } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'
import {
  CheckCircle2,
  PlayCircle,
  Flame,
  BookOpen,
  Music,
  Trophy,
} from 'lucide-react'

export default function Dashboard() {
  const { isLessonCompleted, totalCompleted, progress } = useProgress()

  const progressPercent = Math.round((totalCompleted / 30) * 100)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <header className="text-center mb-8 sm:mb-12 animate-fade-in">
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-wide mb-2 sm:mb-3">
          GUITAR <span className="text-brand-500">JOURNEY</span>
        </h1>
        <p className="text-surface-500 text-base sm:text-xl max-w-lg mx-auto">
          Il tuo percorso di 30 giorni per imparare la chitarra
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 animate-fade-in stagger-1">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-surface-200 text-center shadow-sm overflow-hidden">
          <BookOpen size={20} className="mx-auto mb-2 text-brand-500" />
          <div className="text-2xl sm:text-3xl font-bold text-surface-900">{totalCompleted}</div>
          <div className="text-xs sm:text-sm text-surface-400 mt-0.5 truncate">Lezioni completate</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-surface-200 text-center shadow-sm overflow-hidden">
          <Flame size={20} className="mx-auto mb-2 text-orange-500" />
          <div className="text-2xl sm:text-3xl font-bold text-surface-900">{progress.streak}</div>
          <div className="text-xs sm:text-sm text-surface-400 mt-0.5 truncate">Giorni di fila</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-surface-200 text-center shadow-sm overflow-hidden">
          <Trophy size={20} className="mx-auto mb-2 text-yellow-500" />
          <div className="text-2xl sm:text-3xl font-bold text-surface-900">{progressPercent}%</div>
          <div className="text-xs sm:text-sm text-surface-400 mt-0.5 truncate">Completamento</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-10 animate-fade-in stagger-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-surface-500">Progresso totale</span>
          <span className="text-sm font-bold text-brand-600">{totalCompleted}/30</span>
        </div>
        <div className="h-3 bg-surface-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Weeks */}
      <div className="space-y-8">
        {weeks.map((week, weekIdx) => {
          const weekLessons = getLessonsByWeek(week.id)
          const weekCompleted = weekLessons.filter((l) => isLessonCompleted(l.day)).length
          const weekTotal = weekLessons.length

          return (
            <section
              key={week.id}
              className={`animate-fade-in stagger-${weekIdx + 3}`}
            >
              {/* Week header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: week.color }}
                >
                  {week.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl sm:text-3xl tracking-wide truncate">
                    {week.title.toUpperCase()}
                  </h2>
                  <p className="text-sm text-surface-400 truncate">{week.subtitle}</p>
                </div>
                <div className="text-sm font-medium text-surface-400 shrink-0">
                  {weekCompleted}/{weekTotal}
                </div>
              </div>

              {/* Week progress */}
              <div className="h-1.5 bg-surface-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(weekCompleted / weekTotal) * 100}%`,
                    backgroundColor: week.color,
                  }}
                />
              </div>

              {/* Lesson cards */}
              <div className="grid gap-2.5 sm:gap-3">
                {weekLessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.day)
                  const isCurrent =
                    !completed && lesson.day === progress.currentDay

                  return (
                    <Link
                      key={lesson.id}
                      to={`/lezione/${lesson.day}`}
                      className={`
                        flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 overflow-hidden
                        ${
                          completed
                            ? 'bg-white/60 border-surface-200 opacity-70 hover:opacity-100'
                            : isCurrent
                              ? 'bg-white border-brand-300 shadow-md shadow-brand-500/10'
                              : 'bg-white border-surface-200 hover:border-surface-300 hover:shadow-sm'
                        }
                      `}
                    >
                      {/* Day number / Status */}
                      <div className="shrink-0">
                        {completed ? (
                          <CheckCircle2
                            size={28}
                            className="text-green-500"
                          />
                        ) : isCurrent ? (
                          <div className="animate-pulse-glow rounded-full">
                            <PlayCircle
                              size={28}
                              className="text-brand-500"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                            style={{ borderColor: week.color, color: week.color }}
                          >
                            {lesson.day}
                          </div>
                        )}
                      </div>

                      {/* Lesson info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lesson.icon}</span>
                          <h3 className="font-semibold text-sm sm:text-base truncate text-surface-800">
                            {lesson.title}
                          </h3>
                          {lesson.isRestDay && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium shrink-0 border border-blue-200">
                              PRATICA
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-surface-400 truncate mt-0.5">
                          {lesson.subtitle}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="shrink-0 text-right">
                        <div className="flex items-center gap-1 text-xs text-surface-400">
                          <Music size={12} />
                          <span>{lesson.duration}</span>
                        </div>
                        <span className="text-[10px] text-surface-400">
                          Giorno {lesson.day}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
