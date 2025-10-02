# Deployment Guide

This guide covers multiple deployment options for the Influencer Management Platform.

## Option 1: Vercel (Recommended)

Vercel is the easiest and most recommended deployment option for Next.js applications.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/influencer-platform.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   
   In Vercel dashboard, add:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

4. **Set up PostgreSQL Database**
   
   **Option A: Vercel Postgres**
   - In your Vercel project, go to "Storage"
   - Click "Create Database"
   - Select "Postgres"
   - Follow the setup wizard
   - Connection string will be automatically added to your environment variables

   **Option B: External PostgreSQL (Neon, Supabase, etc.)**
   - Sign up for a PostgreSQL provider
   - Create a new database
   - Copy the connection string
   - Add it to Vercel environment variables

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

6. **Run Database Migrations**
   
   After first deployment, you need to run migrations:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Link your project
   vercel link

   # Run migrations
   vercel env pull .env.local
   pnpm prisma migrate deploy
   pnpm prisma db seed
   ```

## Option 2: Netlify

### Prerequisites
- GitHub account
- Netlify account

### Steps

1. **Push to GitHub** (same as Vercel)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure Build Settings**
   ```
   Build command: pnpm build
   Publish directory: .next
   ```

4. **Add Environment Variables**
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

## Option 3: DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- GitHub account

### Steps

1. **Push to GitHub** (same as above)

2. **Create App**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

3. **Configure App**
   ```
   Build Command: pnpm build
   Run Command: pnpm start
   ```

4. **Add Database**
   - Add a PostgreSQL database component
   - Connection string will be automatically injected

5. **Deploy**
   - Click "Deploy"
   - App will be live at provided URL

## Option 4: Self-Hosted (VPS)

### Prerequisites
- VPS (Ubuntu 22.04 recommended)
- Domain name (optional)
- SSH access

### Steps

1. **Connect to VPS**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install pnpm
   npm install -g pnpm

   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib -y
   ```

3. **Set up PostgreSQL**
   ```bash
   sudo -u postgres psql
   ```
   ```sql
   CREATE DATABASE influencer_platform;
   CREATE USER influencer_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE influencer_platform TO influencer_user;
   \q
   ```

4. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/influencer-platform.git
   cd influencer-platform
   ```

5. **Configure Environment**
   ```bash
   nano .env
   ```
   Add:
   ```
   DATABASE_URL="postgresql://influencer_user:your_secure_password@localhost:5432/influencer_platform"
   ```

6. **Install and Build**
   ```bash
   pnpm install
   pnpm prisma migrate deploy
   pnpm prisma db seed
   pnpm build
   ```

7. **Set up PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "influencer-platform" -- start
   pm2 startup
   pm2 save
   ```

8. **Configure Nginx (Reverse Proxy)**
   ```bash
   sudo apt install nginx -y
   sudo nano /etc/nginx/sites-available/influencer-platform
   ```
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/influencer-platform /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set up SSL (Optional but Recommended)**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```

## Option 5: Docker

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   COPY package.json pnpm-lock.yaml* ./
   RUN npm install -g pnpm && pnpm install --frozen-lockfile

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   RUN npm install -g pnpm && pnpm build

   # Production image
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/influencer_platform
       depends_on:
         - db

     db:
       image: postgres:15
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=password
         - POSTGRES_DB=influencer_platform
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

3. **Build and Run**
   ```bash
   docker-compose up -d
   ```

4. **Run Migrations**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   docker-compose exec app npx prisma db seed
   ```

## Database Migration from SQLite to PostgreSQL

If you're moving from development (SQLite) to production (PostgreSQL):

1. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Create Migration**
   ```bash
   pnpm prisma migrate dev --name init
   ```

3. **Deploy to Production**
   ```bash
   pnpm prisma migrate deploy
   ```

4. **Seed Data**
   ```bash
   pnpm prisma db seed
   ```

## Post-Deployment Checklist

- [ ] Database is accessible and migrations are applied
- [ ] Environment variables are set correctly
- [ ] Application loads without errors
- [ ] Can add influencers
- [ ] Filters work correctly
- [ ] Can create campaigns
- [ ] PDF export works
- [ ] Import/Export functionality works
- [ ] Analytics dashboard displays correctly
- [ ] SSL certificate is configured (for production)
- [ ] Backups are configured
- [ ] Monitoring is set up

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf .next node_modules && pnpm install`
- Check environment variables

### Database Connection Issues
- Verify DATABASE_URL format
- Check database credentials
- Ensure database server is running
- Check firewall rules

### PDF Generation Not Working
- Ensure jsPDF is installed
- Check browser console for errors
- Verify fonts are loaded correctly

## Monitoring and Maintenance

### Recommended Tools
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics, Plausible
- **Performance:** Vercel Analytics, New Relic

### Backup Strategy
- Daily database backups
- Weekly full application backups
- Store backups in multiple locations

### Updates
```bash
# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Run migrations
pnpm prisma migrate deploy

# Rebuild
pnpm build

# Restart application
pm2 restart influencer-platform
```

## Support

For deployment issues:
- Check logs: `pm2 logs` (if using PM2)
- Check Vercel logs (if using Vercel)
- Review error messages in browser console
- Check database connectivity

---

**Last Updated:** October 2, 2025
