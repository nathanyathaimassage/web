import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

export async function GET() {
  const { count: services } = await supabaseAdmin
    .from('services')
    .select('*', { count: 'exact', head: true })

  const { count: messages } = await supabaseAdmin
    .from('messages')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ services: services ?? 0, messages: messages ?? 0 })
}
