import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const { data, error } = await supabaseAdmin
    .from('admins')
    .select('id, email, password_hash')
    .eq('email', email)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, data.password_hash)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_id', data.id, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  })

  return NextResponse.json({ ok: true })
}
