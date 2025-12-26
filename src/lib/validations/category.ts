import { z } from 'zod';

// Image schema
const imageSchema = z.object({
  id: z.string().optional(),
  url: z.url('Invalid image URL'),
  publicId: z.string().min(1, 'Public ID is required'),
  altText: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim(),
  image: imageSchema.optional(),
});

export const updateCategorySchema = z.object({
  id: z.string().min(1, 'Category ID is required'),
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim(),
  image: imageSchema.optional(),
});

export const deleteCategorySchema = z.object({
  id: z.string().min(1, 'Category ID is required'),
});
