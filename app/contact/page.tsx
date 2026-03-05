'use client'
import { useLang } from '../../components/LangContext'
import { useSiteContent } from '../../lib/useSiteContent'
import { useState, FormEvent } from 'react'

export default function ContactPage() {
  const { lang, t } = useLang()
  const { content } = useSiteContent()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function ct(key: string): string {
    if (content && content[key]) {
      const val = content[key][lang]
      if (val) return val
    }
    return t(key as Parameters<typeof t>[0])
  }

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
        message: form.get('message'),
      }),
    })
    setSending(false)
    setSent(true)
  }

  const phone1 = ct('phone1')
  const phone2 = ct('phone2')

  return (
    <>
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
              <span>{ct('address')}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">📞</span>
              <div>
                <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:text-primary transition">{phone1}</a><br />
                <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-primary transition">{phone2}</a>
              </div>
            </li>
          </ul>

          <h3 className="font-serif text-xl text-primary mt-8 mb-4">{t('contact_hours')}</h3>
          <table className="w-full text-sm text-dark/70">
            <tbody>
              <tr className="border-b border-secondary/20">
                <td className="py-2">{ct('opening_hours')}</td>
              </tr>
              <tr className="border-b border-secondary/20">
                <td className="py-2">{ct('opening_hours_note')}</td>
              </tr>
            </tbody>
          </table>

          {/* Gift voucher hint */}
          <div className="mt-8 bg-secondary/10 rounded-xl p-4">
            <p className="font-serif text-lg text-primary mb-1">🎁 {ct('gift_title')}</p>
            <p className="text-dark/60 text-sm">{ct('gift_desc')}</p>
          </div>

          {/* Google Maps */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d600!2d8.715636683715688!3d53.4968882347708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b6a7c8f1e2d5a1%3A0x0!2zNTPCsDI5JzQ4LjgiTiA4wrA0Mic1Ni4zIkU!5e0!3m2!1sde!2sde!4v1709654400000!5m2!1sde!2sde"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nathanya Waree Thai Massage Location"
              className="w-full"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/5yi932V1d48v2NRSA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            🗺️ Open in Google Maps
          </a>
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
    </>
  )
}
