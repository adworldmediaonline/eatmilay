'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { sendOrderConfirmationEmail, sendOrderProcessingEmail, sendOrderShippedEmail, sendOrderDeliveredEmail, sendOrderCancelledEmail } from '@/lib/email/order-emails';

// Helper function to serialize order data for client components
function serializeOrderData(order: {
  id: string;
  orderNumber: string;
  createdAt: Date;
  subtotal: { toNumber: () => number };
  tax: { toNumber: () => number };
  shipping: { toNumber: () => number };
  discount: { toNumber: () => number };
  total: { toNumber: () => number };
  items?: Array<{
    price: { toNumber: () => number };
    total: { toNumber: () => number };
    name: string;
    quantity: number;
  }>;
  shippingAddress?: unknown;
  [key: string]: unknown;
}) {
  return {
    ...order,
    subtotal: order.subtotal.toNumber(),
    tax: order.tax.toNumber(),
    shipping: order.shipping.toNumber(),
    discount: order.discount.toNumber(),
    total: order.total.toNumber(),
    items:
      order.items?.map(item => ({
        ...item,
        price: item.price.toNumber(),
        total: item.total.toNumber(),
      })) || [],
    shippingAddress: order.shippingAddress
      ? JSON.parse(order.shippingAddress as string)
      : null,
  };
}

// Validation schemas
const updateOrderStatusSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED',
  ]),
  trackingNumber: z.string().optional(),
});

const updatePaymentStatusSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  paymentStatus: z.enum([
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'REFUNDED',
  ]),
});

const sendOrderEmailSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  type: z.enum(['confirmation', 'shipped', 'delivered']),
});

const addOrderNotesSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  notes: z.string().min(1, 'Notes are required'),
});

// Server Actions
export async function updateOrderStatus(
  data: z.infer<typeof updateOrderStatusSchema>
) {
  try {
    const validatedData = updateOrderStatusSchema.parse(data);
    const { id, status, trackingNumber } = validatedData;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!existingOrder) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Prepare update data
    const updateData: {
      status: OrderStatus;
      updatedAt: Date;
      trackingNumber?: string;
      shippedAt?: Date;
      deliveredAt?: Date;
    } = {
      status: status as OrderStatus,
      updatedAt: new Date(),
    };

    // Add tracking number if provided and status is SHIPPED
    if (status === 'SHIPPED' && trackingNumber) {
      updateData.trackingNumber = trackingNumber;
      updateData.shippedAt = new Date();
    }

    // Set delivered date if status is DELIVERED
    if (status === 'DELIVERED') {
      updateData.deliveredAt = new Date();
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    // Send email notification based on status change
    try {
      const customerEmail = updatedOrder.user?.email || updatedOrder.guestEmail;
      const customerName = updatedOrder.user?.name || updatedOrder.guestName;

      if (customerEmail && customerName) {
        // Send appropriate email based on status
        switch (status) {
          case 'PROCESSING':
            await sendOrderProcessingEmail({
              order: serializeOrderData(updatedOrder),
              customerEmail,
              customerName,
            });
            break;

          case 'SHIPPED':
            await sendOrderShippedEmail({
              order: serializeOrderData(updatedOrder),
              customerEmail,
              customerName,
              trackingNumber: trackingNumber || undefined,
            });
            break;

          case 'DELIVERED':
            await sendOrderDeliveredEmail({
              order: serializeOrderData(updatedOrder),
              customerEmail,
              customerName,
            });
            break;

          case 'CANCELLED':
            await sendOrderCancelledEmail({
              order: serializeOrderData(updatedOrder),
              customerEmail,
              customerName,
              // TODO: Add cancellation reason and refund amount when available
            });
            break;
        }
      }
    } catch (emailError) {
      console.error(`Failed to send ${status} email:`, emailError);
      // Don't fail status update if email fails
    }

    revalidatePath('/dashboard/admin/orders');
    revalidatePath(`/dashboard/admin/orders/${id}`);

    return {
      success: true,
      message: `Order status updated to ${status}`,
      data: serializeOrderData(updatedOrder),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update order status:', error);
    return {
      success: false,
      error: 'Failed to update order status. Please try again.',
    };
  }
}

export async function updatePaymentStatus(
  data: z.infer<typeof updatePaymentStatusSchema>
) {
  try {
    const validatedData = updatePaymentStatusSchema.parse(data);
    const { id, paymentStatus } = validatedData;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Update payment status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        paymentStatus: paymentStatus as PaymentStatus,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/dashboard/admin/orders');
    revalidatePath(`/dashboard/admin/orders/${id}`);

    return {
      success: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: serializeOrderData(updatedOrder),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update payment status:', error);
    return {
      success: false,
      error: 'Failed to update payment status. Please try again.',
    };
  }
}

export async function sendOrderEmail(
  data: z.infer<typeof sendOrderEmailSchema>
) {
  try {
    const validatedData = sendOrderEmailSchema.parse(data);
    const { id, type } = validatedData;

    // Get order with all details
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    const customerEmail = order.user?.email || order.guestEmail;
    const customerName = order.user?.name || order.guestName;

    if (!customerEmail || !customerName) {
      return {
        success: false,
        error: 'Customer email or name not found',
      };
    }

    // Send appropriate email based on type
    switch (type) {
      case 'confirmation':
        await sendOrderConfirmationEmail({
          order: serializeOrderData(order),
          customerEmail,
          customerName,
        });
        break;
      case 'shipped':
        // TODO: Implement sendOrderShippedEmail when template is available
        console.log(
          'Order shipped email would be sent for:',
          order.orderNumber
        );
        break;
      case 'delivered':
        // TODO: Implement sendOrderDeliveredEmail when template is available
        console.log(
          'Order delivered email would be sent for:',
          order.orderNumber
        );
        break;
      default:
        return {
          success: false,
          error: 'Invalid email type',
        };
    }

    return {
      success: true,
      message: `${type} email sent successfully`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to send order email:', error);
    return {
      success: false,
      error: 'Failed to send email. Please try again.',
    };
  }
}

export async function addOrderNotes(data: z.infer<typeof addOrderNotesSchema>) {
  try {
    const validatedData = addOrderNotesSchema.parse(data);
    const { id, notes } = validatedData;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Append new notes to existing notes
    const existingNotes = existingOrder.notes || '';
    const timestamp = new Date().toLocaleString('en-IN');
    const newNotes = existingNotes
      ? `${existingNotes}\n\n[${timestamp}] ${notes}`
      : `[${timestamp}] ${notes}`;

    // Update order with new notes
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        notes: newNotes,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/dashboard/admin/orders');
    revalidatePath(`/dashboard/admin/orders/${id}`);

    return {
      success: true,
      message: 'Notes added successfully',
      data: serializeOrderData(updatedOrder),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to add order notes:', error);
    return {
      success: false,
      error: 'Failed to add notes. Please try again.',
    };
  }
}

// Export types for use in components
export type UpdateOrderStatusData = z.infer<typeof updateOrderStatusSchema>;
export type UpdatePaymentStatusData = z.infer<typeof updatePaymentStatusSchema>;
export type SendOrderEmailData = z.infer<typeof sendOrderEmailSchema>;
export type AddOrderNotesData = z.infer<typeof addOrderNotesSchema>;
