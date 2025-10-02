import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as XLSX from 'xlsx';
import { influencerSchema } from '@/lib/validations';

// POST /api/import - Import influencers from Excel/CSV
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[],
    };

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row: any = data[i];
      
      try {
        // Map Excel columns to schema
        const influencerData = {
          name: row.Name || row.name,
          username: row.Username || row.username,
          platforms: typeof row.Platforms === 'string' 
            ? row.Platforms.split(',').map((p: string) => p.trim())
            : row.platforms || [],
          categoryId: Number(row.CategoryId || row.categoryId),
          gender: row.Gender || row.gender,
          phoneNumber: row.PhoneNumber || row.phoneNumber || null,
          advertisingRate: Number(row.AdvertisingRate || row.advertisingRate),
          followersCount: Number(row.FollowersCount || row.followersCount),
          regionId: Number(row.RegionId || row.regionId),
          notes: row.Notes || row.notes || null,
        };

        // Validate data
        const validatedData = influencerSchema.parse(influencerData);

        // Create influencer
        await prisma.influencer.create({
          data: {
            ...validatedData,
            platforms: JSON.stringify(validatedData.platforms),
          },
        });

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 2, // Excel row number (1-indexed + header)
          data: row,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      message: `Import completed. ${results.success} successful, ${results.failed} failed.`,
      results,
    });
  } catch (error) {
    console.error('Error importing influencers:', error);
    return NextResponse.json(
      { error: 'Failed to import influencers' },
      { status: 500 }
    );
  }
}
