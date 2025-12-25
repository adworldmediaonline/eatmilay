import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateDeliveryDate } from '@/lib/utils/order-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch order with all related data
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
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Calculate estimated delivery
    const deliveryDates = calculateDeliveryDate(order.createdAt, 'standard');
    const estimatedDelivery = deliveryDates.max.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Serialize order data
    const serializedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      total: order.total.toNumber(),
      subtotal: order.subtotal.toNumber(),
      shipping: order.shipping.toNumber(),
      tax: order.tax.toNumber(),
      discount: order.discount.toNumber(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      shippedAt: order.shippedAt?.toISOString(),
      deliveredAt: order.deliveredAt?.toISOString(),
      trackingNumber: order.trackingNumber,
      notes: order.notes,
      estimatedDelivery,
      shippingAddress: JSON.parse(order.shippingAddress as string),
      billingAddress: order.billingAddress
        ? JSON.parse(order.billingAddress as string)
        : null,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price.toNumber(),
        quantity: item.quantity,
        total: item.total.toNumber(),
        productSnapshot: item.productSnapshot,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          mainImage: item.product.mainImageUrl
            ? {
                url: item.product.mainImageUrl,
                altText: item.product.mainImageAlt,
              }
            : null,
        },
      })),
      customer: {
        name: order.user?.name || order.guestName,
        email: order.user?.email || order.guestEmail,
        isGuest: !order.userId,
      },
    };

    return NextResponse.json({
      success: true,
      data: serializedOrder,
    });
  } catch (error) {
    console.error('Order fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
