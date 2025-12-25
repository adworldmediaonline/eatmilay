import { z } from 'zod';

// Image schema for review images
const reviewImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  publicId: z.string().min(1, 'Public ID is required'),
  altText: z.string().optional(),
});

// Create review schema
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars'),
  title: z
    .string()
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(2000, 'Review must be less than 2000 characters')
    .trim(),
  images: z
    .array(reviewImageSchema)
    .max(5, 'Maximum 5 images allowed')
    .optional(),
});

// Update review status schema (admin only)
const reviewStatusValues = ['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED'] as const;
export const updateReviewStatusSchema = z.object({
  id: z.string().min(1, 'Review ID is required'),
  status: z.enum(reviewStatusValues),
  moderatedBy: z.string().optional(),
});

// Mark review as helpful/unhelpful
export const markHelpfulSchema = z.object({
  reviewId: z.string().min(1, 'Review ID is required'),
  helpful: z.boolean(),
});

// Delete review schema
export const deleteReviewSchema = z.object({
  id: z.string().min(1, 'Review ID is required'),
});

// Get reviews with filters
export const getReviewsSchema = z.object({
  productId: z.string().optional(),
  userId: z.string().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['recent', 'highest', 'lowest', 'helpful']).default('recent'),
});

// Type exports for use in components
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewStatusInput = z.infer<typeof updateReviewStatusSchema>;
export type MarkHelpfulInput = z.infer<typeof markHelpfulSchema>;
export type GetReviewsInput = z.infer<typeof getReviewsSchema>;

