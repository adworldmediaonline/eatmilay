'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface OrderData {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  paymentStatus: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
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
}

export function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get('orderId');

  const fetchOrderData = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      const data = await response.json();
      setOrderData(data.data);
    } catch {
      console.error('Error fetching order');
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID not found');
      setLoading(false);
      return;
    }

    fetchOrderData();
  }, [orderId, fetchOrderData]);

  const handleDownloadReceipt = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/receipt`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${orderData?.orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Receipt downloaded successfully');
    } catch {
      toast.error('Failed to download receipt');
    }
  };

  const handleShare = () => {
    if (navigator.share && orderData) {
      navigator.share({
        title: `Order Confirmation - ${orderData.orderNumber}`,
        text: `I just placed an order with SumnSubstance! Order #${orderData.orderNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Order link copied to clipboard');
    }
  };

  if (loading) {
    return <OrderSuccessSkeleton />;
  }

  if (error || !orderData) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <div className="text-red-600 mb-4">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => router.push('/')} variant="outline">
            Return Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <Card className="text-center border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardContent className="p-8">
          <div className="relative mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-green-700 mb-4">
            Thank you for your order. We've received your payment and will
            process your order shortly.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 text-sm px-4 py-2"
            >
              Order #{orderData.orderNumber}
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              {orderData.paymentStatus === 'COMPLETED'
                ? 'Payment Confirmed'
                : 'Payment Pending'}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Number</p>
                <p className="font-medium">{orderData.orderNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Amount</p>
                <p className="font-medium text-lg">
                  ₹{orderData.total.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Order Status</p>
                <Badge variant="secondary">{orderData.status}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Status</p>
                <Badge
                  variant={
                    orderData.paymentStatus === 'COMPLETED'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {orderData.paymentStatus}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground text-sm mb-2">
                Estimated Delivery
              </p>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="font-medium">
                  {orderData.estimatedDelivery}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {orderData.shippingAddress.fullName}
              </p>
              <p>{orderData.shippingAddress.addressLine1}</p>
              {orderData.shippingAddress.addressLine2 && (
                <p>{orderData.shippingAddress.addressLine2}</p>
              )}
              <p>
                {orderData.shippingAddress.city},{' '}
                {orderData.shippingAddress.state}{' '}
                {orderData.shippingAddress.postalCode}
              </p>
              <p>{orderData.shippingAddress.country}</p>
              <p className="text-muted-foreground">
                Phone: {orderData.shippingAddress.phone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="font-medium">
                  ₹{item.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Email Confirmation</h4>
              <p className="text-sm text-muted-foreground">
                Check your email for order confirmation and tracking details
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Order Processing</h4>
              <p className="text-sm text-muted-foreground">
                We'll prepare your order and notify you when it ships
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Track Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Track your package in real-time once it's shipped
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/orders/${orderData.orderNumber}`}>
          <Button className="w-full sm:w-auto">
            <Package className="h-4 w-4 mr-2" />
            Track Order
          </Button>
        </Link>

        <Link href="/">
          <Button variant="outline" className="w-full sm:w-auto">
            Continue Shopping
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Skeleton component for loading state
function OrderSuccessSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="mx-auto w-20 h-20 bg-muted rounded-full"></div>
            <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            <div className="flex justify-center gap-4">
              <div className="h-8 bg-muted rounded w-32"></div>
              <div className="h-8 bg-muted rounded w-32"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
