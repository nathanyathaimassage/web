import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../../lib/supabaseAdmin'

type Context = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Context) {
  const { id } = await params
  const { data, error } = await supabaseAdmin
    .from('services')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params
  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from('services')
    .update(body)
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_req: Request, { params }: Context) {
  const { id } = await params
  const { error } = await supabaseAdmin.from('services').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
