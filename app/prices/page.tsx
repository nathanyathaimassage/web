'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLang } from '../../components/LangContext'

const categoriesData = {
  en: [
    {
      category: 'Thai Foot Massage',
      items: [
        { duration: '30 min', price: '€ 35' },
        { duration: '60 min', price: '€ 50' },
      ],
    },
    {
      category: 'Thai Oil Deep Massage',
      items: [
        { duration: '30 min', price: '€ 35' },
        { duration: '60 min', price: '€ 55' },
        { duration: '90 min', price: '€ 80' },
        { duration: '120 min', price: '€ 100' },
      ],
    },
    {
      category: 'Traditional Thai Massage (no oil)',
      items: [
        { duration: '30 min', price: '€ 35' },
        { duration: '60 min', price: '€ 55' },
        { duration: '90 min', price: '€ 70' },
      ],
    },
    {
      category: 'Hot Stone Massage',
      items: [
        { duration: '90 min', price: '€ 85' },
      ],
    },
    {
      category: 'Herbal Massage',
      items: [
        { duration: '90 min', price: '€ 80 + herbs' },
      ],
    },
  ],
  de: [
    {
      category: 'Thai Fuß-Massage',
      items: [
        { duration: '30 Min.', price: '€ 35' },
        { duration: '60 Min.', price: '€ 50' },
      ],
    },
    {
      category: 'Thai Öl-Tiefenmassage',
      items: [
        { duration: '30 Min.', price: '€ 35' },
        { duration: '60 Min.', price: '€ 55' },
        { duration: '90 Min.', price: '€ 80' },
        { duration: '120 Min.', price: '€ 100' },
      ],
    },
    {
      category: 'Traditionelle Thai-Massage ohne Öl',
      items: [
        { duration: '30 Min.', price: '€ 35' },
        { duration: '60 Min.', price: '€ 55' },
        { duration: '90 Min.', price: '€ 70' },
      ],
    },
    {
      category: 'Heiße-Steine-Massage',
      items: [
        { duration: '90 Min.', price: '€ 85' },
      ],
    },
    {
      category: 'Kräuter-Massage',
      items: [
        { duration: '90 Min.', price: '€ 80 + Kräuter' },
      ],
    },
  ],
  th: [
    {
      category: 'นวดเท้าแบบไทย',
      items: [
        { duration: '30 นาที', price: '€ 35' },
        { duration: '60 นาที', price: '€ 50' },
      ],
    },
    {
      category: 'นวดน้ำมันลึก',
      items: [
        { duration: '30 นาที', price: '€ 35' },
        { duration: '60 นาที', price: '€ 55' },
        { duration: '90 นาที', price: '€ 80' },
        { duration: '120 นาที', price: '€ 100' },
      ],
    },
    {
      category: 'นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)',
      items: [
        { duration: '30 นาที', price: '€ 35' },
        { duration: '60 นาที', price: '€ 55' },
        { duration: '90 นาที', price: '€ 70' },
      ],
    },
    {
      category: 'นวดหินร้อน',
      items: [
        { duration: '90 นาที', price: '€ 85' },
      ],
    },
    {
      category: 'นวดสมุนไพร',
      items: [
        { duration: '90 นาที', price: '€ 80 + สมุนไพร' },
      ],
    },
  ],
}

export default function PricesPage() {
  const { lang, t } = useLang()
  const categories = categoriesData[lang]

  return (
    <>
      <Navbar />

      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('prices_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('prices_title')}</h1>
        <p className="text-dark/60 mt-4 max-w-xl mx-auto text-sm">
          {t('prices_note')}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        {categories.map((cat) => (
          <div key={cat.category} className="card overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="font-serif text-xl text-white">{cat.category}</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {cat.items.map((item, i) => (
                  <tr
                    key={item.duration}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-light'}
                  >
                    <td className="px-6 py-3 text-dark/70">{item.duration}</td>
                    <td className="px-6 py-3 text-right font-semibold text-primary">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <Footer />
    </>
  )
}
