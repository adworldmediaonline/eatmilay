import { NextRequest, NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';
import { createOrderSchema } from '@/lib/validations/order';
import { generateOrderNumber } from '@/lib/utils/order-utils';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = createOrderSchema.parse(body);
    const {
      items,
      customerInfo,
      shippingAddress,
      billingAddress,
      paymentMethod,
      orderNotes,
      userId,
    } = validatedData;

    // Calculate order totals
    let subtotal = 0;
    const orderItems = [];

    // Validate products and calculate totals
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { category: true },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price.toNumber() * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: new Decimal(itemTotal),
        productSnapshot: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price.toNumber(),
          category: product.category,
          mainImage: product.mainImageUrl
            ? {
              url: product.mainImageUrl,
              publicId: product.mainImagePublicId,
              altText: product.mainImageAlt,
            }
            : null,
          excerpt: product.excerpt,
          description: product.description,
        },
      });
    }

    // Total is just subtotal (GST and shipping managed from dashboard)
    const shippingCost = 0;
    const taxAmount = 0;
    const totalAmount = subtotal;

    // Generate unique order number
    const orderNumber = await generateOrderNumber();

    // Create Razorpay order if payment method is razorpay
    let razorpayOrderId = null;
    if (paymentMethod === 'razorpay') {
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100), // Convert to paise
        currency: 'INR',
        receipt: orderNumber,
        notes: {
          orderId: orderNumber,
          customerEmail: customerInfo.email,
        },
      });
      razorpayOrderId = razorpayOrder.id;
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        guestEmail: !userId ? customerInfo.email : null,
        guestName: !userId ? customerInfo.fullName : null,
        status: 'PENDING',
        subtotal: new Decimal(subtotal),
        tax: new Decimal(taxAmount),
        shipping: new Decimal(shippingCost),
        discount: new Decimal(0),
        total: new Decimal(totalAmount),
        paymentStatus: 'PENDING',
        paymentMethod,
        razorpayOrderId,
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: billingAddress
          ? JSON.stringify(billingAddress)
          : undefined,
        notes: orderNotes,
        items: {
          create: orderItems,
        },
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

    // Return order data
    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total.toNumber(),
        razorpayOrderId: order.razorpayOrderId,
        paymentMethod: order.paymentMethod,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price.toNumber(),
          quantity: item.quantity,
          total: item.total.toNumber(),
        })),
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
