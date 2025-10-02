'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCategories, useRegions, useCreateCategory, useCreateRegion } from '@/lib/hooks/useMetadata';
import { useCreateInfluencer, useUpdateInfluencer, useInfluencer } from '@/lib/hooks/useInfluencers';
import { useUIStore } from '@/stores/uiStore';
import { PLATFORMS } from '@/lib/validations';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  categoryId: z.string().min(1, 'Category is required'),
  gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
  phoneNumber: z.string().optional(),
  advertisingRate: z.string().min(1, 'Advertising rate is required'),
  followersCount: z.string().min(1, 'Followers count is required'),
  regionId: z.string().min(1, 'Region is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function InfluencerForm() {
  const { isInfluencerFormOpen, editingInfluencerId, closeInfluencerForm } = useUIStore();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: regions, isLoading: loadingRegions } = useRegions();
  const { data: influencer, isLoading: loadingInfluencer } = useInfluencer(editingInfluencerId);
  
  const createInfluencer = useCreateInfluencer();
  const updateInfluencer = useUpdateInfluencer();
  const createCategory = useCreateCategory();
  const createRegion = useCreateRegion();

  const [newCategory, setNewCategory] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showRegionInput, setShowRegionInput] = useState(false);

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
      platforms: [],
    },
  });

  const selectedPlatforms = watch('platforms') || [];

  // Load influencer data when editing
  useEffect(() => {
    if (influencer && editingInfluencerId) {
      reset({
        name: influencer.name,
        username: influencer.username,
        platforms: influencer.platforms,
        categoryId: String(influencer.categoryId),
        gender: influencer.gender,
        phoneNumber: influencer.phoneNumber || '',
        advertisingRate: String(influencer.advertisingRate),
        followersCount: String(influencer.followersCount),
        regionId: String(influencer.regionId),
        notes: influencer.notes || '',
      });
    } else if (!editingInfluencerId) {
      reset({
        name: '',
        username: '',
        platforms: [],
        categoryId: '',
        gender: undefined,
        phoneNumber: '',
        advertisingRate: '',
        followersCount: '',
        regionId: '',
        notes: '',
      });
    }
  }, [influencer, editingInfluencerId, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      categoryId: Number(data.categoryId),
      regionId: Number(data.regionId),
      advertisingRate: Number(data.advertisingRate),
      followersCount: Number(data.followersCount),
      phoneNumber: data.phoneNumber || null,
      notes: data.notes || null,
    };

    if (editingInfluencerId) {
      await updateInfluencer.mutateAsync({ id: editingInfluencerId, data: payload });
    } else {
      await createInfluencer.mutateAsync(payload);
    }

    closeInfluencerForm();
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await createCategory.mutateAsync(newCategory.trim());
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const handleAddRegion = async () => {
    if (newRegion.trim()) {
      await createRegion.mutateAsync(newRegion.trim());
      setNewRegion('');
      setShowRegionInput(false);
    }
  };

  const togglePlatform = (platform: string) => {
    const current = selectedPlatforms;
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    setValue('platforms', updated);
  };

  if (loadingInfluencer && editingInfluencerId) {
    return (
      <Dialog open={isInfluencerFormOpen} onOpenChange={closeInfluencerForm}>
        <DialogContent>
          <LoadingSpinner />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isInfluencerFormOpen} onOpenChange={closeInfluencerForm}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingInfluencerId ? 'Edit Influencer' : 'Add New Influencer'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username">Username/Handle *</Label>
            <Input id="username" {...register('username')} />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>

          {/* Platforms */}
          <div>
            <Label>Platforms *</Label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {PLATFORMS.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label htmlFor={platform} className="cursor-pointer font-normal">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
            {errors.platforms && (
              <p className="mt-1 text-sm text-destructive">{errors.platforms.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="categoryId">Category *</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCategoryInput(!showCategoryInput)}
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </div>
            
            {showCategoryInput && (
              <div className="mt-2 flex space-x-2">
                <Input
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button type="button" onClick={handleAddCategory}>
                  Add
                </Button>
              </div>
            )}

            <select
              id="categoryId"
              {...register('categoryId')}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-destructive">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select
              id="gender"
              {...register('gender')}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-destructive">{errors.gender.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" {...register('phoneNumber')} />
          </div>

          {/* Advertising Rate */}
          <div>
            <Label htmlFor="advertisingRate">Advertising Rate (SAR) *</Label>
            <Input
              id="advertisingRate"
              type="number"
              step="0.01"
              {...register('advertisingRate')}
            />
            {errors.advertisingRate && (
              <p className="mt-1 text-sm text-destructive">
                {errors.advertisingRate.message}
              </p>
            )}
          </div>

          {/* Followers Count */}
          <div>
            <Label htmlFor="followersCount">Followers Count *</Label>
            <Input id="followersCount" type="number" {...register('followersCount')} />
            {errors.followersCount && (
              <p className="mt-1 text-sm text-destructive">
                {errors.followersCount.message}
              </p>
            )}
          </div>

          {/* Region */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="regionId">Region *</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowRegionInput(!showRegionInput)}
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </div>
            
            {showRegionInput && (
              <div className="mt-2 flex space-x-2">
                <Input
                  placeholder="New region name"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                />
                <Button type="button" onClick={handleAddRegion}>
                  Add
                </Button>
              </div>
            )}

            <select
              id="regionId"
              {...register('regionId')}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select region</option>
              {regions?.map((reg) => (
                <option key={reg.id} value={reg.id}>
                  {reg.name}
                </option>
              ))}
            </select>
            {errors.regionId && (
              <p className="mt-1 text-sm text-destructive">{errors.regionId.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={closeInfluencerForm}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingInfluencerId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
