import { Prisma, OrderStatus, PaymentStatus } from '@prisma/client';

// Order-related types for the application
export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping?: boolean;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CheckoutFormData {
  // Customer Information
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  // Shipping Information
  shippingAddress: ShippingAddress;

  // Billing Information
  billingAddress?: BillingAddress;

  // Order Options
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'razorpay' | 'cod';

  // Additional
  orderNotes?: string;
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface RazorpayOrderData {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface RazorpayPaymentData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Prisma types with relations
export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
    user: true;
  };
}>;

export type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: {
    product: true;
  };
}>;

// Serialized types for client-side use
export interface SerializedOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
  items: SerializedOrderItem[];
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  notes?: string;
  trackingNumber?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  estimatedDelivery?: string;
}

// Extended type for order details page with additional fields
export interface SerializedOrderWithDetails extends SerializedOrder {
  estimatedDelivery?: string;
}

export interface SerializedOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  productSnapshot: Record<string, unknown>;
  product: {
    id: string;
    name: string;
    slug: string;
    mainImage?: {
      url: string;
      altText?: string;
    };
  };
}

// Order Status Enums are now imported from Prisma client
export { OrderStatus, PaymentStatus };

// Order creation payload
export interface CreateOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  customerInfo: CheckoutFormData['customerInfo'];
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
  paymentMethod: string;
  shippingMethod: string;
  orderNotes?: string;
  userId?: string;
}

// Email template data
export interface OrderEmailData {
  order: SerializedOrder;
  customerName: string;
  customerEmail: string;
  orderItems: SerializedOrderItem[];
  shippingAddress: ShippingAddress;
  orderSummary: OrderSummary;
}

// Dashboard order filters
export interface OrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  userId?: string;
}

// Order analytics
export interface OrderAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }>;
}

// Payment webhook payload
export interface RazorpayWebhookPayload {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment: {
      entity: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        order_id: string;
        invoice_id?: string;
        international: boolean;
        method: string;
        amount_refunded: number;
        refund_status?: string;
        captured: boolean;
        description?: string;
        card_id?: string;
        bank?: string;
        wallet?: string;
        vpa?: string;
        email: string;
        contact: string;
        notes: Record<string, string>;
        fee?: number;
        tax?: number;
        error_code?: string;
        error_description?: string;
        created_at: number;
      };
    };
  };
  created_at: number;
}
