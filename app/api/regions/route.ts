import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { regionSchema } from '@/lib/validations';

// GET /api/regions - List all regions
export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { influencers: true },
        },
      },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regions' },
      { status: 500 }
    );
  }
}

// POST /api/regions - Create new region
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = regionSchema.parse(body);

    const region = await prisma.region.create({
      data,
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    console.error('Error creating region:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Region already exists' },
        { status: 409 }
      );
    }
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create region' },
      { status: 500 }
    );
  }
}
