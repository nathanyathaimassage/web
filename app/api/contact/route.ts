import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, contact, service, message } = body

  const { error } = await supabase.from('messages').insert([{ name, contact, service, message }])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
