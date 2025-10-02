import * as XLSX from 'xlsx';
import type { Influencer } from '@/types';

export interface ImportRow {
  name: string;
  username: string;
  platforms: string;
  category: string;
  gender: 'Male' | 'Female';
  phoneNumber?: string;
  advertisingRate: number;
  followersCount: number;
  region: string;
  notes?: string;
}

export function exportToExcel(influencers: Influencer[], filename: string) {
  const data = influencers.map((inf) => ({
    Name: inf.name,
    Username: inf.username,
    Platforms: inf.platforms.join(', '),
    Category: inf.category.name,
    Gender: inf.gender,
    'Phone Number': inf.phoneNumber || '',
    'Advertising Rate (SAR)': inf.advertisingRate,
    'Followers Count': inf.followersCount,
    Region: inf.region.name,
    Notes: inf.notes || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Influencers');

  // Auto-size columns
  const maxWidth = 50;
  const colWidths = Object.keys(data[0] || {}).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...data.map((row) => String(row[key as keyof typeof row]).length)
    );
    return { wch: Math.min(maxLen + 2, maxWidth) };
  });
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, filename);
}

export function exportToCSV(influencers: Influencer[], filename: string) {
  const data = influencers.map((inf) => ({
    Name: inf.name,
    Username: inf.username,
    Platforms: inf.platforms.join(', '),
    Category: inf.category.name,
    Gender: inf.gender,
    'Phone Number': inf.phoneNumber || '',
    'Advertising Rate (SAR)': inf.advertisingRate,
    'Followers Count': inf.followersCount,
    Region: inf.region.name,
    Notes: inf.notes || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function parseImportFile(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const rows: ImportRow[] = json.map((row: any) => ({
          name: row['Name'] || row['name'],
          username: (row['Username'] || row['username']).replace('@', ''),
          platforms: (row['Platforms'] || row['platforms']).split(',').map((p: string) => p.trim()),
          category: row['Category'] || row['category'],
          gender: row['Gender'] || row['gender'],
          phoneNumber: row['Phone Number'] || row['phoneNumber'] || undefined,
          advertisingRate: Number(row['Advertising Rate (SAR)'] || row['advertisingRate']),
          followersCount: Number(row['Followers Count'] || row['followersCount']),
          region: row['Region'] || row['region'],
          notes: row['Notes'] || row['notes'] || undefined,
        }));

        resolve(rows);
      } catch (error) {
        reject(new Error('Failed to parse file. Please check the format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
}

export function downloadTemplate() {
  const template = [
    {
      Name: 'John Doe',
      Username: 'johndoe',
      Platforms: 'Instagram, TikTok',
      Category: 'Lifestyle',
      Gender: 'Male',
      'Phone Number': '+966501234567',
      'Advertising Rate (SAR)': 5000,
      'Followers Count': 100000,
      Region: 'Riyadh',
      Notes: 'Sample influencer',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

  XLSX.writeFile(workbook, 'influencer_import_template.xlsx');
}
