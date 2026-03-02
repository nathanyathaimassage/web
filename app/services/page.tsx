import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const services = [
  {
    icon: '🌿',
    title: 'Thai Massage',
    desc: 'Traditional Thai massage uses guided stretching and acupressure to increase flexibility, relieve muscle tension, and restore energy flow throughout the body.',
    durations: [
      { min: 30, price: 25 },
      { min: 60, price: 45 },
      { min: 90, price: 65 },
    ],
  },
  {
    icon: '💆',
    title: 'Oil Massage',
    desc: 'A relaxing full-body massage using warm aromatic oils that nourish the skin and calm the nervous system, releasing deep stress and fatigue.',
    durations: [
      { min: 30, price: 25 },
      { min: 60, price: 45 },
      { min: 90, price: 65 },
    ],
  },
  {
    icon: '🦶',
    title: 'Foot Reflexology',
    desc: 'Targeted pressure applied to reflex zones of the feet corresponding to organs and systems of the body, promoting overall health and balance.',
    durations: [
      { min: 30, price: 22 },
      { min: 60, price: 38 },
    ],
  },
  {
    icon: '🌺',
    title: 'Combination Massage',
    desc: 'A blend of Thai and oil massage techniques customised to your needs — the best of both worlds.',
    durations: [
      { min: 60, price: 48 },
      { min: 90, price: 68 },
      { min: 120, price: 85 },
    ],
  },
  {
    icon: '🤰',
    title: 'Pregnancy Massage',
    desc: 'Specially adapted massage for expectant mothers to relieve back pain, swelling, and discomfort while nurturing both mother and baby.',
    durations: [
      { min: 60, price: 50 },
    ],
  },
  {
    icon: '🔥',
    title: 'Hot Stone Massage',
    desc: 'Smooth heated basalt stones combined with massage strokes to deeply relax muscles and improve circulation.',
    durations: [
      { min: 60, price: 55 },
      { min: 90, price: 75 },
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">Our Services</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Massage Treatments</h1>
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
                    {d.min} min — €{d.price}
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
