import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST /api/campaigns/[id]/duplicate - Duplicate campaign
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch original campaign
    const originalCampaign = await prisma.campaign.findUnique({
      where: { id: Number(id) },
      include: {
        campaignInfluencers: true,
      },
    });

    if (!originalCampaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Create duplicate campaign
    const duplicateCampaign = await prisma.campaign.create({
      data: {
        title: `${originalCampaign.title} (Copy)`,
        description: originalCampaign.description,
        selectedFields: originalCampaign.selectedFields,
        campaignInfluencers: {
          create: originalCampaign.campaignInfluencers.map((ci) => ({
            influencerId: ci.influencerId,
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
      ...duplicateCampaign,
      selectedFields: JSON.parse(duplicateCampaign.selectedFields),
      influencers: duplicateCampaign.campaignInfluencers.map((ci) => ({
        ...ci.influencer,
        platforms: JSON.parse(ci.influencer.platforms),
      })),
    }, { status: 201 });
  } catch (error) {
    console.error('Error duplicating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to duplicate campaign' },
      { status: 500 }
    );
  }
}
