'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slugify from 'slugify';
import { Decimal } from '@prisma/client/runtime/library';
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

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
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
      },
      include: {
        category: true,
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
      updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
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
        },
        include: {
          category: true,
        },
      });
    } catch (dbError) {
      console.error(
        'Database connection error during product update:',
        dbError
      );
      return {
        success: false,
        error:
          'Failed to update product due to database connection error. Please try again.',
      };
    }

    revalidatePath('/dashboard/admin/products');
    revalidatePath(`/dashboard/admin/products/${id}/edit`);
    revalidatePath('/dashboard/admin/categories');

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
