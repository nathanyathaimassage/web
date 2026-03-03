'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminServicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to new service admin page
    router.replace('/admin/service')
  }, [router])

  return (
    <div className="text-dark/50 text-sm animate-pulse p-8">
      Redirecting to Content Management…
    </div>
  )
}
