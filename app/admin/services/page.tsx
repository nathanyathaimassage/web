'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Service = {
  id: string
  title: string
  description: string
  duration_minutes: number
  price_cents: number
  image_url: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/services')
    const json = await res.json()
    setServices(json.data || [])
    setLoading(false)
  }

  async function deleteService(id: string) {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl text-primary">Services</h1>
        <Link href="/admin/services/new" className="btn-primary text-sm">+ Add Service</Link>
      </div>

      {loading ? (
        <p className="text-dark/50">Loading…</p>
      ) : services.length === 0 ? (
        <p className="text-dark/50">No services yet. Add your first service above.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-dark/60 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Duration</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-3 font-medium text-dark">{s.title}</td>
                  <td className="px-6 py-3 text-dark/60">{s.duration_minutes} min</td>
                  <td className="px-6 py-3 text-primary font-semibold">
                    €{(s.price_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-right space-x-3">
                    <Link href={`/admin/services/${s.id}`} className="text-primary hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteService(s.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
