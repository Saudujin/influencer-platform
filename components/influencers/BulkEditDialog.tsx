'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCategories, useRegions } from '@/lib/hooks/useMetadata';
import { useInfluencerStore } from '@/stores/influencerStore';
import { toast } from 'sonner';

interface BulkEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkEditDialog({ isOpen, onClose }: BulkEditDialogProps) {
  const { selectedInfluencers, clearSelection } = useInfluencerStore();
  const { data: categories } = useCategories();
  const { data: regions } = useRegions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [regionId, setRegionId] = useState<number | undefined>();
  const [gender, setGender] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId && !regionId && !gender) {
      toast.error('Please select at least one field to update');
      return;
    }

    setIsSubmitting(true);

    try {
      const updates: any = {};
      if (categoryId) updates.categoryId = categoryId;
      if (regionId) updates.regionId = regionId;
      if (gender) updates.gender = gender;

      const response = await fetch('/api/influencers/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedInfluencers,
          updates,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update influencers');
      }

      toast.success(`Successfully updated ${selectedInfluencers.length} influencers`);
      clearSelection();
      onClose();
      
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Edit Influencers</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update {selectedInfluencers.length} selected influencer{selectedInfluencers.length !== 1 ? 's' : ''}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <Label htmlFor="bulk-category">Change Category</Label>
            <select
              id="bulk-category"
              value={categoryId || ''}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Don't change</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <Label htmlFor="bulk-region">Change Region</Label>
            <select
              id="bulk-region"
              value={regionId || ''}
              onChange={(e) => setRegionId(e.target.value ? Number(e.target.value) : undefined)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Don't change</option>
              {regions?.map((reg) => (
                <option key={reg.id} value={reg.id}>
                  {reg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="bulk-gender">Change Gender</Label>
            <select
              id="bulk-gender"
              value={gender || ''}
              onChange={(e) => setGender(e.target.value || undefined)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Don't change</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update All'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
