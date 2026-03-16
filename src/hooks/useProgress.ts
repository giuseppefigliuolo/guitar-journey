import { useState, useEffect, useCallback } from 'react'

interface Progress {
  completedLessons: number[]
  currentDay: number
  streak: number
  lastPracticeDate: string | null
  minuteTestScores: Record<string, number>
}

const STORAGE_KEY = 'guitar-journey-progress'

const defaultProgress: Progress = {
  completedLessons: [],
  currentDay: 1,
  streak: 0,
  lastPracticeDate: null,
  minuteTestScores: {},
}

function loadProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) }
    }
  } catch {
    // ignore
  }
  return defaultProgress
}

function saveProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeLesson = useCallback((day: number) => {
    setProgress((prev) => {
      const today = getToday()
      const isConsecutive = prev.lastPracticeDate === today || (prev.lastPracticeDate && isYesterday(prev.lastPracticeDate))
      const newStreak = prev.lastPracticeDate === today
        ? prev.streak
        : isConsecutive
          ? prev.streak + 1
          : 1

      const completedLessons = prev.completedLessons.includes(day)
        ? prev.completedLessons
        : [...prev.completedLessons, day]

      return {
        ...prev,
        completedLessons,
        currentDay: Math.max(prev.currentDay, day + 1),
        streak: newStreak,
        lastPracticeDate: today,
      }
    })
  }, [])

  const uncompleteLesson = useCallback((day: number) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((d) => d !== day),
    }))
  }, [])

  const isLessonCompleted = useCallback(
    (day: number) => progress.completedLessons.includes(day),
    [progress.completedLessons]
  )

  const isLessonUnlocked = useCallback(
    (day: number) => day <= progress.currentDay,
    [progress.currentDay]
  )

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [])

  return {
    progress,
    completeLesson,
    uncompleteLesson,
    isLessonCompleted,
    isLessonUnlocked,
    resetProgress,
    totalCompleted: progress.completedLessons.length,
  }
}
