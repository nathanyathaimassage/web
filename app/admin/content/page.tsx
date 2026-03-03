'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminContentRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/admin/home') }, [router])
  return <div className="text-dark/50 text-sm animate-pulse p-8">Redirecting…</div>
}

