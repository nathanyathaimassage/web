import './globals.css'
import { LangProvider } from '../components/LangContext'

export const metadata = {
  title: 'Nathanya Waree Thai Massage',
  description: 'Professionelle Thaimassage in Bremerhaven — นวดแผนไทยดั้งเดิม',
  verification: {
    google: 'zjZiq8TqQD8X_7qcqBiZ_l4LwYOGGrHe5VZB7GIuLpQ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-light text-dark font-sans antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
