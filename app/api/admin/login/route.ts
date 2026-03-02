import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// Force Node.js runtime for bcryptjs and Supabase compatibility
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').toLowerCase().trim()
    const password = (body.password || '').trim()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('admins')
      .select('id, email, password_hash')
      .eq('email', email)
      .single()

    if (error || !data) {
      console.error('Admin lookup error:', error?.message)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, data.password_hash)
    if (!valid) {
      console.error('Password mismatch for:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('admin_id', data.id, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
