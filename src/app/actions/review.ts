'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
  createReviewSchema,
  updateReviewStatusSchema,
  markHelpfulSchema,
  deleteReviewSchema,
} from '@/lib/validations/review';

// Create a new review
export async function createReview(data: z.infer<typeof createReviewSchema>) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: 'You must be logged in to write a review',
      };
    }

    // Validate input
    const validatedData = createReviewSchema.parse(data);
    const { productId, rating, title, comment, images } = validatedData;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return {
        success: false,
        error: 'You have already reviewed this product',
      };
    }

    // Check if user purchased this product (for verified purchase badge)
    const userOrder = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        status: 'DELIVERED',
        items: {
          some: {
            productId: productId,
          },
        },
      },
      include: {
        items: {
          where: {
            productId: productId,
          },
        },
      },
    });

    const isVerifiedPurchase = !!userOrder;
    const orderId = userOrder?.id;

    // Create review with auto-approval for verified purchases
    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        title,
        comment,
        isVerifiedPurchase,
        orderId,
        status: isVerifiedPurchase ? 'APPROVED' : 'PENDING', // Auto-approve verified purchases
        images: images && images.length > 0 ? JSON.stringify(images) : undefined,
      },
      include: {
        user: true,
        product: true,
      },
    });

    // Revalidate relevant paths
    revalidatePath(`/products/${product.slug}`);
    revalidatePath('/dashboard/admin/reviews');

    return {
      success: true,
      message: isVerifiedPurchase
        ? 'Review submitted and published!'
        : 'Review submitted for approval!',
      data: {
        id: review.id,
        status: review.status,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to create review:', error);
    return {
      success: false,
      error: 'Failed to submit review. Please try again.',
    };
  }
}

// Update review status (admin only)
export async function updateReviewStatus(
  data: z.infer<typeof updateReviewStatusSchema>
) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // TODO: Add admin role check
    // if (session.user.role !== 'admin') {
    //   return { success: false, error: 'Unauthorized' };
    // }

    // Validate input
    const validatedData = updateReviewStatusSchema.parse(data);
    const { id, status, moderatedBy } = validatedData;

    // Update review status
    const review = await prisma.review.update({
      where: { id },
      data: {
        status,
        moderatedBy: moderatedBy || session.user.id,
        moderatedAt: new Date(),
      },
      include: {
        product: true,
      },
    });

    // Revalidate paths
    revalidatePath('/dashboard/admin/reviews');
    revalidatePath(`/products/${review.product.slug}`);

    return {
      success: true,
      message: `Review ${status.toLowerCase()} successfully`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update review status:', error);
    return {
      success: false,
      error: 'Failed to update review status. Please try again.',
    };
  }
}

// Mark review as helpful or unhelpful
export async function markReviewHelpful(
  data: z.infer<typeof markHelpfulSchema>
) {
  try {
    // Validate input
    const validatedData = markHelpfulSchema.parse(data);
    const { reviewId, helpful } = validatedData;

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { product: true },
    });

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    // Update helpful count
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        helpfulCount: helpful
          ? { increment: 1 }
          : review.helpfulCount,
        unhelpfulCount: !helpful
          ? { increment: 1 }
          : review.unhelpfulCount,
      },
    });

    // Revalidate product page
    revalidatePath(`/products/${review.product.slug}`);

    return {
      success: true,
      data: {
        helpfulCount: updatedReview.helpfulCount,
        unhelpfulCount: updatedReview.unhelpfulCount,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to mark review as helpful:', error);
    return {
      success: false,
      error: 'Failed to update vote. Please try again.',
    };
  }
}

// Delete review (user can delete own review)
export async function deleteReview(data: z.infer<typeof deleteReviewSchema>) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Validate input
    const validatedData = deleteReviewSchema.parse(data);
    const { id } = validatedData;

    // Find review
    const review = await prisma.review.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    // Check if user owns this review or is admin
    if (review.userId !== session.user.id) {
      // TODO: Add admin check
      // if (session.user.role !== 'admin') {
      return {
        success: false,
        error: 'You can only delete your own reviews',
      };
      // }
    }

    // Delete review
    await prisma.review.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath(`/products/${review.product.slug}`);
    revalidatePath('/dashboard/admin/reviews');

    return {
      success: true,
      message: 'Review deleted successfully',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to delete review:', error);
    return {
      success: false,
      error: 'Failed to delete review. Please try again.',
    };
  }
}

// Admin: Bulk update review status
export async function bulkUpdateReviewStatus(data: {
  reviewIds: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    const { reviewIds, status } = data;

    if (!reviewIds || reviewIds.length === 0) {
      return {
        success: false,
        error: 'No reviews selected',
      };
    }

    // Update all reviews
    const result = await prisma.review.updateMany({
      where: {
        id: { in: reviewIds },
      },
      data: {
        status,
        moderatedBy: session.user.id,
        moderatedAt: new Date(),
      },
    });

    // Revalidate dashboard
    revalidatePath('/dashboard/admin/reviews');

    return {
      success: true,
      message: `Successfully updated ${result.count} review(s) to ${status}`,
      count: result.count,
    };
  } catch (error) {
    console.error('Failed to bulk update reviews:', error);
    return {
      success: false,
      error: 'Failed to update reviews. Please try again.',
    };
  }
}

// Admin: Delete review (bypass ownership check)
export async function deleteReviewAdmin(reviewId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    // Find review to get product slug for revalidation
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { product: true },
    });

    if (!review) {
      return {
        success: false,
        error: 'Review not found',
      };
    }

    // Delete review
    await prisma.review.delete({
      where: { id: reviewId },
    });

    // Revalidate paths
    revalidatePath(`/products/${review.product.slug}`);
    revalidatePath('/dashboard/admin/reviews');

    return {
      success: true,
      message: 'Review deleted successfully',
    };
  } catch (error) {
    console.error('Failed to delete review (admin):', error);
    return {
      success: false,
      error: 'Failed to delete review. Please try again.',
    };
  }
}

// Admin: Bulk delete reviews
export async function bulkDeleteReviews(reviewIds: string[]) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    if (!reviewIds || reviewIds.length === 0) {
      return {
        success: false,
        error: 'No reviews selected',
      };
    }

    // Delete all reviews
    const result = await prisma.review.deleteMany({
      where: {
        id: { in: reviewIds },
      },
    });

    // Revalidate dashboard
    revalidatePath('/dashboard/admin/reviews');

    return {
      success: true,
      message: `Successfully deleted ${result.count} review(s)`,
      count: result.count,
    };
  } catch (error) {
    console.error('Failed to bulk delete reviews:', error);
    return {
      success: false,
      error: 'Failed to delete reviews. Please try again.',
    };
  }
}

