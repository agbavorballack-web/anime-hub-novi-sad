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

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read announcements" ON announcements;
DROP POLICY IF EXISTS "Allow public write announcements" ON announcements;
CREATE POLICY "Allow public read announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public write announcements" ON announcements FOR ALL USING (true) WITH CHECK (true);

-- Seed default welcome announcement
INSERT INTO announcements (id, title, content, date, published) VALUES
  (1, 'Welcome to Anime Hub Novi Sad!', 'We just launched! Join our WhatsApp group to help us build the community.', '2026-06-28', true)
ON CONFLICT (id) DO NOTHING;

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER DEFAULT 0,
  capacity INTEGER DEFAULT 50,
  registered INTEGER DEFAULT 0,
  category TEXT DEFAULT 'meetup',
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read events" ON events;
DROP POLICY IF EXISTS "Allow public write events" ON events;
CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public write events" ON events FOR ALL USING (true) WITH CHECK (true);

-- Seed default launch event
INSERT INTO events (id, title, description, date, time, end_time, location, price, capacity, registered, category, image) VALUES
  (1, 'Launch Party — Be Our First Members!', 'Join us for our very first community meetup! Let''s get to know each other and plan future events together.', '2026-07-15', '18:00', '22:00', 'To Be Announced', 500, 50, 0, 'meetup', 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600')
ON CONFLICT (id) DO NOTHING;

-- Ticket purchases table
CREATE TABLE IF NOT EXISTS ticket_purchases (
  booking_code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  amount INTEGER NOT NULL,
  purchase_time TEXT NOT NULL
);

ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read ticket_purchases" ON ticket_purchases;
DROP POLICY IF EXISTS "Allow public write ticket_purchases" ON ticket_purchases;
CREATE POLICY "Allow public read ticket_purchases" ON ticket_purchases FOR SELECT USING (true);
CREATE POLICY "Allow public write ticket_purchases" ON ticket_purchases FOR ALL USING (true) WITH CHECK (true);
