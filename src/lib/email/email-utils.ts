/**
 * Email utility functions for retry logic and error handling
 */

/**
 * Retry an email function with exponential backoff
 */
export async function retryEmail<T>(
  emailFunction: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await emailFunction();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        console.error(`Email failed after ${maxRetries} attempts:`, lastError);
        throw lastError;
      }

      // Exponential backoff: delay = baseDelay * 2^(attempt-1)
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(`Email attempt ${attempt} failed, retrying in ${delay}ms:`, error);

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Validate email configuration
 */
export function validateEmailConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is not configured');
  }

  if (!process.env.EMAIL_FROM) {
    errors.push('EMAIL_FROM is not configured');
  }

  if (!process.env.EMAIL_FROM_NAME) {
    errors.push('EMAIL_FROM_NAME is not configured');
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    errors.push('NEXT_PUBLIC_APP_URL is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Log email attempt for debugging
 */
export function logEmailAttempt(
  emailType: string,
  recipient: string,
  orderNumber: string,
  success: boolean,
  error?: Error
) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Email ${emailType} ${success ? 'sent' : 'failed'} to ${recipient} for order ${orderNumber}`;

  if (success) {
    console.log(logMessage);
  } else {
    console.error(logMessage, error?.message);
  }
}

/**
 * Format email subject with order number
 */
export function formatEmailSubject(
  emailType: 'confirmation' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  orderNumber: string
): string {
  const subjects = {
    confirmation: `Order Confirmation - ${orderNumber}`,
    processing: `Order #${orderNumber} - We're Processing Your Order`,
    shipped: `Order #${orderNumber} - Your Order Has Shipped!`,
    delivered: `Order #${orderNumber} - Delivered Successfully`,
    cancelled: `Order #${orderNumber} - Order Cancellation Confirmation`,
  };

  return subjects[emailType];
}

/**
 * Check if email should be sent based on status change
 */
export function shouldSendEmail(
  oldStatus: string,
  newStatus: string
): boolean {
  // Don't send email if status hasn't changed
  if (oldStatus === newStatus) {
    return false;
  }

  // Send email for these status changes
  const emailTriggerStatuses = ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return emailTriggerStatuses.includes(newStatus);
}

/**
 * Get email type based on order status
 */
export function getEmailType(status: string): 'confirmation' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | null {
  const statusToEmailType: Record<string, 'confirmation' | 'processing' | 'shipped' | 'delivered' | 'cancelled'> = {
    'CONFIRMED': 'confirmation',
    'PROCESSING': 'processing',
    'SHIPPED': 'shipped',
    'DELIVERED': 'delivered',
    'CANCELLED': 'cancelled',
  };

  return statusToEmailType[status] || null;
}
