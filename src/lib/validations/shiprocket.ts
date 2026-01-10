import { z } from 'zod';

/**
 * Shiprocket Validation Schemas
 */

export const shiprocketOrderItemSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  sku: z.string().min(1, 'SKU is required').max(100),
  units: z.number().int().min(1, 'Units must be at least 1').max(1000),
  selling_price: z
    .number()
    .positive('Selling price must be greater than 0')
    .max(999999.99),
});

export const shiprocketCreateOrderSchema = z.object({
  order_id: z.string().min(1, 'Order ID is required').max(100),
  order_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  pickup_location: z.string().min(1, 'Pickup location is required').max(100),
  billing_customer_name: z
    .string()
    .min(1, 'Billing customer name is required')
    .max(100),
  billing_last_name: z.string().max(100).optional(),
  billing_address: z.string().min(1, 'Billing address is required').max(200),
  billing_address_2: z.string().max(200).optional(),
  billing_city: z.string().min(1, 'Billing city is required').max(100),
  billing_pincode: z
    .string()
    .regex(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  billing_state: z.string().min(1, 'Billing state is required').max(100),
  billing_country: z.string().min(1, 'Billing country is required').max(100),
  billing_email: z.string().email('Invalid billing email'),
  billing_phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  shipping_is_billing: z.boolean().default(true),
  shipping_customer_name: z.string().max(100).optional(),
  shipping_last_name: z.string().max(100).optional(),
  shipping_address: z.string().max(200).optional(),
  shipping_address_2: z.string().max(200).optional(),
  shipping_city: z.string().max(100).optional(),
  shipping_pincode: z.string().regex(/^\d{6}$/).optional(),
  shipping_state: z.string().max(100).optional(),
  shipping_country: z.string().max(100).optional(),
  shipping_email: z.string().email().optional(),
  shipping_phone: z.string().regex(/^\d{10}$/).optional(),
  order_items: z
    .array(shiprocketOrderItemSchema)
    .min(1, 'At least one order item is required'),
  payment_method: z.enum(['Prepaid', 'COD']),
  sub_total: z
    .number()
    .positive('Sub total must be greater than 0')
    .max(999999.99),
  length: z.number().positive().max(200).optional(),
  breadth: z.number().positive().max(200).optional(),
  height: z.number().positive().max(200).optional(),
  weight: z.number().positive().max(100).optional(),
});

export const shiprocketCancelOrderSchema = z.object({
  shipment_id: z.number().int().positive('Shipment ID must be a positive number'),
  reason: z.string().max(500).optional(),
});

export const shiprocketTrackOrderSchema = z.object({
  shipment_id: z.number().int().positive('Shipment ID must be a positive number'),
});

export type ShiprocketCreateOrderData = z.infer<typeof shiprocketCreateOrderSchema>;
export type ShiprocketCancelOrderData = z.infer<typeof shiprocketCancelOrderSchema>;
export type ShiprocketTrackOrderData = z.infer<typeof shiprocketTrackOrderSchema>;
