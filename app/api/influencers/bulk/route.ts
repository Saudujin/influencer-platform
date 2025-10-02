import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { bulkUpdateSchema } from '@/lib/validations';

// PATCH /api/influencers/bulk - Bulk update influencers
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, updates } = bulkUpdateSchema.parse(body);

    // Perform bulk update
    const result = await prisma.influencer.updateMany({
      where: {
        id: { in: ids },
      },
      data: updates,
    });

    return NextResponse.json({
      message: `Successfully updated ${result.count} influencer(s)`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error bulk updating influencers:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to bulk update influencers' },
      { status: 500 }
    );
  }
}
