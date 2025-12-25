import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Img,
  Hr,
  Link,
} from '@react-email/components';

interface OrderCancelledEmailTemplateProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  estimatedDelivery: string;
  cancellationReason?: string;
  refundAmount?: number;
}

export function OrderCancelledEmailTemplate({
  customerName,
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  tax,
  total,
  cancellationReason,
  refundAmount,
}: OrderCancelledEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} - Order Cancellation Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Order Cancelled</Heading>
            <Text style={headerText}>
              Hi {customerName}, your order has been cancelled
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderDetails}>
            <Heading style={h2}>Order #{orderNumber}</Heading>
            <Text style={orderDateStyle}>
              Order Date:{' '}
              {new Date(orderDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={orderDateStyle}>
              Cancelled on: {new Date().toLocaleDateString('en-IN')}
            </Text>
          </Section>

          {/* Cancellation Notice */}
          <Section style={cancelContainer}>
            <Heading style={h3}>❌ Order Cancelled</Heading>
            <Text style={cancelText}>
              We're sorry to inform you that your order has been cancelled.
              {cancellationReason && ` Reason: ${cancellationReason}`}
            </Text>
          </Section>

          {/* Refund Information */}
          {refundAmount && refundAmount > 0 && (
            <Section style={refundContainer}>
              <Heading style={h3}>💰 Refund Information</Heading>
              <Text style={refundText}>
                A refund of <strong>₹{refundAmount.toLocaleString()}</strong> will be processed to your original payment method within 5-7 business days.
              </Text>
            </Section>
          )}

          {/* Order Items */}
          <Section>
            <Heading style={h3}>Cancelled Items</Heading>
            {orderItems.map((item, index) => (
              <Section key={index} style={itemContainer}>
                <table style={itemLayout}>
                  <tr>
                    {item.image && (
                      <td>
                        <Img src={item.image} alt={item.name} style={itemImage} />
                      </td>
                    )}
                    <td style={itemDetails}>
                      <Text style={itemName}>{item.name}</Text>
                      <Text style={itemInfo}>
                        Quantity: {item.quantity} × ₹{item.price.toLocaleString()} = ₹
                        {item.total.toLocaleString()}
                      </Text>
                    </td>
                  </tr>
                </table>
                {index < orderItems.length - 1 && <Hr style={itemSeparator} />}
              </Section>
            ))}
          </Section>

          {/* Order Summary */}
          <Section style={summaryContainer}>
            <Heading style={h3}>Order Summary</Heading>

            <table style={summaryTable}>
              <tr>
                <td><Text style={summaryLabel}>Subtotal:</Text></td>
                <td align="right"><Text style={summaryValue}>₹{subtotal.toLocaleString()}</Text></td>
              </tr>

              {shipping > 0 && (
                <tr>
                  <td><Text style={summaryLabel}>Shipping:</Text></td>
                  <td align="right"><Text style={summaryValue}>₹{shipping.toLocaleString()}</Text></td>
                </tr>
              )}

              {tax > 0 && (
                <tr>
                  <td><Text style={summaryLabel}>Tax (GST):</Text></td>
                  <td align="right"><Text style={summaryValue}>₹{tax.toLocaleString()}</Text></td>
                </tr>
              )}
            </table>

            <Hr style={totalSeparator} />

            <table style={summaryTable}>
              <tr>
                <td><Text style={totalLabel}>Total:</Text></td>
                <td align="right"><Text style={totalValue}>₹{total.toLocaleString()}</Text></td>
              </tr>
            </table>
          </Section>

          {/* What Happens Next */}
          <Section style={contentSection}>
            <Heading style={h3}>What Happens Next?</Heading>
            {refundAmount && refundAmount > 0 && (
              <Text style={listItem}>✓ <strong>Refund Processing:</strong> Your refund will be processed within 5-7 business days</Text>
            )}
            <Text style={listItem}>✓ <strong>Email Confirmation:</strong> You'll receive an email when the refund is processed</Text>
            <Text style={listItem}>✓ <strong>Bank Processing:</strong> It may take additional time for your bank to reflect the refund</Text>
            <Text style={listItem}>✓ <strong>Questions?</strong> Contact our support team if you have any concerns</Text>
          </Section>

          {/* Help Section */}
          <Section style={helpContainer}>
            <Heading style={h3}>We're Here to Help</Heading>
            <Text style={helpText}>
              We're sorry this order didn't work out. We'd love to help you find the perfect products for your needs.
            </Text>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
              style={button}
            >
              Browse Products
            </Link>
          </Section>

          {/* Footer */}
          <Hr style={footerSeparator} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions about this cancellation? Contact us at{' '}
              <Link href={`mailto:${process.env.EMAIL_FROM}`} style={link}>
                {process.env.EMAIL_FROM}
              </Link>
            </Text>
            <Text style={footerText}>
              This email was sent from SumnSubstance. We apologize for any inconvenience caused.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#dc2626',
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
  textAlign: 'center' as const,
};

const headerText = {
  color: '#fecaca',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0 0',
  textAlign: 'center' as const,
};

const orderDetails = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '16px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#dc2626',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  padding: '0 20px',
};

const orderDateStyle = {
  color: '#666',
  fontSize: '14px',
  margin: '4px 0 0',
  textAlign: 'center' as const,
};

const cancelContainer = {
  backgroundColor: '#fef2f2',
  border: '2px solid #dc2626',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const cancelText = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
};

const refundContainer = {
  backgroundColor: '#f0fdf4',
  border: '2px solid #16a34a',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const refundText = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
};

const itemContainer = {
  margin: '0 20px',
  opacity: 0.7,
};

const itemLayout = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const itemImage = {
  width: '60px',
  height: '60px',
  objectFit: 'cover' as const,
  borderRadius: '8px',
  marginRight: '16px',
};

const itemDetails = {
  width: '100%',
  paddingLeft: '16px',
};

const itemName = {
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const itemInfo = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
};

const itemSeparator = {
  border: 'none',
  borderTop: '1px solid #eee',
  margin: '12px 0',
};

const summaryContainer = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '16px',
};

const summaryTable = {
  width: '100%',
  marginBottom: '8px',
};

const summaryLabel = {
  fontSize: '14px',
  margin: '0',
};

const summaryValue = {
  fontSize: '14px',
  margin: '0',
  textAlign: 'right' as const,
};

const totalSeparator = {
  border: 'none',
  borderTop: '2px solid #dc2626',
  margin: '16px 0',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'right' as const,
};

const contentSection = {
  margin: '24px 20px',
};

const listItem = {
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const helpContainer = {
  backgroundColor: '#f0f8ff',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const helpText = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 16px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: 'hsl(var(--primary))',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
};

const footerSeparator = {
  border: 'none',
  borderTop: '1px solid #eee',
  margin: '24px 0',
};

const footer = {
  padding: '0 20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const link = {
  color: '#dc2626',
  textDecoration: 'underline',
};
