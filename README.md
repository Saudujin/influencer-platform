# Influencer Management Platform

A complete, professional platform for managing influencers, creating campaigns, and generating beautiful PDF reports with IBM Plex font support.

## 🌟 Features

### 1. **Influencer Database Management**
- ✅ Add, edit, and delete influencers
- ✅ Comprehensive influencer profiles with:
  - Name and Username/Handle
  - Multiple platform support (Instagram, TikTok, YouTube, Snapchat, X, Facebook, Twitch, LinkedIn)
  - Category/Activity classification
  - Gender information
  - Phone number
  - Advertising rate (SAR)
  - Followers count
  - Region (Saudi Arabia regions pre-loaded)
  - Notes field
- ✅ User-friendly interface with modal forms
- ✅ Real-time validation

### 2. **Advanced Filtering & Search**
- ✅ Search by name or username
- ✅ Filter by category (12 pre-loaded categories)
- ✅ Filter by region (20 Saudi regions)
- ✅ Filter by gender (Male/Female)
- ✅ Filter by platforms (multi-select)
- ✅ Filter by advertising rate range (min/max)
- ✅ Filter by followers count range (min/max)
- ✅ Combine multiple filters simultaneously
- ✅ Active filter count badge
- ✅ Reset filters functionality

### 3. **Campaign Builder**
- ✅ Create and manage campaigns
- ✅ Select multiple influencers for campaigns
- ✅ Customize which fields to display in exports
- ✅ Campaign title and description
- ✅ Campaign history tracking
- ✅ Duplicate existing campaigns

### 4. **Professional PDF Export**
- ✅ Generate beautiful, professional PDFs
- ✅ IBM Plex Sans font integration (Arabic + Latin support)
- ✅ Customizable layout with title page, tables, and summary
- ✅ Formatted numbers (SAR currency, followers with K/M notation)
- ✅ Client-side PDF generation for better performance

### 5. **Bulk Operations**
- ✅ Select multiple influencers with checkboxes
- ✅ Bulk edit functionality (category, region, gender)

### 6. **Import/Export**
- ✅ Export influencers to Excel (.xlsx)
- ✅ Export influencers to CSV
- ✅ Import influencers from Excel/CSV
- ✅ Download import template

### 7. **Analytics Dashboard**
- ✅ Key metrics cards (total influencers, campaigns, reach, average rate)
- ✅ Visual charts (category, region, gender, platform, rate ranges, followers)
- ✅ Recharts integration with responsive containers

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - UI components
- **Zustand** - State management
- **React Query** - Server state management
- **Prisma** - ORM
- **SQLite** - Database
- **jsPDF** - PDF generation
- **xlsx** - Excel handling
- **IBM Plex Sans** - Professional font

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup Instructions

1. **Navigate to project directory:**
   ```bash
   cd influencer-platform
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up the database:**
   ```bash
   pnpm prisma migrate dev
   ```

4. **Seed the database:**
   ```bash
   pnpm prisma db seed
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

6. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Configure PostgreSQL database
4. Deploy

### Environment Variables

```env
DATABASE_URL="file:./dev.db"

# For production with PostgreSQL:
# DATABASE_URL="postgresql://user:password@host:5432/database"
```

## 📖 Usage Guide

### Adding Influencers
1. Navigate to **Influencers** page
2. Click **Add Influencer**
3. Fill required fields
4. Click **Save**

### Filtering Influencers
1. Use search bar or click **Filters**
2. Select desired filters
3. Click **Apply Filters**

### Creating Campaigns
1. Navigate to **Campaigns** page
2. Click **Create Campaign**
3. Enter details and select influencers
4. Choose export fields
5. Click **Create Campaign**

### Exporting PDFs
1. Find campaign on **Campaigns** page
2. Click **Export PDF**
3. PDF downloads automatically

### Bulk Operations
1. Select multiple influencers
2. Click **Bulk Edit**
3. Choose field and new value
4. Click **Update**

### Import/Export Data
- **Export:** Click Export dropdown, choose format
- **Import:** Download template, fill data, import file

## 📁 Project Structure

```
influencer-platform/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── analytics/          # Analytics page
│   ├── campaigns/          # Campaigns page
│   ├── influencers/        # Influencers page
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── campaigns/
│   ├── influencers/
│   ├── layout/
│   └── ui/
├── lib/                    # Utilities
│   ├── hooks/
│   ├── db.ts
│   ├── pdfGenerator.ts
│   └── validations.ts
├── prisma/                 # Database
│   ├── schema.prisma
│   └── seed.ts
├── stores/                 # Zustand stores
└── types/                  # TypeScript types
```

## 🗄️ Database Schema

- **Influencer:** Main influencer data
- **Category:** Influencer categories
- **Region:** Geographic regions
- **Campaign:** Campaign information
- **CampaignInfluencer:** Junction table

## 🎨 Customization

### Adding Platforms
Edit `/lib/validations.ts` and add to `PLATFORMS` array

### Changing Colors
Edit `/app/globals.css` CSS variables

### Switching to PostgreSQL
1. Update `prisma/schema.prisma` provider
2. Update `.env` with PostgreSQL URL
3. Run `pnpm prisma migrate dev`

## 🐛 Troubleshooting

### Database Issues
```bash
pnpm prisma migrate reset
pnpm prisma db seed
```

### Build Errors
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

## 📝 Future Enhancements

- User authentication
- Email integration
- Advanced analytics
- Social media API integration
- Mobile app
- Contract management
- Payment tracking

## 📄 License

Proprietary - All rights reserved

## 👨‍💻 Developer

Built with ❤️ by Manus AI

---

**Version:** 1.0.0  
**Last Updated:** October 2, 2025
