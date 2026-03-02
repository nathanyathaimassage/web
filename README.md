Project: Massage Shop — Finorio-based Next.js

Overview:
- Next.js site using the Finorio template (frontend)
- Admin area at /admin for CRUD of services, prices, pages
- Supabase for DB + Storage (placeholders provided)

Placeholders required (.env.local):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SITE_URL

Run locally (Windows PowerShell):
1. Install dependencies: npm install
2. Create .env.local from .env.local.example and fill Supabase keys
3. Run dev: npm run dev

Admin:
- Admin UI at /admin (email/password auth implemented locally with hashed password stored in Supabase `admins` table)

