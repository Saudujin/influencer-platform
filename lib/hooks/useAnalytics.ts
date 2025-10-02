import { useQuery } from '@tanstack/react-query';

export interface AnalyticsData {
  totalInfluencers: number;
  totalCampaigns: number;
  totalFollowers: number;
  averageRate: number;
  byCategory: Array<{ name: string; count: number }>;
  byRegion: Array<{ name: string; count: number }>;
  byGender: Array<{ gender: string; count: number }>;
  byPlatform: Array<{ platform: string; count: number }>;
  rateDistribution: Array<{ range: string; count: number }>;
  followersDistribution: Array<{ range: string; count: number }>;
}

export function useAnalytics() {
  return useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch('/api/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
  });
}
