'use client'
import { useEffect, useState, useCallback } from 'react'
import ImageUpload from '../../../components/ImageUpload'

type GalleryImage = {
  url: string
  caption_de: string
  caption_th: string
  caption_en: string
}

const GALLERY_KEY = 'gallery_images'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      if (data?.error) return

      if (data[GALLERY_KEY]?.en) {
        try {
          const parsed = JSON.parse(data[GALLERY_KEY].en)
          if (Array.isArray(parsed)) setImages(parsed)
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContent() }, [loadContent])

  async function handleSave() {
    setSaving(true)
    const jsonStr = JSON.stringify(images)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ key: GALLERY_KEY, en: jsonStr, de: jsonStr, th: jsonStr }],
      }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function addImage() {
    setImages((prev) => [...prev, { url: '', caption_de: '', caption_th: '', caption_en: '' }])
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function updateImage(index: number, field: keyof GalleryImage, value: string) {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, [field]: value } : img)))
  }

  function moveImage(index: number, direction: 'up' | 'down') {
    setImages((prev) => {
      const arr = [...prev]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= arr.length) return arr
      ;[arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]]
      return arr
    })
  }

  if (loading) return <div className="text-dark/50 text-sm animate-pulse p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-primary mb-1">Gallery / Atmosphere</h1>
          <p className="text-dark/50 text-sm">Manage photos shown on the Gallery page (บรรยากาศในร้าน).</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addImage}
            className="px-5 py-2 rounded-full text-sm font-medium bg-secondary text-white hover:bg-secondary/80 transition"
          >
            + Add Photo
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
            }`}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <span className="text-5xl block mb-3">📷</span>
          <p className="text-dark/40 text-sm mb-4">No photos yet. Click &quot;+ Add Photo&quot; to start.</p>
          <button
            onClick={addImage}
            className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/90 transition"
          >
            + Add First Photo
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {images.map((img, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-semibold text-dark/70">Photo #{index + 1}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveImage(index, 'up')}
                    disabled={index === 0}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveImage(index, 'down')}
                    disabled={index === images.length - 1}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeImage(index)}
                    className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition ml-2"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Image upload */}
                <ImageUpload
                  currentUrl={img.url}
                  folder="gallery"
                  label="Photo"
                  onUploaded={(url) => updateImage(index, 'url', url)}
                />

                {/* Captions */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-dark/50 mb-1 block">🇩🇪 Caption (DE)</label>
                    <input
                      type="text"
                      value={img.caption_de}
                      onChange={(e) => updateImage(index, 'caption_de', e.target.value)}
                      placeholder="Beschreibung..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark/50 mb-1 block">🇬🇧 Caption (EN)</label>
                    <input
                      type="text"
                      value={img.caption_en}
                      onChange={(e) => updateImage(index, 'caption_en', e.target.value)}
                      placeholder="Description..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark/50 mb-1 block">🇹🇭 Caption (TH)</label>
                    <input
                      type="text"
                      value={img.caption_th}
                      onChange={(e) => updateImage(index, 'caption_th', e.target.value)}
                      placeholder="คำอธิบาย..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
