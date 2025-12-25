'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slugify from 'slugify';
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from '@/lib/validations/category';

// Server Actions
export async function createCategory(
  data: z.infer<typeof createCategorySchema>
) {
  try {
    // Validate input
    const validatedData = createCategorySchema.parse(data);
    const { name } = validatedData;

    // Generate slug
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Check if name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingCategory) {
      return {
        success: false,
        error: 'A category with this name already exists',
      };
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath('/dashboard/admin/categories');

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to create category:', error);
    return {
      success: false,
      error: 'Failed to create category. Please try again.',
    };
  }
}

export async function updateCategory(
  data: z.infer<typeof updateCategorySchema>
) {
  try {
    // Validate input
    const validatedData = updateCategorySchema.parse(data);
    const { id, name } = validatedData;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    // Check if name already exists (excluding current category)
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        id: {
          not: id,
        },
      },
    });

    if (duplicateCategory) {
      return {
        success: false,
        error: 'A category with this name already exists',
      };
    }

    // Generate new slug if name changed
    let slug = existingCategory.slug;
    if (existingCategory.name !== name) {
      const baseSlug = slugify(name, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique (excluding current category)
      while (
        await prisma.category.findFirst({
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

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    revalidatePath('/dashboard/admin/categories');
    revalidatePath(`/dashboard/admin/categories/${id}/edit`);

    return {
      success: true,
      data: updatedCategory,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update category:', error);
    return {
      success: false,
      error: 'Failed to update category. Please try again.',
    };
  }
}

export async function deleteCategory(
  data: z.infer<typeof deleteCategorySchema>
) {
  try {
    // Validate input
    const validatedData = deleteCategorySchema.parse(data);
    const { id } = validatedData;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!existingCategory) {
      return {
        success: false,
        error: 'Category not found',
      };
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return {
        success: false,
        error: `Cannot delete category "${existingCategory.name}" because it has ${existingCategory._count.products} product(s). Please move or delete the products first.`,
      };
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/dashboard/admin/categories');

    return {
      success: true,
      message: `Category "${existingCategory.name}" has been deleted successfully.`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to delete category:', error);
    return {
      success: false,
      error: 'Failed to delete category. Please try again.',
    };
  }
}
