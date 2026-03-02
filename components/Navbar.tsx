import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/prices', label: 'Prices' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Nathanya Waree Thai Massage"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
          <div className="hidden sm:block">
            <p className="font-serif text-lg text-primary leading-tight font-semibold">Nathanya Waree</p>
            <p className="text-xs text-secondary tracking-widest uppercase">Thai Massage</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-dark">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-primary transition">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="tel:+49421XXXXXX"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition"
        >
          📞 Book Now
        </a>

        {/* Mobile menu button */}
        <button className="md:hidden text-primary text-2xl">☰</button>
      </div>
    </header>
  )
}
