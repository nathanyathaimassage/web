-- Run this in Supabase SQL Editor to create the default admin account
-- Email: admin@nathanyawaree.com
-- Password: NatThaiMassage2026!
-- (bcrypt hash of the password above)

-- First delete old record to update hash, then re-insert
DELETE FROM admins WHERE email = 'admin@nathanyawaree.com';

INSERT INTO admins (email, password_hash)
VALUES (
  'admin@nathanyawaree.com',
  '$2a$10$ZKBZyZ6okD5DW6ZSa37TWODSBeuJD.EHDJXiJMgGHb9rm0arGqxBu'
);
