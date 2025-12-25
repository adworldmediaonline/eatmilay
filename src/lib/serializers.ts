import { Prisma } from '@prisma/client';

// Base types for better type safety
export interface ImageData {
  url: string;
  publicId: string;
  altText?: string;
}

// Product serialization utilities
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: { products: true };
}>;

// Serialized types with proper JSON-safe fields
export type SerializedProduct = Omit<
  Prisma.ProductGetPayload<Record<string, never>>,
  | 'price'
  | 'mainImageUrl'
  | 'mainImagePublicId'
  | 'mainImageAlt'
  | 'additionalImages'
> & {
  price: number;
  mainImage?: ImageData;
  additionalImages?: ImageData[];
};

export type SerializedProductWithCategory = Omit<
  ProductWithCategory,
  | 'price'
  | 'mainImageUrl'
  | 'mainImagePublicId'
  | 'mainImageAlt'
  | 'additionalImages'
> & {
  price: number;
  mainImage?: ImageData;
  additionalImages?: ImageData[];
};

export type SerializedCategoryWithProducts = Omit<
  CategoryWithProducts,
  'products'
> & {
  products: SerializedProduct[];
};

// Helper function to parse additional images safely
function parseAdditionalImages(
  additionalImages: unknown
): ImageData[] | undefined {
  if (!additionalImages) return undefined;

  try {
    if (typeof additionalImages === 'string') {
      const parsed = JSON.parse(additionalImages);
      return Array.isArray(parsed) ? parsed : undefined;
    }

    return Array.isArray(additionalImages) ? additionalImages : undefined;
  } catch {
    return undefined;
  }
}

// Core serialization function with proper type safety
export function serializeProduct<
  T extends {
    price: Prisma.Decimal;
    mainImageUrl?: string | null;
    mainImagePublicId?: string | null;
    mainImageAlt?: string | null;
    additionalImages?: unknown;
  },
>(
  product: T
): Omit<
  T,
  | 'price'
  | 'mainImageUrl'
  | 'mainImagePublicId'
  | 'mainImageAlt'
  | 'additionalImages'
> & {
  price: number;
  mainImage?: ImageData;
  additionalImages?: ImageData[];
} {
  // Process main image
  const mainImage: ImageData | undefined =
    product.mainImageUrl && product.mainImagePublicId
      ? {
          url: product.mainImageUrl,
          publicId: product.mainImagePublicId,
          altText: product.mainImageAlt || undefined,
        }
      : undefined;

  // Process additional images
  const additionalImages = parseAdditionalImages(product.additionalImages);

  // Return serialized product with proper typing
  const {
    price,
    mainImageUrl: _url, // eslint-disable-line @typescript-eslint/no-unused-vars
    mainImagePublicId: _publicId, // eslint-disable-line @typescript-eslint/no-unused-vars
    mainImageAlt: _alt, // eslint-disable-line @typescript-eslint/no-unused-vars
    additionalImages: _images, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = product;

  return {
    ...rest,
    price: price.toNumber(),
    mainImage,
    additionalImages,
  } as Omit<
    T,
    | 'price'
    | 'mainImageUrl'
    | 'mainImagePublicId'
    | 'mainImageAlt'
    | 'additionalImages'
  > & {
    price: number;
    mainImage?: ImageData;
    additionalImages?: ImageData[];
  };
}

// Serialize multiple products
export function serializeProducts<
  T extends {
    price: Prisma.Decimal;
    mainImageUrl?: string | null;
    mainImagePublicId?: string | null;
    mainImageAlt?: string | null;
    additionalImages?: unknown;
  },
>(
  products: T[]
): Array<
  Omit<
    T,
    | 'price'
    | 'mainImageUrl'
    | 'mainImagePublicId'
    | 'mainImageAlt'
    | 'additionalImages'
  > & {
    price: number;
    mainImage?: ImageData;
    additionalImages?: ImageData[];
  }
> {
  return products.map(serializeProduct);
}

// Serialize category with products
export function serializeCategoryWithProducts(
  category: CategoryWithProducts
): SerializedCategoryWithProducts {
  return {
    ...category,
    products: serializeProducts(category.products),
  };
}
