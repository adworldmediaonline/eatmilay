# Shiprocket Integration

This module provides integration with Shiprocket courier delivery service for order fulfillment and tracking.

## Features

- ✅ **Authentication**: Automatic token management with 10-day caching
- ✅ **Order Creation**: Create orders in Shiprocket after payment confirmation
- ✅ **Order Tracking**: Track shipment status
- ✅ **Order Cancellation**: Cancel orders in Shiprocket
- ✅ **Error Handling**: Comprehensive error handling with graceful fallbacks
- ✅ **Type Safety**: Full TypeScript support with validation schemas

## Setup

### Environment Variables

Add these to your `.env` file:

```env
SHIPROCKET_API_URL=https://apiv2.shiprocket.in
SHIPROCKET_API_EMAIL=your-email@example.com
SHIPROCKET_API_PASSWORD=your-password
```

### Pickup Location

Make sure you have configured a pickup location in your Shiprocket dashboard. The default pickup location name is `"Primary"`, but you can specify a custom name when creating orders.

## Usage

### Automatic Order Creation

Orders are automatically created in Shiprocket when payment is confirmed. This happens in the payment verification flow (`/api/payments/verify`).

### Manual Order Creation

```typescript
import { createShiprocketOrder } from '@/app/actions/shiprocket';

const result = await createShiprocketOrder({
  orderId: 'order-id-here',
  pickupLocation: 'Primary', // Optional, defaults to 'Primary'
});

if (result.success) {
  console.log('Shipment ID:', result.data.shipmentId);
  console.log('AWB Code:', result.data.awbCode);
}
```

### Track Order

```typescript
import { trackShiprocketOrder } from '@/app/actions/shiprocket';

const result = await trackShiprocketOrder(shipmentId);

if (result.success) {
  console.log('Tracking data:', result.data);
}
```

### Cancel Order

```typescript
import { cancelShiprocketOrder } from '@/app/actions/shiprocket';

const result = await cancelShiprocketOrder(shipmentId, 'Cancellation reason');

if (result.success) {
  console.log('Order cancelled successfully');
}
```

## API Routes

### Create Shiprocket Order

```bash
POST /api/shiprocket/orders/create
Content-Type: application/json

{
  "orderId": "order-id",
  "pickupLocation": "Primary" // Optional
}
```

## Order Data Mapping

The integration automatically maps your order data to Shiprocket format:

- **Order ID**: Uses your order number
- **Customer Details**: Extracted from shipping address
- **Order Items**: Converted with SKU, name, quantity, and price
- **Payment Method**: Mapped from your payment method (COD/Prepaid)
- **Package Dimensions**: Default values (can be customized per product)

## Error Handling

The integration handles various error scenarios:

1. **Authentication Failures**: Automatically retries with new token
2. **Validation Errors**: Returns detailed validation messages
3. **Network Errors**: Graceful error messages
4. **API Errors**: Parses Shiprocket error responses

### Non-Blocking Integration

Shiprocket order creation is **non-blocking** in the payment flow. If Shiprocket fails, the payment verification still succeeds. This ensures:

- Payment is never blocked by shipping service issues
- Orders can be manually created later if needed
- Better user experience

## Token Management

- Tokens are cached for 10 days
- Automatic refresh 1 hour before expiry
- Token cache is cleared on authentication errors
- Manual cache clearing available via `shiprocketClient.clearTokenCache()`

## Requirements

- Products must have SKU (or will use fallback format: `PROD-{productId}`)
- Shipping address must be complete and valid
- Order must have at least one item
- Payment must be confirmed before creating Shiprocket order

## Troubleshooting

### Authentication Fails

1. Check environment variables are set correctly
2. Verify credentials in Shiprocket dashboard
3. Check API URL is correct

### Order Creation Fails

1. Verify all required fields are present
2. Check product SKUs are set
3. Validate shipping address format
4. Ensure pickup location exists in Shiprocket

### Token Expired

Tokens are automatically refreshed. If you see token errors:
1. Clear token cache: `shiprocketClient.clearTokenCache()`
2. Check credentials are correct
3. Verify API URL is accessible

## Best Practices

1. **Always handle errors**: Shiprocket operations can fail, always check `result.success`
2. **Use try-catch**: Wrap Shiprocket calls in try-catch blocks
3. **Log errors**: Log failures for debugging but don't block user flow
4. **Monitor orders**: Track Shiprocket order status regularly
5. **Update tracking**: Store AWB codes in your order tracking number field

## Future Enhancements

- [ ] Webhook support for order status updates
- [ ] Bulk order creation
- [ ] Rate calculation API
- [ ] Label generation
- [ ] Multi-pickup location support
