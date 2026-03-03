-- Supabase schema for Nathanya Waree Thai Massage
-- Run this in Supabase SQL Editor

-- ======================
-- 1. CREATE TABLES
-- ======================

-- Old services table (keep for compatibility, but we use site_content for structured data)
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  duration_minutes integer,
  price_cents integer,
  image_url text,
  created_at timestamp with time zone default now()
);

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  email text,
  phone text,
  message text,
  created_at timestamp with time zone default now()
);

create table if not exists site_content (
  key text primary key,
  de text default '',
  th text default '',
  en text default '',
  updated_at timestamp with time zone default now()
);

-- ======================
-- 2. ENABLE RLS
-- ======================

alter table services enable row level security;
alter table admins enable row level security;
alter table messages enable row level security;
alter table site_content enable row level security;

-- Services: anyone can read
create policy "Public can read services" on services
  for select using (true);

create policy "Service role can manage services" on services
  for all using (true) with check (true);

-- Messages: anyone can insert (contact form)
create policy "Public can insert messages" on messages
  for insert with check (true);

create policy "Service role can manage messages" on messages
  for select using (true);

create policy "Service role can delete messages" on messages
  for delete using (true);

-- Admins: only service_role can access
create policy "Service role can read admins" on admins
  for select using (true);

-- site_content: public can read, service_role can manage
create policy "Public can read site_content" on site_content
  for select using (true);

create policy "Service role can manage site_content" on site_content
  for all using (true) with check (true);

-- ======================
-- 3. SEED ADMIN USER
-- ======================
-- Email: admin@nathanyawaree.com
-- Password: NatThaiMassage2026!
INSERT INTO admins (email, password_hash)
VALUES (
  'admin@nathanyawaree.com',
  '$2a$10$f13EBiySbr9oISUULdivDuJNCzLU0z8kYcWz7MF5lJPQmvP48pgay'
)
ON CONFLICT (email) DO NOTHING;

-- ======================
-- 4. SEED SITE CONTENT
-- ======================

-- Hero section
INSERT INTO site_content (key, en, de, th) VALUES
('hero_tag', 'Traditional Thai Massage', 'Traditionelle Thaimassage', 'นวดแผนไทยดั้งเดิม'),
('hero_title', 'Feel the Healing
Power of Touch', 'Spüren Sie die heilende
Kraft der Berührung', 'สัมผัสการบำบัด
ด้วยมือของเรา'),
('hero_desc', 'Experience authentic Thai massage in Loxstedt – Donnern. Our therapists bring traditional techniques directly from Thailand to restore your body and mind.', 'Erleben Sie authentische Thaimassage in Loxstedt – Donnern. Unsere Therapeuten bringen traditionelle Techniken direkt aus Thailand, um Körper und Geist zu erneuern.', 'สัมผัสประสบการณ์นวดแผนไทยแท้ๆ ที่ Loxstedt – Donnern นักนวดของเราถ่ายทอดเทคนิคดั้งเดิมจากประเทศไทยเพื่อฟื้นฟูร่างกายและจิตใจของคุณ'),
('cta_title', 'Ready to Relax?', 'Bereit zum Entspannen?', 'พร้อมผ่อนคลายแล้วหรือยัง?'),
('cta_desc', 'Contact us today for an appointment. Call 0 15156049351 or 0 15168515530', 'Kontaktieren Sie uns für einen Termin. Tel: 0 15156049351 oder 0 15168515530', 'ติดต่อเราวันนี้เพื่อนัดหมาย โทร 0 15156049351 หรือ 0 15168515530'),
('about_h2', 'Authentic Thai Healing', 'Authentische Thai-Heilkunst', 'การบำบัดแบบไทยแท้'),
('about_p1', 'Nathanya Waree is a Thai massage studio located at Sellstedter Str. 5, 27612 Loxstedt – Donnern, Germany. Our certified therapists bring you time-honoured healing methods from Thailand.', 'Nathanya Waree ist ein Thaimassage-Studio in der Sellstedter Str. 5, 27612 Loxstedt – Donnern. Unsere zertifizierten Therapeuten bringen Ihnen jahrtausendealte Heilmethoden aus Thailand.', 'Nathanya Waree เป็นร้านนวดแผนไทยตั้งอยู่ที่ Sellstedter Str. 5, 27612 Loxstedt – Donnern ประเทศเยอรมนี นักนวดของเราผ่านการฝึกฝนจากประเทศไทยโดยตรง'),
('about_p2', 'We believe every body deserves care with attention, skill and respect – whether for stress, muscle tension or simply relaxation.', 'Wir glauben, dass jeder Körper mit Sorgfalt, Können und Respekt behandelt werden sollte – ob bei Stress, Muskelverspannungen oder einfach zur Erholung.', 'เราเชื่อว่าทุกร่างกายสมควรได้รับการดูแลด้วยความใส่ใจ ทักษะ และความเคารพ ไม่ว่าคุณต้องการบรรเทาความเครียด อาการปวดกล้ามเนื้อ หรือแค่ต้องการพักผ่อน'),
('about_p3', 'Our studio is a calm and welcoming space. Ask about our gift vouchers — give the gift of wellness and relaxation with a Thai massage.', 'Unser Studio ist ein ruhiger, einladender Ort. Fragen Sie nach unseren Geschenkgutscheinen — schenken Sie Wohlbefinden und Entspannung in Form einer Thai-Massage.', 'ร้านของเราเป็นพื้นที่สงบและอบอุ่น ออกแบบมาเพื่อให้คุณผ่อนคลายได้ตั้งแต่ก้าวแรกที่เดินเข้ามา เรามีบัตรกำนัล (Geschenkgutscheine) สำหรับโอกาสพิเศษต่างๆ'),
('gift_title', 'Gift Vouchers', 'Geschenkgutscheine', 'บัตรกำนัล'),
('gift_desc', 'Looking for a special gift? Ask about our gift vouchers and give the gift of wellness and relaxation with a Thai massage.', 'Fehlt Ihnen noch ein Geschenk zu einem besonderen Anlass? Fragen Sie nach unseren Geschenkgutscheinen und schenken Sie Wohlbefinden und Entspannung.', 'กำลังมองหาของขวัญพิเศษ? สอบถามบัตรกำนัลนวดไทยของเราได้เลย — มอบความผ่อนคลายให้คนที่คุณรัก'),
('opening_hours', 'Mon – Sat: 09:00 – 18:00', 'Mo – Sa: 09:00 – 18:00 Uhr', 'จันทร์ – เสาร์: 09:00 – 18:00'),
('opening_hours_note', 'Sun: Closed / by appointment', 'So: Geschlossen / nach Vereinbarung', 'อาทิตย์: ปิด / นัดหมายล่วงหน้า'),
('address', 'Sellstedter Str. 5, 27612 Loxstedt – Donnern', 'Sellstedter Str. 5, 27612 Loxstedt – Donnern', 'Sellstedter Str. 5, 27612 Loxstedt – Donnern'),
('phone1', '0 15156049351', '0 15156049351', '0 15156049351'),
('phone2', '0 15168515530', '0 15168515530', '0 15168515530'),
-- Services data stored as JSON
('services_data', '[{"icon":"🦶","name_en":"Thai Foot Massage","name_de":"Thai Fuß-Massage","name_th":"นวดเท้าแบบไทย","desc_en":"Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.","desc_de":"Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.","desc_th":"กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง","durations":[{"min":30,"price":35},{"min":60,"price":50}]},{"icon":"💆","name_en":"Thai Oil Deep Massage","name_de":"Thai Öl-Tiefenmassage","name_th":"นวดน้ำมันลึก","desc_en":"Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.","desc_de":"Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.","desc_th":"เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":80},{"min":120,"price":100}]},{"icon":"🌿","name_en":"Traditional Thai Massage (no oil)","name_de":"Traditionelle Thai-Massage ohne Öl","name_th":"นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)","desc_en":"Also known as \"Nuad Phaen Boran\" — meaning \"ancient healing touch\". The relevant energy lines of the body are stimulated.","desc_de":"Auch bekannt als \"Nuad Phaen Boran\", was so viel bedeutet wie \"uralte heilsame Berührung\". Hierbei werden die relevanten Energielinien des Körpers stimuliert.","desc_th":"หรือ \"นวดแผนโบราณ\" หมายถึง \"การสัมผัสบำบัดโบราณ\" โดยกระตุ้นเส้นพลังงานของร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":70}]},{"icon":"🪨","name_en":"Hot Stone Massage","name_de":"Heiße-Steine-Massage","name_th":"นวดหินร้อน","desc_en":"A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.","desc_de":"Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.","desc_th":"การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ","durations":[{"min":90,"price":85}]},{"icon":"🌿","name_en":"Herbal Massage","name_de":"Kräuter-Massage","name_th":"นวดสมุนไพร","desc_en":"A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.","desc_de":"Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem zufriedenen und friedlichen Entspannungszustand der ganz besonderen Art.","desc_th":"การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง","durations":[{"min":90,"price":80,"note_en":"+ herbs","note_de":"+ Kräuter","note_th":"+ สมุนไพร"}]}]', '[{"icon":"🦶","name_en":"Thai Foot Massage","name_de":"Thai Fuß-Massage","name_th":"นวดเท้าแบบไทย","desc_en":"Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.","desc_de":"Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.","desc_th":"กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง","durations":[{"min":30,"price":35},{"min":60,"price":50}]},{"icon":"💆","name_en":"Thai Oil Deep Massage","name_de":"Thai Öl-Tiefenmassage","name_th":"นวดน้ำมันลึก","desc_en":"Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.","desc_de":"Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.","desc_th":"เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":80},{"min":120,"price":100}]},{"icon":"🌿","name_en":"Traditional Thai Massage (no oil)","name_de":"Traditionelle Thai-Massage ohne Öl","name_th":"นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)","desc_en":"Also known as \"Nuad Phaen Boran\" — meaning \"ancient healing touch\". The relevant energy lines of the body are stimulated.","desc_de":"Auch bekannt als \"Nuad Phaen Boran\", was so viel bedeutet wie \"uralte heilsame Berührung\". Hierbei werden die relevanten Energielinien des Körpers stimuliert.","desc_th":"หรือ \"นวดแผนโบราณ\" หมายถึง \"การสัมผัสบำบัดโบราณ\" โดยกระตุ้นเส้นพลังงานของร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":70}]},{"icon":"🪨","name_en":"Hot Stone Massage","name_de":"Heiße-Steine-Massage","name_th":"นวดหินร้อน","desc_en":"A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.","desc_de":"Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.","desc_th":"การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ","durations":[{"min":90,"price":85}]},{"icon":"🌿","name_en":"Herbal Massage","name_de":"Kräuter-Massage","name_th":"นวดสมุนไพร","desc_en":"A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.","desc_de":"Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem zufriedenen und friedlichen Entspannungszustand der ganz besonderen Art.","desc_th":"การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง","durations":[{"min":90,"price":80,"note_en":"+ herbs","note_de":"+ Kräuter","note_th":"+ สมุนไพร"}]}]', '[{"icon":"🦶","name_en":"Thai Foot Massage","name_de":"Thai Fuß-Massage","name_th":"นวดเท้าแบบไทย","desc_en":"Stimulation of toes and soles based on traditional Thai medicine. Stretching and pressure point massage activate the energy system and help the body heal itself.","desc_de":"Ist eine Stimulation der Zehen und Sohlen nach den Lehren der Traditionellen Thailändischen Medizin. Durch Dehnungen und punktuelle Fingerdruckmassage wird dabei das Energiesystem angeregt und hilft die Selbstheilungskräfte zu aktivieren.","desc_th":"กระตุ้นนิ้วเท้าและฝ่าเท้าตามหลักแพทย์แผนไทย ด้วยการยืดและนวดจุดกดช่วยกระตุ้นระบบพลังงานและเสริมสร้างการเยียวยาตัวเอง","durations":[{"min":30,"price":35},{"min":60,"price":50}]},{"icon":"💆","name_en":"Thai Oil Deep Massage","name_de":"Thai Öl-Tiefenmassage","name_th":"นวดน้ำมันลึก","desc_en":"Pure relaxation. The use of pleasantly warm oil releases built-up tension and reduces stress.","desc_de":"Dient der reinen Entspannung. Durch die Verwendung des angenehm warmen Öles wird aufgebaute Spannung und Stress gemindert.","desc_th":"เพื่อการผ่อนคลายอย่างแท้จริง การใช้น้ำมันอุ่นช่วยคลายความตึงเครียดสะสมในร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":80},{"min":120,"price":100}]},{"icon":"🌿","name_en":"Traditional Thai Massage (no oil)","name_de":"Traditionelle Thai-Massage ohne Öl","name_th":"นวดแผนไทยดั้งเดิม (ไม่ใช้น้ำมัน)","desc_en":"Also known as \"Nuad Phaen Boran\" — meaning \"ancient healing touch\". The relevant energy lines of the body are stimulated.","desc_de":"Auch bekannt als \"Nuad Phaen Boran\", was so viel bedeutet wie \"uralte heilsame Berührung\". Hierbei werden die relevanten Energielinien des Körpers stimuliert.","desc_th":"หรือ \"นวดแผนโบราณ\" หมายถึง \"การสัมผัสบำบัดโบราณ\" โดยกระตุ้นเส้นพลังงานของร่างกาย","durations":[{"min":30,"price":35},{"min":60,"price":55},{"min":90,"price":70}]},{"icon":"🪨","name_en":"Hot Stone Massage","name_de":"Heiße-Steine-Massage","name_th":"นวดหินร้อน","desc_en":"A combination of soothing massage and the deep effect of heated basalt stones, stimulating tissue function.","desc_de":"Ist eine Kombination aus wohltuender Massage und tiefgreifender Wirkung von erwärmten Basaltsteinen und wirkt anregend auf die Gewebefunktion.","desc_th":"การผสมผสานการนวดที่ผ่อนคลายกับหินบะซอลต์ร้อน ช่วยกระตุ้นการทำงานของเนื้อเยื่อ","durations":[{"min":90,"price":85}]},{"icon":"🌿","name_en":"Herbal Massage","name_de":"Kräuter-Massage","name_th":"นวดสมุนไพร","desc_en":"A combination of aromatherapy, herbal medicine and heat treatment, creating a deeply relaxing experience.","desc_de":"Ist eine Kombination von Aromatherapie, Kräuterheilkunde und Wärmebehandlung. Dies führt zu einem zufriedenen und friedlichen Entspannungszustand der ganz besonderen Art.","desc_th":"การผสมผสานอโรมาเทอราพี สมุนไพร และการประคบร้อน สร้างความผ่อนคลายอย่างลึกซึ้ง","durations":[{"min":90,"price":80,"note_en":"+ herbs","note_de":"+ Kräuter","note_th":"+ สมุนไพร"}]}]')
ON CONFLICT (key) DO NOTHING;
