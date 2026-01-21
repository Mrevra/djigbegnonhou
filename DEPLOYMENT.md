# Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- PostgreSQL database (Vercel Postgres, Supabase, or any PostgreSQL provider)

### Step 1: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### Step 2: Setup PostgreSQL Database

#### Option A: Vercel Postgres
1. Go to Vercel Dashboard
2. Create a new Postgres database
3. Copy the DATABASE_URL

#### Option B: Supabase
1. Create a Supabase project
2. Go to Settings > Database
3. Copy the connection string (Connection Pooling recommended)

#### Option C: Railway
1. Create a Railway project
2. Add PostgreSQL service
3. Copy the DATABASE_URL

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:

```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://yourdomain.vercel.app
NEXTAUTH_SECRET=your-generated-secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword123!
NODE_ENV=production
```

5. Click "Deploy"

### Step 4: Run Database Migrations

After deployment, run migrations using Vercel CLI or through your database provider:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

Or manually via database console:
```bash
# Generate SQL
npx prisma migrate dev --create-only
# Copy SQL and run in your database console
```

### Step 5: Verify Deployment

1. Visit your deployed URL
2. Check that homepage loads
3. Navigate to /admin/login
4. Login with admin credentials
5. Test creating/editing content

## Environment Variables Checklist

Production environment variables:
- ✅ DATABASE_URL (PostgreSQL connection string)
- ✅ NEXTAUTH_URL (Your production URL)
- ✅ NEXTAUTH_SECRET (Random 32+ character string)
- ✅ ADMIN_EMAIL (Admin login email)
- ✅ ADMIN_PASSWORD (Secure password)
- ✅ NODE_ENV=production

## Custom Domain Setup

1. In Vercel Dashboard, go to project Settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed
5. Update NEXTAUTH_URL to your custom domain

## Database Backup

### Automated Backups
Most providers offer automated backups:
- Vercel Postgres: Automatic daily backups
- Supabase: Point-in-time recovery
- Railway: Automatic backups on paid plans

### Manual Backup
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

## Performance Optimization

### Edge Functions
Already configured! Next.js 14 App Router uses Edge by default.

### Image Optimization
Images are automatically optimized by Next.js Image component.

### Caching
- Static pages are cached at CDN edge
- Database queries can be cached with React Cache
- Consider Redis for session storage at scale

## Monitoring

### Vercel Analytics
Enable in project settings for:
- Page views
- Web vitals
- Performance metrics

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Vercel Speed Insights

## Security Checklist

Before going live:
- ✅ Change default admin password
- ✅ Use strong NEXTAUTH_SECRET
- ✅ Enable HTTPS only
- ✅ Set secure headers in next.config.js
- ✅ Enable rate limiting for API routes
- ✅ Review and update CORS settings
- ✅ Backup database regularly

## Post-Deployment

1. **Test Everything**: All features, forms, authentication
2. **SEO**: Submit sitemap to Google Search Console
3. **Analytics**: Setup Google Analytics or alternatives
4. **Monitoring**: Setup uptime monitoring (UptimeRobot, etc.)
5. **Content**: Replace seed data with your actual content

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Check TypeScript errors: `npm run build`

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is accessible from Vercel
- Whitelist Vercel IPs in database firewall

### Authentication Not Working
- Verify NEXTAUTH_URL matches deployment URL
- Check NEXTAUTH_SECRET is set
- Clear cookies and try again

### Images Not Loading
- Check image paths are correct
- Verify images are in public folder or valid URLs
- Check Next.js Image domains in next.config.js

## Rollback

If deployment fails:
```bash
# Revert to previous deployment in Vercel Dashboard
# Or via CLI
vercel rollback
```

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs

---

**Congratulations on deploying your portfolio! 🚀**
