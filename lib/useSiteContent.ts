'use client'
import { useState, useEffect, useCallback } from 'react'

type LangRow = { de: string; th: string; en: string }
type ContentMap = Record<string, LangRow>

type DurationItem = {
  min: number
  price: number
  note_en?: string
  note_de?: string
  note_th?: string
}

export type ServiceData = {
  icon: string
  image?: string
  name_en: string
  name_de: string
  name_th: string
  desc_en: string
  desc_de: string
  desc_th: string
  durations: DurationItem[]
}

let cachedContent: ContentMap | null = null
let cachedServices: ServiceData[] | null = null
let fetching = false
let fetchPromise: Promise<void> | null = null

async function doFetch() {
  try {
    const res = await fetch('/api/content')
    const data = await res.json()
    if (data && typeof data === 'object') {
      cachedContent = data
      // Parse services_data
      if (data['services_data']?.en) {
        try {
          const parsed = JSON.parse(data['services_data'].en)
          if (Array.isArray(parsed) && parsed.length > 0) {
            cachedServices = parsed
          }
        } catch {
          // ignore parse errors
        }
      }
    }
  } catch {
    // ignore fetch errors — fall back to static data
  }
}

export function useSiteContent() {
  const [content, setContent] = useState<ContentMap | null>(cachedContent)
  const [services, setServices] = useState<ServiceData[] | null>(cachedServices)
  const [loaded, setLoaded] = useState(!!cachedContent)

  const load = useCallback(async () => {
    if (cachedContent) {
      setContent(cachedContent)
      setServices(cachedServices)
      setLoaded(true)
      return
    }

    if (!fetching) {
      fetching = true
      fetchPromise = doFetch()
    }

    await fetchPromise
    setContent(cachedContent)
    setServices(cachedServices)
    setLoaded(true)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { content, services, loaded }
}
