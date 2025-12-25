import prisma from '@/lib/prisma';
import type { SerializedOrder } from '@/types/order';
import { calculateDeliveryDate } from '@/lib/utils/order-utils';

interface GetOrdersParams {
  page?: number;
  limit?: number;
  status?: string[];
  paymentStatus?: string[];
  search?: string;
  userId?: string;
}

export async function getOrders({
  page = 1,
  limit = 10,
  status,
  paymentStatus,
  search,
  userId,
}: GetOrdersParams = {}) {
  try {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status && status.length > 0) {
      where.status = { in: status };
    }

    if (paymentStatus && paymentStatus.length > 0) {
      where.paymentStatus = { in: paymentStatus };
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { guestEmail: { contains: search, mode: 'insensitive' } },
        { guestName: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (userId) {
      where.userId = userId;
    }

    // Fetch orders with pagination
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    // Calculate analytics
    const analytics = await calculateOrderAnalytics();

    // Serialize orders
    const serializedOrders: SerializedOrder[] = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      userId: order.userId || undefined,
      guestEmail: order.guestEmail || undefined,
      guestName: order.guestName || undefined,
      status: order.status,
      subtotal: order.subtotal.toNumber(),
      tax: order.tax.toNumber(),
      shipping: order.shipping.toNumber(),
      discount: order.discount.toNumber(),
      total: order.total.toNumber(),
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod || undefined,
      razorpayOrderId: order.razorpayOrderId || undefined,
      razorpayPaymentId: order.razorpayPaymentId || undefined,
      shippingAddress: JSON.parse(order.shippingAddress as string),
      billingAddress: order.billingAddress
        ? JSON.parse(order.billingAddress as string)
        : undefined,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price.toNumber(),
        quantity: item.quantity,
        total: item.total.toNumber(),
        productSnapshot: item.productSnapshot as Record<string, unknown>,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          mainImage: item.product.mainImageUrl
            ? {
                url: item.product.mainImageUrl,
                altText: item.product.mainImageAlt || undefined,
              }
            : undefined,
        },
      })),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      shippedAt: order.shippedAt?.toISOString(),
      deliveredAt: order.deliveredAt?.toISOString(),
      notes: order.notes || undefined,
      trackingNumber: order.trackingNumber || undefined,
      user: order.user
        ? {
            id: order.user.id,
            name: order.user.name,
            email: order.user.email,
          }
        : undefined,
    }));

    return {
      orders: serializedOrders,
      totalCount,
      analytics,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrevious: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

export async function getOrderById(
  id: string
): Promise<SerializedOrder | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
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
      return null;
    }

    // Serialize order
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      userId: order.userId || undefined,
      guestEmail: order.guestEmail || undefined,
      guestName: order.guestName || undefined,
      status: order.status,
      subtotal: order.subtotal.toNumber(),
      tax: order.tax.toNumber(),
      shipping: order.shipping.toNumber(),
      discount: order.discount.toNumber(),
      total: order.total.toNumber(),
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod || undefined,
      razorpayOrderId: order.razorpayOrderId || undefined,
      razorpayPaymentId: order.razorpayPaymentId || undefined,
      shippingAddress: JSON.parse(order.shippingAddress as string),
      billingAddress: order.billingAddress
        ? JSON.parse(order.billingAddress as string)
        : undefined,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price.toNumber(),
        quantity: item.quantity,
        total: item.total.toNumber(),
        productSnapshot: item.productSnapshot as Record<string, unknown>,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          mainImage: item.product.mainImageUrl
            ? {
                url: item.product.mainImageUrl,
                altText: item.product.mainImageAlt || undefined,
              }
            : undefined,
        },
      })),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      shippedAt: order.shippedAt?.toISOString(),
      deliveredAt: order.deliveredAt?.toISOString(),
      notes: order.notes || undefined,
      trackingNumber: order.trackingNumber || undefined,
      user: order.user
        ? {
            id: order.user.id,
            name: order.user.name,
            email: order.user.email,
          }
        : undefined,
      estimatedDelivery: order.deliveredAt
        ? undefined
        : calculateDeliveryDate(
            order.createdAt,
            'standard'
          ).max.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
    };
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw new Error('Failed to fetch order');
  }
}

async function calculateOrderAnalytics() {
  try {
    const [totalOrders, totalRevenue, ordersByStatus, recentOrders] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { total: true },
          where: { paymentStatus: 'COMPLETED' },
        }),
        prisma.order.groupBy({
          by: ['status'],
          _count: { status: true },
        }),
        prisma.order.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            total: true,
            createdAt: true,
          },
        }),
      ]);

    // Type assertion for ordersByStatus to fix TypeScript inference issue
    const typedOrdersByStatus = ordersByStatus as Array<{
      status: string;
      _count: { status: number };
    }>;

    const revenue = totalRevenue._sum.total?.toNumber() || 0;
    const averageOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

    const statusCounts: Record<string, number> = {};
    typedOrdersByStatus.forEach(item => {
      statusCounts[item.status] = item._count.status;
    });

    return {
      totalOrders,
      totalRevenue: revenue,
      averageOrderValue,
      ordersByStatus: statusCounts,
      recentOrders: recentOrders.length,
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      ordersByStatus: {},
      recentOrders: 0,
    };
  }
}
