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

interface OrderDeliveredEmailTemplateProps {
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
  deliveryDate?: string;
}

export function OrderDeliveredEmailTemplate({
  customerName,
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  tax,
  total,
  deliveryDate,
}: OrderDeliveredEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} - Delivered Successfully</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎉 Your Order Has Arrived!</Heading>
            <Text style={headerText}>
              Hi {customerName}, your order has been successfully delivered
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
              Delivered on:{' '}
              {deliveryDate
                ? new Date(deliveryDate).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Today'}
            </Text>
          </Section>

          {/* Success Message */}
          <Section style={successContainer}>
            <Heading style={h3}>✅ Delivery Successful</Heading>
            <Text style={successText}>
              Your order has been delivered successfully! We hope you love your new products.
            </Text>
          </Section>

          {/* Order Items */}
          <Section>
            <Heading style={h3}>What You Received</Heading>
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

          {/* Review Request */}
          <Section style={reviewContainer}>
            <Heading style={h3}>How Was Your Experience?</Heading>
            <Text style={reviewText}>
              We'd love to hear about your experience! Your feedback helps us improve and helps other customers make informed decisions.
            </Text>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders`}
              style={reviewButton}
            >
              Leave a Review
            </Link>
          </Section>

          {/* What's Next */}
          <Section style={contentSection}>
            <Heading style={h3}>What's Next?</Heading>
            <Text style={listItem}>✓ <strong>Enjoy your products!</strong> We hope you love what you ordered</Text>
            <Text style={listItem}>✓ <strong>Leave a review</strong> to help other customers and earn rewards</Text>
            <Text style={listItem}>✓ <strong>Share your experience</strong> on social media with #SumnSubstance</Text>
            <Text style={listItem}>✓ <strong>Shop again</strong> - we have more amazing products waiting for you</Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
              style={button}
            >
              Continue Shopping
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
              Thank you for choosing SumnSubstance! We appreciate your business.
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
  backgroundColor: '#16a34a',
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
  color: '#bbf7d0',
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
  color: '#16a34a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#16a34a',
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

const successContainer = {
  backgroundColor: '#f0fdf4',
  border: '2px solid #16a34a',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const successText = {
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
  borderTop: '2px solid #16a34a',
  margin: '16px 0',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: '#16a34a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'right' as const,
};

const reviewContainer = {
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
  textAlign: 'center' as const,
};

const reviewText = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 16px',
  textAlign: 'center' as const,
};

const reviewButton = {
  backgroundColor: '#16a34a',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
  marginRight: '12px',
};

const contentSection = {
  margin: '24px 20px',
};

const listItem = {
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const ctaSection = {
  margin: '24px 20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#16a34a',
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
  color: '#16a34a',
  textDecoration: 'underline',
};
