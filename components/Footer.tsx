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
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
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
          <a href="https://maps.app.goo.gl/5yi932V1d48v2NRSA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            📍 {ct('address')}
          </a>
          <p className="mt-1">📞 {ct('phone1')}</p>
          <p>📞 {ct('phone2')}</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{t('footer_hours')}</p>
          <p>{ct('opening_hours')}</p>
          <p>{ct('opening_hours_note')}</p>
          {/* Google Maps */}
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d600!2d8.715636683715688!3d53.4968882347708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b6a7c8f1e2d5a1%3A0x0!2zNTPCsDI5JzQ4LjgiTiA4wrA0Mic1Ni4zIkU!5e0!3m2!1sde!2sde!4v1709654400000!5m2!1sde!2sde"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nathanya Waree Thai Massage Location"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{t('footer_links')}</p>
          <ul className="space-y-1">
            <li><a href="/services" className="hover:text-white transition">{t('nav_services')}</a></li>
            <li><a href="/prices" className="hover:text-white transition">{t('nav_prices')}</a></li>
            <li><a href="/gallery" className="hover:text-white transition">{t('nav_gallery')}</a></li>
            <li><a href="/about" className="hover:text-white transition">{t('nav_about')}</a></li>
            <li><a href="/contact" className="hover:text-white transition">{t('nav_contact')}</a></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} Nathanya Waree Thai Massage. All rights reserved.
      </p>
    </footer>
  )
}
