'use client'
import { useEffect, useState, useCallback } from 'react'
import ImageUpload from '../../../components/ImageUpload'

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

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    icon: '🦶', name_en: 'Thai Foot Massage', name_de: 'Thai Fuss-Massage', name_th: 'นวดเท้าแบบไทย',
    desc_en: 'Stimulation of toes and soles based on traditional Thai medicine.',
    desc_de: 'Stimulation der Zehen und Sohlen nach der Traditionellen Thailaendischen Medizin.',
    desc_th: 'กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 50 }],
  },
]

export default function AdminServicePage() {
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
          } else {
            setServices(DEFAULT_SERVICES)
          }
        } catch {
          setServices(DEFAULT_SERVICES)
        }
      } else {
        setServices(DEFAULT_SERVICES)
      }
    } catch {
      setServices(DEFAULT_SERVICES)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  function updateService(index: number, field: keyof ServiceItem, value: unknown) {
    setServices((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

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

  function addService() {
    setServices((prev) => [...prev, {
      icon: '💆', name_en: 'New Service', name_de: 'Neuer Service', name_th: 'บริการใหม่',
      desc_en: '', desc_de: '', desc_th: '', durations: [{ min: 60, price: 50 }],
    }])
  }

  function removeService(index: number) {
    if (!confirm('Delete this service?')) return
    setServices((prev) => prev.filter((_, i) => i !== index))
  }

  function moveService(index: number, dir: -1 | 1) {
    setServices((prev) => {
      const copy = [...prev]
      const target = index + dir
      if (target < 0 || target >= copy.length) return copy
      const tmp = copy[index]
      copy[index] = copy[target]
      copy[target] = tmp
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-primary mb-1">Services</h1>
          <p className="text-dark/50 text-sm">Manage massage services — names, descriptions, images, and pricing.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addService} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition">
            + Add Service
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
            }`}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Services'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((s, si) => (
          <div key={si} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <input type="text" value={s.icon} onChange={(e) => updateService(si, 'icon', e.target.value)}
                  className="w-12 h-12 text-2xl text-center border border-gray-200 rounded-lg focus:outline-none focus:border-primary" title="Emoji icon" />
                <div>
                  <p className="font-semibold text-dark">{s.name_en || 'New Service'}</p>
                  <p className="text-xs text-dark/40">{s.durations.length} duration(s)</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => moveService(si, -1)} className="text-dark/30 hover:text-dark px-2 py-1 text-sm">Up</button>
                <button onClick={() => moveService(si, 1)} className="text-dark/30 hover:text-dark px-2 py-1 text-sm">Down</button>
                <button onClick={() => removeService(si)} className="text-red-400 hover:text-red-600 px-2 py-1 text-sm">Delete</button>
              </div>
            </div>

            {/* Service image upload */}
            <div className="mb-4">
              <ImageUpload
                currentUrl={s.image || ''}
                folder="services"
                label="Service Image"
                onUploaded={(url) => updateService(si, 'image', url)}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Name (EN)</label>
                <input type="text" value={s.name_en} onChange={(e) => updateService(si, 'name_en', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Name (DE)</label>
                <input type="text" value={s.name_de} onChange={(e) => updateService(si, 'name_de', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Name (TH)</label>
                <input type="text" value={s.name_th} onChange={(e) => updateService(si, 'name_th', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Description (EN)</label>
                <textarea rows={3} value={s.desc_en} onChange={(e) => updateService(si, 'desc_en', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Description (DE)</label>
                <textarea rows={3} value={s.desc_de} onChange={(e) => updateService(si, 'desc_de', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark/50 mb-1 block">Description (TH)</label>
                <textarea rows={3} value={s.desc_th} onChange={(e) => updateService(si, 'desc_th', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y" />
              </div>
            </div>

            {/* Durations / Prices */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-dark/70">Durations and Prices</p>
                <button onClick={() => addDuration(si)} className="text-xs text-primary hover:underline">+ Add Duration</button>
              </div>
              <div className="space-y-2">
                {s.durations.map((d, di) => (
                  <div key={di} className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <input type="number" value={d.min} onChange={(e) => updateDuration(si, di, 'min', Number(e.target.value))}
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary" />
                      <span className="text-xs text-dark/40">min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-dark/50">EUR</span>
                      <input type="number" value={d.price} onChange={(e) => updateDuration(si, di, 'price', Number(e.target.value))}
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary" />
                    </div>
                    <input type="text" value={d.note_de || ''} onChange={(e) => updateDuration(si, di, 'note_de', e.target.value)}
                      placeholder="Note (DE)" className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary" />
                    <input type="text" value={d.note_en || ''} onChange={(e) => updateDuration(si, di, 'note_en', e.target.value)}
                      placeholder="Note (EN)" className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary" />
                    <button onClick={() => removeDuration(si, di)} className="text-red-400 hover:text-red-600 text-sm ml-auto">X</button>
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
