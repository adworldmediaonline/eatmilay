'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  CreditCard,
  Shield,
  Truck,
  ArrowRight,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  useCartItems,
  useCartItemCount,
  useCartTotalPrice,
  useCartLoading,
} from '@/store/cart-store';
import { toast } from 'sonner';

export function CartSummary() {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const items = useCartItems();
  const count = useCartItemCount();
  const subtotal = useCartTotalPrice();
  const loading = useCartLoading();

  // Calculate total (GST and shipping managed from dashboard)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount if promo applied
  const total = subtotal - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock promo code validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      toast.success('Promo code applied! You saved 10%');
    } else {
      toast.error('Invalid promo code');
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoCode('');
    toast.success('Promo code removed');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>
              Subtotal ({count} {count === 1 ? 'item' : 'items'})
            </span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>


          {promoApplied && (
            <div className="flex justify-between text-sm text-green-600">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Discount (SAVE10)
              </span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Promo Code</span>
          </div>

          {!promoApplied ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="text-sm"
                disabled={loading || isApplyingPromo}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={loading || isApplyingPromo || !promoCode.trim()}
              >
                {isApplyingPromo ? 'Applying...' : 'Apply'}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {promoCode.toUpperCase()}
                </Badge>
                <span className="text-sm text-green-700">Applied</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePromo}
                className="text-green-700 hover:text-green-800"
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Checkout Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
            asChild
          >
            <Link href="/checkout">
              <CreditCard className="h-5 w-5 mr-2" />
              Proceed to Checkout
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>

          <Link href="/" className="block">
            <Button variant="outline" className="w-full" disabled={loading}>
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">
            Why shop with us?
          </h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Secure payment & data protection</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span>Fast & reliable shipping</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>Multiple payment options available</span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
