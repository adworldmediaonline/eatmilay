'use client';

import { useState } from 'react';
import { Search, Loader2, Package, MapPin, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  getOrderStatusColor,
  getPaymentStatusColor,
} from '@/lib/utils/order-client-utils';

interface ShiprocketTrackingData {
  tracking_data: {
    shipment_status: number;
    shipment_track: Array<{
      current_status: string;
      current_status_code: string;
      current_timestamp: string;
      awb_code: string;
      courier_name: string;
      etd: string;
    }>;
    shipment_track_activities: Array<{
      date: string;
      status: string;
      activity: string;
      location: string;
    }>;
  };
}

interface OrderTrackingData {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod?: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shiprocketOrderId?: string | null;
  shiprocketShipmentId?: string | null;
  channelOrderId?: string | null;
  shiprocketTracking?: ShiprocketTrackingData | null;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    product?: {
      id: string;
      name: string;
      slug: string;
      mainImage?: {
        url: string;
        altText?: string;
      };
    };
  }>;
  customer: {
    name: string;
    email: string;
    isGuest: boolean;
  };
}

interface TrackOrderDialogProps {
  trigger?: React.ReactNode;
  mobileTrigger?: React.ReactNode;
}

export function TrackOrderDialog({ trigger, mobileTrigger }: TrackOrderDialogProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [shipmentId, setShipmentId] = useState('');
  const [trackBy, setTrackBy] = useState<'orderNumber' | 'shipmentId'>('shipmentId'); // Default to shipment_id
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderTrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTrackOrder = async () => {
    if (trackBy === 'shipmentId' && !shipmentId.trim()) {
      setError('Please enter a shipment ID');
      return;
    }

    if (trackBy === 'orderNumber' && !orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      let response;
      if (trackBy === 'shipmentId') {
        // Track directly using Shiprocket shipment_id
        response = await fetch(`/api/orders/track?shipmentId=${encodeURIComponent(shipmentId.trim())}`);
      } else {
        // Use order number for tracking
        response = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch order');
      }

      if (data.success && data.data) {
        // If tracking by shipment_id, data structure is different
        if (trackBy === 'shipmentId' && data.data.shiprocketTracking) {
          // Create a minimal order object for shipment_id tracking
          setOrder({
            id: '',
            orderNumber: `Shipment: ${shipmentId}`,
            status: 'SHIPPED',
            paymentStatus: 'COMPLETED',
            total: 0,
            subtotal: 0,
            shipping: 0,
            tax: 0,
            discount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shiprocketTracking: data.data.shiprocketTracking,
            shippingAddress: {
              name: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              pincode: '',
              country: '',
            },
            items: [],
            customer: {
              name: '',
              email: '',
              isGuest: true,
            },
          });
        } else {
          setOrder(data.data);
        }

        // Log tracking info for debugging
        if (data.data.shiprocketTracking) {
          console.log('Shiprocket tracking data received:', data.data.shiprocketTracking);
        } else {
          console.log('No Shiprocket tracking data available yet. Order may not be shipped.');
        }
      } else {
        throw new Error(trackBy === 'shipmentId' ? 'Shipment not found' : 'Order not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track order. Please check your order number.';
      setError(errorMessage);
      console.error('Track order error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };

  const resetDialog = () => {
    setOrderNumber('');
    setShipmentId('');
    setTrackBy('shipmentId'); // Reset to shipment_id by default
    setOrder(null);
    setError(null);
  };

  const defaultTrigger = (
    <Button
      variant="outline"
      size="sm"
      className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-muted"
    >
      <Package className="w-4 h-4" />
      <span>Track Order</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        resetDialog();
      }
    }}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      )}
      {mobileTrigger && (
        <div className="sm:hidden" onClick={() => setIsOpen(true)}>
          {mobileTrigger}
        </div>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Track Your Order</DialogTitle>
          <DialogDescription>
            Enter your shipment ID or order number to track your order status and delivery details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Track By Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={trackBy === 'shipmentId' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setTrackBy('shipmentId');
                setError(null);
                setOrder(null);
              }}
            >
              Shipment ID
            </Button>
            <Button
              type="button"
              variant={trackBy === 'orderNumber' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setTrackBy('orderNumber');
                setError(null);
                setOrder(null);
              }}
            >
              Order Number
            </Button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor={trackBy === 'shipmentId' ? 'shipmentId' : 'orderNumber'}>
              {trackBy === 'shipmentId' ? 'Shipment ID' : 'Order Number'}
            </Label>
            <div className="flex gap-2">
              {trackBy === 'shipmentId' ? (
                <Input
                  id="shipmentId"
                  placeholder="e.g., 1123414531"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
              ) : (
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-20260110-000008"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
              )}
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading || (trackBy === 'shipmentId' ? !shipmentId.trim() : !orderNumber.trim())}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Tracking...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Track</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Order Details */}
          {order && (
            <div className="space-y-4 pt-4">
              <Separator />

              {/* Order Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Badge className={getOrderStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>

              {/* Status Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Order Status</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    {order.trackingNumber && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                    {order.estimatedDelivery && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Est. Delivery: {order.estimatedDelivery}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                    {order.paymentMethod && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {order.paymentMethod.toUpperCase()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Shiprocket Real-time Tracking */}
              {order.shiprocketTracking && order.shiprocketTracking.tracking_data && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Real-time Tracking (Shiprocket)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {order.shiprocketTracking.tracking_data.shipment_track &&
                      order.shiprocketTracking.tracking_data.shipment_track.length > 0 && (
                        <div className="space-y-3">
                          {order.shiprocketTracking.tracking_data.shipment_track.map((track, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                              <div className="mt-0.5">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold">{track.current_status}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(track.current_timestamp).toLocaleString('en-IN')}
                                </p>
                                {track.courier_name && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Courier: {track.courier_name}
                                  </p>
                                )}
                                {track.awb_code && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    AWB: {track.awb_code}
                                  </p>
                                )}
                                {track.etd && (
                                  <p className="text-xs text-primary font-medium mt-1">
                                    Est. Delivery: {track.etd}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Tracking Activities Timeline */}
                    {order.shiprocketTracking.tracking_data.shipment_track_activities &&
                      order.shiprocketTracking.tracking_data.shipment_track_activities.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase">Tracking History</h4>
                          <div className="space-y-2">
                            {order.shiprocketTracking.tracking_data.shipment_track_activities.map((activity, index) => (
                              <div key={index} className="flex items-start gap-3 pl-4 border-l-2 border-primary/20">
                                <div className="mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <div className="flex-1 pb-3">
                                  <p className="text-xs font-medium">{activity.status}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{activity.activity}</p>
                                  {activity.location && (
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      📍 {activity.location}
                                    </p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(activity.date).toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {(!order.shiprocketTracking.tracking_data.shipment_track ||
                      order.shiprocketTracking.tracking_data.shipment_track.length === 0) &&
                      (!order.shiprocketTracking.tracking_data.shipment_track_activities ||
                        order.shiprocketTracking.tracking_data.shipment_track_activities.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No tracking updates available yet. Please check back later.
                        </p>
                      )}
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {order.status === 'PROCESSING' && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Processing</p>
                        <p className="text-xs text-muted-foreground">Your order is being prepared</p>
                      </div>
                    </div>
                  )}

                  {order.shippedAt && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Shipped</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.shippedAt).toLocaleString('en-IN')}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {order.deliveredAt && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.deliveredAt).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        {item.product?.mainImage && (
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.product.mainImage.url}
                              alt={item.product.mainImage.altText || item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            ₹{item.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                    <p className="text-muted-foreground">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                    </p>
                    <p className="text-muted-foreground">{order.shippingAddress.country}</p>
                    <p className="text-muted-foreground mt-2">Phone: {order.shippingAddress.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{order.subtotal.toLocaleString()}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-green-600">-₹{order.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹{order.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{order.tax.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
