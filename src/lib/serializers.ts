import { Prisma } from '@prisma/client';

// Base types for better type safety
export interface ImageData {
  url: string;
  publicId: string;
  altText?: string;
}

// Product serialization utilities
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true; variants: { include: { bundles: true } } };
}>;

export type SerializedVariant = {
  id: string;
  productId: string;
  name: string;
  price: number;
  sku?: string | null;
  active: boolean;
  bundles: SerializedBundle[];
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedBundle = {
  id: string;
  variantId: string;
  label: string;
  quantity: number;
  sellingPrice: number;
  originalPrice: number;
  savingsAmount: number;
  badge: string;
  isDefault: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
  | 'variants'
> & {
  price: number;
  mainImage?: ImageData;
  additionalImages?: ImageData[];
  variants?: SerializedVariant[];
};

export type SerializedCategoryWithProducts = Omit<
  CategoryWithProducts,
  'products' | 'imageUrl' | 'imagePublicId' | 'imageAlt'
> & {
  products: SerializedProduct[];
  imageUrl?: string | null;
  imagePublicId?: string | null;
  imageAlt?: string | null;
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

// Helper to serialize variants and bundles
function serializeVariants(variants: any[] | undefined | null): SerializedVariant[] | undefined {
  if (!variants || !Array.isArray(variants)) {
    return undefined;
  }
  
  return variants.map((variant) => ({
    ...variant,
    price: typeof variant.price === 'object' && variant.price?.toNumber 
      ? variant.price.toNumber() 
      : variant.price,
    bundles: variant.bundles?.map((bundle: any) => ({
      ...bundle,
      sellingPrice: typeof bundle.sellingPrice === 'object' && bundle.sellingPrice?.toNumber
        ? bundle.sellingPrice.toNumber()
        : bundle.sellingPrice,
      originalPrice: typeof bundle.originalPrice === 'object' && bundle.originalPrice?.toNumber
        ? bundle.originalPrice.toNumber()
        : bundle.originalPrice,
      savingsAmount: typeof bundle.savingsAmount === 'object' && bundle.savingsAmount?.toNumber
        ? bundle.savingsAmount.toNumber()
        : bundle.savingsAmount,
    })) || [],
  }));
}

// Core serialization function with proper type safety
export function serializeProduct<
  T extends {
    price: Prisma.Decimal;
    mainImageUrl?: string | null;
    mainImagePublicId?: string | null;
    mainImageAlt?: string | null;
    additionalImages?: unknown;
    variants?: any[];
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
  | 'variants'
> & {
  price: number;
  mainImage?: ImageData;
  additionalImages?: ImageData[];
  variants?: SerializedVariant[];
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

  // Process variants and bundles (handle case where variants might not exist)
  const variants = product.variants ? serializeVariants(product.variants) : undefined;

  // Return serialized product with proper typing
  const {
    price,
    mainImageUrl: _url, // eslint-disable-line @typescript-eslint/no-unused-vars
    mainImagePublicId: _publicId, // eslint-disable-line @typescript-eslint/no-unused-vars
    mainImageAlt: _alt, // eslint-disable-line @typescript-eslint/no-unused-vars
    additionalImages: _images, // eslint-disable-line @typescript-eslint/no-unused-vars
    variants: _variants, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = product;

  return {
    ...rest,
    price: price.toNumber(),
    mainImage,
    additionalImages,
    variants,
  } as Omit<
    T,
    | 'price'
    | 'mainImageUrl'
    | 'mainImagePublicId'
    | 'mainImageAlt'
    | 'additionalImages'
    | 'variants'
  > & {
    price: number;
    mainImage?: ImageData;
    additionalImages?: ImageData[];
    variants?: SerializedVariant[];
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
