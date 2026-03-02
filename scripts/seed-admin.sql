-- Run this in Supabase SQL Editor to create the default admin account
-- Email: admin@nathanyawaree.com
-- Password: NatThaiMassage2026!
-- (bcrypt hash of the password above)

INSERT INTO admins (email, password_hash)
VALUES (
  'admin@nathanyawaree.com',
  '$2a$10$f13EBiySbr9oISUULdivDuJNCzLU0z8kYcWz7MF5lJPQmvP48pgay'
)
ON CONFLICT (email) DO NOTHING;
