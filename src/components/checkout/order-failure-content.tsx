'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  XCircle,
  RefreshCw,
  ArrowLeft,
  CreditCard,
  Phone,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function OrderFailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  const handleRetryPayment = () => {
    if (orderId) {
      // Redirect back to checkout with the order ID to retry payment
      window.location.href = `/checkout?retry=${orderId}`;
    } else {
      // Redirect to cart if no order ID
      window.location.href = '/cart';
    }
  };

  return (
    <div className="space-y-8">
      {/* Failure Header */}
      <Card className="text-center border-red-200 bg-gradient-to-br from-red-50 to-white">
        <CardContent className="p-8">
          <div className="relative mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-red-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-red-700 mb-6">
            We couldn't process your payment. Please try again or contact our
            support team.
          </p>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Error: {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleRetryPayment}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Payment
            </Button>

            <Link href="/cart">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Need Help?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Common Issues */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Payment Issues</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your card details</li>
                <li>• Ensure sufficient balance</li>
                <li>• Try a different payment method</li>
                <li>• Check if international payments are enabled</li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Call Support</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Speak with our support team
              </p>
              <a
                href="tel:+911234567890"
                className="text-primary hover:underline font-medium"
              >
                +91 12345 67890
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Mon-Sat, 9 AM - 6 PM
              </p>
            </div>

            {/* Email Support */}
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Send us your query
              </p>
              <a
                href="mailto:support@sumnsubstance.com"
                className="text-primary hover:underline font-medium"
              >
                support@sumnsubstance.com
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-center">
            Alternative Options
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRetryPayment}>
              Try Different Payment Method
            </Button>

            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>

            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Order Information */}
      {orderId && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Your order has been saved with ID:
              </p>
              <p className="font-mono text-lg font-semibold bg-muted px-4 py-2 rounded inline-block">
                {orderId}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                You can use this ID to retry payment or contact support
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
