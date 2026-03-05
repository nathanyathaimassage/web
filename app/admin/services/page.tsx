'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminServicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to unified content page with services tab
    router.replace('/admin/content')
  }, [router])

  return (
    <div className="text-dark/50 text-sm animate-pulse p-8">
      Redirecting to Content Management…
    </div>
  )
}
