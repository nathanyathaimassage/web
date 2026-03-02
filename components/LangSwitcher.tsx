'use client'
import { useLang } from './LangContext'

const langs = [
  { code: 'en' as const, flag: '🇬🇧', label: 'EN', title: 'English' },
  { code: 'de' as const, flag: '🇩🇪', label: 'DE', title: 'Deutsch' },
  { code: 'th' as const, flag: '🇹🇭', label: 'TH', title: 'ภาษาไทย' },
]

export default function LangSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 border border-primary/30 rounded-full overflow-hidden text-xs font-medium">
      {langs.map(({ code, flag, label, title }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={title}
          className={`px-3 py-1.5 transition ${
            lang === code
              ? 'bg-primary text-white'
              : 'text-primary hover:bg-primary/10'
          }`}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  )
}

