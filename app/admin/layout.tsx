import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-dark text-white flex flex-col min-h-screen">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-serif text-xl text-secondary">Nathanya Waree</p>
          <p className="text-xs text-white/40 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition">
            📊 Dashboard
          </Link>
          <Link href="/admin/services" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition">
            💆 Services & Prices
          </Link>
          <Link href="/admin/content" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition">
            📝 Page Content
          </Link>
          <Link href="/admin/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition">
            📬 Messages
          </Link>
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <a href="/api/admin/logout" className="text-xs text-white/40 hover:text-white transition">
            ← Logout
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
