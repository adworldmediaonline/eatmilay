/**
 * Shiprocket Utility Functions
 * Helper functions for converting between our order format and Shiprocket format
 */

import type { Order } from '@prisma/client';
import type { ShiprocketCreateOrderPayload, ShiprocketOrderItem } from './types';
import type { ShippingAddressData } from '@/lib/validations/order';

interface OrderWithItems extends Order {
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: { toNumber: () => number };
    product: {
      id: string;
      sku: string | null;
    } | null;
  }>;
}

/**
 * Convert our order format to Shiprocket order payload
 */
export function convertOrderToShiprocketFormat(
  order: OrderWithItems,
  shippingAddress: ShippingAddressData,
  pickupLocation: string = 'Milay Millet Snacks' // Default pickup location from Shiprocket
): ShiprocketCreateOrderPayload {
  // Parse shipping address from JSON if needed
  const address =
    typeof order.shippingAddress === 'string'
      ? (JSON.parse(order.shippingAddress) as ShippingAddressData)
      : (order.shippingAddress as ShippingAddressData);

  // Extract name parts (handle cases where fullName might be split)
  const fullName = address.fullName || shippingAddress.fullName || '';
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Convert order items to Shiprocket format
  const orderItems: ShiprocketOrderItem[] = order.items.map(item => ({
    name: item.name,
    sku: item.product?.sku || `PROD-${item.product?.id || item.id || 'UNKNOWN'}`,
    units: item.quantity,
    selling_price: item.price.toNumber(),
    discount: 0,
    tax: 0,
  }));

  // Determine payment method
  const paymentMethod =
    order.paymentMethod === 'cod' ? 'COD' : 'Prepaid';

  // Calculate package dimensions (default values if not available)
  // These should ideally come from product data or be configurable
  const defaultDimensions = {
    length: 10,
    breadth: 10,
    height: 5,
    weight: 0.5, // in kg
  };

  // Calculate total weight (assuming 0.5kg per item as default)
  const totalWeight = Math.max(
    order.items.reduce((sum, item) => sum + item.quantity * defaultDimensions.weight, 0),
    0.1 // Minimum 100g
  );

  const phoneNumber = address.phone.replace(/\D/g, '').slice(-10);

  const payload: ShiprocketCreateOrderPayload = {
    order_id: order.orderNumber,
    order_date: order.createdAt.toISOString().split('T')[0], // YYYY-MM-DD format
    pickup_location: pickupLocation,
    billing_customer_name: firstName,
    billing_last_name: lastName || undefined,
    billing_address: address.addressLine1,
    billing_address_2: address.addressLine2 || undefined,
    billing_isd_code: '+91', // India ISD code
    billing_city: address.city,
    billing_pincode: address.postalCode,
    billing_state: address.state,
    billing_country: address.country || 'India',
    billing_email: address.email,
    billing_phone: phoneNumber,
    shipping_is_billing: true, // Default to same as billing
    order_items: orderItems,
    payment_method: paymentMethod,
    shipping_charges: order.shipping.toNumber(),
    total_discount: order.discount.toNumber(),
    sub_total: order.subtotal.toNumber(),
    weight: totalWeight,
    length: defaultDimensions.length,
    breadth: defaultDimensions.breadth,
    height: defaultDimensions.height,
  };

  return payload;
}

/**
 * Validate Shiprocket order payload before sending
 */
export function validateShiprocketPayload(
  payload: ShiprocketCreateOrderPayload
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!payload.order_id) errors.push('Order ID is required');
  if (!payload.billing_customer_name) errors.push('Billing customer name is required');
  if (!payload.billing_address) errors.push('Billing address is required');
  if (!payload.billing_city) errors.push('Billing city is required');
  if (!payload.billing_pincode) errors.push('Billing pincode is required');
  if (!payload.billing_state) errors.push('Billing state is required');
  if (!payload.billing_email) errors.push('Billing email is required');
  if (!payload.billing_phone) errors.push('Billing phone is required');
  if (!payload.order_items || payload.order_items.length === 0) {
    errors.push('At least one order item is required');
  }

  // Validate order items
  payload.order_items?.forEach((item, index) => {
    if (!item.name) errors.push(`Item ${index + 1}: Name is required`);
    if (!item.sku) errors.push(`Item ${index + 1}: SKU is required`);
    if (!item.units || item.units < 1) {
      errors.push(`Item ${index + 1}: Units must be at least 1`);
    }
    if (!item.selling_price || item.selling_price <= 0) {
      errors.push(`Item ${index + 1}: Selling price must be greater than 0`);
    }
  });

  // Validate phone number format (should be digits only, 10 digits)
  if (payload.billing_phone && !/^\d{10}$/.test(payload.billing_phone)) {
    errors.push('Billing phone must be exactly 10 digits');
  }

  // Validate email format
  if (payload.billing_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.billing_email)) {
    errors.push('Invalid billing email format');
  }

  // Validate pincode (6 digits for India)
  if (payload.billing_pincode && !/^\d{6}$/.test(payload.billing_pincode)) {
    errors.push('Billing pincode must be exactly 6 digits');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format phone number for Shiprocket (remove all non-digits)
 */
export function formatPhoneForShiprocket(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10); // Keep last 10 digits
}

/**
 * Format date for Shiprocket (YYYY-MM-DD)
 */
export function formatDateForShiprocket(date: Date): string {
  return date.toISOString().split('T')[0];
}
