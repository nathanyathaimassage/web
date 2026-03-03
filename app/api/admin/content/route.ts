import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

async function isAuthed() {
  const cookieStore = await cookies()
  return !!cookieStore.get('admin_id')
}

// GET: return all site_content rows as a map
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('*')

    if (error) {
      console.error('site_content fetch error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const content: Record<string, { de: string; th: string; en: string }> = {}
    for (const row of data || []) {
      content[row.key] = {
        de: row.de ?? '',
        th: row.th ?? '',
        en: row.en ?? '',
      }
    }

    return NextResponse.json(content)
  } catch (err: unknown) {
    console.error('Content GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST: upsert a single key or bulk upsert multiple keys
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Support bulk upsert: { items: [{ key, de, th, en }, ...] }
    if (body.items && Array.isArray(body.items)) {
      const rows = body.items.map((item: { key: string; de?: string; th?: string; en?: string }) => ({
        key: item.key,
        de: item.de || '',
        th: item.th || '',
        en: item.en || '',
      }))

      const { error } = await supabaseAdmin
        .from('site_content')
        .upsert(rows, { onConflict: 'key' })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    }

    // Single upsert: { key, de, th, en }
    const { key, de, th, en } = body

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('site_content')
      .upsert(
        { key, de: de || '', th: th || '', en: en || '' },
        { onConflict: 'key' }
      )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Content POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE: remove a key
export async function DELETE(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { key } = await request.json()
    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('site_content')
      .delete()
      .eq('key', key)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Content DELETE error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
