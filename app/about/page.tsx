import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">About Us</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Our Story</h1>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden bg-secondary/20 aspect-square flex items-center justify-center text-secondary/50">
          Team Photo Placeholder
        </div>
        <div>
          <h2 className="font-serif text-3xl text-primary mb-4">Authentic Thai Healing</h2>
          <p className="text-dark/70 leading-relaxed mb-4">
            We are a family-run Thai massage studio located in Bremerhaven, Germany.
            Our certified therapists trained in Thailand bring you time-tested healing techniques
            that have been practiced for over 2,500 years.
          </p>
          <p className="text-dark/70 leading-relaxed mb-4">
            We believe that every body deserves to be treated with care, skill, and respect.
            Whether you need relief from stress, muscle pain, or simply want to treat yourself —
            we are here for you.
          </p>
          <p className="text-dark/70 leading-relaxed">
            Our studio is a peaceful, welcoming space designed to help you fully relax
            from the moment you walk in.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
