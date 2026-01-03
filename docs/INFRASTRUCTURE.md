# NewCool API - Infrastructure

## Database (PostgreSQL via Supabase)

### Connection

```typescript
// Supabase connection is handled automatically
// Use environment variables:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...  // Server-side only
```

### Tables

| Table | Description | RLS |
|-------|-------------|-----|
| `profiles` | User profiles (extends auth.users) | Yes |
| `user_modules` | Per-user module access | Yes |
| `modules` | Module catalog | Public read |
| `sessions` | Session tracking | Yes |

### Migrations

Run migrations via Supabase Dashboard SQL Editor or CLI:

```bash
# Using Supabase CLI
supabase db push

# Or run manually in order:
# 001_profiles.sql
# 002_user_modules.sql
# 003_modules.sql
# 004_sessions.sql
```

---

## Cache (Redis via Upstash)

### Setup

1. Create account at https://upstash.com
2. Create Redis database (choose region closest to Vercel)
3. Get credentials

### Environment Variables

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### Usage

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache example
await redis.set('user:123:profile', JSON.stringify(profile), { ex: 3600 });
const cached = await redis.get('user:123:profile');
```

### Cache Keys

| Pattern | TTL | Description |
|---------|-----|-------------|
| `user:{id}:profile` | 1h | User profile cache |
| `user:{id}:modules` | 5m | User module access |
| `search:{hash}` | 10m | Search results |
| `music:catalog` | 1h | Music catalog |
| `ratelimit:{ip}` | 1m | Rate limiting |

---

## File Storage (AWS S3)

### Buckets

| Bucket | Region | Purpose |
|--------|--------|---------|
| `newcool-streaming-platform-cdn` | us-east-2 | Music/video files |
| `newcool-assets` | us-east-2 | Static assets |
| `newcool-uploads` | us-east-2 | User uploads |

### Environment Variables

```bash
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-2
S3_BUCKET_CDN=newcool-streaming-platform-cdn
S3_BUCKET_ASSETS=newcool-assets
S3_BUCKET_UPLOADS=newcool-uploads
```

### Usage

```typescript
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Get signed URL for private file
const url = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'newcool-streaming-platform-cdn',
  Key: 'music/track-123.mp3',
}), { expiresIn: 3600 });

// Upload file
await s3.send(new PutObjectCommand({
  Bucket: 'newcool-uploads',
  Key: `avatars/${userId}.jpg`,
  Body: fileBuffer,
  ContentType: 'image/jpeg',
}));
```

### CDN URLs

Public files are served via CloudFront or direct S3:

```
https://newcool-streaming-platform-cdn.s3.us-east-2.amazonaws.com/music/track.mp3
```

---

## Deployment (Vercel)

### Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY

# Redis
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# AWS
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION

# App
NODE_ENV=production
```

### Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## Monitoring

### Health Check

```bash
curl https://api.newcool.io/api/health
```

### Logs

- Vercel Dashboard → Logs
- Supabase Dashboard → Logs

### Alerts

Configure in Vercel/Supabase dashboards for:
- Error rate > 1%
- Response time > 2s
- Database connections > 80%

---

*NewCool Infrastructure - Enero 2026*
