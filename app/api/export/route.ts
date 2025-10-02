import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as XLSX from 'xlsx';

// GET /api/export - Export influencers to Excel/CSV
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'xlsx'; // xlsx or csv
    const ids = searchParams.get('ids')?.split(',').map(Number);

    // Fetch influencers
    const where = ids ? { id: { in: ids } } : {};
    const influencers = await prisma.influencer.findMany({
      where,
      include: {
        category: true,
        region: true,
      },
      orderBy: { name: 'asc' },
    });

    // Prepare data for export
    const exportData = influencers.map((inf) => ({
      Name: inf.name,
      Username: inf.username,
      Platforms: JSON.parse(inf.platforms).join(', '),
      Category: inf.category.name,
      CategoryId: inf.categoryId,
      Gender: inf.gender,
      PhoneNumber: inf.phoneNumber || '',
      AdvertisingRate: inf.advertisingRate,
      FollowersCount: inf.followersCount,
      Region: inf.region.name,
      RegionId: inf.regionId,
      Notes: inf.notes || '',
      CreatedAt: inf.createdAt.toISOString(),
    }));

    // Create workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Influencers');

    // Generate buffer
    const buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: format === 'csv' ? 'csv' : 'xlsx',
    });

    // Set response headers
    const filename = `influencers_export_${new Date().toISOString().split('T')[0]}.${format}`;
    const contentType = format === 'csv' 
      ? 'text/csv' 
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting influencers:', error);
    return NextResponse.json(
      { error: 'Failed to export influencers' },
      { status: 500 }
    );
  }
}
