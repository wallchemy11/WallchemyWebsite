-- Add image_urls (up to 4 images per collection) for portrait gallery support.
-- Run once: psql $DATABASE_URL -f lib/db/migrations/add-collection-image-urls.sql
ALTER TABLE collections ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb;

-- Backfill: if hero_image_url is set and image_urls is empty, set image_urls to [hero_image_url]
UPDATE collections
SET image_urls = jsonb_build_array(hero_image_url)
WHERE hero_image_url IS NOT NULL AND hero_image_url != ''
  AND (image_urls IS NULL OR image_urls = '[]'::jsonb);
