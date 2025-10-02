'use client';

import { useState } from 'react';
import { Plus, FolderOpen, FileDown, Edit, Trash2, Copy, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/layout/PageLayout';
import { CampaignForm } from '@/components/campaigns/CampaignForm';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCampaigns, useDeleteCampaign, useDuplicateCampaign } from '@/lib/hooks/useCampaigns';

export default function CampaignsPage() {
  const { data: campaigns, isLoading, error } = useCampaigns();
  const deleteCampaign = useDeleteCampaign();
  const duplicateCampaign = useDuplicateCampaign();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setDeletingId(id);
      await deleteCampaign.mutateAsync(id);
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: number) => {
    await duplicateCampaign.mutateAsync(id);
  };

  const handleExportPDF = async (id: number) => {
    try {
      const response = await fetch(`/api/campaigns/${id}/export?format=pdf`);
      if (!response.ok) throw new Error('Failed to fetch campaign data');
      
      const data = await response.json();
      
      // Dynamic import to avoid SSR issues
      const { generateCampaignPDF, downloadPDF } = await import('@/lib/pdfGenerator');
      const pdfBlob = await generateCampaignPDF(data);
      downloadPDF(pdfBlob, `${data.campaign.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="mt-1 text-muted-foreground">
              Build and manage your influencer campaigns
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner className="py-12" />
        ) : error ? (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
            Failed to load campaigns. Please try again.
          </div>
        ) : campaigns && campaigns.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No campaigns yet"
            description="Create your first campaign by selecting influencers and customizing the export fields."
            action={{
              label: 'Create Campaign',
              onClick: () => setIsFormOpen(true),
            }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns?.map((campaign) => (
              <Card key={campaign.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1">{campaign.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {campaign.description || 'No description'}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === campaign.id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(campaign.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(campaign.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(campaign.id)}>
                          <FileDown className="mr-2 h-4 w-4" />
                          Export PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(campaign.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Influencers</span>
                      <Badge variant="secondary">{campaign.influencers?.length || campaign.influencerCount || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fields</span>
                      <Badge variant="secondary">{campaign.selectedFields.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-xs">{formatDate(campaign.createdAt)}</span>
                    </div>
                    <Button
                      onClick={() => handleExportPDF(campaign.id)}
                      className="mt-4 w-full"
                      variant="outline"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Campaign Form Dialog */}
      <CampaignForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingId={editingId}
      />
    </PageLayout>
  );
}
