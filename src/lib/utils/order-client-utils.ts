/**
 * Client-safe order utility functions
 * These functions don't depend on Prisma and can run in the browser
 */

/**
 * Get status badge color for UI components
 */
export function getOrderStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'PROCESSING':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'SHIPPED':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    case 'DELIVERED':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'REFUNDED':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

/**
 * Get payment status badge color for UI components
 */
export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'FAILED':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'CANCELLED':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'REFUNDED':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

/**
 * Format order number for display
 */
export function formatOrderNumber(orderNumber: string): string {
  return orderNumber.replace(/^ORD-/, '#');
}

/**
 * Check if order can be cancelled (client-side logic only)
 */
export function canCancelOrder(
  orderStatus: string,
  paymentStatus: string
): boolean {
  const cancellableOrderStatuses = ['PENDING', 'CONFIRMED'];
  const cancellablePaymentStatuses = ['PENDING', 'FAILED', 'CANCELLED'];

  return (
    cancellableOrderStatuses.includes(orderStatus) ||
    cancellablePaymentStatuses.includes(paymentStatus)
  );
}

/**
 * Check if order can be refunded (client-side logic only)
 */
export function canRefundOrder(
  orderStatus: string,
  paymentStatus: string
): boolean {
  return orderStatus === 'DELIVERED' && paymentStatus === 'COMPLETED';
}

/**
 * Get estimated delivery date range (client-side calculation)
 */
export function getEstimatedDeliveryRange(
  orderDate: Date | string,
  shippingMethod: 'standard' | 'express' = 'standard'
): { min: Date; max: Date } {
  const date = typeof orderDate === 'string' ? new Date(orderDate) : orderDate;
  const days =
    shippingMethod === 'express' ? { min: 2, max: 3 } : { min: 5, max: 7 };

  const minDate = new Date(date);
  minDate.setDate(minDate.getDate() + days.min);

  const maxDate = new Date(date);
  maxDate.setDate(maxDate.getDate() + days.max);

  return { min: minDate, max: maxDate };
}

/**
 * Format delivery date range for display
 */
export function formatDeliveryRange(
  orderDate: Date | string,
  shippingMethod: 'standard' | 'express' = 'standard'
): string {
  const { min, max } = getEstimatedDeliveryRange(orderDate, shippingMethod);
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  const minFormatted = min.toLocaleDateString('en-IN', formatOptions);
  const maxFormatted = max.toLocaleDateString('en-IN', formatOptions);

  return `${minFormatted} - ${maxFormatted}`;
}
