'use client'
import { useLang } from '../../components/LangContext'
import { useSiteContent } from '../../lib/useSiteContent'

export default function AboutPage() {
  const { lang, t } = useLang()
  const { content } = useSiteContent()

  function ct(key: string): string {
    if (content && content[key]) {
      const val = content[key][lang]
      if (val) return val
    }
    return t(key as Parameters<typeof t>[0])
  }

  return (
    <>
      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('about_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('about_title')}</h1>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden bg-secondary/20 aspect-square flex items-center justify-center">
          {content?.about_image?.[lang] ? (
            <img src={content.about_image[lang]} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-7xl">🌿💆🌸</span>
          )}
        </div>
        <div>
          <h2 className="font-serif text-3xl text-primary mb-4">{ct('about_h2')}</h2>
          <p className="text-dark/70 leading-relaxed mb-4">{ct('about_p1')}</p>
          <p className="text-dark/70 leading-relaxed mb-4">{ct('about_p2')}</p>
          <p className="text-dark/70 leading-relaxed mb-6">{ct('about_p3')}</p>

          {/* Contact info */}
          <div className="bg-primary/5 rounded-xl p-5 space-y-2 text-sm">
            <p className="flex gap-2"><span>📍</span> {ct('address')}</p>
            <p className="flex gap-2"><span>📞</span> {ct('phone1')} / {ct('phone2')}</p>
            <p className="flex gap-2"><span>🕐</span> {ct('opening_hours')}</p>
            <p className="flex gap-2"><span></span> {ct('opening_hours_note')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
