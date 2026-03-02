'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLang } from '../../components/LangContext'

const servicesData = {
  en: [
    {
      icon: '🦶',
      title: 'Thai Foot Massage',
      desc: 'Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 50 },
      ],
    },
    {
      icon: '💆',
      title: 'Thai Oil Deep Massage',
      desc: 'Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 80 },
        { min: 120, price: 100 },
      ],
    },
    {
      icon: '🌿',
      title: 'Traditional Thai Massage (no oil)',
      desc: 'Also known as "Nuad Phaen Boran" — meaning "ancient healing touch". The relevant energy lines of the body are stimulated.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 70 },
      ],
    },
    {
      icon: '🪨',
      title: 'Hot Stone Massage',
      desc: 'A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.',
      durations: [
        { min: 90, price: 85 },
      ],
    },
    {
      icon: '🌿',
      title: 'Herbal Massage',
      desc: 'A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.',
      durations: [
        { min: 90, price: 80, note: '+ herbs' },
      ],
    },
  ],
  de: [
    {
      icon: '🦶',
      title: 'Thai Fuß-Massage',
      desc: 'Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 50 },
      ],
    },
    {
      icon: '💆',
      title: 'Thai Öl-Tiefenmassage',
      desc: 'Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 80 },
        { min: 120, price: 100 },
      ],
    },
    {
      icon: '🌿',
      title: 'Traditionelle Thai-Massage ohne Öl',
      desc: 'Auch bekannt als "Nuad Phaen Boran", was so viel bedeutet wie "uralte heilsame Berührung". Hierbei werden die relevanten Energielinien des Körpers stimuliert.',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 70 },
      ],
    },
    {
      icon: '🪨',
      title: 'Heiße-Steine-Massage',
      desc: 'Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.',
      durations: [
        { min: 90, price: 85 },
      ],
    },
    {
      icon: '🌿',
      title: 'Kräuter-Massage',
      desc: 'Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem zufriedenen und friedlichen Entspannungszustand der ganz besonderen Art.',
      durations: [
        { min: 90, price: 80, note: '+ Kräuter' },
      ],
    },
  ],
  th: [
    {
      icon: '🦶',
      title: 'นวดเท้าแบบไทย',
      desc: 'กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 50 },
      ],
    },
    {
      icon: '💆',
      title: 'นวดน้ำมันลึก',
      desc: 'เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 80 },
        { min: 120, price: 100 },
      ],
    },
    {
      icon: '🌿',
      title: 'นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)',
      desc: 'หรือ "นวดแผนโบราณ" หมายถึง "การสัมผัสบำบัดโบราณ" โดยกระตุ้นเส้นพลังงานของร่างกาย',
      durations: [
        { min: 30, price: 35 },
        { min: 60, price: 55 },
        { min: 90, price: 70 },
      ],
    },
    {
      icon: '🪨',
      title: 'นวดหินร้อน',
      desc: 'การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ',
      durations: [
        { min: 90, price: 85 },
      ],
    },
    {
      icon: '🌿',
      title: 'นวดสมุนไพร',
      desc: 'การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง',
      durations: [
        { min: 90, price: 80, note: '+ สมุนไพร' },
      ],
    },
  ],
}

export default function ServicesPage() {
  const { lang, t } = useLang()
  const services = servicesData[lang]

  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('services_page_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('services_page_title')}</h1>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="card p-6 hover:shadow-xl transition">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-serif text-xl text-primary mb-2">{s.title}</h3>
              <p className="text-dark/60 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.durations.map((d) => (
                  <span
                    key={d.min}
                    className="bg-secondary/20 text-primary text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {d.min} {t('min')} — €{d.price}{'note' in d && d.note ? ` ${d.note}` : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
