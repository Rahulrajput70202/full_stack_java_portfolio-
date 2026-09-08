/*
# Create contact_submissions table (single-tenant, no auth)

1. Purpose
- Stores messages submitted through the portfolio's contact form.
- This is a no-auth public portfolio site, so the anon-key frontend must be able to INSERT.
- Reads/deletes are NOT exposed to the frontend — only the database owner can access submitted messages directly.

2. New Tables
- `contact_submissions`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email for replies
  - `message` (text, not null) — the message body
  - `is_read` (boolean, default false) — tracks whether the owner has read the message
  - `created_at` (timestamptz, default now()) — when the message was submitted

3. Indexes
- `idx_contact_submissions_created_at` on `created_at DESC` — for chronological listing.

4. Security
- Enable RLS on `contact_submissions`.
- INSERT policy: allow `anon, authenticated` to insert new submissions (public contact form).
- SELECT / UPDATE / DELETE: NO public policies — only the database owner (service role) can read or manage submissions. This prevents anyone from scraping or deleting messages through the anon key.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit new messages via the contact form
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies for anon/authenticated:
-- only the service-role key (used server-side by the owner) can read or manage submissions.
