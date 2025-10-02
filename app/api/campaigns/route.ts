import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { campaignSchema } from '@/lib/validations';

// GET /api/campaigns - List all campaigns
export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { campaignInfluencers: true },
        },
      },
    });

    const response = campaigns.map((campaign) => ({
      ...campaign,
      selectedFields: JSON.parse(campaign.selectedFields),
      influencerCount: campaign._count.campaignInfluencers,
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/campaigns - Create new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { influencerIds, ...campaignData } = campaignSchema.parse(body);

    // Create campaign with influencers
    const campaign = await prisma.campaign.create({
      data: {
        title: campaignData.title,
        description: campaignData.description,
        selectedFields: JSON.stringify(campaignData.selectedFields),
        campaignInfluencers: {
          create: influencerIds.map((influencerId) => ({
            influencerId,
          })),
        },
      },
      include: {
        campaignInfluencers: {
          include: {
            influencer: {
              include: {
                category: true,
                region: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      ...campaign,
      selectedFields: JSON.parse(campaign.selectedFields),
      influencers: campaign.campaignInfluencers.map((ci) => ({
        ...ci.influencer,
        platforms: JSON.parse(ci.influencer.platforms),
      })),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
