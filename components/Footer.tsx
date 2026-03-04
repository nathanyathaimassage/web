'use client'
import Image from 'next/image'
import { useLang } from './LangContext'
import { useSiteContent } from '../lib/useSiteContent'

export default function Footer() {
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
    <footer className="bg-dark text-white/70 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white rounded-full p-1">
              <Image src="/logo.png" alt="Nathanya Waree Thai Massage" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <p className="font-serif text-white text-lg leading-tight">Nathanya Waree</p>
              <p className="text-secondary text-xs tracking-widest uppercase">Thai Massage</p>
            </div>
          </div>
          <p>📍 {ct('address')}</p>
          <p className="mt-1">📞 {ct('phone1')}</p>
          <p>📞 {ct('phone2')}</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{t('footer_hours')}</p>
          <p>{ct('opening_hours')}</p>
          <p>{ct('opening_hours_note')}</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{t('footer_links')}</p>
          <ul className="space-y-1">
            <li><a href="/services" className="hover:text-white transition">{t('nav_services')}</a></li>
            <li><a href="/prices" className="hover:text-white transition">{t('nav_prices')}</a></li>
            <li><a href="/about" className="hover:text-white transition">{t('nav_about')}</a></li>
            <li><a href="/contact" className="hover:text-white transition">{t('nav_contact')}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{lang === 'de' ? 'Standort' : lang === 'th' ? 'แผนที่' : 'Location'}</p>
          <a
            href="https://maps.app.goo.gl/qaVQ8xUtzfvYax287"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded overflow-hidden hover:opacity-90 transition"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=8.712074419436847%2C53.49359632825553%2C8.720074419436847%2C53.49759632825553&layer=mapnik&marker=53.49559632825553%2C8.716074419436847"
              width="100%"
              height="150"
              style={{ border: 0, pointerEvents: 'none' }}
              loading="lazy"
              title="Nathanya Waree Thai Massage Location"
            />
          </a>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} Nathanya Waree Thai Massage. All rights reserved.
      </p>
    </footer>
  )
}
