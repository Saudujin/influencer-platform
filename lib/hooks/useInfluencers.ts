import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Influencer, InfluencerFilters, PaginatedResponse, InfluencerFormData } from '@/types';

// Fetch influencers with filters
export function useInfluencers(filters: InfluencerFilters) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        queryParams.set(key, value.join(','));
      } else {
        queryParams.set(key, String(value));
      }
    }
  });

  return useQuery<PaginatedResponse<Influencer>>({
    queryKey: ['influencers', filters],
    queryFn: async () => {
      const response = await fetch(`/api/influencers?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch influencers');
      return response.json();
    },
  });
}

// Fetch single influencer
export function useInfluencer(id: number | null) {
  return useQuery<Influencer>({
    queryKey: ['influencer', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      const response = await fetch(`/api/influencers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch influencer');
      return response.json();
    },
    enabled: !!id,
  });
}

// Create influencer
export function useCreateInfluencer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InfluencerFormData) => {
      const response = await fetch('/api/influencers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create influencer');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['influencers'] });
      toast.success('Influencer created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Update influencer
export function useUpdateInfluencer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InfluencerFormData> }) => {
      const response = await fetch(`/api/influencers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update influencer');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['influencers'] });
      queryClient.invalidateQueries({ queryKey: ['influencer', variables.id] });
      toast.success('Influencer updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Delete influencer
export function useDeleteInfluencer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/influencers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete influencer');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['influencers'] });
      toast.success('Influencer deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
