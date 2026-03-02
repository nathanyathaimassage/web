-- Supabase schema for services and admins

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
  service text,
  message text,
  created_at timestamp with time zone default now()
);

-- Seed admin user
-- Email: admin@nathanyawaree.com
-- Password: NatThaiMassage2026!
INSERT INTO admins (email, password_hash)
VALUES (
  'admin@nathanyawaree.com',
  '$2a$10$f13EBiySbr9oISUULdivDuJNCzLU0z8kYcWz7MF5lJPQmvP48pgay'
)
ON CONFLICT (email) DO NOTHING;

-- Seed example services
insert into services (title, description, duration_minutes, price_cents) values
('Thai Massage 30 min', 'Traditional Thai massage with stretching and acupressure', 30, 2500),
('Thai Massage 60 min', 'Traditional Thai massage techniques', 60, 4500),
('Thai Massage 90 min', 'Extended traditional Thai massage session', 90, 6500),
('Oil Massage 30 min', 'Relaxing oil massage for stress relief', 30, 2500),
('Oil Massage 60 min', 'Relaxing full body oil massage', 60, 4500),
('Oil Massage 90 min', 'Extended relaxing oil massage', 90, 6500),
('Foot Reflexology 30 min', 'Targeted pressure on reflex zones of the feet', 30, 2200),
('Foot Reflexology 60 min', 'Full foot reflexology session', 60, 3800),
('Combination Massage 60 min', 'Blend of Thai and oil massage techniques', 60, 4800),
('Combination Massage 90 min', 'Extended combination massage', 90, 6800),
('Pregnancy Massage 60 min', 'Specially adapted massage for expectant mothers', 60, 5000),
('Hot Stone Massage 60 min', 'Heated basalt stones with massage strokes', 60, 5500),
('Hot Stone Massage 90 min', 'Extended hot stone massage session', 90, 7500);
