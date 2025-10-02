'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateCampaign, useUpdateCampaign, useCampaign } from '@/lib/hooks/useCampaigns';
import { useCampaignStore } from '@/stores/campaignStore';
import { useInfluencerStore } from '@/stores/influencerStore';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  selectedFields: z.array(z.string()).min(1, 'Select at least one field to display'),
});

type FormData = z.infer<typeof formSchema>;

const AVAILABLE_FIELDS = [
  { value: 'name', label: 'Name' },
  { value: 'username', label: 'Username' },
  { value: 'platforms', label: 'Platforms' },
  { value: 'category', label: 'Category' },
  { value: 'gender', label: 'Gender' },
  { value: 'phoneNumber', label: 'Phone Number' },
  { value: 'advertisingRate', label: 'Advertising Rate' },
  { value: 'followersCount', label: 'Followers Count' },
  { value: 'region', label: 'Region' },
  { value: 'notes', label: 'Notes' },
];

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: number | null;
}

export function CampaignForm({ isOpen, onClose, editingId }: CampaignFormProps) {
  const { selectedInfluencers } = useInfluencerStore();
  const { data: campaign, isLoading: loadingCampaign } = useCampaign(editingId || null);
  
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedFields: ['name', 'username', 'platforms', 'followersCount', 'advertisingRate'],
    },
  });

  const selectedFields = watch('selectedFields') || [];

  // Load campaign data when editing
  useEffect(() => {
    if (campaign && editingId) {
      reset({
        title: campaign.title,
        description: campaign.description || '',
        selectedFields: campaign.selectedFields,
      });
    } else if (!editingId) {
      reset({
        title: '',
        description: '',
        selectedFields: ['name', 'username', 'platforms', 'followersCount', 'advertisingRate'],
      });
    }
  }, [campaign, editingId, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      description: data.description || undefined,
      influencerIds: editingId ? undefined : selectedInfluencers,
    };

    if (editingId) {
      await updateCampaign.mutateAsync({ id: editingId, data: payload as any });
    } else {
      await createCampaign.mutateAsync(payload as any);
    }

    onClose();
  };

  const toggleField = (field: string) => {
    const current = selectedFields;
    const updated = current.includes(field)
      ? current.filter((f) => f !== field)
      : [...current, field];
    setValue('selectedFields', updated);
  };

  if (loadingCampaign && editingId) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <LoadingSpinner />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingId ? 'Edit Campaign' : 'Create New Campaign'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campaign Title */}
          <div>
            <Label htmlFor="title">Campaign Title *</Label>
            <Input id="title" {...register('title')} placeholder="e.g., Q4 Fashion Campaign" />
            {errors.title && (
              <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Campaign Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              placeholder="Optional campaign description..."
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            />
          </div>

          {/* Selected Influencers Count */}
          {!editingId && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium">
                Selected Influencers: <strong>{selectedInfluencers.length}</strong>
              </p>
              {selectedInfluencers.length === 0 && (
                <p className="mt-1 text-sm text-destructive">
                  Please select at least one influencer from the Influencers page
                </p>
              )}
            </div>
          )}

          {/* Fields to Display */}
          <div>
            <Label>Fields to Display in PDF *</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Select which information to include in the exported PDF
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {AVAILABLE_FIELDS.map((field) => (
                <div key={field.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.value}
                    checked={selectedFields.includes(field.value)}
                    onCheckedChange={() => toggleField(field.value)}
                  />
                  <Label htmlFor={field.value} className="cursor-pointer font-normal">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.selectedFields && (
              <p className="mt-1 text-sm text-destructive">{errors.selectedFields.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || (!editingId && selectedInfluencers.length === 0)}
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
