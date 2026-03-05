'use client'
import { useLang } from '../../components/LangContext'
import { useSiteContent } from '../../lib/useSiteContent'
import { useState } from 'react'

export default function GalleryPage() {
  const { lang, t } = useLang()
  const { content } = useSiteContent()
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  function ct(key: string): string {
    if (content && content[key]) {
      const val = content[key][lang]
      if (val) return val
    }
    return t(key as Parameters<typeof t>[0])
  }

  // Parse gallery images from site_content (stored as JSON array in gallery_images key)
  let images: { url: string; caption_de?: string; caption_th?: string; caption_en?: string }[] = []
  try {
    const raw = content?.gallery_images?.en
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) images = parsed
    }
  } catch {
    // ignore
  }

  function getCaption(img: { caption_de?: string; caption_th?: string; caption_en?: string }) {
    if (lang === 'de') return img.caption_de || ''
    if (lang === 'th') return img.caption_th || ''
    return img.caption_en || ''
  }

  return (
    <>
      {/* Header */}
      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('gallery_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('gallery_title')}</h1>
        <p className="text-dark/60 mt-4 max-w-xl mx-auto text-sm">{ct('gallery_desc')}</p>
      </section>

      {/* Gallery grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📷</span>
            <p className="text-dark/50 text-sm">{t('gallery_empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(img.url)}
                className="group relative rounded-2xl overflow-hidden bg-secondary/10 aspect-square focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={img.url}
                  alt={getCaption(img) || `Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
                {getCaption(img) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                    <p className="text-white text-xs">{getCaption(img)}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-secondary transition"
          >
            ✕
          </button>
          <img
            src={selectedImg}
            alt=""
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
