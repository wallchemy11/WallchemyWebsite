# Vercel + Neon + Blob Setup (Production)

## 1) Create Neon Postgres
1. Go to https://neon.tech
2. Create a new project
3. Copy the **connection string** (DATABASE_URL)

## 2) Add DATABASE_URL to Vercel
Vercel → Project → Settings → Environment Variables
```
DATABASE_URL=your-neon-connection-string
```

## 3) Create Vercel Blob Token
1. Vercel → Storage → Blob
2. Create a Blob store (free tier is fine)
3. Create a **Read/Write token**

Add to Vercel env:
```
BLOB_READ_WRITE_TOKEN=your-blob-token
```

## 4) Initialize DB Schema
Run once locally (or in Vercel if you prefer):
```
npm run db:init
```
This will:
- Create tables
- Apply the schema

## 5) Migrate Content to Neon
Run:
```
npm run db:migrate
```
This migrates:
- `/data/pages/*.json` → `pages` table
- `/data/projects/*.json` → `projects` table
- `/data/collections/*.json` → `collections` table
- Featured selections → `home_featured_*` tables
- Palette → `site_settings`

## 6) Deploy on Vercel
After migration, deploy:
```
git push origin main
```
Vercel will build using Neon + Blob.

## 7) CMS + Uploads
Once deployed:
- CMS uses Neon automatically when DATABASE_URL is set
- Image uploads work with Blob token
- Hero videos use R2 URLs (paste into CMS)

## Notes
- **DB is now persistent** (good for production)
- **Blob is required** for uploads in CMS
- You can keep using R2 for videos by pasting URLs
