import React from 'react';
import Image from 'next/image';

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
  shippingCourierName?: string;
  shippingEstimatedDelivery?: string;
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
  shippingCourierName,
  shippingEstimatedDelivery,
}: OrderEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#233f1c',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            margin: '0',
            fontSize: '28px',
            fontWeight: 'bold',
          }}
        >
          Order Confirmed!
        </h1>
        <p style={{ color: '#ffd469', margin: '8px 0 0', fontSize: '16px' }}>
          Thank you for your order, {customerName}
        </p>
      </div>

      {/* Order Details */}
      <div style={{ padding: '32px', backgroundColor: 'white' }}>
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#233f1c' }}>
            Order #{orderNumber}
          </h2>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Order Date:{' '}
            {new Date(orderDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
            Estimated Delivery: {estimatedDelivery}
          </p>
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#233f1c' }}
          >
            Order Items
          </h3>

          {orderItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom:
                  index < orderItems.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              {item.image && (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '16px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: '0 0 4px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {item.name}
                </h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                </p>
              </div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                ₹{item.total.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#233f1c' }}
          >
            Order Summary
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          {shipping > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span>Shipping:</span>
              <span>₹{shipping.toLocaleString()}</span>
            </div>
          )}

          {tax > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span>Tax (GST):</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
          )}

          <hr
            style={{
              margin: '16px 0',
              border: 'none',
              borderTop: '2px solid #233f1c',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <span>Total:</span>
            <span style={{ color: '#233f1c' }}>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#233f1c' }}
          >
            Shipping Address
          </h3>
          <div
            style={{
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: '0 0 4px', fontWeight: '600' }}>
              {shippingAddress.fullName}
            </p>
            <p style={{ margin: '0 0 4px' }}>{shippingAddress.addressLine1}</p>
            {shippingAddress.addressLine2 && (
              <p style={{ margin: '0 0 4px' }}>
                {shippingAddress.addressLine2}
              </p>
            )}
            <p style={{ margin: '0 0 4px' }}>
              {shippingAddress.city}, {shippingAddress.state}{' '}
              {shippingAddress.postalCode}
            </p>
            <p style={{ margin: '0 0 4px' }}>{shippingAddress.country}</p>
            <p style={{ margin: '0', color: '#666' }}>
              Phone: {shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* Shipping Courier Details */}
        {(shippingCourierName || shippingEstimatedDelivery) && (
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{ margin: '0 0 16px', fontSize: '18px', color: '#233f1c' }}
            >
              Shipping Details
            </h3>
            <div
              style={{
                padding: '16px',
                border: '1px solid #eee',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              {shippingCourierName && (
                <p style={{ margin: '0 0 8px' }}>
                  <strong>Courier:</strong> {shippingCourierName}
                </p>
              )}
              {shippingEstimatedDelivery && (
                <p style={{ margin: '0 0 8px' }}>
                  <strong>Estimated Delivery:</strong> {shippingEstimatedDelivery}
                </p>
              )}
              {shipping > 0 && (
                <p style={{ margin: '0' }}>
                  <strong>Shipping Cost:</strong> ₹{shipping.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#233f1c',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Track Your Order
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 0',
            borderTop: '1px solid #eee',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>
            Questions about your order? Contact us at{' '}
            <a
              href={`mailto:${process.env.EMAIL_FROM}`}
              style={{ color: '#233f1c' }}
            >
              {process.env.EMAIL_FROM}
            </a>
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
            This email was sent from eatmilay. If you have any questions,
            please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple templates for other email types
export function ShippedOrderTemplate({
  customerName,
  orderNumber,
  trackingNumber,
  estimatedDelivery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shippingAddress,
}: {
  customerName: string;
  orderNumber: string;
  trackingNumber?: string;
  estimatedDelivery: string;
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
}) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#233f1c',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            margin: '0',
            fontSize: '28px',
            fontWeight: 'bold',
          }}
        >
          Your Order is on the Way!
        </h1>
        <p style={{ color: '#ffd469', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, your order has been shipped
        </p>
      </div>

      <div style={{ padding: '32px', backgroundColor: 'white' }}>
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#233f1c' }}>
            Order #{orderNumber}
          </h2>
          {trackingNumber && (
            <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>
              Tracking Number: <strong>{trackingNumber}</strong>
            </p>
          )}
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Estimated Delivery: {estimatedDelivery}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/track-order?tracking=${trackingNumber}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#233f1c',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Track Your Package
          </a>
        </div>
      </div>
    </div>
  );
}

export function DeliveredOrderTemplate({
  customerName,
  orderNumber,
  deliveryDate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orderItems,
}: {
  customerName: string;
  orderNumber: string;
  deliveryDate: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#28a745',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            margin: '0',
            fontSize: '28px',
            fontWeight: 'bold',
          }}
        >
          Order Delivered!
        </h1>
        <p style={{ color: 'white', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, your order has been successfully delivered
        </p>
      </div>

      <div style={{ padding: '32px', backgroundColor: 'white' }}>
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#233f1c' }}>
            Order #{orderNumber}
          </h2>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Delivered on: {new Date(deliveryDate).toLocaleDateString('en-IN')}
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ margin: '0 0 16px', fontSize: '16px' }}>
            We hope you love your new products! Please consider leaving a
            review.
          </p>

          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}/review`}
            style={{
              display: 'inline-block',
              backgroundColor: '#233f1c',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  );
}
