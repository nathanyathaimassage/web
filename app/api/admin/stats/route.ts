import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { count: services } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })

  const { count: messages } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ services: services ?? 0, messages: messages ?? 0 })
}
