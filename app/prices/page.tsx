import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const categories = [
  {
    category: 'Thai Massage',
    items: [
      { duration: '30 min', price: '€ 25' },
      { duration: '60 min', price: '€ 45' },
      { duration: '90 min', price: '€ 65' },
      { duration: '120 min', price: '€ 85' },
    ],
  },
  {
    category: 'Oil Massage',
    items: [
      { duration: '30 min', price: '€ 25' },
      { duration: '60 min', price: '€ 45' },
      { duration: '90 min', price: '€ 65' },
      { duration: '120 min', price: '€ 85' },
    ],
  },
  {
    category: 'Foot Reflexology',
    items: [
      { duration: '30 min', price: '€ 22' },
      { duration: '60 min', price: '€ 38' },
    ],
  },
  {
    category: 'Combination Massage',
    items: [
      { duration: '60 min', price: '€ 48' },
      { duration: '90 min', price: '€ 68' },
      { duration: '120 min', price: '€ 85' },
    ],
  },
  {
    category: 'Pregnancy Massage',
    items: [
      { duration: '60 min', price: '€ 50' },
    ],
  },
  {
    category: 'Hot Stone Massage',
    items: [
      { duration: '60 min', price: '€ 55' },
      { duration: '90 min', price: '€ 75' },
    ],
  },
]

export default function PricesPage() {
  return (
    <>
      <Navbar />

      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">Preise / Prices</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Our Price List</h1>
        <p className="text-dark/60 mt-4 max-w-xl mx-auto text-sm">
          All treatments can be combined. Appointments preferred — walk-ins welcome.
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

        <p className="text-center text-dark/50 text-xs mt-6">
          All prices include VAT. Prices subject to change.
        </p>
      </section>

      <Footer />
    </>
  )
}
