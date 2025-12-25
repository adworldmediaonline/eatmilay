'use client';

import Image from 'next/image';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  User,
  FileText,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SerializedOrderWithDetails } from '@/types/order';
import {
  getOrderStatusColor,
  getPaymentStatusColor,
} from '@/lib/utils/order-client-utils';
import { OrderActions } from './order-actions';

interface OrderDetailsContentProps {
  order: SerializedOrderWithDetails;
}

export function OrderDetailsContent({ order }: OrderDetailsContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
            <p className="text-muted-foreground">
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
        </div>
        <OrderActions order={order} />
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Status
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
              {order.paymentStatus}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              {order.paymentMethod?.toUpperCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{order.total.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {order.items.length} item{order.items.length > 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                {item.product.mainImage && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={item.product.mainImage.url}
                      alt={item.product.mainImage.altText || item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
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

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0
                    ? 'FREE'
                    : `₹${order.shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (GST)</span>
                <span>₹{order.tax.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">
                    {order.user?.name || order.guestName || 'Guest User'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.user?.email || order.guestEmail || 'No email'}
                  </p>
                  {!order.userId && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Guest User
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-muted-foreground">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order Placed</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {order.shippedAt && (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order Shipped</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.shippedAt).toLocaleString('en-IN')}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-blue-600">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {order.deliveredAt && (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order Delivered</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.deliveredAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}

                {!order.deliveredAt && order.estimatedDelivery && (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Estimated Delivery
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Order Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {order.notes}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
