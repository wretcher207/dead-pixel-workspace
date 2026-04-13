/**
 * useAtlasData — fetch real data from the API, fall back to mock data if offline.
 *
 * Usage:
 *   const { data, loading, error, isLive } = useAtlasData(
 *     () => fetchGatekeeper().then(r => r.payload),
 *     mockGatekeeper
 *   )
 *
 * - If the backend is running, `data` is real system data and `isLive` is true.
 * - If the backend is down, `data` is mock data and `isLive` is false.
 * - `loading` is true while the first fetch is in flight.
 */
import { useState, useEffect, useCallback } from 'react'

interface AtlasDataState<T> {
  data: T
  loading: boolean
  error: string | null
  isLive: boolean
  refetch: () => void
}

export function useAtlasData<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  refreshInterval?: number,
): AtlasDataState<T> {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const result = await fetcher()
      setData(result)
      setIsLive(true)
      setError(null)
    } catch (err) {
      // Backend is down — silently fall back to mock data
      setData(fallback)
      setIsLive(false)
      setError(err instanceof Error ? err.message : 'Backend unavailable')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Optional auto-refresh (e.g., every 60 seconds)
  useEffect(() => {
    if (!refreshInterval) return
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return { data, loading, error, isLive, refetch: fetchData }
}
