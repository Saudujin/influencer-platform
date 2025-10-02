import { z } from 'zod';

// Influencer validation schema
export const influencerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  username: z.string().min(1, 'Username is required').max(100),
  platforms: z.array(z.string()).min(1, 'At least one platform is required'),
  categoryId: z.number().int().positive('Category is required'),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is required',
  }),
  phoneNumber: z.string().optional().nullable(),
  advertisingRate: z.number().positive('Advertising rate must be positive'),
  followersCount: z.number().int().min(0, 'Followers count must be non-negative'),
  regionId: z.number().int().positive('Region is required'),
  notes: z.string().optional().nullable(),
});

export const influencerUpdateSchema = influencerSchema.partial();

export type InfluencerInput = z.infer<typeof influencerSchema>;
export type InfluencerUpdateInput = z.infer<typeof influencerUpdateSchema>;

// Category validation schema
export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50),
});

export type CategoryInput = z.infer<typeof categorySchema>;

// Region validation schema
export const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required').max(50),
});

export type RegionInput = z.infer<typeof regionSchema>;

// Campaign validation schema
export const campaignSchema = z.object({
  title: z.string().min(1, 'Campaign title is required').max(200),
  description: z.string().optional().nullable(),
  selectedFields: z.array(z.string()).min(1, 'At least one field must be selected'),
  influencerIds: z.array(z.number().int().positive()).min(1, 'At least one influencer must be selected'),
});

export type CampaignInput = z.infer<typeof campaignSchema>;

// Filter validation schema
export const filterSchema = z.object({
  search: z.string().optional(),
  categoryIds: z.array(z.number().int().positive()).optional(),
  regionIds: z.array(z.number().int().positive()).optional(),
  gender: z.enum(['Male', 'Female']).optional(),
  platforms: z.array(z.string()).optional(),
  minRate: z.number().min(0).optional(),
  maxRate: z.number().min(0).optional(),
  minFollowers: z.number().int().min(0).optional(),
  maxFollowers: z.number().int().min(0).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.enum(['name', 'followersCount', 'advertisingRate', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type FilterInput = z.infer<typeof filterSchema>;

// Bulk update validation schema
export const bulkUpdateSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1, 'At least one influencer must be selected'),
  updates: z.object({
    categoryId: z.number().int().positive().optional(),
    regionId: z.number().int().positive().optional(),
    gender: z.enum(['Male', 'Female']).optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be updated',
  }),
});

export type BulkUpdateInput = z.infer<typeof bulkUpdateSchema>;

// Available platforms
export const PLATFORMS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Snapchat',
  'X (Twitter)',
  'Facebook',
  'Twitch',
  'LinkedIn',
] as const;

// Available PDF fields
export const PDF_FIELDS = [
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
] as const;
