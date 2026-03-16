import { useEffect, useRef } from 'react'

const VERSION_URL = `${import.meta.env.BASE_URL}version.json`
const CHECK_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

async function fetchVersion(): Promise<string | null> {
  try {
    const res = await fetch(`${VERSION_URL}?_=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.hash ?? null
  } catch {
    return null
  }
}

export function useVersionCheck() {
  const knownHash = useRef<string | null>(null)

  useEffect(() => {
    if (import.meta.env.DEV) return

    fetchVersion().then((h) => {
      knownHash.current = h
    })

    const check = async () => {
      const latest = await fetchVersion()
      if (!latest || !knownHash.current) return
      if (latest !== knownHash.current) {
        window.location.reload()
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') check()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    const interval = setInterval(check, CHECK_INTERVAL_MS)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearInterval(interval)
    }
  }, [])
}
