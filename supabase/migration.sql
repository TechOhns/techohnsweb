-- ─── Enable UUID extension ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Team Members ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT NOT NULL,
  role         TEXT NOT NULL,
  bio          TEXT NOT NULL DEFAULT '',
  photo_url    TEXT,
  email        TEXT,
  linkedin_url TEXT,
  github_url   TEXT,
  twitter_url  TEXT,
  "order"      INTEGER NOT NULL DEFAULT 0,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Services ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  icon             TEXT NOT NULL DEFAULT 'Code',
  features         TEXT[] NOT NULL DEFAULT '{}',
  "order"          INTEGER NOT NULL DEFAULT 0,
  active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Projects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  tagline     TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  challenge   TEXT NOT NULL DEFAULT '',
  solution    TEXT NOT NULL DEFAULT '',
  outcome     TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL CHECK (category IN ('web','mobile','fullstack','ui-ux','consulting')),
  tech_stack  TEXT[] NOT NULL DEFAULT '{}',
  images      TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT NOT NULL DEFAULT '',
  live_url    TEXT,
  github_url  TEXT,
  featured    BOOLEAN NOT NULL DEFAULT FALSE,
  published   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Blog Posts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',
  cover_image  TEXT,
  category     TEXT NOT NULL CHECK (category IN ('tech','design','business','tutorials','news')),
  tags         TEXT[] NOT NULL DEFAULT '{}',
  author_id    UUID REFERENCES team_members(id) ON DELETE SET NULL,
  reading_time INTEGER NOT NULL DEFAULT 1,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Contact Messages ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  replied    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE projects         ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE services         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read (published / active only)
CREATE POLICY "Public read published projects"
  ON projects FOR SELECT USING (published = TRUE);

CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT USING (published = TRUE);

CREATE POLICY "Public read active team"
  ON team_members FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read active services"
  ON services FOR SELECT USING (active = TRUE);

-- Public can submit contact messages
CREATE POLICY "Public insert contact"
  ON contact_messages FOR INSERT WITH CHECK (TRUE);

-- Authenticated (admin) full access
CREATE POLICY "Admin all projects"
  ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all posts"
  ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all team"
  ON team_members FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all services"
  ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all messages"
  ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ─── updated_at trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Seed: Default Services ───────────────────────────────────────────────────
INSERT INTO services (title, description, long_description, icon, features, "order") VALUES
(
  'Web Development',
  'Scalable, fast, and modern web applications',
  'We build production-grade web applications using the latest frameworks and technologies, from simple landing pages to complex enterprise platforms.',
  'Globe',
  ARRAY['Next.js & React', 'TypeScript', 'REST & GraphQL APIs', 'Performance optimized', 'SEO ready'],
  1
),
(
  'Mobile App Development',
  'Cross-platform mobile apps for iOS and Android',
  'From concept to App Store, we deliver polished mobile experiences using React Native and Expo that feel truly native on every device.',
  'Smartphone',
  ARRAY['React Native / Expo', 'iOS & Android', 'Offline support', 'Push notifications', 'App Store submission'],
  2
),
(
  'Full Stack Development',
  'End-to-end solutions from database to UI',
  'Complete full-stack solutions designed, built, and deployed — we handle your entire technical stack so you can focus on your business.',
  'Layers',
  ARRAY['Database design', 'Backend APIs', 'Frontend UI', 'DevOps & CI/CD', 'Monitoring & logging'],
  3
),
(
  'UI/UX Design',
  'User-centred design that converts',
  'Research-driven design that balances aesthetics with function. We create interfaces that delight users and drive business results.',
  'Palette',
  ARRAY['User research', 'Wireframing', 'Prototyping', 'Design systems', 'Usability testing'],
  4
),
(
  'Tech Consulting',
  'Strategic technical guidance for your business',
  'Expert consulting to help you make the right technology decisions, from architecture reviews to digital transformation roadmaps.',
  'Lightbulb',
  ARRAY['Architecture review', 'Tech stack selection', 'Digital transformation', 'Code audits', 'Team mentoring'],
  5
);
