import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/analytics - Get analytics dashboard data
export async function GET() {
  try {
    // Total influencers
    const totalInfluencers = await prisma.influencer.count();

    // Average advertising rate
    const rateAgg = await prisma.influencer.aggregate({
      _avg: {
        advertisingRate: true,
      },
    });

    // Total followers
    const followersAgg = await prisma.influencer.aggregate({
      _sum: {
        followersCount: true,
      },
    });

    // Category distribution
    const categoryDistribution = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { influencers: true },
        },
      },
      orderBy: {
        influencers: {
          _count: 'desc',
        },
      },
    });

    // Gender ratio
    const genderDistribution = await prisma.influencer.groupBy({
      by: ['gender'],
      _count: {
        gender: true,
      },
    });

    // Regional distribution
    const regionDistribution = await prisma.region.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { influencers: true },
        },
      },
      orderBy: {
        influencers: {
          _count: 'desc',
        },
      },
    });

    // Platform distribution (requires fetching all influencers and parsing)
    const allInfluencers = await prisma.influencer.findMany({
      select: {
        platforms: true,
      },
    });

    const platformCounts: Record<string, number> = {};
    allInfluencers.forEach((inf) => {
      const platforms = JSON.parse(inf.platforms);
      platforms.forEach((platform: string) => {
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      });
    });

    const platformDistribution = Object.entries(platformCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Price range distribution
    const priceRanges = [
      { label: '0-1000', min: 0, max: 1000 },
      { label: '1000-5000', min: 1000, max: 5000 },
      { label: '5000-10000', min: 5000, max: 10000 },
      { label: '10000-50000', min: 10000, max: 50000 },
      { label: '50000+', min: 50000, max: Infinity },
    ];

    const priceDistribution = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await prisma.influencer.count({
          where: {
            advertisingRate: {
              gte: range.min,
              ...(range.max !== Infinity ? { lt: range.max } : {}),
            },
          },
        });
        return {
          label: range.label,
          count,
        };
      })
    );

    // Total campaigns
    const totalCampaigns = await prisma.campaign.count();

    return NextResponse.json({
      summary: {
        totalInfluencers,
        averageAdvertisingRate: rateAgg._avg.advertisingRate || 0,
        totalFollowers: followersAgg._sum.followersCount || 0,
        totalCampaigns,
      },
      categoryDistribution: categoryDistribution.map((cat) => ({
        id: cat.id,
        name: cat.name,
        count: cat._count.influencers,
      })),
      genderDistribution: genderDistribution.map((g) => ({
        gender: g.gender,
        count: g._count.gender,
      })),
      regionDistribution: regionDistribution.map((reg) => ({
        id: reg.id,
        name: reg.name,
        count: reg._count.influencers,
      })),
      platformDistribution,
      priceDistribution,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
