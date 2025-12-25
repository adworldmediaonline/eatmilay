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

interface OrderProcessingEmailTemplateProps {
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
}

export function OrderProcessingEmailTemplate({
  customerName,
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  estimatedDelivery,
}: OrderProcessingEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} - We're Processing Your Order</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🚀 Your Order is Being Prepared!</Heading>
            <Text style={headerText}>
              Hi {customerName}, we're getting your order ready
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
              Estimated Delivery: {estimatedDelivery}
            </Text>
          </Section>

          {/* Processing Status */}
          <Section style={statusContainer}>
            <Heading style={h3}>Processing Status</Heading>
            <Text style={statusText}>
              Our team is carefully preparing your order for shipment. This usually takes 1-2 business days.
            </Text>
          </Section>

          {/* Order Items */}
          <Section>
            <Heading style={h3}>What You Ordered</Heading>
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
            <Text style={listItem}>✓ <strong>Processing:</strong> We're preparing your items with care</Text>
            <Text style={listItem}>✓ <strong>Quality Check:</strong> Each item is inspected before packaging</Text>
            <Text style={listItem}>✓ <strong>Packaging:</strong> Your order is securely packaged for shipping</Text>
            <Text style={listItem}>✓ <strong>Shipping:</strong> You'll receive a tracking number when shipped</Text>
          </Section>

          {/* Shipping Address */}
          <Section style={contentSection}>
            <Heading style={h3}>Delivery Address</Heading>
            <Section style={addressContainer}>
              <Text style={addressText}><strong>{shippingAddress.fullName}</strong></Text>
              <Text style={addressText}>{shippingAddress.addressLine1}</Text>
              {shippingAddress.addressLine2 && (
                <Text style={addressText}>{shippingAddress.addressLine2}</Text>
              )}
              <Text style={addressText}>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              </Text>
              <Text style={addressText}>{shippingAddress.country}</Text>
              <Text style={addressText}>Phone: {shippingAddress.phone}</Text>
            </Section>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders`}
              style={button}
            >
              Track Your Order
            </Link>
          </Section>

          {/* Footer */}
          <Hr style={footerSeparator} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions about your order? Contact us at{' '}
              <Link href={`mailto:${process.env.EMAIL_FROM}`} style={link}>
                {process.env.EMAIL_FROM}
              </Link>
            </Text>
            <Text style={footerText}>
              This email was sent from SumnSubstance. We'll keep you updated on your order status.
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
  backgroundColor: 'hsl(var(--primary))',
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
  color: '#ffffff',
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
  color: 'hsl(var(--primary))',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const h3 = {
  color: 'hsl(var(--primary))',
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

const statusContainer = {
  backgroundColor: '#e8f5e8',
  border: '2px solid hsl(var(--primary))',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const statusText = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
};

const itemContainer = {
  margin: '0 20px',
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
  borderTop: '2px solid hsl(var(--primary))',
  margin: '16px 0',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: 'hsl(var(--primary))',
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

const addressContainer = {
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '8px',
};

const addressText = {
  fontSize: '14px',
  margin: '4px 0',
};

const ctaSection = {
  margin: '24px 20px',
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
  color: 'hsl(var(--primary))',
  textDecoration: 'underline',
};
