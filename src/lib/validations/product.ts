import { z } from 'zod';

// Image schema
const imageSchema = z.object({
  id: z.string().optional(),
  url: z.url('Invalid image URL'),
  publicId: z.string().min(1, 'Public ID is required'),
  altText: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  excerpt: z
    .string()
    .max(300, 'Excerpt must be less than 300 characters')
    .optional(),
  description: z.string().optional(),
  
  // New Content Fields
  tagline: z.string().max(100, 'Tagline must be less than 100 characters').optional(),
  whyLoveIt: z.string().optional(),
  whatsInside: z.string().optional(),
  howToUse: z.string().optional(),
  ingredients: z.string().optional(),
  
  // SEO Fields
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional(),
  metaKeywords: z.string().optional(),
  
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price is too high'),
  categoryId: z.string().min(1, 'Category is required'),
  mainImage: imageSchema.optional(),
  additionalImages: z.array(imageSchema).optional(),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  excerpt: z
    .string()
    .max(300, 'Excerpt must be less than 300 characters')
    .optional(),
  description: z.string().optional(),
  
  // New Content Fields
  tagline: z.string().max(100, 'Tagline must be less than 100 characters').optional(),
  whyLoveIt: z.string().optional(),
  whatsInside: z.string().optional(),
  howToUse: z.string().optional(),
  ingredients: z.string().optional(),
  
  // SEO Fields
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional(),
  metaKeywords: z.string().optional(),
  
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price is too high'),
  categoryId: z.string().min(1, 'Category is required'),
  mainImage: imageSchema.optional(),
  additionalImages: z.array(imageSchema).optional(),
});

export const deleteProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
});
