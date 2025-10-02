'use client';

import Link from 'next/link';
import { Users, FolderOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/PageLayout';

export default function HomePage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Influencer Platform</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Manage influencers, create campaigns, and track analytics all in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Influencers</CardTitle>
              <CardDescription>
                Manage your influencer database with advanced filtering and search.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/influencers">
                <Button className="w-full">
                  Go to Influencers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Campaigns</CardTitle>
              <CardDescription>
                Build campaigns, select influencers, and export professional PDFs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/campaigns">
                <Button className="w-full">
                  Go to Campaigns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Analytics</CardTitle>
              <CardDescription>
                View insights, distributions, and statistics across your database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/analytics">
                <Button className="w-full">
                  Go to Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold">Platform Features</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Advanced Filtering</h3>
                <p className="text-sm text-muted-foreground">
                  Filter by region, category, gender, price range, followers, and platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Campaign Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Select influencers, customize fields, and generate professional PDFs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Bulk Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Update multiple influencers at once with bulk edit functionality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Import/Export</h3>
                <p className="text-sm text-muted-foreground">
                  Import influencers from Excel/CSV and export data in multiple formats.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize distributions, track metrics, and gain insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">IBM Plex Font</h3>
                <p className="text-sm text-muted-foreground">
                  Professional PDFs with IBM Plex font family (Arabic + Latin support).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
