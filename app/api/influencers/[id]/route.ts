import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { influencerUpdateSchema } from '@/lib/validations';

// GET /api/influencers/[id] - Get single influencer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const influencer = await prisma.influencer.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        region: true,
      },
    });

    if (!influencer) {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...influencer,
      platforms: JSON.parse(influencer.platforms),
    });
  } catch (error) {
    console.error('Error fetching influencer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch influencer' },
      { status: 500 }
    );
  }
}

// PUT /api/influencers/[id] - Update influencer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = influencerUpdateSchema.parse(body);

    // Prepare update data
    const updateData: any = { ...data };
    if (data.platforms) {
      updateData.platforms = JSON.stringify(data.platforms);
    }

    const influencer = await prisma.influencer.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        category: true,
        region: true,
      },
    });

    return NextResponse.json({
      ...influencer,
      platforms: JSON.parse(influencer.platforms),
    });
  } catch (error) {
    console.error('Error updating influencer:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      );
    }
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update influencer' },
      { status: 500 }
    );
  }
}

// DELETE /api/influencers/[id] - Delete influencer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.influencer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Influencer deleted successfully' });
  } catch (error) {
    console.error('Error deleting influencer:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete influencer' },
      { status: 500 }
    );
  }
}
