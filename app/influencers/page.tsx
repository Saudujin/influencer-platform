'use client';

import { useState, useRef } from 'react';
import { Plus, Users, Edit, Upload, Download, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageLayout } from '@/components/layout/PageLayout';
import { InfluencerTable } from '@/components/influencers/InfluencerTable';
import { InfluencerForm } from '@/components/influencers/InfluencerForm';
import { InfluencerFilters } from '@/components/influencers/InfluencerFilters';
import { BulkEditDialog } from '@/components/influencers/BulkEditDialog';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { useInfluencers } from '@/lib/hooks/useInfluencers';
import { useInfluencerStore } from '@/stores/influencerStore';
import { useUIStore } from '@/stores/uiStore';
import { exportToExcel, exportToCSV, parseImportFile, downloadTemplate } from '@/lib/importExport';
import { toast } from 'sonner';

export default function InfluencersPage() {
  const { filters, selectedInfluencers } = useInfluencerStore();
  const { openInfluencerForm } = useUIStore();
  const { data, isLoading, error } = useInfluencers(filters);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportExcel = () => {
    if (!data?.data || data.data.length === 0) {
      toast.error('No influencers to export');
      return;
    }
    exportToExcel(data.data, 'influencers.xlsx');
    toast.success('Exported to Excel successfully');
  };

  const handleExportCSV = () => {
    if (!data?.data || data.data.length === 0) {
      toast.error('No influencers to export');
      return;
    }
    exportToCSV(data.data, 'influencers.csv');
    toast.success('Exported to CSV successfully');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const rows = await parseImportFile(file);
      
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencers: rows }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to import');
      }

      const result = await response.json();
      toast.success(`Successfully imported ${result.count} influencers`);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Influencers</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your influencer database
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedInfluencers.length > 0 && (
              <Button variant="outline" onClick={() => setIsBulkEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Bulk Edit ({selectedInfluencers.length})
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleExportExcel}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportCSV}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import from File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleImport}
              className="hidden"
            />

            <Button onClick={() => openInfluencerForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Influencer
            </Button>
          </div>
        </div>

        {/* Filters */}
        <InfluencerFilters />

        {/* Stats */}
        {data && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>
              Total: <strong className="text-foreground">{data.pagination.total}</strong>
            </span>
            {selectedInfluencers.length > 0 && (
              <span>
                Selected:{' '}
                <strong className="text-foreground">{selectedInfluencers.length}</strong>
              </span>
            )}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner className="py-12" />
        ) : error ? (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
            Failed to load influencers. Please try again.
          </div>
        ) : data && data.data.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No influencers yet"
            description="Get started by adding your first influencer to the database."
            action={{
              label: 'Add Influencer',
              onClick: () => openInfluencerForm(),
            }}
          />
        ) : (
          data && <InfluencerTable influencers={data.data} />
        )}

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              disabled={data.pagination.page === 1}
              onClick={() => {
                /* TODO: Implement pagination */
              }}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={data.pagination.page === data.pagination.totalPages}
              onClick={() => {
                /* TODO: Implement pagination */
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <InfluencerForm />

      {/* Bulk Edit Dialog */}
      <BulkEditDialog
        isOpen={isBulkEditOpen}
        onClose={() => setIsBulkEditOpen(false)}
      />
    </PageLayout>
  );
}
