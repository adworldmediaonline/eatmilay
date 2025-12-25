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
} from '@react-email/components';

interface OrderEmailTemplateProps {
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

export function OrderEmailTemplate({
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
}: OrderEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Order Confirmation - {orderNumber} - Thank you for your order!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Order Confirmed!</Heading>
            <Text style={headerText}>
              Thank you {customerName} for your order. We're preparing it for
              shipment.
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
          </Section>

          {/* Order Items */}
          <Section>
            <Heading style={h3}>Order Items</Heading>
            {orderItems.map((item, index) => (
              <Section key={index} style={itemContainer}>
                <div style={itemLayout}>
                  {item.image && (
                    <Img src={item.image} alt={item.name} style={itemImage} />
                  )}
                  <div style={itemDetails}>
                    <Text style={itemName}>{item.name}</Text>
                    <Text style={itemInfo}>
                      Quantity: {item.quantity} × ₹{item.price.toLocaleString()}{' '}
                      = ₹{item.total.toLocaleString()}
                    </Text>
                  </div>
                </div>
                {index < orderItems.length - 1 && <Hr style={itemSeparator} />}
              </Section>
            ))}
          </Section>

          {/* Order Summary */}
          <Section style={summaryContainer}>
            <Heading style={h3}>Order Summary</Heading>

            <div style={summaryRow}>
              <Text style={summaryLabel}>Subtotal:</Text>
              <Text style={summaryValue}>₹{subtotal.toLocaleString()}</Text>
            </div>

            {shipping > 0 && (
              <div style={summaryRow}>
                <Text style={summaryLabel}>Shipping:</Text>
                <Text style={summaryValue}>₹{shipping.toLocaleString()}</Text>
              </div>
            )}

            {tax > 0 && (
              <div style={summaryRow}>
                <Text style={summaryLabel}>Tax (GST):</Text>
                <Text style={summaryValue}>₹{tax.toLocaleString()}</Text>
              </div>
            )}

            <Hr style={totalSeparator} />

            <div style={totalRow}>
              <Text style={totalLabel}>Total:</Text>
              <Text style={totalValue}>₹{total.toLocaleString()}</Text>
            </div>
          </Section>

          {/* Shipping Address */}
          <Section>
            <Heading style={h3}>Shipping Address</Heading>
            <div style={addressContainer}>
              <Text style={addressText}>{shippingAddress.fullName}</Text>
              <Text style={addressText}>{shippingAddress.addressLine1}</Text>
              {shippingAddress.addressLine2 && (
                <Text style={addressText}>{shippingAddress.addressLine2}</Text>
              )}
              <Text style={addressText}>
                {shippingAddress.city}, {shippingAddress.state}{' '}
                {shippingAddress.postalCode}
              </Text>
              <Text style={addressText}>{shippingAddress.country}</Text>
              <Text style={addressText}>Phone: {shippingAddress.phone}</Text>
            </div>
          </Section>

          {/* Estimated Delivery */}
          <Section style={deliveryContainer}>
            <Text style={deliveryText}>
              <strong>Estimated Delivery:</strong> {estimatedDelivery}
            </Text>
          </Section>

          {/* Call to Action */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              You can track your order status and view order details by visiting
              your account.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={footerSeparator} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions about your order? Contact us at{' '}
              <a href={`mailto:${process.env.EMAIL_FROM}`} style={link}>
                {process.env.EMAIL_FROM}
              </a>
            </Text>
            <Text style={footerText}>
              This email was sent from SumnSubstance. If you have any questions,
              please don't hesitate to contact us.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles following the same pattern as your existing EmailTemplate
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#233f1c',
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
  color: '#233f1c',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#233f1c',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  padding: '0 20px',
};

const orderDateStyle = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
  textAlign: 'center' as const,
};

const itemContainer = {
  margin: '0 20px',
};

const itemLayout = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
};

const itemImage = {
  width: '60px',
  height: '60px',
  objectFit: 'cover' as const,
  borderRadius: '8px',
  marginRight: '16px',
};

const itemDetails = {
  flex: 1,
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
  margin: '0',
};

const summaryContainer = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '16px',
};

const summaryRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
};

const summaryLabel = {
  fontSize: '14px',
  margin: '0',
};

const summaryValue = {
  fontSize: '14px',
  margin: '0',
};

const totalSeparator = {
  border: 'none',
  borderTop: '2px solid #233f1c',
  margin: '16px 0',
};

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: '#233f1c',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const addressContainer = {
  border: '1px solid #eee',
  borderRadius: '8px',
  margin: '0 20px',
  padding: '16px',
};

const addressText = {
  fontSize: '14px',
  margin: '0 0 4px',
};

const deliveryContainer = {
  margin: '24px 20px',
  textAlign: 'center' as const,
};

const deliveryText = {
  color: '#233f1c',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
};

const ctaSection = {
  margin: '24px 20px',
  textAlign: 'center' as const,
};

const ctaText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  textAlign: 'center' as const,
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
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const link = {
  color: '#233f1c',
  textDecoration: 'underline',
};
