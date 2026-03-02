'use client'
import { useEffect, useState } from 'react'

type ContentRow = {
  de: string
  th: string
  en: string
}

const CONTENT_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'hero_tag', label: 'Hero – Tag line (small text above title)' },
  { key: 'hero_title', label: 'Hero – Main Title' },
  { key: 'hero_desc', label: 'Hero – Description', multiline: true },
  { key: 'cta_title', label: 'CTA – Title' },
  { key: 'cta_desc', label: 'CTA – Description' },
  { key: 'about_h2', label: 'About – Section Heading' },
  { key: 'about_p1', label: 'About – Paragraph 1', multiline: true },
  { key: 'about_p2', label: 'About – Paragraph 2', multiline: true },
  { key: 'about_p3', label: 'About – Paragraph 3', multiline: true },
  { key: 'contact_visit', label: 'Contact – "Visit Us" heading' },
  { key: 'footer_copy', label: 'Footer – Copyright text' },
]

const LANGS: { code: 'de' | 'th' | 'en'; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'th', flag: '🇹🇭', label: 'ภาษาไทย' },
]

export default function AdminContentPage() {
  const [rows, setRows] = useState<Record<string, ContentRow>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.error) {
          setFetchError(data.error)
        } else {
          setRows(data || {})
        }
        setLoading(false)
      })
      .catch((e) => {
        setFetchError(e.message)
        setLoading(false)
      })
  }, [])

  function handleChange(key: string, lang: 'de' | 'th' | 'en', value: string) {
    setRows((prev) => ({
      ...prev,
      [key]: {
        de: prev[key]?.de ?? '',
        th: prev[key]?.th ?? '',
        en: prev[key]?.en ?? '',
        [lang]: value,
      },
    }))
  }

  async function handleSave(key: string) {
    setSaving(key)
    const row = rows[key] || { de: '', th: '', en: '' }
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, de: row.de, th: row.th, en: row.en }),
    })
    setSaving(null)
    if (res.ok) {
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    }
  }

  if (loading) {
    return <div className="text-dark/50 text-sm animate-pulse">Loading content…</div>
  }

  if (fetchError) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-primary mb-4">Page Content</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="font-medium text-amber-800 mb-2">⚠️ Database table not set up yet</p>
          <p className="text-sm text-amber-700 mb-4">
            Please run the following SQL in your <strong>Supabase SQL Editor</strong> to create the <code>site_content</code> table:
          </p>
          <pre className="bg-white border border-amber-200 rounded p-4 text-xs overflow-x-auto text-dark">
{`CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  de TEXT DEFAULT '',
  th TEXT DEFAULT '',
  en TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
          </pre>
          <p className="text-xs text-amber-600 mt-3">After running the SQL, refresh this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-2">Page Content</h1>
      <p className="text-dark/50 text-sm mb-8">
        Edit the text shown on the public website in all 3 languages. Changes are saved to the database and shown live.
      </p>

      <div className="space-y-6">
        {CONTENT_FIELDS.map((field) => {
          const row = rows[field.key] || { de: '', th: '', en: '' }
          const isSaving = saving === field.key
          const isSaved = saved === field.key

          return (
            <div key={field.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-dark">{field.label}</p>
                  <p className="text-xs text-dark/40 font-mono mt-0.5">{field.key}</p>
                </div>
                <button
                  onClick={() => handleSave(field.key)}
                  disabled={isSaving}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    isSaved
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
                  }`}
                >
                  {isSaving ? 'Saving…' : isSaved ? '✓ Saved' : 'Save'}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {LANGS.map(({ code, flag, label }) => (
                  <div key={code}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-dark/60 mb-1.5">
                      {flag} {label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        rows={4}
                        value={row[code]}
                        onChange={(e) => handleChange(field.key, code, e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
                        placeholder={`${label} text…`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={row[code]}
                        onChange={(e) => handleChange(field.key, code, e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        placeholder={`${label} text…`}
                      />
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
