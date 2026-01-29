import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  serializeProduct,
  serializeProducts,
  SerializedProductWithCategory,
} from '@/lib/serializers';

export interface ProductFilters {
  search?: string;
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  availability?: 'all' | 'in-stock' | 'out-of-stock';
  sortBy?: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
  page?: number;
  limit?: number;
}

export async function getProducts(): Promise<SerializedProductWithCategory[]> {
  'use cache';
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return serializeProducts(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(
  id: string
): Promise<SerializedProductWithCategory | null> {
  'use cache';
  try {
    // First, try to fetch with variants (if migration has been run)
    let product;
    try {
      product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          variants: {
            include: {
              bundles: {
                orderBy: { quantity: 'asc' },
              },
            },
            orderBy: { price: 'asc' },
          },
        },
      });
    } catch (relationError: any) {
      // If any error occurs (likely migration not run), fall back to basic query
      // This handles: missing tables, missing columns, missing relations, etc.
      console.log('Fallback to basic query (variants may not be available):', relationError?.message?.substring(0, 100));

      product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
    }

    if (!product) {
      return null;
    }

    return serializeProduct(product);
  } catch (error: any) {
    console.error('Failed to fetch product:', {
      error: error?.message,
      code: error?.code,
      name: error?.name,
    });
    throw new Error(`Failed to fetch product: ${error?.message || 'Unknown error'}`);
  }
}

export async function getProductBySlug(
  slug: string
): Promise<SerializedProductWithCategory | null> {
  'use cache';
  try {
    // First, try to fetch with variants (if migration has been run)
    let product;
    try {
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          variants: {
            where: { active: true },
            include: {
              bundles: {
                where: { active: true },
                orderBy: { quantity: 'asc' },
              },
            },
            orderBy: { price: 'asc' },
          },
        },
      });
    } catch (relationError: any) {
      // If any error occurs (likely migration not run), fall back to basic query
      // This handles: missing tables, missing columns, missing relations, etc.
      console.log('Fallback to basic query (variants may not be available):', relationError?.message?.substring(0, 100));

      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
        },
      });
    }

    if (!product) {
      return null;
    }

    return serializeProduct(product);
  } catch (error: any) {
    console.error('Failed to fetch product by slug:', {
      error: error?.message,
      code: error?.code,
      name: error?.name,
    });
    throw new Error(`Failed to fetch product by slug: ${error?.message || 'Unknown error'}`);
  }
}

export async function getProductsByCategory(
  categoryId: string
): Promise<SerializedProductWithCategory[]> {
  'use cache';
  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return serializeProducts(products);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
}

export async function checkProductNameExists(name: string, excludeId?: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!product;
  } catch (error) {
    console.error('Failed to check product name:', error);
    throw new Error('Failed to check product name');
  }
}

export async function checkProductSlugExists(slug: string, excludeId?: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!product;
  } catch (error) {
    console.error('Failed to check product slug:', error);
    throw new Error('Failed to check product slug');
  }
}

export async function getFilteredProducts(filters: ProductFilters) {
  'use cache';
  const { search, categoryIds, minPrice, maxPrice, sortBy = 'featured', page = 1, limit = 12 } = filters;

  const where: Prisma.ProductWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { metaKeywords: { contains: search, mode: 'insensitive' } },
      ],
    }),
    ...(categoryIds?.length && { categoryId: { in: categoryIds } }),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }
      : {}),
  };

  // Determine orderBy based on sortBy
  let orderBy: Prisma.ProductOrderByWithRelationInput;
  switch (sortBy) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    case 'rating':
      // For rating, we'll sort by createdAt as fallback since rating requires aggregation
      // This can be enhanced later with proper rating aggregation
      orderBy = { createdAt: 'desc' };
      break;
    case 'featured':
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  const countPromise = prisma.product.count({ where });

  let products;
  try {
    products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          where: { active: true },
          include: {
            bundles: {
              where: { active: true },
              orderBy: { quantity: 'asc' },
            },
          },
          orderBy: { price: 'asc' },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });
  } catch (relationError: unknown) {
    const msg = relationError instanceof Error ? relationError.message : String(relationError);
    console.log('getFilteredProducts: fallback without variants:', msg.substring(0, 100));
    products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  const totalCount = await countPromise;

  return {
    products: serializeProducts(products),
    totalCount,
    hasMore: page * limit < totalCount,
  };
}

// Re-export types from serializers for convenience
export type { SerializedProductWithCategory } from '@/lib/serializers';
