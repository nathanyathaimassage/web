'use client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useLang } from '../components/LangContext'

const serviceTranslations = {
  en: [
    { icon: '🦶', title: 'Thai Foot Massage', desc: 'Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.' },
    { icon: '💆', title: 'Thai Oil Deep Massage', desc: 'Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.' },
    { icon: '🌿', title: 'Traditional Thai Massage', desc: 'Also known as "Nuad Phaen Boran" — meaning "ancient healing touch". The relevant energy lines of the body are stimulated.' },
    { icon: '🪨', title: 'Hot Stone Massage', desc: 'A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.' },
    { icon: '🌿', title: 'Herbal Massage', desc: 'A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.' },
  ],
  de: [
    { icon: '🦶', title: 'Thai Fuß-Massage', desc: 'Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.' },
    { icon: '💆', title: 'Thai Öl-Tiefenmassage', desc: 'Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.' },
    { icon: '🌿', title: 'Traditionelle Thai-Massage ohne Öl', desc: 'Auch bekannt als "Nuad Phaen Boran", was so viel bedeutet wie "uralte heilsame Berührung". Hierbei werden die relevanten Energielinien des Körpers stimuliert.' },
    { icon: '🪨', title: 'Heiße-Steine-Massage', desc: 'Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.' },
    { icon: '🌿', title: 'Kräuter-Massage', desc: 'Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem Zufrieden- und friedlichen Kräuter-Massage Entspannungszustand der ganz besonderen Art.' },
  ],
  th: [
    { icon: '🦶', title: 'นวดเท้าแบบไทย', desc: 'กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง' },
    { icon: '💆', title: 'นวดน้ำมันลึก', desc: 'เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย' },
    { icon: '🌿', title: 'นวดแผนไทยดั้งเดิม', desc: 'หรือ "นวดแผนโบราณ" หมายถึง "การสัมผัสบำบัดโบราณ" โดยกระตุ้นเส้นพลังงานของร่างกาย' },
    { icon: '🪨', title: 'นวดหินร้อน', desc: 'การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ' },
    { icon: '🌿', title: 'นวดสมุนไพร', desc: 'การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง' },
  ],
}

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

export default function HomePage() {
  const { lang, t } = useLang()
  const services = serviceTranslations[lang]
  const stats = statsData[lang]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary/10 min-h-[80vh] flex items-center">
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
                {t('hero_contact')}
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
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-serif text-lg text-primary mb-2">{s.title}</h3>
              <p className="text-dark/60 text-xs leading-relaxed">{s.desc}</p>
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

      {/* Gift Voucher */}
      <section className="py-16 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-primary mb-4">🎁 {t('gift_title')}</h2>
          <p className="text-dark/60 mb-6 max-w-xl mx-auto">{t('gift_desc')}</p>
          <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition">
            {t('hero_contact')}
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-serif text-4xl text-primary mb-4">{t('cta_title')}</h2>
        <p className="text-dark/60 mb-8">{t('cta_desc')}</p>
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
