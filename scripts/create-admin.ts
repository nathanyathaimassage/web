import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(url, serviceKey)

async function createAdmin(email: string, password: string) {
  const hash = await bcrypt.hash(password, 10)
  const { error } = await supabase.from('admins').insert([{ email, password_hash: hash }])
  if (error) console.error(error)
  else console.log('admin created')
}

createAdmin('admin@example.com', 'password123')
