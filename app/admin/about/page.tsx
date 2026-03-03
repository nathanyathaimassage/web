'use client'
import { useEffect, useState, useCallback } from 'react'
import ImageUpload from '../../../components/ImageUpload'

type LangRow = { de: string; th: string; en: string }
type ContentMap = Record<string, LangRow>

const FIELDS = [
  { key: 'about_h2', label: 'Section Heading' },
  { key: 'about_p1', label: 'Paragraph 1', multiline: true },
  { key: 'about_p2', label: 'Paragraph 2', multiline: true },
  { key: 'about_p3', label: 'Paragraph 3', multiline: true },
]

const IMAGE_KEY = 'about_image'

const ALL_KEYS = [...FIELDS.map((f) => f.key), IMAGE_KEY]

const LANGS: { code: 'de' | 'th' | 'en'; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'th', flag: '🇹🇭', label: 'ไทย' },
]

export default function AdminAboutPage() {
  const [rows, setRows] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      if (data?.error) return
      const merged: ContentMap = {}
      for (const key of ALL_KEYS) {
        merged[key] = {
          en: data[key]?.en || '',
          de: data[key]?.de || '',
          th: data[key]?.th || '',
        }
      }
      setRows(merged)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  function handleChange(key: string, lang: 'de' | 'th' | 'en', value: string) {
    setRows((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: value } }))
  }

  async function handleSaveAll() {
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

  function handleImageUploaded(url: string) {
    setRows((prev) => ({ ...prev, [IMAGE_KEY]: { en: url, de: url, th: url } }))
  }

  if (loading) return <div className="text-dark/50 text-sm animate-pulse p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-primary mb-1">About Page</h1>
          <p className="text-dark/50 text-sm">Edit content shown on the About page.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving === 'all'}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            saved === 'all' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
          }`}
        >
          {saving === 'all' ? 'Saving...' : saved === 'all' ? 'Saved!' : 'Save All Changes'}
        </button>
      </div>

      <div className="mb-6">
        <ImageUpload
          currentUrl={rows[IMAGE_KEY]?.en || ''}
          folder="about"
          label="About Page Image"
          onUploaded={handleImageUploaded}
        />
      </div>

      <div className="space-y-4">
        {FIELDS.map((field) => {
          const row = rows[field.key] || { de: '', th: '', en: '' }
          return (
            <div key={field.key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="mb-3">
                <p className="font-medium text-dark text-sm">{field.label}</p>
                <p className="text-xs text-dark/30 font-mono">{field.key}</p>
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
  )
}
