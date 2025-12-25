import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { razorpayPaymentSchema } from '@/lib/validations/order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-emails';

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
