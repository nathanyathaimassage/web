import './globals.css'

export const metadata = {
  title: 'Thai Massage',
  description: 'Professionelle Thaimassage — ร้านนวดไทย',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-light text-dark font-sans antialiased">{children}</body>
    </html>
  )
}
