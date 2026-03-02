import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white rounded-full p-1">
              <Image src="/logo.png" alt="Nathanya Waree Thai Massage" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <p className="font-serif text-white text-lg leading-tight">Nathanya Waree</p>
              <p className="text-secondary text-xs tracking-widest uppercase">Thai Massage</p>
            </div>
          </div>
          <p>Bremerhaven, Germany</p>
          <p className="mt-1">📞 +49 421 XXX XXXX</p>
          <p>✉️ info@thaimassage.de</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Hours</p>
          <p>Mon – Fri: 10:00 – 20:00</p>
          <p>Sat: 10:00 – 18:00</p>
          <p>Sun: Closed</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Links</p>
          <ul className="space-y-1">
            <li><a href="/services" className="hover:text-white transition">Services</a></li>
            <li><a href="/prices" className="hover:text-white transition">Prices</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} Thai Massage. All rights reserved.
      </p>
    </footer>
  )
}
