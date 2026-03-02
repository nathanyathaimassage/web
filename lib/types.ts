export type Service = {
  id: string
  title: string
  description?: string
  durationMinutes?: number
  priceCents?: number
  imageUrl?: string
}

export type AdminUser = {
  id: string
  email: string
}
