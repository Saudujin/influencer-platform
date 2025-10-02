# Quick Start Guide

Get your Influencer Management Platform up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

## Installation Steps

### 1. Install Dependencies

```bash
cd influencer-platform
pnpm install
```

### 2. Set Up Database

```bash
pnpm prisma migrate dev
```

### 3. Seed Initial Data

```bash
pnpm prisma db seed
```

This will create:
- 12 categories (Beauty, Fashion, Gaming, etc.)
- 20 Saudi regions (Riyadh, Jeddah, Makkah, etc.)

### 4. Start Development Server

```bash
pnpm dev
```

### 5. Open in Browser

Navigate to: **http://localhost:3000**

## First Steps

### Add Your First Influencer

1. Click **Influencers** in the navigation
2. Click **Add Influencer** button
3. Fill in the form:
   - Name: "Sarah Ahmed"
   - Username: "@sarah_ahmed"
   - Platforms: Check "Instagram"
   - Category: Select "Beauty"
   - Gender: Select "Female"
   - Advertising Rate: 1500
   - Followers Count: 50000
   - Region: Select "Riyadh"
4. Click **Save**

### Create Your First Campaign

1. Click **Campaigns** in the navigation
2. Click **Create Campaign**
3. Enter campaign details:
   - Title: "Summer Beauty Campaign"
   - Description: "Summer 2025 beauty influencer campaign"
4. Select the influencer you just created
5. Choose fields to include in PDF (select all)
6. Click **Create Campaign**

### Export Your First PDF

1. On the Campaigns page, find your campaign
2. Click **Export PDF**
3. PDF will download automatically

### View Analytics

1. Click **Analytics** in the navigation
2. View your influencer statistics and charts

## What's Included

### Pre-loaded Categories
- Beauty
- Business
- Education
- Entertainment
- Fashion
- Food
- Gaming
- Health & Fitness
- Lifestyle
- Sports
- Technology
- Travel

### Pre-loaded Saudi Regions
- Riyadh
- Jeddah
- Makkah
- Madinah
- Dammam
- Khobar
- Dhahran
- Taif
- Buraidah
- Tabuk
- Hail
- Najran
- Jizan
- Abha
- Qatif
- Al-Ahsa
- Jubail
- Khamis Mushait
- Al-Kharj

## Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma studio    # Open Prisma Studio (database GUI)
pnpm prisma migrate dev    # Create and apply migrations
pnpm prisma db seed   # Seed database with initial data

# Code Quality
pnpm lint             # Run ESLint
```

## Project Structure

```
influencer-platform/
├── app/              # Pages and API routes
├── components/       # React components
├── lib/              # Utilities and hooks
├── prisma/           # Database schema and seeds
├── stores/           # State management
└── types/            # TypeScript types
```

## Key Features to Try

1. **Advanced Filtering**
   - Go to Influencers page
   - Click "Filters" button
   - Try filtering by category, region, gender, etc.

2. **Bulk Operations**
   - Select multiple influencers (checkboxes)
   - Click "Bulk Edit"
   - Update category or region for all at once

3. **Import/Export**
   - Export: Click "Export" → "Export to Excel"
   - Import: Click "Import" → "Download Template"
   - Fill template and import back

4. **Analytics Dashboard**
   - View distribution charts
   - See key metrics
   - Analyze your influencer database

## Next Steps

1. **Read Full Documentation**
   - `README.md` - Complete feature list
   - `USER_MANUAL.md` - Detailed usage guide
   - `API_DOCUMENTATION.md` - API reference
   - `DEPLOYMENT.md` - Deployment options

2. **Customize**
   - Add your logo to PDFs
   - Modify color scheme
   - Add new categories/regions

3. **Deploy**
   - Deploy to Vercel (recommended)
   - Or use any other hosting platform

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Database Issues

```bash
# Reset database
pnpm prisma migrate reset

# Reseed data
pnpm prisma db seed
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
```

## Getting Help

- Check `USER_MANUAL.md` for detailed instructions
- Review error messages in browser console
- Check terminal output for server errors

## What's Next?

Now that you're set up, explore all the features:

- ✅ Add multiple influencers
- ✅ Use advanced filters
- ✅ Create campaigns
- ✅ Export beautiful PDFs
- ✅ Try bulk operations
- ✅ Import data from Excel
- ✅ View analytics

**Enjoy your Influencer Management Platform!** 🎉

---

**Need more help?** Check the complete documentation files included in the project.
