-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value_de TEXT NOT NULL DEFAULT '',
  value_th TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default content (German + Thai)
INSERT INTO site_content (key, value_de, value_th) VALUES
  ('hero_tag',   'Traditionelle Thaimassage', 'นวดแผนไทยดั้งเดิม'),
  ('hero_title', 'Spüren Sie die heilende Kraft der Berührung', 'สัมผัสการบำบัด\nด้วยมือของเรา'),
  ('hero_desc',  'Erleben Sie authentische Thaimassage im Herzen von Bremerhaven. Unsere Therapeuten bringen traditionelle Techniken direkt aus Thailand, um Körper und Geist zu erneuern.',
                 'สัมผัสประสบการณ์นวดแผนไทยแท้ๆ ใจกลางเมือง Bremerhaven นักนวดของเราถ่ายทอดเทคนิคดั้งเดิมจากประเทศไทยเพื่อฟื้นฟูร่างกายและจิตใจของคุณ'),
  ('cta_title',  'Bereit zum Entspannen?', 'พร้อมผ่อนคลายแล้วหรือยัง?'),
  ('cta_desc',   'Kontaktieren Sie uns noch heute für einen Termin. Walk-ins willkommen.', 'ติดต่อเราวันนี้เพื่อจองคิว รับ Walk-in ทุกวัน'),
  ('about_h2',   'Authentische Thai-Heilkunst', 'การบำบัดแบบไทยแท้'),
  ('about_p1',   'Wir sind ein familiengeführtes Thaimassage-Studio in Bremerhaven. Unsere zertifizierten Therapeuten bringen Ihnen jahrtausendealte Heilmethoden aus Thailand.',
                 'เราเป็นสตูดิโอนวดแผนไทยที่ดำเนินการโดยครอบครัว ตั้งอยู่ใน Bremerhaven ประเทศเยอรมนี'),
  ('about_p2',   'Wir glauben, dass jeder Körper mit Sorgfalt, Können und Respekt behandelt werden sollte – ob bei Stress, Muskelverspannungen oder einfach zur Erholung.',
                 'เราเชื่อว่าทุกร่างกายสมควรได้รับการดูแลด้วยความใส่ใจ ทักษะ และความเคารพ ไม่ว่าจะเป็นความเครียด ปวดกล้ามเนื้อ หรือแค่ต้องการพักผ่อน'),
  ('about_p3',   'Unser Studio ist ein ruhiger, einladender Ort, der Ihnen von der ersten Minute an echte Entspannung ermöglicht.',
                 'สตูดิโอของเราเป็นพื้นที่สงบและอบอุ่น ออกแบบมาเพื่อให้คุณผ่อนคลายได้อย่างเต็มที่'),
  ('contact_visit', 'Besuchen Sie uns', 'เยี่ยมชมเรา'),
  ('footer_copy', '© {year} Thai Massage. Alle Rechte vorbehalten.', '© {year} Thai Massage. สงวนสิทธิ์ทุกประการ')
ON CONFLICT (key) DO NOTHING;
