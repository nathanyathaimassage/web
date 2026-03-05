'use client'
import { useEffect, useState, useCallback } from 'react'

type LangRow = { de: string; th: string; en: string }
type ContentMap = Record<string, LangRow>

type DurationItem = {
  min: number
  price: number
  note_en?: string
  note_de?: string
  note_th?: string
}

type ServiceItem = {
  icon: string
  name_en: string
  name_de: string
  name_th: string
  desc_en: string
  desc_de: string
  desc_th: string
  durations: DurationItem[]
}

const SECTIONS: {
  title: string
  icon: string
  fields: { key: string; label: string; multiline?: boolean }[]
}[] = [
  {
    title: 'Hero Section (Home Page)',
    icon: '🏠',
    fields: [
      { key: 'hero_tag', label: 'Tag line (small text above title)' },
      { key: 'hero_title', label: 'Main Title' },
      { key: 'hero_desc', label: 'Description', multiline: true },
    ],
  },
  {
    title: 'CTA Section',
    icon: '📣',
    fields: [
      { key: 'cta_title', label: 'CTA Title' },
      { key: 'cta_desc', label: 'CTA Description', multiline: true },
    ],
  },
  {
    title: 'About Page',
    icon: '📖',
    fields: [
      { key: 'about_h2', label: 'Section Heading' },
      { key: 'about_p1', label: 'Paragraph 1', multiline: true },
      { key: 'about_p2', label: 'Paragraph 2', multiline: true },
      { key: 'about_p3', label: 'Paragraph 3', multiline: true },
    ],
  },
  {
    title: 'Gift Vouchers',
    icon: '🎁',
    fields: [
      { key: 'gift_title', label: 'Title' },
      { key: 'gift_desc', label: 'Description', multiline: true },
    ],
  },
  {
    title: 'Contact & Opening Hours',
    icon: '📍',
    fields: [
      { key: 'address', label: 'Address' },
      { key: 'phone1', label: 'Phone 1' },
      { key: 'phone2', label: 'Phone 2' },
      { key: 'opening_hours', label: 'Opening Hours (main line)' },
      { key: 'opening_hours_note', label: 'Opening Hours (note/Sunday)' },
    ],
  },
]

const LANGS: { code: 'de' | 'th' | 'en'; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'th', flag: '🇹🇭', label: 'ไทย' },
]

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    icon: '🦶',
    name_en: 'Thai Foot Massage', name_de: 'Thai Fuss-Massage', name_th: 'นวดเท้าแบบไทย',
    desc_en: 'Stimulation of toes and soles based on traditional Thai medicine.',
    desc_de: 'Stimulation der Zehen und Sohlen nach der Traditionellen Thailaendischen Medizin.',
    desc_th: 'กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 50 }],
  },
  {
    icon: '💆',
    name_en: 'Thai Oil Deep Massage', name_de: 'Thai Oel-Tiefenmassage', name_th: 'นวดน้ำมันลึก',
    desc_en: 'Pure relaxation with warm oil releasing built-up tension and reducing stress.',
    desc_de: 'Reine Entspannung durch warmes Oel.',
    desc_th: 'เพื่อการผ่อนคลายอย่างแท้จริง',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 80 }, { min: 120, price: 100 }],
  },
  {
    icon: '🌿',
    name_en: 'Traditional Thai Massage (no oil)', name_de: 'Traditionelle Thai-Massage ohne Oel', name_th: 'นวดแผนไทยดั้งเดิม',
    desc_en: 'Also known as Nuad Phaen Boran. The relevant energy lines of the body are stimulated.',
    desc_de: 'Auch bekannt als Nuad Phaen Boran.',
    desc_th: 'หรือ นวดแผนโบราณ โดยกระตุ้นเส้นพลังงานของร่างกาย',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 70 }],
  },
  {
    icon: '🪨',
    name_en: 'Hot Stone Massage', name_de: 'Heisse-Steine-Massage', name_th: 'นวดหินร้อน',
    desc_en: 'A combination of soothing massage and heated basalt stones.',
    desc_de: 'Kombination aus Massage und Basaltsteinen.',
    desc_th: 'การผสมผสานการนวดกับหินบะซอลต์ร้อน',
    durations: [{ min: 90, price: 85 }],
  },
  {
    icon: '🌿',
    name_en: 'Herbal Massage', name_de: 'Kraeuter-Massage', name_th: 'นวดสมุนไพร',
    desc_en: 'A combination of aromatherapy, herbal medicine and heat treatment.',
    desc_de: 'Kombination von Aromatherapie und Kraeuterheilkunde.',
    desc_th: 'การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน',
    durations: [{ min: 90, price: 80, note_en: '+ herbs', note_de: '+ Kraeuter', note_th: '+ สมุนไพร' }],
  },
]

const DEFAULT_CONTENT: ContentMap = {
  hero_tag: { en: 'Traditional Thai Massage', de: 'Traditionelle Thaimassage', th: 'นวดแผนไทยดั้งเดิม' },
  hero_title: { en: 'Feel the Healing Power of Touch', de: 'Spueren Sie die heilende Kraft der Beruehrung', th: 'สัมผัสการบำบัดด้วยมือของเรา' },
  hero_desc: { en: 'Experience authentic Thai massage in Loxstedt.', de: 'Erleben Sie authentische Thaimassage in Loxstedt.', th: 'สัมผัสประสบการณ์นวดแผนไทยแท้ๆ' },
  cta_title: { en: 'Ready to Relax?', de: 'Bereit zum Entspannen?', th: 'พร้อมผ่อนคลายแล้วหรือยัง?' },
  cta_desc: { en: 'Contact us today. Call 0 15156049351 or 0 15168515530', de: 'Kontaktieren Sie uns. Tel: 0 15156049351', th: 'ติดต่อเราวันนี้ โทร 0 15156049351' },
  about_h2: { en: 'Authentic Thai Healing', de: 'Authentische Thai-Heilkunst', th: 'การบำบัดแบบไทยแท้' },
  about_p1: { en: 'Nathanya Waree is a Thai massage studio at Sellstedter Str. 5, 27612 Loxstedt.', de: 'Nathanya Waree ist ein Thaimassage-Studio in Loxstedt.', th: 'Nathanya Waree เป็นร้านนวดแผนไทยที่ Loxstedt' },
  about_p2: { en: 'We believe every body deserves care with attention, skill and respect.', de: 'Wir glauben, dass jeder Koerper Sorgfalt verdient.', th: 'เราเชื่อว่าทุกร่างกายสมควรได้รับการดูแล' },
  about_p3: { en: 'Our studio is a calm and welcoming space. Ask about our gift vouchers.', de: 'Unser Studio ist ein ruhiger Ort. Fragen Sie nach Geschenkgutscheinen.', th: 'ร้านของเราเป็นพื้นที่สงบและอบอุ่น' },
  gift_title: { en: 'Gift Vouchers', de: 'Geschenkgutscheine', th: 'บัตรกำนัล' },
  gift_desc: { en: 'Looking for a special gift? Ask about our gift vouchers.', de: 'Fragen Sie nach unseren Geschenkgutscheinen.', th: 'สอบถามบัตรกำนัลนวดไทยของเราได้เลย' },
  address: { en: 'Sellstedter Str. 5, 27612 Loxstedt', de: 'Sellstedter Str. 5, 27612 Loxstedt', th: 'Sellstedter Str. 5, 27612 Loxstedt' },
  phone1: { en: '0 15156049351', de: '0 15156049351', th: '0 15156049351' },
  phone2: { en: '0 15168515530', de: '0 15168515530', th: '0 15168515530' },
  opening_hours: { en: 'Mon - Sat: 09:00 - 18:00', de: 'Mo - Sa: 09:00 - 18:00 Uhr', th: 'จันทร์ - เสาร์: 09:00 - 18:00' },
  opening_hours_note: { en: 'Sun: Closed / by appointment', de: 'So: Geschlossen / nach Vereinbarung', th: 'อาทิตย์: ปิด / นัดหมายล่วงหน้า' },
}

type TabKey = 'content' | 'services'

export default function AdminContentPage() {
  const [tab, setTab] = useState<TabKey>('content')
  const [rows, setRows] = useState<ContentMap>({})
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      if (data?.error) {
        setFetchError(data.error)
        return
      }
      const merged: ContentMap = {}
      for (const key of Object.keys(DEFAULT_CONTENT)) {
        merged[key] = {
          en: data[key]?.en || DEFAULT_CONTENT[key].en,
          de: data[key]?.de || DEFAULT_CONTENT[key].de,
          th: data[key]?.th || DEFAULT_CONTENT[key].th,
        }
      }
      setRows(merged)
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
    } catch (e: unknown) {
      setFetchError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  function handleChange(key: string, lang: 'de' | 'th' | 'en', value: string) {
    setRows((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: value } }))
  }

  async function handleSaveField(key: string) {
    setSaving(key)
    const row = rows[key]
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, de: row.de, th: row.th, en: row.en }),
    })
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  async function handleSaveAllContent() {
    setSaving('all')
    const items = Object.entries(rows).map(([key, val]) => ({ key, ...val }))
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    setSaving(null)
    setSaved('all')
    setTimeout(() => setSaved(null), 2000)
  }

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

  async function handleSaveServices() {
    setSaving('services')
    const json = JSON.stringify(services)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'services_data', en: json, de: json, th: json }),
    })
    setSaving(null)
    setSaved('services')
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) {
    return <div className="text-dark/50 text-sm animate-pulse p-8">Loading content...</div>
  }

  if (fetchError) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-primary mb-4">Page Content</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="font-medium text-amber-800 mb-2">Database table not set up yet</p>
          <p className="text-sm text-amber-700 mb-4">Run this SQL in Supabase SQL Editor:</p>
          <pre className="bg-white border border-amber-200 rounded p-4 text-xs overflow-x-auto text-dark">
{`CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  de TEXT DEFAULT '',
  th TEXT DEFAULT '',
  en TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Service role manage" ON site_content FOR ALL USING (true) WITH CHECK (true);`}
          </pre>
        </div>
      </div>
    )
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'content', label: 'Text & Info' },
    { key: 'services', label: 'Services & Prices' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-primary mb-1">Page Content</h1>
          <p className="text-dark/50 text-sm">Edit all text and services shown on the public website.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
              tab === item.key ? 'border-primary text-primary' : 'border-transparent text-dark/50 hover:text-dark'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'content' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSaveAllContent}
              disabled={saving === 'all'}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                saved === 'all' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
              }`}
            >
              {saving === 'all' ? 'Saving...' : saved === 'all' ? 'All Saved!' : 'Save All Changes'}
            </button>
          </div>
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                  <span>{section.icon}</span> {section.title}
                </h2>
                <div className="space-y-4">
                  {section.fields.map((field) => {
                    const row = rows[field.key] || { de: '', th: '', en: '' }
                    const isSaving = saving === field.key
                    const isSaved = saved === field.key
                    return (
                      <div key={field.key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-dark text-sm">{field.label}</p>
                            <p className="text-xs text-dark/30 font-mono">{field.key}</p>
                          </div>
                          <button
                            onClick={() => handleSaveField(field.key)}
                            disabled={isSaving}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                              isSaved ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50'
                            }`}
                          >
                            {isSaving ? '...' : isSaved ? 'Saved' : 'Save'}
                          </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          {LANGS.map(({ code, flag, label }) => (
                            <div key={code}>
                              <label className="flex items-center gap-1 text-xs font-semibold text-dark/50 mb-1">{flag} {label}</label>
                              {field.multiline ? (
                                <textarea rows={3} value={row[code]} onChange={(e) => handleChange(field.key, code, e.target.value)}
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y" />
                              ) : (
                                <input type="text" value={row[code]} onChange={(e) => handleChange(field.key, code, e.target.value)}
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'services' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-dark/50 text-sm">Manage all massage services and pricing.</p>
            <div className="flex gap-2">
              <button onClick={addService} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition">
                + Add Service
              </button>
              <button
                onClick={handleSaveServices}
                disabled={saving === 'services'}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  saved === 'services' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
                }`}
              >
                {saving === 'services' ? 'Saving...' : saved === 'services' ? 'Saved!' : 'Save Services'}
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
      )}
    </div>
  )
}
