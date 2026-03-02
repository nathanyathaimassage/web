'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Stats = {
  services: number
  messages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, messages: 0 })

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-2">Dashboard</h1>
      <p className="text-dark/50 text-sm mb-8">Welcome back, Admin.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Services', value: stats.services, href: '/admin/services', color: 'bg-primary' },
          { label: 'Messages', value: stats.messages, href: '/admin/contact', color: 'bg-secondary' },
          { label: 'Prices', value: '—', href: '/admin/prices', color: 'bg-dark' },
          { label: 'Content', value: '—', href: '/admin/content', color: 'bg-dark/70' },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`${card.color} text-white rounded-xl p-5 hover:opacity-90 transition block`}
          >
            <p className="text-3xl font-bold mb-1">{card.value}</p>
            <p className="text-sm opacity-80">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-dark mb-4">Quick Actions</h2>
          <div className="space-y-2 text-sm">
            <Link href="/admin/services/new" className="block text-primary hover:underline">➕ Add New Service</Link>
            <Link href="/admin/prices" className="block text-primary hover:underline">💶 Update Price List</Link>
            <Link href="/admin/content" className="block text-primary hover:underline">📝 Edit Page Content</Link>
            <Link href="/" target="_blank" className="block text-primary hover:underline">🌐 View Public Site</Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-dark mb-4">Site Info</h2>
          <table className="w-full text-sm text-dark/60">
            <tbody>
              <tr><td className="py-1">Site URL</td><td className="text-right">localhost:3000</td></tr>
              <tr><td className="py-1">Admin</td><td className="text-right">admin@example.com</td></tr>
              <tr><td className="py-1">DB</td><td className="text-right">Supabase</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
