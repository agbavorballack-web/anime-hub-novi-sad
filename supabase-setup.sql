-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Create settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid duplicate errors
DROP POLICY IF EXISTS "Allow public read" ON site_settings;
DROP POLICY IF EXISTS "Allow public write" ON site_settings;

-- Allow public read access to all settings
CREATE POLICY "Allow public read" ON site_settings
  FOR SELECT USING (true);

-- Allow public write access (for this simple admin setup, the admin password protects the app UI)
CREATE POLICY "Allow public write" ON site_settings
  FOR ALL USING (true) WITH CHECK (true);

-- Seed default values
INSERT INTO site_settings (key, value) VALUES
  ('admin_password', 'Aisha'),
  ('site_email', 'animehubns@gmail.com'),
  ('site_phone', '+381 65 314 7840'),
  ('site_name', 'Anime Hub Novi Sad'),
  ('whatsapp_link', 'https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56'),
  ('instagram_link', ''),
  ('bank_name', ''),
  ('account_holder', ''),
  ('account_number', ''),
  ('hero_image', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920')
ON CONFLICT (key) DO NOTHING;
