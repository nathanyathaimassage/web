'use client'
import { useEffect, useState, useCallback } from 'react'

type DurationItem = {
  min: number
  price: number
  note_en?: string
  note_de?: string
  note_th?: string
}

type ServiceItem = {
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

export default function AdminPricePage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      if (data?.error) return
      if (data['services_data']?.en) {
        try {
          const parsed = JSON.parse(data['services_data'].en)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed)
          }
        } catch { /* ignore */ }
      }
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  function addDuration(sIndex: number) {
    setServices((prev) => {
      const copy = [...prev]
      copy[sIndex] = { ...copy[sIndex], durations: [...copy[sIndex].durations, { min: 60, price: 50 }] }
      return copy
    })
  }

  function removeDuration(sIndex: number, dIndex: number) {
    setServices((prev) => {
      const copy = [...prev]
      copy[sIndex] = { ...copy[sIndex], durations: copy[sIndex].durations.filter((_, i) => i !== dIndex) }
      return copy
    })
  }

  function updateDuration(sIndex: number, dIndex: number, field: string, value: unknown) {
    setServices((prev) => {
      const copy = [...prev]
      const durs = [...copy[sIndex].durations]
      durs[dIndex] = { ...durs[dIndex], [field]: value }
      copy[sIndex] = { ...copy[sIndex], durations: durs }
      return copy
    })
  }

  async function handleSave() {
    setSaving(true)
    const json = JSON.stringify(services)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'services_data', en: json, de: json, th: json }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="text-dark/50 text-sm animate-pulse p-8">Loading...</div>

  if (services.length === 0) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-primary mb-2">Prices</h1>
        <p className="text-dark/50 text-sm">No services found. Please add services first in the Service page.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-primary mb-1">Prices</h1>
          <p className="text-dark/50 text-sm">Edit duration and pricing for each service.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
          }`}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Prices'}
        </button>
      </div>

      <div className="space-y-6">
        {services.map((s, si) => (
          <div key={si} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-primary/5 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold text-dark">{s.name_en}</p>
                <p className="text-xs text-dark/40">{s.name_de} / {s.name_th}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-dark/70">Durations & Prices</p>
                <button onClick={() => addDuration(si)} className="text-xs text-primary hover:underline">+ Add Duration</button>
              </div>
              <div className="space-y-2">
                {s.durations.map((d, di) => (
                  <div key={di} className="flex items-center gap-3 flex-wrap bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <input type="number" value={d.min} onChange={(e) => updateDuration(si, di, 'min', Number(e.target.value))}
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary bg-white" />
                      <span className="text-xs text-dark/40">min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-dark/50">€</span>
                      <input type="number" value={d.price} onChange={(e) => updateDuration(si, di, 'price', Number(e.target.value))}
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary bg-white" />
                    </div>
                    <input type="text" value={d.note_en || ''} onChange={(e) => updateDuration(si, di, 'note_en', e.target.value)}
                      placeholder="Note (EN)" className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary bg-white" />
                    <input type="text" value={d.note_de || ''} onChange={(e) => updateDuration(si, di, 'note_de', e.target.value)}
                      placeholder="Note (DE)" className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary bg-white" />
                    <input type="text" value={d.note_th || ''} onChange={(e) => updateDuration(si, di, 'note_th', e.target.value)}
                      placeholder="Note (TH)" className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary bg-white" />
                    <button onClick={() => removeDuration(si, di)} className="text-red-400 hover:text-red-600 text-sm ml-auto">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
