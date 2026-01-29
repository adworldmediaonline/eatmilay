'use server';

import prisma from '@/lib/prisma';
import { getProductBySlug } from '@/server/queries/product';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slugify from 'slugify';
import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { serializeProduct } from '@/lib/serializers';
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from '@/lib/validations/product';

// Server Actions
export async function createProduct(data: z.infer<typeof createProductSchema>) {
  try {
    // Validate input
    const validatedData = createProductSchema.parse(data);
    const {
      name,
      sku,
      excerpt,
      description,
      tagline,
      whyLoveIt,
      whatsInside,
      howToUse,
      ingredients,
      metaTitle,
      metaDescription,
      metaKeywords,
      price,
      categoryId,
      mainImage,
      additionalImages,
      enableBundlePricing,
      variants,
    } = validatedData;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: 'Selected category does not exist',
      };
    }

    // Generate slug
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Check if SKU is provided and unique
    if (sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku },
      });
      if (existingSku) {
        return {
          success: false,
          error: 'SKU already exists. Please use a unique SKU.',
        };
      }
    }

    // Create product with variants and bundles
    const product = await prisma.product.create({
      data: {
        name,
        sku: sku || null,
        excerpt,
        description,
        tagline,
        whyLoveIt,
        whatsInside,
        howToUse,
        ingredients,
        metaTitle,
        metaDescription,
        metaKeywords,
        slug,
        price: new Decimal(price),
        categoryId,
        mainImageUrl: mainImage?.url,
        mainImagePublicId: mainImage?.publicId,
        mainImageAlt: mainImage?.altText,
        additionalImages:
          additionalImages && additionalImages.length > 0
            ? JSON.stringify(additionalImages)
            : undefined,
        enableBundlePricing: enableBundlePricing || false,
        variants: variants && variants.length > 0 ? {
          create: variants.map((variant) => {
            const variantPrice = new Decimal(variant.price);
            return {
              name: variant.name,
              price: variantPrice,
              sku: variant.sku || null,
              active: variant.active !== false,
              bundles: variant.bundles && variant.bundles.length > 0 ? {
                create: variant.bundles.map((bundle) => {
                  const originalPrice = variantPrice.times(bundle.quantity);
                  const sellingPrice = new Decimal(bundle.sellingPrice);
                  const savingsAmount = originalPrice.minus(sellingPrice);

                  // Validate selling price is less than original
                  if (sellingPrice.gte(originalPrice)) {
                    throw new Error(`Bundle "${bundle.label}": Selling price must be less than original price (₹${originalPrice.toString()})`);
                  }

                  return {
                    label: bundle.label,
                    quantity: bundle.quantity,
                    sellingPrice,
                    originalPrice,
                    savingsAmount,
                    badge: bundle.badge || 'NONE',
                    isDefault: bundle.isDefault || false,
                    isSecondaryDefault: bundle.isSecondaryDefault || false,
                    active: bundle.active !== false,
                  };
                }),
              } : undefined,
            };
          }),
        } : undefined,
      },
      include: {
        category: true,
        variants: {
          include: {
            bundles: true,
          },
        },
      },
    });

    revalidatePath('/dashboard/admin/products');
    revalidatePath('/dashboard/admin/categories');

    return {
      success: true,
      data: serializeProduct(product),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to create product:', error);
    return {
      success: false,
      error: 'Failed to create product. Please try again.',
    };
  }
}

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    // Validate input
    const validatedData = updateProductSchema.parse(data);
    const {
      id,
      name,
      sku,
      excerpt,
      description,
      tagline,
      whyLoveIt,
      whatsInside,
      howToUse,
      ingredients,
      metaTitle,
      metaDescription,
      metaKeywords,
      price,
      categoryId,
      mainImage,
      additionalImages,
      enableBundlePricing,
      variants,
    } = validatedData;

    // Check if product exists (with timeout handling)
    let existingProduct;
    try {
      existingProduct = await prisma.product.findUnique({
        where: { id },
        select: { id: true, name: true, slug: true }, // Only select needed fields
      });
    } catch (dbError) {
      console.error(
        'Database connection error during product lookup:',
        dbError
      );
      return {
        success: false,
        error: 'Database connection error. Please try again.',
      };
    }

    if (!existingProduct) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Check if category exists
    let category;
    try {
      category = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { id: true, name: true }, // Only select needed fields
      });
    } catch (dbError) {
      console.error(
        'Database connection error during category lookup:',
        dbError
      );
      return {
        success: false,
        error: 'Database connection error. Please try again.',
      };
    }

    if (!category) {
      return {
        success: false,
        error: 'Selected category does not exist',
      };
    }

    // Check if SKU is provided and unique (excluding current product)
    if (sku) {
      const existingSku = await prisma.product.findFirst({
        where: {
          sku,
          id: { not: id },
        },
      });
      if (existingSku) {
        return {
          success: false,
          error: 'SKU already exists. Please use a unique SKU.',
        };
      }
    }

    // Generate new slug if name changed
    let slug = existingProduct.slug;
    if (existingProduct.name !== name) {
      const baseSlug = slugify(name, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique (excluding current product)
      while (
        await prisma.product.findFirst({
          where: {
            slug,
            id: { not: id },
          },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update product with error handling
    let updatedProduct;
    try {
      // Use transaction to handle variants and bundles updates
      updatedProduct = await prisma.$transaction(async (tx) => {
        // First, delete all existing variants (cascades to bundles)
        await tx.productVariant.deleteMany({
          where: { productId: id },
        });

        // Update product
        const product = await tx.product.update({
          where: { id },
          data: {
            name,
            sku: sku || null,
            excerpt,
            description,
            tagline,
            whyLoveIt,
            whatsInside,
            howToUse,
            ingredients,
            metaTitle,
            metaDescription,
            metaKeywords,
            slug,
            price: new Decimal(price),
            categoryId,
            mainImageUrl: mainImage?.url ?? null,
            mainImagePublicId: mainImage?.publicId ?? null,
            mainImageAlt: mainImage?.altText ?? null,
            additionalImages:
              additionalImages && additionalImages.length > 0
                ? JSON.stringify(additionalImages)
                : Prisma.JsonNull,
            enableBundlePricing: enableBundlePricing || false,
          },
        });

        // Create variants and bundles if provided
        if (variants && variants.length > 0) {
          for (const variant of variants) {
            const variantPrice = new Decimal(variant.price);
            const createdVariant = await tx.productVariant.create({
              data: {
                productId: id,
                name: variant.name,
                price: variantPrice,
                sku: variant.sku || null,
                active: variant.active !== false,
              },
            });

            // Create bundles for this variant
            if (variant.bundles && variant.bundles.length > 0) {
              for (const bundle of variant.bundles) {
                const originalPrice = variantPrice.times(bundle.quantity);
                const sellingPrice = new Decimal(bundle.sellingPrice);
                const savingsAmount = originalPrice.minus(sellingPrice);

                // Validate selling price is less than original
                if (sellingPrice.gte(originalPrice)) {
                  throw new Error(`Bundle "${bundle.label}": Selling price must be less than original price (₹${originalPrice.toString()})`);
                }

                await tx.productBundle.create({
                  data: {
                    variantId: createdVariant.id,
                    label: bundle.label,
                    quantity: bundle.quantity,
                    sellingPrice,
                    originalPrice,
                    savingsAmount,
                    badge: bundle.badge || 'NONE',
                    isDefault: bundle.isDefault || false,
                    isSecondaryDefault: bundle.isSecondaryDefault || false,
                    active: bundle.active !== false,
                  },
                });
              }
            }
          }
        }

        // Return product with variants and bundles
        return await tx.product.findUnique({
          where: { id },
          include: {
            category: true,
            variants: {
              include: {
                bundles: true,
              },
            },
          },
        });
      });
    } catch (dbError) {
      console.error(
        'Database connection error during product update:',
        dbError
      );
      return {
        success: false,
        error:
          dbError instanceof Error
            ? dbError.message
            : 'Failed to update product due to database connection error. Please try again.',
      };
    }

    revalidatePath('/dashboard/admin/products');
    revalidatePath(`/dashboard/admin/products/${id}/edit`);
    revalidatePath('/dashboard/admin/categories');

    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    return {
      success: true,
      data: serializeProduct(updatedProduct),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update product:', error);
    return {
      success: false,
      error: 'Failed to update product. Please try again.',
    };
  }
}

export async function deleteProduct(data: z.infer<typeof deleteProductSchema>) {
  try {
    // Validate input
    const validatedData = deleteProductSchema.parse(data);
    const { id } = validatedData;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!existingProduct) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/dashboard/admin/products');
    revalidatePath('/dashboard/admin/categories');

    return {
      success: true,
      message: `Product "${existingProduct.name}" has been deleted successfully.`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to delete product:', error);
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
}

/** Fetch product by slug (for client use, e.g. ProductOptionsDialog). */
export async function getProductBySlugAction(slug: string) {
  return getProductBySlug(slug);
}
