'use client'
import { useLang } from '../../components/LangContext'
import { useSiteContent, ServiceData } from '../../lib/useSiteContent'

/* ─── Static fallback ─── */
const fallbackServices: ServiceData[] = [
  {
    icon: '🦶',
    name_en: 'Thai Foot Massage', name_de: 'Thai Fuß-Massage', name_th: 'นวดเท้าแบบไทย',
    desc_en: '', desc_de: '', desc_th: '',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 50 }],
  },
  {
    icon: '💆',
    name_en: 'Thai Oil Deep Massage', name_de: 'Thai Öl-Tiefenmassage', name_th: 'นวดน้ำมันลึก',
    desc_en: '', desc_de: '', desc_th: '',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 80 }, { min: 120, price: 100 }],
  },
  {
    icon: '🌿',
    name_en: 'Traditional Thai Massage (no oil)', name_de: 'Traditionelle Thai-Massage ohne Öl', name_th: 'นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)',
    desc_en: '', desc_de: '', desc_th: '',
    durations: [{ min: 30, price: 35 }, { min: 60, price: 55 }, { min: 90, price: 70 }],
  },
  {
    icon: '🪨',
    name_en: 'Hot Stone Massage', name_de: 'Heiße-Steine-Massage', name_th: 'นวดหินร้อน',
    desc_en: '', desc_de: '', desc_th: '',
    durations: [{ min: 90, price: 85 }],
  },
  {
    icon: '🌿',
    name_en: 'Herbal Massage', name_de: 'Kräuter-Massage', name_th: 'นวดสมุนไพร',
    desc_en: '', desc_de: '', desc_th: '',
    durations: [{ min: 90, price: 80, note_en: '+ herbs', note_de: '+ Kräuter', note_th: '+ สมุนไพร' }],
  },
]

function getName(s: ServiceData, lang: string) {
  if (lang === 'de') return s.name_de
  if (lang === 'th') return s.name_th
  return s.name_en
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

export default function PricesPage() {
  const { lang, t } = useLang()
  const { services: dbServices, content } = useSiteContent()
  const allServices = dbServices || fallbackServices
  const minLabel = getMinLabel(lang)

  // Dynamic note below title
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
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('prices_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('prices_title')}</h1>
        <p className="text-dark/60 mt-4 max-w-xl mx-auto text-sm">
          {ct('opening_hours')} | {ct('opening_hours_note')}
          <br />
          📞 {ct('phone1')}, {ct('phone2')}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        {allServices.map((s, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <h2 className="font-serif text-xl text-white">{getName(s, lang)}</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {s.durations.map((d, di) => {
                  const note = getNote(d, lang)
                  return (
                    <tr key={di} className={di % 2 === 0 ? 'bg-white' : 'bg-light'}>
                      <td className="px-6 py-3 text-dark/70">{d.min} {minLabel}</td>
                      <td className="px-6 py-3 text-right font-semibold text-primary">
                        € {d.price}{note ? ` ${note}` : ''}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </>
  )
}
