'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from './LangContext'
import LangSwitcher from './LangSwitcher'

export default function Navbar() {
  const { t } = useLang()

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/services', label: t('nav_services') },
    { href: '/prices', label: t('nav_prices') },
    { href: '/about', label: t('nav_about') },
    { href: '/contact', label: t('nav_contact') },
  ]

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

        {/* Right side: Lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <a
            href="tel:+49421XXXXXX"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition"
          >
            {t('nav_book')}
          </a>
        </div>

        {/* Mobile: Lang + menu */}
        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher />
          <button className="text-primary text-2xl">☰</button>
        </div>
      </div>
    </header>
  )
}
