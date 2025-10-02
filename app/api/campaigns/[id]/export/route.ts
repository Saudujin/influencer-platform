import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    // Fetch campaign with influencers
    const campaign = await prisma.campaign.findUnique({
      where: { id },
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

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const influencers = campaign.campaignInfluencers.map((ci) => ci.influencer);

    if (format === 'pdf') {
      // Return campaign data for client-side PDF generation
      return NextResponse.json({
        campaign: {
          id: campaign.id,
          title: campaign.title,
          description: campaign.description,
          selectedFields: campaign.selectedFields,
          createdAt: campaign.createdAt.toISOString(),
        },
        influencers,
      });
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export campaign' },
      { status: 500 }
    );
  }
}
