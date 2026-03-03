'use client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useLang } from '../components/LangContext'
import { useSiteContent, ServiceData } from '../lib/useSiteContent'

/* ─── Static fallback data (used if DB fetch fails) ─── */
const fallbackServices: ServiceData[] = [
  {
    icon: '🦶',
    name_en: 'Thai Foot Massage', name_de: 'Thai Fuß-Massage', name_th: 'นวดเท้าแบบไทย',
    desc_en: 'Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.',
    desc_de: 'Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.',
    desc_th: 'กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 50 }],
  },
  {
    icon: '💆',
    name_en: 'Thai Oil Deep Massage', name_de: 'Thai Öl-Tiefenmassage', name_th: 'นวดน้ำมันลึก',
    desc_en: 'Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.',
    desc_de: 'Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.',
    desc_th: 'เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 80 }, { min: 120, price: 100 }],
  },
  {
    icon: '🌿',
    name_en: 'Traditional Thai Massage (no oil)', name_de: 'Traditionelle Thai-Massage ohne Öl', name_th: 'นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)',
    desc_en: 'Also known as "Nuad Phaen Boran" — meaning "ancient healing touch". The relevant energy lines of the body are stimulated.',
    desc_de: 'Auch bekannt als "Nuad Phaen Boran", was so viel bedeutet wie "uralte heilsame Berührung". Hierbei werden die relevanten Energielinien des Körpers stimuliert.',
    desc_th: 'หรือ "นวดแผนโบราณ" หมายถึง "การสัมผัสบำบัดโบราณ" โดยกระตุ้นเส้นพลังงานของร่างกาย',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 70 }],
  },
  {
    icon: '🪨',
    name_en: 'Hot Stone Massage', name_de: 'Heiße-Steine-Massage', name_th: 'นวดหินร้อน',
    desc_en: 'A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.',
    desc_de: 'Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.',
    desc_th: 'การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ',
    durations: [{ min: 90, price: 85 }],
  },
  {
    icon: '🌿',
    name_en: 'Herbal Massage', name_de: 'Kräuter-Massage', name_th: 'นวดสมุนไพร',
    desc_en: 'A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.',
    desc_de: 'Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem zufriedenen und friedlichen Entspannungszustand der ganz besonderen Art.',
    desc_th: 'การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง',
    durations: [{ min: 90, price: 80, note_en: '+ herbs', note_de: '+ Kräuter', note_th: '+ สมุนไพร' }],
  },
]

const statsData = {
  en: [
    { n: '5+', label: 'Services' },
    { n: '100%', label: 'Thai Certified' },
    { n: '5★', label: 'Customer Rating' },
    { n: '♥', label: 'With Love' },
  ],
  de: [
    { n: '5+', label: 'Behandlungen' },
    { n: '100%', label: 'Thai Zertifiziert' },
    { n: '5★', label: 'Kundenbewertung' },
    { n: '♥', label: 'Mit Liebe' },
  ],
  th: [
    { n: '5+', label: 'บริการ' },
    { n: '100%', label: 'รับรองจากไทย' },
    { n: '5★', label: 'คะแนนลูกค้า' },
    { n: '♥', label: 'ด้วยใจ' },
  ],
}

function getServiceName(s: ServiceData, lang: string) {
  if (lang === 'de') return s.name_de
  if (lang === 'th') return s.name_th
  return s.name_en
}

function getServiceDesc(s: ServiceData, lang: string) {
  if (lang === 'de') return s.desc_de
  if (lang === 'th') return s.desc_th
  return s.desc_en
}

export default function HomePage() {
  const { lang, t } = useLang()
  const { services: dbServices, content } = useSiteContent()
  const stats = statsData[lang]
  const allServices = dbServices || fallbackServices

  // Helper to get dynamic content or fall back to i18n
  function ct(key: string): string {
    if (content && content[key]) {
      const val = content[key][lang]
      if (val) return val
    }
    return t(key as Parameters<typeof t>[0])
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary/10 min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full py-20">
          <div>
            <p className="text-secondary font-medium uppercase tracking-widest text-sm mb-3">{ct('hero_tag')}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-6 whitespace-pre-line">
              {ct('hero_title')}
            </h1>
            <p className="text-dark/70 text-lg mb-8 leading-relaxed">{ct('hero_desc')}</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/prices" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
                {t('hero_prices')}
              </Link>
              <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition">
                {t('hero_contact')}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex rounded-3xl overflow-hidden shadow-xl bg-secondary/20 h-96 items-center justify-center">
            {content?.hero_image?.[lang] ? (
              <img src={content.hero_image[lang]} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-8xl">💆</span>
            )}
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2 text-center">{t('services_tag')}</p>
        <h2 className="font-serif text-4xl text-primary text-center mb-12">{t('services_title')}</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allServices.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-xl transition">
              {s.image ? (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                  <img src={s.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-4xl mb-3">{s.icon}</div>
              )}
              <h3 className="font-serif text-lg text-primary mb-2">{getServiceName(s, lang)}</h3>
              <p className="text-dark/60 text-xs leading-relaxed">{getServiceDesc(s, lang)}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
            {t('services_all')}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <p className="uppercase tracking-widest text-secondary text-sm mb-2">{t('stats_tag')}</p>
          <h2 className="font-serif text-4xl mb-12">{t('stats_title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-5xl text-secondary mb-2">{stat.n}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-serif text-4xl text-primary mb-4">{ct('cta_title')}</h2>
        <p className="text-dark/60 mb-8">{ct('cta_desc')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:015156049351" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
            📞 0 15156049351
          </a>
          <a href="tel:015168515530" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition">
            📞 0 15168515530
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
