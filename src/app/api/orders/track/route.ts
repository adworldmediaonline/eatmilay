import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateDeliveryDate } from '@/lib/utils/order-utils';
import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');
    const shipmentId = searchParams.get('shipmentId');

    // If shipment_id is provided, track directly using Shiprocket API
    if (shipmentId) {
      try {
        const channelId = process.env.SHIPROCKET_CHANNEL_ID;
        const trackingResponse = await shiprocketClient.trackOrder(
          null, // AWB code
          parseInt(shipmentId), // shipment_id (priority)
          undefined, // channel_order_id
          channelId || undefined // channel_id (optional)
        );

        if (trackingResponse.data) {
          return NextResponse.json({
            success: true,
            data: {
              shipmentId: shipmentId,
              shiprocketTracking: trackingResponse.data,
            },
          });
        } else {
          return NextResponse.json(
            { error: 'No tracking data found for this shipment ID' },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error('Shiprocket tracking error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to track shipment';
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    }

    // Otherwise, use order number to fetch order details
    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order number or shipment ID is required' },
        { status: 400 }
      );
    }

    // Fetch order by orderNumber
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                mainImageUrl: true,
                mainImageAlt: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Calculate estimated delivery
    const deliveryDates = calculateDeliveryDate(order.createdAt, 'standard');
    const estimatedDelivery = deliveryDates.max.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Extract Shiprocket IDs from notes if available
    const shiprocketOrderIdMatch = order.notes?.match(/Shiprocket Order ID:\s*(\d+)/);
    const shiprocketOrderId = shiprocketOrderIdMatch ? shiprocketOrderIdMatch[1] : null;

    const shiprocketShipmentIdMatch = order.notes?.match(/Shiprocket Shipment ID:\s*(\d+)/);
    const shiprocketShipmentId = shiprocketShipmentIdMatch ? shiprocketShipmentIdMatch[1] : null;

    const channelOrderIdMatch = order.notes?.match(/Channel Order ID:\s*([^\n]+)/);
    const channelOrderId = channelOrderIdMatch ? channelOrderIdMatch[1].trim() : null;

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
      shiprocketOrderId,
      shiprocketShipmentId,
      channelOrderId,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price.toNumber(),
        quantity: item.quantity,
        total: item.total.toNumber(),
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

    // Fetch Shiprocket tracking data using Shiprocket API
    // Priority: Shiprocket order_id > AWB code > shipment_id
    let shiprocketTracking = null;
    if (shiprocketOrderId || order.trackingNumber || shiprocketShipmentId) {
      try {
        console.log('Fetching Shiprocket tracking for order:', {
          orderNumber: order.orderNumber,
          shiprocketOrderId,
          trackingNumber: order.trackingNumber,
          shipmentId: shiprocketShipmentId,
          channelOrderId,
        });

        // Use shipment_id for tracking (priority) - this is what Shiprocket uses for tracking
        // Get channel_id from environment if available (optional)
        const channelId = process.env.SHIPROCKET_CHANNEL_ID;

        const trackingResponse = await shiprocketClient.trackOrder(
          order.trackingNumber || null, // AWB code
          shiprocketShipmentId ? parseInt(shiprocketShipmentId) : undefined, // shipment_id (priority)
          order.orderNumber || undefined, // channel_order_id (fallback - our order number)
          channelId || undefined // channel_id (optional)
        );

        if (trackingResponse.data) {
          shiprocketTracking = trackingResponse.data;
          console.log('Shiprocket tracking data fetched successfully');
        }
      } catch (error) {
        // Log error but don't fail the request
        console.error('Failed to fetch Shiprocket tracking:', error);
        // Log more details for debugging
        if (error instanceof Error) {
          console.error('Tracking error message:', error.message);
        }
      }
    } else {
      console.log('No Shiprocket tracking data available for order:', order.orderNumber);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...serializedOrder,
        shiprocketTracking,
      },
    });
  } catch (error) {
    console.error('Order track error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
