import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { razorpayPaymentSchema } from '@/lib/validations/order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-emails';
import { createShiprocketOrder } from '@/app/actions/shiprocket';

// Helper function to serialize order data for email
function serializeOrderData(order: {
  id: string;
  orderNumber: string;
  createdAt: Date;
  subtotal: { toNumber: () => number };
  tax: { toNumber: () => number };
  shipping: { toNumber: () => number };
  discount: { toNumber: () => number };
  total: { toNumber: () => number };
  items: Array<{
    price: { toNumber: () => number };
    total: { toNumber: () => number };
    name: string;
    quantity: number;
    productSnapshot?: unknown;
    product?: {
      mainImageUrl?: string | null;
      mainImagePublicId?: string | null;
      mainImageAlt?: string | null;
    };
  }>;
  shippingAddress: unknown;
  shippingCourierName?: string | null;
  shippingEstimatedDelivery?: string | null;
}) {
  return {
    ...order,
    subtotal: order.subtotal.toNumber(),
    tax: order.tax.toNumber(),
    shipping: order.shipping.toNumber(),
    discount: order.discount.toNumber(),
    total: order.total.toNumber(),
    items: order.items.map(item => {
      // Extract productSnapshot from JSON field or construct from product relation
      let productSnapshot: { mainImage?: { url?: string } } | undefined;

      if (item.productSnapshot) {
        const snapshot = item.productSnapshot as Record<string, unknown>;
        if (snapshot.mainImage && typeof snapshot.mainImage === 'object') {
          const mainImage = snapshot.mainImage as { url?: string };
          productSnapshot = { mainImage: { url: mainImage.url } };
        }
      } else if (item.product?.mainImageUrl) {
        // Fallback to product relation if snapshot not available
        productSnapshot = {
          mainImage: {
            url: item.product.mainImageUrl,
          },
        };
      }

      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price.toNumber(),
        total: item.total.toNumber(),
        productSnapshot,
      };
    }),
    shippingAddress: order.shippingAddress
      ? (typeof order.shippingAddress === 'string'
          ? JSON.parse(order.shippingAddress)
          : order.shippingAddress)
      : null,
    shippingCourierName: order.shippingCourierName || undefined,
    shippingEstimatedDelivery: order.shippingEstimatedDelivery || undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = razorpayPaymentSchema.parse(body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = validatedData;

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order with payment details
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'CONFIRMED',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    // Create Shiprocket order (non-blocking - don't fail payment if this fails)
    try {
      const shiprocketResult = await createShiprocketOrder({
        orderId: order.id,
      });

      if (!shiprocketResult.success) {
        console.error('Failed to create Shiprocket order:', shiprocketResult.error);
        // Continue anyway - payment is still valid
      }
    } catch (shiprocketError) {
      console.error('Shiprocket order creation error:', shiprocketError);
      // Don't fail the payment verification if Shiprocket fails
    }

    // Send order confirmation email
    try {
      const customerEmail = order.user?.email || order.guestEmail;
      const customerName = order.user?.name || order.guestName;

      if (customerEmail && customerName) {
        await sendOrderConfirmationEmail({
          order: serializeOrderData(order),
          customerEmail,
          customerName,
        });
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the payment verification if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
