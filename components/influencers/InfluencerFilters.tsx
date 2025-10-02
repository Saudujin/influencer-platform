'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useInfluencerStore } from '@/stores/influencerStore';
import { useCategories, useRegions } from '@/lib/hooks/useMetadata';
import { PLATFORMS } from '@/lib/validations';
import type { InfluencerFilters as IFilters } from '@/types';

export function InfluencerFilters() {
  const { filters, setFilters, resetFilters } = useInfluencerStore();
  const { data: categories } = useCategories();
  const { data: regions } = useRegions();
  const [isOpen, setIsOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const emptyFilters: IFilters = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    };
    setLocalFilters(emptyFilters);
    resetFilters();
    setIsOpen(false);
  };

  const togglePlatform = (platform: string) => {
    const current = localFilters.platforms || [];
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    setLocalFilters({ ...localFilters, platforms: updated.length > 0 ? updated : undefined });
  };

  const activeFilterCount = [
    filters.search,
    filters.categoryIds?.length,
    filters.regionIds?.length,
    filters.gender,
    filters.minRate,
    filters.maxRate,
    filters.minFollowers,
    filters.maxFollowers,
    filters.platforms?.length,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center space-x-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or username..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value || undefined })}
          className="pl-10"
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => setFilters({ ...filters, search: undefined })}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs" variant="default">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Filter Influencers</SheetTitle>
            <SheetDescription>
              Apply multiple filters to narrow down your search
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Category Filter */}
            <div>
              <Label>Category</Label>
              <select
                value={localFilters.categoryIds?.[0] || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    categoryIds: e.target.value ? [Number(e.target.value)] : undefined,
                  })
                }
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <Label>Region</Label>
              <select
                value={localFilters.regionIds?.[0] || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    regionIds: e.target.value ? [Number(e.target.value)] : undefined,
                  })
                }
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">All Regions</option>
                {regions?.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <Label>Gender</Label>
              <select
                value={localFilters.gender || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    gender: (e.target.value as 'Male' | 'Female') || undefined,
                  })
                }
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Platforms Filter */}
            <div>
              <Label>Platforms</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {PLATFORMS.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`filter-${platform}`}
                      checked={localFilters.platforms?.includes(platform) || false}
                      onCheckedChange={() => togglePlatform(platform)}
                    />
                    <Label htmlFor={`filter-${platform}`} className="cursor-pointer font-normal">
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertising Rate Range */}
            <div>
              <Label>Advertising Rate (SAR)</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minRate || ''}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        minRate: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxRate || ''}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        maxRate: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Followers Range */}
            <div>
              <Label>Followers Count</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minFollowers || ''}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        minFollowers: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxFollowers || ''}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        maxFollowers: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleResetFilters} variant="outline" className="flex-1">
                Reset
              </Button>
              <Button onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
