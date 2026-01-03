# NewCool Deployment Checklist

## Pre-Deployment

### Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/newcool
JWT_SECRET=your-256-bit-secret
NEWCOOL_API_URL=https://api.newcool.io

# Supabase (for Auth)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional
ANALYTICS_API_KEY=...
WEBHOOK_SECRET=...
SENTRY_DSN=...
```

### Database

- [ ] PostgreSQL 15+ configured
- [ ] Migrations applied
- [ ] Connection pool configured
- [ ] Backups scheduled

### Security

- [ ] JWT secret is 256+ bits
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation active (Zod)
- [ ] SQL injection prevention
- [ ] XSS protection headers

## Deployment Steps

### 1. Build

```bash
npm run build
```

### 2. Verify

```bash
# TypeScript check
npx tsc --noEmit

# Run tests
npm test
```

### 3. Deploy to Vercel

```bash
vercel --prod
```

Or use GitHub Actions for CI/CD.

### 4. Post-Deployment

```bash
# Verify health
curl https://api.newcool.io/api/health

# Verify status
curl https://api.newcool.io/api/status
```

## Monitoring

### Endpoints to Monitor

| Endpoint | Expected | Alert Threshold |
|----------|----------|-----------------|
| /api/health | 200 OK | > 1s response |
| /api/status | 200 OK | > 2s response |
| /api/search | 200 OK | > 500ms response |

### Metrics to Track

- Response times (p50, p95, p99)
- Error rates by endpoint
- Active users
- API calls per minute
- Database connections

## Rollback

```bash
# Vercel rollback
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push origin main
```

## Scaling

### Vercel

- Automatic scaling included
- Edge functions for low latency
- Serverless functions

### Database

- Consider connection pooling (PgBouncer)
- Read replicas for heavy read loads
- Redis cache for sessions

## DNS Configuration

| Record | Type | Value |
|--------|------|-------|
| api.newcool.io | CNAME | cname.vercel-dns.com |
| docs.newcool.io | CNAME | docs-provider.com |
| status.newcool.io | CNAME | status-provider.com |

## SSL/TLS

- Automatic via Vercel
- Force HTTPS enabled
- HSTS configured

## Support

- GitHub Issues: https://github.com/IANewCool/newcool-api/issues
- Email: dev@newcool.io

---

*NewCool DevOps - Enero 2026*
