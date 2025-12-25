import { z } from 'zod';

// Shipping Address Schema
export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^(\+91|91)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),
  addressLine1: z
    .string()
    .min(5, 'Address line 1 must be at least 5 characters')
    .max(200, 'Address line 1 must be less than 200 characters'),
  addressLine2: z
    .string()
    .max(200, 'Address line 2 must be less than 200 characters')
    .optional(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be less than 100 characters'),
  postalCode: z
    .string()
    .min(6, 'Postal code must be exactly 6 digits')
    .max(6, 'Postal code must be exactly 6 digits')
    .regex(/^[1-9][0-9]{5}$/, 'Please enter a valid Indian PIN code (6 digits)'),
  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters')
    .default('India'),
  isDefault: z.boolean().optional(),
});

// Billing Address Schema (extends shipping address)
export const billingAddressSchema = shippingAddressSchema.extend({
  sameAsShipping: z.boolean().optional(),
});

// Customer Information Schema
export const customerInfoSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^(\+91|91)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),
});

// Checkout Form Schema
export const checkoutFormSchema = z.object({
  shippingAddress: shippingAddressSchema,
  shippingMethod: z
    .enum(['standard', 'express'])
    .optional()
    .default('standard'),
  paymentMethod: z.enum(['razorpay', 'cod']).optional().default('razorpay'),
  orderNotes: z
    .string()
    .max(500, 'Order notes must be less than 500 characters')
    .optional(),
});

// Order Creation Schema
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        quantity: z
          .number()
          .int('Quantity must be a whole number')
          .min(1, 'Quantity must be at least 1')
          .max(100, 'Quantity cannot exceed 100'),
        price: z
          .number()
          .min(0.01, 'Price must be greater than 0')
          .max(999999.99, 'Price is too high'),
      })
    )
    .min(1, 'At least one item is required'),
  customerInfo: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
  }),
  shippingAddress: shippingAddressSchema,
  billingAddress: billingAddressSchema.optional(),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  orderNotes: z.string().max(500).optional(),
  userId: z.string().optional(),
});

// Order Update Schema
export const updateOrderSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  status: z
    .enum([
      'PENDING',
      'CONFIRMED',
      'PROCESSING',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED',
      'REFUNDED',
    ])
    .optional(),
  paymentStatus: z
    .enum([
      'PENDING',
      'PROCESSING',
      'COMPLETED',
      'FAILED',
      'CANCELLED',
      'REFUNDED',
    ])
    .optional(),
  trackingNumber: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
  shippedAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
});

// Razorpay Order Schema
export const razorpayOrderSchema = z.object({
  amount: z
    .number()
    .int('Amount must be a whole number')
    .min(100, 'Minimum order amount is ₹1')
    .max(99999999, 'Maximum order amount is ₹999,999.99'),
  currency: z.string().default('INR'),
  receipt: z.string().min(1, 'Receipt is required'),
  notes: z.record(z.string(), z.string()).optional(),
});

// Razorpay Payment Verification Schema
export const razorpayPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Razorpay order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Razorpay payment ID is required'),
  razorpay_signature: z.string().min(1, 'Razorpay signature is required'),
  orderId: z.string().min(1, 'Order ID is required'),
});

// Order Query Schema
export const orderQuerySchema = z.object({
  page: z
    .string()
    .transform(val => parseInt(val) || 1)
    .pipe(z.number().int().min(1))
    .optional()
    .default(1),
  limit: z
    .string()
    .transform(val => parseInt(val) || 10)
    .pipe(z.number().int().min(1).max(100))
    .optional()
    .default(10),
  status: z
    .string()
    .transform(val => val.split(',').filter(Boolean))
    .pipe(
      z.array(
        z.enum([
          'PENDING',
          'CONFIRMED',
          'PROCESSING',
          'SHIPPED',
          'DELIVERED',
          'CANCELLED',
          'REFUNDED',
        ])
      )
    )
    .optional(),
  paymentStatus: z
    .string()
    .transform(val => val.split(',').filter(Boolean))
    .pipe(
      z.array(
        z.enum([
          'PENDING',
          'PROCESSING',
          'COMPLETED',
          'FAILED',
          'CANCELLED',
          'REFUNDED',
        ])
      )
    )
    .optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(100).optional(),
  userId: z.string().optional(),
});

// Order Email Schema
export const orderEmailSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  type: z.enum(['confirmation', 'shipped', 'delivered', 'cancelled']),
  recipientEmail: z.string().email('Valid email is required'),
});

// Webhook Verification Schema
export const webhookVerificationSchema = z.object({
  signature: z.string().min(1, 'Signature is required'),
  payload: z.string().min(1, 'Payload is required'),
});

// Order Analytics Schema
export const orderAnalyticsSchema = z.object({
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  groupBy: z.enum(['day', 'week', 'month', 'year']).default('month'),
});

// Export inferred types for use in components
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Minimal checkout form schema (only essential fields)
export const minimalCheckoutFormSchema = z.object({
  customerInfo: z.object({
    email: z.string().email('Please enter a valid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  }),
  shippingAddress: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
    country: z.string().default('India'),
    isDefault: z.boolean().optional(),
  }),
  shippingMethod: z.enum(['standard', 'express']).default('standard'),
  paymentMethod: z.enum(['razorpay', 'cod']).default('razorpay'),
  orderNotes: z.string().max(500).optional(),
});

// Simplified checkout form type for the minimal form
export type MinimalCheckoutFormData = z.infer<typeof minimalCheckoutFormSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;
export type UpdateOrderData = z.infer<typeof updateOrderSchema>;
export type OrderQueryData = z.infer<typeof orderQuerySchema>;
export type RazorpayOrderData = z.infer<typeof razorpayOrderSchema>;
export type RazorpayPaymentData = z.infer<typeof razorpayPaymentSchema>;
export type ShippingAddressData = z.infer<typeof shippingAddressSchema>;
export type BillingAddressData = z.infer<typeof billingAddressSchema>;
export type CustomerInfoData = z.infer<typeof customerInfoSchema>;
