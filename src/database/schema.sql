-- ==========================================================
-- JUNES NATAN 3D PORTFOLIO — SUPABASE POSTGRESQL SCHEMA & RLS
-- ==========================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Junes Natan',
  headline TEXT NOT NULL DEFAULT 'Full-Stack Developer × Graphic Designer',
  bio TEXT NOT NULL,
  philosophy TEXT NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fullstack', 'frontend', 'mobile', 'graphic_design', 'creative_dev')),
  role TEXT NOT NULL,
  year TEXT NOT NULL,
  featured BOOLEAN DEFAULT false NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  technologies JSONB DEFAULT '[]'::jsonb NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb NOT NULL,
  links JSONB DEFAULT '[]'::jsonb NOT NULL,
  thumbnail TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'graphic_design', 'creative_3d', 'tools_devops')),
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  highlighted BOOLEAN DEFAULT false NOT NULL
);

-- 4. Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements JSONB DEFAULT '[]'::jsonb NOT NULL,
  technologies JSONB DEFAULT '[]'::jsonb NOT NULL
);

-- 5. Education Table
CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL
);

-- 6. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb NOT NULL
);

-- 7. Messages (Contact transmissions)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Anonymous Analytics Events
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Public READ access for portfolio content
CREATE POLICY "Public profiles are readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Projects are readable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Skills are readable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Experiences are readable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Education is readable by everyone" ON education FOR SELECT USING (true);
CREATE POLICY "Services are readable by everyone" ON services FOR SELECT USING (true);

-- Messages: Public can INSERT, only authenticated admin can SELECT/UPDATE
CREATE POLICY "Anyone can submit a contact message" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admin can view messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');

-- Analytics: Public can INSERT events
CREATE POLICY "Anyone can log analytics" ON analytics FOR INSERT WITH CHECK (true);
