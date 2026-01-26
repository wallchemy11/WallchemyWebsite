# Wallchemy CMS Documentation

## Overview
A clean, intuitive content management system built specifically for Wallchemy. All content is stored in JSON files in the `/data` directory, making it simple, version-controlled, and easy to backup.

## Features
- ✅ **Simple File-Based Storage** - No database required, works immediately
- ✅ **Intuitive Interface** - Clear labels and descriptions for every field
- ✅ **Array Management** - Easy management of projects, collections, CTAs, steps
- ✅ **Relationship Management** - Link projects and collections to homepage
- ✅ **R2 Video Support** - Paste R2 URLs directly (no code changes needed)
- ✅ **Ready for Database** - Can migrate to Neon Postgres when ready

## Accessing the CMS

1. Go to `/admin/login`
2. Enter credentials (set in environment variables)
3. You'll see the dashboard with all content sections

## Content Structure

### Pages
- **Home Page** - Hero, philosophy, featured projects & collections
- **About Page** - Studio narrative, values, founder note
- **Textures Page** - All texture collections
- **Process Page** - How we work, process steps
- **Projects Page** - All projects gallery
- **Contact Page** - Contact information
- **Site Settings** - WhatsApp, social media links

### Content Management
- **Projects** - Individual project entries (title, location, area, images)
- **Collections** - Texture collections (title, description, images)
- **Featured Content** - Select which projects/collections appear on homepage

## How It Works

### Projects & Collections
1. Create projects in **Projects Management** (`/admin/projects`)
2. Create collections in **Collections Management** (`/admin/collections`)
3. Select featured items in **Featured Content** (`/admin/featured`)
4. They automatically appear on the homepage and respective pages

### Page Content
1. Go to any page editor (e.g., `/admin/edit?page=home`)
2. Each field has a clear description of what it controls
3. Arrays (like CTAs, steps) can be added/removed easily
4. Save changes - they appear immediately

### Video URLs (R2)
- Upload videos to Cloudflare R2
- Get the public URL
- Paste in "Hero Video URL" fields in page editors
- No code changes needed!

## Environment Variables

```env
# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=your-secret-key

# Optional: Database (for future migration)
DATABASE_URL=postgresql://...  # Neon Postgres connection string
```

## File Structure

```
/data
  /pages
    home.json          # Homepage content
    about.json         # About page content
    textures.json      # Textures page content
    process.json       # Process page content
    projects.json      # Projects page content
    contact.json       # Contact page content
  settings.json        # Site-wide settings
  /projects
    project-slug.json  # Individual projects
  /collections
    collection-slug.json  # Individual collections
```

## Future: Database Migration

When ready to use Neon Postgres:

1. Create a Neon database at https://neon.tech
2. Set `DATABASE_URL` environment variable
3. Visit `/api/db/init` to create tables
4. The CMS will automatically use the database instead of files

## Tips

- **Clear Descriptions**: Every field in the CMS has a description explaining what it controls
- **Array Fields**: Use the "+ Add Item" button to add new items to arrays
- **Featured Content**: Use the Featured Content page to easily select what appears on homepage
- **Projects/Collections**: Create them first, then select which ones to feature
- **Video URLs**: Just paste R2 public URLs - no code changes needed
