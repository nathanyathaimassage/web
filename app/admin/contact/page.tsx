'use client'
import { useEffect, useState } from 'react'

type Message = {
  id: string
  name: string
  contact: string
  email?: string
  phone?: string
  message: string
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/messages')
    const d = await res.json()
    setMessages(d.data || [])
    setLoading(false)
  }

  async function deleteMessage(id: string) {
    if (!confirm('Delete this message?')) return
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-2">Messages</h1>
      <p className="text-dark/50 text-sm mb-6">Messages from the contact form on the public website.</p>

      {loading ? (
        <p className="text-dark/50">Loading…</p>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-dark/50">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-dark">{m.name}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-dark/40">{new Date(m.created_at).toLocaleString()}</p>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
              {m.contact && <p className="text-sm text-dark/60 mb-1">📞 {m.contact}</p>}
              {m.email && <p className="text-sm text-dark/60 mb-1">✉️ {m.email}</p>}
              {m.phone && <p className="text-sm text-dark/60 mb-1">📱 {m.phone}</p>}
              <p className="text-sm text-dark/70 bg-gray-50 rounded p-3 mt-2">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
