# Custom CMS Architecture Proposal

## Overview
Replace Sanity with a simple, file-based CMS that:
- Stores content in JSON files (committed to git or stored in Vercel KV)
- Has a clean admin interface at `/admin`
- Uses simple password authentication
- Manages R2 video URLs (videos stored on Cloudflare R2, links in CMS)
- All server-side, no client-side CMS code

## Data Storage Options

### Option 1: JSON Files in `/data` (Recommended for simplicity)
- Pros: Simple, version-controlled, easy to backup
- Cons: Requires git commits for changes
- Best for: Small team, infrequent updates

### Option 2: Vercel KV (Redis)
- Pros: Real-time updates, no git commits needed
- Cons: Requires Vercel KV setup, slight complexity
- Best for: More frequent updates, team collaboration

## Structure

```
/data
  /pages
    home.json
    about.json
    textures.json
    process.json
    projects.json
    contact.json
  /settings.json
  /projects
    project-1.json
    project-2.json
  /collections
    collection-1.json
    collection-2.json
```

## Admin Interface
- Simple form-based editor
- One page per content type
- Image uploads → R2 (or just URL input for now)
- Video URLs → R2 links (just text input)
- Clean, minimal UI matching site theme

## Authentication
- Simple password check (env variable)
- Session cookie
- No complex auth system

## Migration Path
1. Export current Sanity data to JSON
2. Create admin interface
3. Update data layer to read from JSON
4. Remove Sanity dependencies
5. Test thoroughly
