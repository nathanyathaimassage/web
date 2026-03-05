import './globals.css'
import { Inter, Noto_Sans_Thai, Playfair_Display } from 'next/font/google'
import { LangProvider } from '../components/LangContext'
import ClientLayout from './ClientLayout'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-noto-thai',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Nathanya Waree Thai Massage',
  description: 'Professionelle Thaimassage in Bremerhaven — นวดแผนไทยดั้งเดิม',
  verification: {
    google: 'zjZiq8TqQD8X_7qcqBiZ_l4LwYOGGrHe5VZB7GIuLpQ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${notoSansThai.variable} ${playfairDisplay.variable}`}>
      <body className="bg-light text-dark font-sans antialiased">
        <LangProvider>
          <ClientLayout>{children}</ClientLayout>
        </LangProvider>
      </body>
    </html>
  )
}
