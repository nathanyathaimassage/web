'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ServiceFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params?.id === 'new'
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration_minutes: 60,
    price_cents: 4500,
    image_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!isNew && params?.id) {
      fetch(`/api/admin/services/${params.id}`)
        .then((r) => r.json())
        .then((d) => d.data && setForm(d.data))
    }
  }, [params?.id, isNew])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/api/services' : `/api/admin/services/${params?.id}`
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin/services')
    } else {
      const j = await res.json()
      setMsg(j.error || 'Error saving service')
    }
  }

  function field(
    label: string,
    key: keyof typeof form,
    type = 'text',
    inputProps?: Record<string, unknown>
  ) {
    return (
      <div key={key}>
        <label className="block text-sm font-medium text-dark mb-1">{label}</label>
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
          {...inputProps}
        />
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl text-primary mb-6">
        {isNew ? 'Add Service' : 'Edit Service'}
      </h1>

      {msg && <p className="text-red-500 text-sm mb-4">{msg}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
        {field('Title', 'title')}
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        {field('Duration (minutes)', 'duration_minutes', 'number')}
        {field('Price (cents, e.g. 4500 = €45)', 'price_cents', 'number')}
        {field('Image URL', 'image_url')}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save Service'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="border border-gray-200 text-dark px-5 py-2 rounded hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
