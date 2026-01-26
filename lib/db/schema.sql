-- Vercel Postgres Schema for Wallchemy CMS

-- Pages table (stores page content as JSONB for flexibility)
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255),
  area_sq_ft INTEGER,
  hero_image_url TEXT,
  atmosphere_note TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Collections table (texture collections)
CREATE TABLE IF NOT EXISTS collections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  hero_image_url TEXT,
  short_description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Selected Work table
CREATE TABLE IF NOT EXISTS selected_work (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  hero_image_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Material Library table
CREATE TABLE IF NOT EXISTS material_library (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  hero_image_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Site settings (singleton)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  palette JSONB DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Home page relationships (which projects/collections appear on home)
CREATE TABLE IF NOT EXISTS home_featured_projects (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS home_featured_collections (
  id SERIAL PRIMARY KEY,
  collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS home_featured_selected_work (
  id SERIAL PRIMARY KEY,
  selected_work_id INTEGER REFERENCES selected_work(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS home_featured_material_library (
  id SERIAL PRIMARY KEY,
  material_library_id INTEGER REFERENCES material_library(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);
CREATE INDEX IF NOT EXISTS idx_selected_work_slug ON selected_work(slug);
CREATE INDEX IF NOT EXISTS idx_material_library_slug ON material_library(slug);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
