'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLang } from '../../components/LangContext'
import { useState, FormEvent } from 'react'

export default function ContactPage() {
  const { t } = useLang()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const form = new FormData(e.currentTarget)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        contact: form.get('contact'),
        service: form.get('service'),
        message: form.get('message'),
      }),
    })
    setSending(false)
    setSent(true)
  }

  return (
    <>
      <Navbar />

      <section className="bg-primary/10 py-16 text-center">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-2">{t('contact_tag')}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">{t('contact_title')}</h1>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="font-serif text-2xl text-primary mb-6">{t('contact_visit')}</h2>
          <ul className="space-y-4 text-dark/70 text-sm">
            <li className="flex gap-3">
              <span className="text-xl">📍</span>
              <span>Sellstedter Str. 5<br />27612 Loxstedt – Donnern</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">📞</span>
              <div>
                <a href="tel:015156049351" className="hover:text-primary transition">0 15156049351</a><br />
                <a href="tel:015168515530" className="hover:text-primary transition">0 15168515530</a>
              </div>
            </li>
          </ul>

          <h3 className="font-serif text-xl text-primary mt-8 mb-4">{t('contact_hours')}</h3>
          <table className="w-full text-sm text-dark/70">
            <tbody>
              <tr className="border-b border-secondary/20">
                <td className="py-2">{t('mon_fri')}</td>
              </tr>
              <tr className="border-b border-secondary/20">
                <td className="py-2">{t('sat')}</td>
              </tr>
            </tbody>
          </table>

          {/* Gift voucher hint */}
          <div className="mt-8 bg-secondary/10 rounded-xl p-4">
            <p className="font-serif text-lg text-primary mb-1">🎁 {t('gift_title')}</p>
            <p className="text-dark/60 text-sm">{t('gift_desc')}</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="card p-6">
          <h2 className="font-serif text-2xl text-primary mb-6">{t('contact_form_send')}</h2>
          {sent ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
              ✓ {t('contact_success')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{t('contact_form_name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{t('contact_form_phone')}</label>
                <input
                  type="text"
                  name="contact"
                  required
                  className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{t('contact_form_message')}</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full border border-secondary/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full text-center disabled:opacity-50">
                {sending ? t('contact_form_sending') : t('contact_form_send')}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
