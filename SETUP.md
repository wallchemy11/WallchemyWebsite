# Wallchemy CMS Setup Guide

## Quick Start (File-Based CMS - Works Immediately)

The CMS currently uses JSON files in `/data` directory. This works on Vercel without any database setup.

## Future: Neon Postgres Setup (Optional)

When ready to use a database:

1. **Create Neon Database:**
   - Go to https://neon.tech
   - Create a free account
   - Create a new project
   - Copy the connection string

2. **Set Environment Variable:**
   ```env
   DATABASE_URL=postgresql://user:password@host/database
   ```

3. **Initialize Database:**
   - Visit `/api/db/init` (POST request) to create tables
   - Or run the SQL in `lib/db/schema.sql` manually

4. **Update CMS:**
   - The code will automatically use the database if `DATABASE_URL` is set
   - Falls back to JSON files if not set

## Current Status

- ✅ File-based CMS working
- ✅ Admin interface at `/admin`
- ✅ Authentication working
- ⏳ Database integration ready (just needs DATABASE_URL)
