// Run: node scripts/hash-password.js
// แล้วนำ hash ที่ได้ไปรันใน Supabase SQL Editor

const bcrypt = require('bcryptjs')

const email = 'admin@nathanyawaree.com'
const password = 'NatThaiMassage2026!'

bcrypt.hash(password, 10).then((hash) => {
  console.log('\n=== Admin Credentials ===')
  console.log('Email   :', email)
  console.log('Password:', password)
  console.log('\n=== SQL to run in Supabase SQL Editor ===')
  console.log(`
INSERT INTO admins (email, password_hash)
VALUES ('${email}', '${hash}')
ON CONFLICT (email) DO NOTHING;
  `)
})
