'use client';

import { useState } from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useInfluencerStore } from '@/stores/influencerStore';
import { useUIStore } from '@/stores/uiStore';
import { useDeleteInfluencer } from '@/lib/hooks/useInfluencers';
import type { Influencer } from '@/types';

interface InfluencerTableProps {
  influencers: Influencer[];
}

export function InfluencerTable({ influencers }: InfluencerTableProps) {
  const { selectedInfluencers, toggleInfluencer, selectAll, clearSelection } =
    useInfluencerStore();
  const { openInfluencerForm } = useUIStore();
  const deleteInfluencer = useDeleteInfluencer();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const allSelected =
    influencers.length > 0 &&
    influencers.every((inf) => selectedInfluencers.includes(inf.id));

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAll(influencers.map((inf) => inf.id));
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this influencer?')) {
      setDeletingId(id);
      await deleteInfluencer.mutateAsync(id);
      setDeletingId(null);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Rate (SAR)</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {influencers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-muted-foreground">
                No influencers found
              </TableCell>
            </TableRow>
          ) : (
            influencers.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInfluencers.includes(influencer.id)}
                    onCheckedChange={() => toggleInfluencer(influencer.id)}
                    aria-label={`Select ${influencer.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{influencer.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  @{influencer.username}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {influencer.platforms.slice(0, 2).map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                    {influencer.platforms.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{influencer.platforms.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{influencer.category.name}</TableCell>
                <TableCell>
                  <Badge variant={influencer.gender === 'Male' ? 'default' : 'outline'}>
                    {influencer.gender}
                  </Badge>
                </TableCell>
                <TableCell>{formatNumber(influencer.followersCount)}</TableCell>
                <TableCell>{formatNumber(influencer.advertisingRate)}</TableCell>
                <TableCell>{influencer.region.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === influencer.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => openInfluencerForm(influencer.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(influencer.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
