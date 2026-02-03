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
      shippingCost = 0,
      courierId,
      courierName,
      estimatedDelivery,
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
        include: {
          category: true,
          variants: {
            where: { active: true },
            include: {
              bundles: {
                where: { active: true },
              },
            },
          },
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }

      // Validate variant if provided
      let variant = null;
      if (item.variantId) {
        variant = product.variants.find(v => v.id === item.variantId);
        if (!variant) {
          return NextResponse.json(
            { error: `Variant not found: ${item.variantId}` },
            { status: 400 }
          );
        }
      }

      // Validate bundle if provided
      let bundle = null;
      if (item.bundleId) {
        if (!variant) {
          return NextResponse.json(
            { error: 'Bundle requires a variant to be specified' },
            { status: 400 }
          );
        }
        bundle = variant.bundles.find(b => b.id === item.bundleId);
        if (!bundle) {
          return NextResponse.json(
            { error: `Bundle not found: ${item.bundleId}` },
            { status: 400 }
          );
        }
      }

      // Use the price from the request (which is the bundle price if bundle is selected)
      // This price is already calculated correctly in the cart
      const itemPrice = new Decimal(item.price);
      const itemTotal = itemPrice.toNumber() * item.quantity;
      subtotal += itemTotal;

      // Build product name with variant and bundle info
      let productName = product.name;
      if (variant) {
        productName += ` - ${variant.name}`;
      }
      if (bundle) {
        productName += ` (${bundle.label})`;
      }

      orderItems.push({
        productId: product.id,
        variantId: item.variantId || null,
        bundleId: item.bundleId || null,
        name: productName,
        price: itemPrice, // Use the price from request (bundle price if applicable)
        quantity: item.quantity,
        total: new Decimal(itemTotal),
        productSnapshot: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: itemPrice.toNumber(), // Store the actual price paid
          variantId: item.variantId || null,
          bundleId: item.bundleId || null,
          variant: variant ? {
            id: variant.id,
            name: variant.name,
            price: variant.price.toNumber(),
          } : null,
          bundle: bundle ? {
            id: bundle.id,
            label: bundle.label,
            quantity: bundle.quantity,
            sellingPrice: bundle.sellingPrice.toNumber(),
            originalPrice: bundle.originalPrice.toNumber(),
            savingsAmount: bundle.savingsAmount.toNumber(),
          } : null,
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

    // Calculate total with shipping cost
    const taxAmount = 0;
    const totalAmount = subtotal + shippingCost;

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
        notes: orderNotes || null,
        shippingCourierId: courierId || null,
        shippingCourierName: courierName || null,
        shippingEstimatedDelivery: estimatedDelivery || null,
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
