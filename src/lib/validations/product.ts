import { z } from 'zod';

// Helper function to check if HTML content is empty
function isHtmlContentEmpty(html: string): boolean {
  if (!html) return true;
  // Remove HTML tags and check if there's actual content
  const textContent = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  return textContent.length === 0;
}

// Image schema
const imageSchema = z.object({
  id: z.string().optional(),
  url: z.url('Invalid image URL'),
  publicId: z.string().min(1, 'Public ID is required'),
  altText: z.string().optional(),
});

// Bundle Badge enum
export enum BundleBadge {
  NONE = 'NONE',
  BEST_SELLER = 'BEST_SELLER',
  SUPER_SAVER = 'SUPER_SAVER',
}

// Product Variant schema
const productVariantSchema = z.object({
  id: z.string().optional(), // For updates
  name: z.string().min(1, 'Variant name is required').max(100, 'Variant name is too long'),
  price: z.number().min(0.01, 'Price must be greater than 0').max(999999.99, 'Price is too high'),
  sku: z.string().max(100).optional().nullable(),
  active: z.boolean().optional().default(true),
});

// Product Bundle schema
const productBundleSchema = z.object({
  id: z.string().optional(), // For updates
  variantId: z.string().optional(), // Will be set when creating
  label: z.string().min(1, 'Bundle label is required').max(100, 'Bundle label is too long'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  sellingPrice: z.number().min(0.01, 'Selling price must be greater than 0').max(999999.99, 'Price is too high'),
  badge: z.nativeEnum(BundleBadge).optional().default(BundleBadge.NONE),
  isDefault: z.boolean().optional().default(false),
  isSecondaryDefault: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
}).refine(
  (data) => {
    // Selling price must be less than original price (will be validated in action)
    return true;
  },
  { message: 'Selling price must be less than original price' }
);

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  sku: z
    .string()
    .max(100, 'SKU must be less than 100 characters')
    .optional()
    .nullable(),
  excerpt: z
    .string()
    .max(300, 'Excerpt must be less than 300 characters')
    .optional(),
  description: z
    .string()
    .min(1, 'Product description is required')
    .refine(
      (val) => !isHtmlContentEmpty(val),
      { message: 'Product description is required' }
    ),

  // New Content Fields
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

  // Bundle & Save Feature
  enableBundlePricing: z.boolean().default(false),
  variants: z.array(productVariantSchema.extend({
    bundles: z.array(productBundleSchema).optional().default([]),
  })).default([]),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  sku: z
    .string()
    .max(100, 'SKU must be less than 100 characters')
    .optional()
    .nullable(),
  excerpt: z
    .string()
    .max(300, 'Excerpt must be less than 300 characters')
    .optional(),
  description: z
    .string()
    .min(1, 'Product description is required')
    .refine(
      (val) => !isHtmlContentEmpty(val),
      { message: 'Product description is required' }
    ),

  // New Content Fields
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

  // Bundle & Save Feature
  enableBundlePricing: z.boolean().default(false),
  variants: z.array(productVariantSchema.extend({
    bundles: z.array(productBundleSchema).optional().default([]),
  })).default([]),
});

// Helper type for bundle data with calculated fields
export type BundleInput = z.infer<typeof productBundleSchema> & {
  originalPrice?: number;
  savingsAmount?: number;
};

export const deleteProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
});
