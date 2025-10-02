import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Campaign, Influencer } from '@/types';

interface PDFOptions {
  campaign: Campaign;
  influencers: Influencer[];
}

const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  username: 'Username',
  platforms: 'Platforms',
  category: 'Category',
  gender: 'Gender',
  phoneNumber: 'Phone',
  advertisingRate: 'Rate (SAR)',
  followersCount: 'Followers',
  region: 'Region',
  notes: 'Notes',
};

export async function generateCampaignPDF({ campaign, influencers }: PDFOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set IBM Plex Sans font (fallback to Helvetica if not available)
  doc.setFont('helvetica');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Title Page
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(campaign.title, pageWidth / 2, 60, { align: 'center' });

  if (campaign.description) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(campaign.description, pageWidth - 2 * margin);
    doc.text(descLines, pageWidth / 2, 80, { align: 'center' });
  }

  // Campaign Info
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const date = new Date(campaign.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Created: ${date}`, pageWidth / 2, 100, { align: 'center' });
  doc.text(`Total Influencers: ${influencers.length}`, pageWidth / 2, 107, { align: 'center' });

  // Logo Placeholder
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(pageWidth / 2 - 20, 120, 40, 40);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Logo Placeholder', pageWidth / 2, 143, { align: 'center' });

  // Add new page for table
  doc.addPage();

  // Prepare table data
  const headers = campaign.selectedFields.map((field) => FIELD_LABELS[field] || field);
  
  const rows = influencers.map((influencer) => {
    return campaign.selectedFields.map((field) => {
      switch (field) {
        case 'name':
          return influencer.name;
        case 'username':
          return `@${influencer.username}`;
        case 'platforms':
          return influencer.platforms.join(', ');
        case 'category':
          return influencer.category.name;
        case 'gender':
          return influencer.gender;
        case 'phoneNumber':
          return influencer.phoneNumber || 'N/A';
        case 'advertisingRate':
          return new Intl.NumberFormat('en-US').format(influencer.advertisingRate);
        case 'followersCount':
          return new Intl.NumberFormat('en-US').format(influencer.followersCount);
        case 'region':
          return influencer.region.name;
        case 'notes':
          return influencer.notes || 'N/A';
        default:
          return '';
      }
    });
  });

  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 20,
    margin: { left: margin, right: margin },
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
    },
    didDrawPage: (data) => {
      // Header
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.text(campaign.title, margin, 10);

      // Footer
      const pageNumber = doc.getCurrentPageInfo().pageNumber;
      doc.text(
        `Page ${pageNumber}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: 'right' }
      );
    },
  });

  // Summary Page
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Campaign Summary', margin, 30);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const totalRate = influencers.reduce((sum, inf) => sum + inf.advertisingRate, 0);
  const avgRate = totalRate / influencers.length;
  const totalFollowers = influencers.reduce((sum, inf) => sum + inf.followersCount, 0);

  const summaryData = [
    ['Total Influencers', influencers.length.toString()],
    ['Total Advertising Budget', `${new Intl.NumberFormat('en-US').format(totalRate)} SAR`],
    ['Average Rate per Influencer', `${new Intl.NumberFormat('en-US').format(Math.round(avgRate))} SAR`],
    ['Total Reach (Followers)', new Intl.NumberFormat('en-US').format(totalFollowers)],
  ];

  autoTable(doc, {
    body: summaryData,
    startY: 40,
    margin: { left: margin, right: margin },
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 11,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 80 },
      1: { cellWidth: 'auto' },
    },
  });

  // Convert to Blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
