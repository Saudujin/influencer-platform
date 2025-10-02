// Database model types
export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  _count?: {
    influencers: number;
  };
}

export interface Region {
  id: number;
  name: string;
  createdAt: Date;
  _count?: {
    influencers: number;
  };
}

export interface Influencer {
  id: number;
  name: string;
  username: string;
  platforms: string[];
  categoryId: number;
  category: Category;
  gender: 'Male' | 'Female';
  phoneNumber: string | null;
  advertisingRate: number;
  followersCount: number;
  regionId: number;
  region: Region;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  selectedFields: string[];
  influencers?: Influencer[];
  influencerCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Filter types
export interface InfluencerFilters {
  search?: string;
  categoryIds?: number[];
  regionIds?: number[];
  gender?: 'Male' | 'Female';
  platforms?: string[];
  minRate?: number;
  maxRate?: number;
  minFollowers?: number;
  maxFollowers?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'followersCount' | 'advertisingRate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AnalyticsData {
  summary: {
    totalInfluencers: number;
    averageAdvertisingRate: number;
    totalFollowers: number;
    totalCampaigns: number;
  };
  categoryDistribution: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  genderDistribution: Array<{
    gender: string;
    count: number;
  }>;
  regionDistribution: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  platformDistribution: Array<{
    name: string;
    count: number;
  }>;
  priceDistribution: Array<{
    label: string;
    count: number;
  }>;
}

// Form types
export interface InfluencerFormData {
  name: string;
  username: string;
  platforms: string[];
  categoryId: number;
  gender: 'Male' | 'Female';
  phoneNumber?: string;
  advertisingRate: number;
  followersCount: number;
  regionId: number;
  notes?: string;
}

export interface CampaignFormData {
  title: string;
  description?: string;
  selectedFields: string[];
  influencerIds: number[];
}

export interface BulkUpdateData {
  ids: number[];
  updates: {
    categoryId?: number;
    regionId?: number;
    gender?: 'Male' | 'Female';
  };
}

// Import/Export types
export interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    data: any;
    error: string;
  }>;
}
