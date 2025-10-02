import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { influencerSchema, filterSchema } from '@/lib/validations';
import { Prisma } from '@prisma/client';

// GET /api/influencers - List influencers with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const filters = filterSchema.parse({
      search: searchParams.get('search') || undefined,
      categoryIds: searchParams.get('categoryIds')?.split(',').map(Number) || undefined,
      regionIds: searchParams.get('regionIds')?.split(',').map(Number) || undefined,
      gender: searchParams.get('gender') || undefined,
      platforms: searchParams.get('platforms')?.split(',') || undefined,
      minRate: searchParams.get('minRate') ? Number(searchParams.get('minRate')) : undefined,
      maxRate: searchParams.get('maxRate') ? Number(searchParams.get('maxRate')) : undefined,
      minFollowers: searchParams.get('minFollowers') ? Number(searchParams.get('minFollowers')) : undefined,
      maxFollowers: searchParams.get('maxFollowers') ? Number(searchParams.get('maxFollowers')) : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
    });

    // Build where clause
    const where: Prisma.InfluencerWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { username: { contains: filters.search } },
      ];
    }

    if (filters.categoryIds && filters.categoryIds.length > 0) {
      where.categoryId = { in: filters.categoryIds };
    }

    if (filters.regionIds && filters.regionIds.length > 0) {
      where.regionId = { in: filters.regionIds };
    }

    if (filters.gender) {
      where.gender = filters.gender;
    }

    if (filters.platforms && filters.platforms.length > 0) {
      // Since platforms is stored as JSON string, we need to filter in memory
      // For now, we'll fetch all and filter after
    }

    if (filters.minRate !== undefined || filters.maxRate !== undefined) {
      where.advertisingRate = {};
      if (filters.minRate !== undefined) {
        where.advertisingRate.gte = filters.minRate;
      }
      if (filters.maxRate !== undefined) {
        where.advertisingRate.lte = filters.maxRate;
      }
    }

    if (filters.minFollowers !== undefined || filters.maxFollowers !== undefined) {
      where.followersCount = {};
      if (filters.minFollowers !== undefined) {
        where.followersCount.gte = filters.minFollowers;
      }
      if (filters.maxFollowers !== undefined) {
        where.followersCount.lte = filters.maxFollowers;
      }
    }

    // Count total records
    const total = await prisma.influencer.count({ where });

    // Fetch influencers with pagination
    let influencers = await prisma.influencer.findMany({
      where,
      include: {
        category: true,
        region: true,
      },
      orderBy: {
        [filters.sortBy]: filters.sortOrder,
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
    });

    // Filter by platforms if specified (in-memory filtering)
    if (filters.platforms && filters.platforms.length > 0) {
      influencers = influencers.filter((inf) => {
        const platforms = JSON.parse(inf.platforms);
        return filters.platforms!.some((p) => platforms.includes(p));
      });
    }

    // Parse platforms JSON for response
    const response = influencers.map((inf) => ({
      ...inf,
      platforms: JSON.parse(inf.platforms),
    }));

    return NextResponse.json({
      data: response,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  } catch (error) {
    console.error('Error fetching influencers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    );
  }
}

// POST /api/influencers - Create new influencer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = influencerSchema.parse(body);

    const influencer = await prisma.influencer.create({
      data: {
        ...data,
        platforms: JSON.stringify(data.platforms),
      },
      include: {
        category: true,
        region: true,
      },
    });

    return NextResponse.json({
      ...influencer,
      platforms: JSON.parse(influencer.platforms),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating influencer:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation error', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create influencer' },
      { status: 500 }
    );
  }
}
