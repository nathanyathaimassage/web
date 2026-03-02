'use client'
import Image from 'next/image'
import { useLang } from './LangContext'

export default function Footer() {
  const { t } = useLang()

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
          <p>📍 Sellstedter Str. 5, 27612 Loxstedt – Donnern</p>
          <p className="mt-1">📞 0 15156049351</p>
          <p>📞 0 15168515530</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">{t('footer_hours')}</p>
          <p>{t('mon_fri')}</p>
          <p>{t('sat')}</p>
          <p>{t('sun')}</p>
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
      </div>
      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} Nathanya Waree Thai Massage. All rights reserved.
      </p>
    </footer>
  )
}
