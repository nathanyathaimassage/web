import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

async function isAuthed() {
  const cookieStore = await cookies()
  return !!cookieStore.get('admin_id')
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('*')

  if (error) {
    // Table might not exist yet — return empty so page doesn't crash
    console.error('site_content fetch error:', error.message)
    return NextResponse.json({})
  }

  // Support both column naming conventions
  const content: Record<string, { de: string; th: string; en: string }> = {}
  for (const row of data || []) {
    content[row.key] = {
      de: row.de ?? row.value_de ?? '',
      th: row.th ?? row.value_th ?? '',
      en: row.en ?? row.value_en ?? '',
    }
  }

  return NextResponse.json(content)
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { key, de, th, en } = body

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  }

  // Try both column naming styles
  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert(
      { key, de: de || '', th: th || '', en: en || '' },
      { onConflict: 'key' }
    )

  if (error) {
    // Fallback to old column names
    const { error: error2 } = await supabaseAdmin
      .from('site_content')
      .upsert(
        { key, value_de: de || '', value_th: th || '', value_en: en || '' },
        { onConflict: 'key' }
      )
    if (error2) {
      return NextResponse.json({ error: error2.message }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
