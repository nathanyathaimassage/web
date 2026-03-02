'use client'
import { useEffect, useState } from 'react'

type Message = {
  id: string
  name: string
  contact: string
  service: string
  message: string
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/messages')
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-6">Messages</h1>

      {loading ? (
        <p className="text-dark/50">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-dark/50">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-dark">{m.name}</p>
                <p className="text-xs text-dark/40">{new Date(m.created_at).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-dark/60 mb-1">📞 {m.contact}</p>
              <p className="text-sm text-primary font-medium mb-2">Service: {m.service}</p>
              <p className="text-sm text-dark/70 bg-gray-50 rounded p-3">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
