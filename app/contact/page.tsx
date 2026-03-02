import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Book an Appointment</h1>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="font-serif text-2xl text-primary mb-6">Visit Us</h2>
          <ul className="space-y-4 text-dark/70 text-sm">
            <li className="flex gap-3">
              <span className="text-xl">📍</span>
              <span>Musterstraße 1, 27568 Bremerhaven, Germany</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">📞</span>
              <span>+49 421 XXX XXXX</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">✉️</span>
              <span>info@thaimassage.de</span>
            </li>
          </ul>

          <h3 className="font-serif text-xl text-primary mt-8 mb-4">Opening Hours</h3>
          <table className="w-full text-sm text-dark/70">
            <tbody>
              {[
                ['Monday – Friday', '10:00 – 20:00'],
                ['Saturday', '10:00 – 18:00'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <tr key={day} className="border-b border-secondary/20">
                  <td className="py-2">{day}</td>
                  <td className="py-2 text-right font-medium text-primary">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact form */}
        <div className="card p-6">
          <h2 className="font-serif text-2xl text-primary mb-6">Send a Message</h2>
          <form className="space-y-4" method="POST" action="/api/contact">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Phone / Email</label>
              <input
                type="text"
                name="contact"
                required
                className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Service</label>
              <select
                name="service"
                className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option>Thai Massage</option>
                <option>Oil Massage</option>
                <option>Foot Reflexology</option>
                <option>Combination Massage</option>
                <option>Hot Stone Massage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <button type="submit" className="btn-primary w-full text-center">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
