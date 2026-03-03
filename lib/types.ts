export type Service = {
  id: string
  name_en: string
  name_de: string
  name_th: string
  desc_en: string
  desc_de: string
  desc_th: string
  icon: string
  durations: ServiceDuration[]
  sort_order: number
  created_at?: string
}

export type ServiceDuration = {
  minutes: number
  price_eur: number
  note_en?: string
  note_de?: string
  note_th?: string
}

export type AdminUser = {
  id: string
  email: string
}

export type SiteContent = {
  key: string
  de: string
  th: string
  en: string
  updated_at?: string
}

export type ContactMessage = {
  id: string
  name: string
  contact: string
  email?: string
  phone?: string
  message: string
  created_at: string
}
