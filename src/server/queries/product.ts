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
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return null;
    }

    return serializeProduct(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getProductBySlug(
  slug: string
): Promise<SerializedProductWithCategory | null> {
  'use cache';
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return product ? serializeProduct(product) : null;
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    throw new Error('Failed to fetch product by slug');
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
  const { search, categoryIds, minPrice, maxPrice, page = 1, limit = 12 } = filters;

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

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: serializeProducts(products),
    totalCount,
    hasMore: page * limit < totalCount,
  };
}

// Re-export types from serializers for convenience
export type { SerializedProductWithCategory } from '@/lib/serializers';
