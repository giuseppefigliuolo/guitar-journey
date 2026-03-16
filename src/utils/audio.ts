const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

const STRING_FREQUENCIES: Record<string, number[]> = {
  E:  [329.63],
  Am: [0, 220.00, 329.63, 440.00, 523.25, 659.25],
  Em: [329.63, 246.94, 329.63, 392.00, 493.88, 659.25],
  C:  [0, 261.63, 329.63, 392.00, 523.25, 659.25],
  G:  [196.00, 246.94, 392.00, 392.00, 493.88, 784.00],
  D:  [0, 0, 293.66, 369.99, 440.00, 587.33],
  Dm: [0, 0, 293.66, 349.23, 440.00, 587.33],
  A:  [0, 220.00, 329.63, 440.00, 554.37, 659.25],
  F:  [174.61, 220.00, 261.63, 349.23, 440.00, 523.25],
  A7: [0, 220.00, 329.63, 392.00, 554.37, 659.25],
  E7: [329.63, 246.94, 329.63, 349.23, 493.88, 659.25],
  D7: [0, 0, 293.66, 349.23, 440.00, 523.25],
}

export function playChordSound(chordId: string) {
  if (!audioContext) return

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  const frequencies = STRING_FREQUENCIES[chordId]
  if (!frequencies) return

  const now = audioContext.currentTime

  frequencies.forEach((freq, i) => {
    if (freq === 0) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filterNode = audioContext.createBiquadFilter()

    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(freq, now)

    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(2000, now)
    filterNode.Q.setValueAtTime(1, now)

    const delay = i * 0.03
    gainNode.gain.setValueAtTime(0, now + delay)
    gainNode.gain.linearRampToValueAtTime(0.15, now + delay + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.5)

    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start(now + delay)
    oscillator.stop(now + delay + 1.8)
  })
}

export function playClickSound() {
  if (!audioContext) return

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  const now = audioContext.currentTime
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(800, now)

  gainNode.gain.setValueAtTime(0.3, now)
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start(now)
  oscillator.stop(now + 0.1)
}

export function playSuccessSound() {
  if (!audioContext) return

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  const now = audioContext.currentTime
  const notes = [523.25, 659.25, 783.99]

  notes.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(freq, now + i * 0.15)

    gainNode.gain.setValueAtTime(0, now + i * 0.15)
    gainNode.gain.linearRampToValueAtTime(0.2, now + i * 0.15 + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start(now + i * 0.15)
    oscillator.stop(now + i * 0.15 + 0.5)
  })
}
