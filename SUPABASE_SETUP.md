# Supabase Setup Guide (Auth + DB + Realtime)

This project uses Supabase for authentication, database persistence, and realtime vote updates.

## 1) Create the Supabase project
1. Create a new Supabase project.
2. Copy the Project URL and the anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2) Run the database schema
1. Open the Supabase SQL Editor.
2. Paste and run `supabase/schema.sql`.

This creates:
- `polls`, `poll_options`, `votes`, `profiles`
- RLS policies
- vote‑lock triggers
- realtime publication for `polls` + `votes`
- `get_poll_counts(poll_ids uuid[])` RPC

## 3) Enable Google OAuth (optional)
1. In Supabase Auth → Providers, enable Google.
2. Add redirect URLs:
   - `http://localhost:3000`
   - Your production domain

## 4) How realtime works
The frontend subscribes to:
- `votes` inserts → increments results immediately
- `polls` updates → visibility/status changes update clients

## 5) Anti‑double‑vote rules
We enforce unique votes via DB constraints:
- 1 vote per poll per `voter_id`
- 1 vote per poll per `device_id`

If a duplicate insert happens, the database rejects it with code `23505`.
