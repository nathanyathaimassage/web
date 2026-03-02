import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

const services = [
  { icon: '🌿', title: 'Thai Massage', desc: 'Traditional stretching and acupressure techniques to relieve tension and improve flexibility.' },
  { icon: '💆', title: 'Oil Massage', desc: 'Relaxing full-body massage with warm aromatic oils to melt away stress.' },
  { icon: '🦶', title: 'Foot Reflexology', desc: 'Targeted pressure on reflex points to restore energy flow and balance.' },
]

const stats = [
  { n: '10+', label: 'Years Experience' },
  { n: '100%', label: 'Thai Certified Therapists' },
  { n: '5★', label: 'Customer Rating' },
  { n: '3000+', label: 'Happy Clients' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary/10 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full py-20">
          <div>
            <p className="text-secondary font-medium uppercase tracking-widest text-sm mb-3">
              Traditional Thai Massage
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-6">
              Feel the Healing<br />Power of Touch
            </h1>
            <p className="text-dark/70 text-lg mb-8 leading-relaxed">
              Experience authentic Thai massage in the heart of Bremerhaven.
              Our therapists bring traditional techniques directly from Thailand to restore
              your body and mind.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/prices" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
                View Prices
              </Link>
              <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/5 transition">
                Book Appointment
              </Link>
            </div>
          </div>
          <div className="hidden md:block rounded-3xl overflow-hidden shadow-xl bg-secondary/20 h-96 flex items-center justify-center">
            <span className="text-8xl">💆</span>
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2 text-center">What We Offer</p>
        <h2 className="font-serif text-4xl text-primary text-center mb-12">Our Massage Services</h2>
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
            All Services
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <p className="uppercase tracking-widest text-secondary text-sm mb-2">Why Choose Us</p>
          <h2 className="font-serif text-4xl mb-12">Our Promise</h2>
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
        <h2 className="font-serif text-4xl text-primary mb-4">Ready to Relax?</h2>
        <p className="text-dark/60 mb-8">Contact us today to book your appointment. Walk-ins welcome.</p>
        <Link href="/contact" className="bg-primary text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition">
          Book Now
        </Link>
      </section>

      <Footer />
    </>
  )
}
