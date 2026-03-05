'use client'
import { useLang } from '../../components/LangContext'
import { useSiteContent, ServiceData } from '../../lib/useSiteContent'

/* ─── Static fallback ─── */
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

function getName(s: ServiceData, lang: string) {
  if (lang === 'de') return s.name_de
  if (lang === 'th') return s.name_th
  return s.name_en
}

function getDesc(s: ServiceData, lang: string) {
  if (lang === 'de') return s.desc_de
  if (lang === 'th') return s.desc_th
  return s.desc_en
}

function getNote(d: { note_en?: string; note_de?: string; note_th?: string }, lang: string) {
  if (lang === 'de') return d.note_de || ''
  if (lang === 'th') return d.note_th || ''
  return d.note_en || ''
}

function getMinLabel(lang: string) {
  if (lang === 'de') return 'Min.'
  if (lang === 'th') return 'นาที'
  return 'min'
}

export default function ServicesPage() {
  const { lang, t } = useLang()
  const { services: dbServices } = useSiteContent()
  const allServices = dbServices || fallbackServices
  const minLabel = getMinLabel(lang)

  return (
    <>
      {/* Page header */}
      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('services_page_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('services_page_title')}</h1>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((s, i) => (
            <div key={i} className="card p-6 hover:shadow-xl transition">
              {s.image ? (
                <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                  <img src={s.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-5xl mb-4">{s.icon}</div>
              )}
              <h3 className="font-serif text-xl text-primary mb-2">{getName(s, lang)}</h3>
              <p className="text-dark/60 text-sm leading-relaxed mb-4">{getDesc(s, lang)}</p>
              <div className="flex flex-wrap gap-2">
                {s.durations.map((d, di) => {
                  const note = getNote(d, lang)
                  return (
                    <span
                      key={di}
                      className="bg-secondary/20 text-primary text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {d.min} {minLabel} — €{d.price}{note ? ` ${note}` : ''}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
