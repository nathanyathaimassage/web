'use client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useLang } from '../components/LangContext'

const serviceTranslations = {
  en: [
    { icon: '🌿', title: 'Thai Massage', desc: 'Traditional stretching and acupressure techniques to relieve tension and improve flexibility.' },
    { icon: '💆', title: 'Oil Massage', desc: 'Relaxing full-body massage with warm aromatic oils to melt away stress.' },
    { icon: '🦶', title: 'Foot Reflexology', desc: 'Targeted pressure on reflex points to restore energy flow and balance.' },
  ],
  de: [
    { icon: '🌿', title: 'Thaimassage', desc: 'Traditionelle Dehn- und Akupressurmethoden zur Linderung von Verspannungen und Verbesserung der Flexibilität.' },
    { icon: '💆', title: 'Ölmassage', desc: 'Entspannende Ganzkörpermassage mit warmen aromatischen Ölen – perfekt gegen Stress und Erschöpfung.' },
    { icon: '🦶', title: 'Fußreflexzonenmassage', desc: 'Gezielter Druck auf Reflexzonen der Füße zur Förderung des Energieflusses und des körperlichen Gleichgewichts.' },
  ],
  th: [
    { icon: '🌿', title: 'นวดแผนไทย', desc: 'ใช้เทคนิคการยืดและกดจุดแบบดั้งเดิมเพื่อบรรเทาความตึงและเพิ่มความยืดหยุ่นของร่างกาย' },
    { icon: '💆', title: 'นวดน้ำมัน', desc: 'นวดผ่อนคลายทั้งตัวด้วยน้ำมันหอมระเหยอุ่นๆ ช่วยคลายความเครียดและฟื้นฟูพลังงาน' },
    { icon: '🦶', title: 'นวดฝ่าเท้า', desc: 'กดจุดบนฝ่าเท้าที่สอดคล้องกับอวัยวะต่างๆ เพื่อส่งเสริมสุขภาพโดยรวมและความสมดุล' },
  ],
}

const statsData = {
  en: [
    { n: '10+', label: 'Years Experience' },
    { n: '100%', label: 'Thai Certified Therapists' },
    { n: '5★', label: 'Customer Rating' },
    { n: '3000+', label: 'Happy Clients' },
  ],
  de: [
    { n: '10+', label: 'Jahre Erfahrung' },
    { n: '100%', label: 'Zertifizierte Therapeuten' },
    { n: '5★', label: 'Kundenbewertung' },
    { n: '3000+', label: 'Zufriedene Kunden' },
  ],
  th: [
    { n: '10+', label: 'ปีประสบการณ์' },
    { n: '100%', label: 'นักนวดรับรองจากไทย' },
    { n: '5★', label: 'คะแนนลูกค้า' },
    { n: '3000+', label: 'ลูกค้าพึงพอใจ' },
  ],
}

export default function HomePage() {
  const { lang, t } = useLang()
  const services = serviceTranslations[lang]
  const stats = statsData[lang]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary/10 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full py-20">
          <div>
            <p className="text-secondary font-medium uppercase tracking-widest text-sm mb-3">{t('hero_tag')}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-6 whitespace-pre-line">
              {t('hero_title')}
            </h1>
            <p className="text-dark/70 text-lg mb-8 leading-relaxed">{t('hero_desc')}</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/prices" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
                {t('hero_prices')}
              </Link>
              <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition">
                {t('hero_book')}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex rounded-3xl overflow-hidden shadow-xl bg-secondary/20 h-96 items-center justify-center">
            <span className="text-8xl">💆</span>
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2 text-center">{t('services_tag')}</p>
        <h2 className="font-serif text-4xl text-primary text-center mb-12">{t('services_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-serif text-xl text-primary mb-2">{s.title}</h3>
              <p className="text-dark/60 text-sm leading-relaxed">{s.desc}</p>
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
      <section className="bg-primary py-20">
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
      <section className="py-20 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-serif text-4xl text-primary mb-4">{t('cta_title')}</h2>
        <p className="text-dark/60 mb-8">{t('cta_desc')}</p>
        <Link href="/contact" className="bg-primary text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition">
          {t('cta_btn')}
        </Link>
      </section>

      <Footer />
    </>
  )
}
