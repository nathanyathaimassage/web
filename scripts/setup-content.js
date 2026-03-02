const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://rviwdszigdjfluctokre.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aXdkc3ppZ2RqZmx1Y3Rva3JlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM2NDU1MiwiZXhwIjoyMDg3OTQwNTUyfQ.nsjZot5sAZX6udCFpu3Aukjpkpp7I3rtErPrzczdw4o'
)

const defaultContent = [
  { key: 'hero_tag', value_de: 'Traditionelle Thaimassage', value_th: 'นวดแผนไทยดั้งเดิม' },
  { key: 'hero_title', value_de: 'Spüren Sie die heilende\nKraft der Berührung', value_th: 'สัมผัสการบำบัด\nด้วยมือของเรา' },
  { key: 'hero_desc', value_de: 'Erleben Sie authentische Thaimassage im Herzen von Bremerhaven. Unsere Therapeuten bringen traditionelle Techniken direkt aus Thailand, um Körper und Geist zu erneuern.', value_th: 'สัมผัสประสบการณ์นวดแผนไทยแท้ๆ ใจกลางเมือง Bremerhaven นักนวดของเราถ่ายทอดเทคนิคดั้งเดิมจากประเทศไทยเพื่อฟื้นฟูร่างกายและจิตใจของคุณ' },
  { key: 'cta_title', value_de: 'Bereit zum Entspannen?', value_th: 'พร้อมผ่อนคลายแล้วหรือยัง?' },
  { key: 'cta_desc', value_de: 'Kontaktieren Sie uns noch heute für einen Termin. Walk-ins willkommen.', value_th: 'ติดต่อเราวันนี้เพื่อจองคิว รับ Walk-in ทุกวัน' },
  { key: 'about_h2', value_de: 'Authentische Thai-Heilkunst', value_th: 'การบำบัดแบบไทยแท้' },
  { key: 'about_p1', value_de: 'Wir sind ein familiengeführtes Thaimassage-Studio in Bremerhaven. Unsere zertifizierten Therapeuten bringen Ihnen jahrtausendealte Heilmethoden aus Thailand.', value_th: 'เราเป็นสตูดิโอนวดแผนไทยที่ดำเนินการโดยครอบครัว ตั้งอยู่ใน Bremerhaven ประเทศเยอรมนี นักนวดที่ผ่านการรับรองจากประเทศไทยมอบเทคนิคการบำบัดกว่า 2,500 ปี' },
  { key: 'about_p2', value_de: 'Wir glauben, dass jeder Körper mit Sorgfalt, Können und Respekt behandelt werden sollte – ob bei Stress, Muskelverspannungen oder einfach zur Erholung.', value_th: 'เราเชื่อว่าทุกร่างกายสมควรได้รับการดูแลด้วยความใส่ใจ ทักษะ และความเคารพ ไม่ว่าคุณต้องการบรรเทาความเครียด อาการปวดกล้ามเนื้อ หรือแค่ต้องการพักผ่อน' },
  { key: 'about_p3', value_de: 'Unser Studio ist ein ruhiger, einladender Ort, der Ihnen von der ersten Minute an echte Entspannung ermöglicht.', value_th: 'สตูดิโอของเราเป็นพื้นที่สงบและอบอุ่น ออกแบบมาเพื่อให้คุณผ่อนคลายได้อย่างเต็มที่ตั้งแต่ก้าวแรกที่เดินเข้ามา' },
  { key: 'contact_visit', value_de: 'Besuchen Sie uns', value_th: 'เยี่ยมชมเรา' },
  { key: 'footer_copy', value_de: '© {year} Thai Massage. Alle Rechte vorbehalten.', value_th: '© {year} Thai Massage. สงวนสิทธิ์ทุกประการ' },
]

async function setup() {
  console.log('Creating site_content table and seeding data...')

  // Upsert all rows
  const { error } = await supabase
    .from('site_content')
    .upsert(defaultContent, { onConflict: 'key' })

  if (error) {
    console.error('Error (table may not exist yet — run the SQL manually):', error.message)
    console.log('\n👉 Run this SQL in Supabase SQL Editor first:')
    console.log(`
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value_de TEXT NOT NULL DEFAULT '',
  value_th TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
    `)
  } else {
    console.log('✅ site_content table seeded successfully!')
    const { data } = await supabase.from('site_content').select('key')
    console.log('Rows:', data?.map(r => r.key).join(', '))
  }
}

setup()
