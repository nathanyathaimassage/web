import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export const runtime = 'nodejs'

// Public endpoint — returns all site_content rows (no auth needed)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('key, de, th, en')

    if (error) {
      // Table may not exist yet — return empty
      return NextResponse.json({})
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
  } catch {
    return NextResponse.json({})
  }
}
