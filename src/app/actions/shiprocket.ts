'use server';

import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';
import {
  convertOrderToShiprocketFormat,
  validateShiprocketPayload,
} from '@/lib/shiprocket/utils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { ShiprocketOrderResponse } from '@/lib/shiprocket/types';

interface CreateShiprocketOrderParams {
  orderId: string;
  pickupLocation?: string;
}

/**
 * Create order in Shiprocket
 * This should be called after payment is confirmed
 */
export async function createShiprocketOrder({
  orderId,
  pickupLocation = 'Milay Millet Snacks', // Use actual pickup location name from Shiprocket
}: CreateShiprocketOrderParams) {
  try {
    // Fetch order with items and product details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                sku: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Check if order already has Shiprocket shipment ID
    if (order.trackingNumber) {
      return {
        success: false,
        error: 'Order already has a shipment created',
      };
    }

    // Parse shipping address
    let shippingAddress;
    try {
      shippingAddress =
        typeof order.shippingAddress === 'string'
          ? JSON.parse(order.shippingAddress)
          : order.shippingAddress;
    } catch {
      return {
        success: false,
        error: 'Invalid shipping address format',
      };
    }

    // Convert order to Shiprocket format
    const shiprocketPayload = convertOrderToShiprocketFormat(
      order as Parameters<typeof convertOrderToShiprocketFormat>[0],
      shippingAddress,
      pickupLocation
    );

    // Validate payload
    const validation = validateShiprocketPayload(shiprocketPayload);
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    // Create order in Shiprocket
    console.log('Creating Shiprocket order with payload:', JSON.stringify(shiprocketPayload, null, 2));

    const response = await shiprocketClient.createOrder(shiprocketPayload);

    console.log('Shiprocket API response:', JSON.stringify(response, null, 2));

    // Check if order was created successfully
    // Shiprocket returns shipment_id or order_id on success
    if (!response.data || (!response.data.shipment_id && !response.data.order_id)) {
      console.error('Shiprocket order creation failed:', response);
      return {
        success: false,
        error: response.message || 'Failed to create Shiprocket order',
      };
    }

    const shipmentData = response.data as ShiprocketOrderResponse;

    // Update order with Shiprocket shipment ID and AWB code
    await prisma.order.update({
      where: { id: orderId },
      data: {
        trackingNumber: shipmentData.awb_code || `SR-${shipmentData.shipment_id}`,
        notes: order.notes
          ? `${order.notes}\n\nShiprocket Shipment ID: ${shipmentData.shipment_id}`
          : `Shiprocket Shipment ID: ${shipmentData.shipment_id}`,
      },
    });

    revalidatePath('/dashboard/admin/orders');
    revalidatePath(`/dashboard/admin/orders/${orderId}`);

    return {
      success: true,
      data: {
        shipmentId: shipmentData.shipment_id,
        awbCode: shipmentData.awb_code,
        trackingNumber: shipmentData.awb_code || `SR-${shipmentData.shipment_id}`,
      },
    };
  } catch (error) {
    console.error('Failed to create Shiprocket order:', error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Failed to create Shiprocket order. Please try again.',
    };
  }
}
