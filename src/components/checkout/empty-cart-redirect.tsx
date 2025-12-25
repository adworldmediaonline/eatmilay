import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function EmptyCartRedirect() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center">
        <CardContent className="p-12">
          {/* Empty Cart Icon */}
          <div className="relative mb-8">
            <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>

          {/* Empty Cart Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You need to add some products to your cart before you can
              checkout. Browse our amazing collection and find something you
              love!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/">
              <Button
                size="lg"
                className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="h-5 w-5 mr-2" />
                Continue Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full sm:w-auto"
                >
                  Browse Products
                </Button>
              </Link>

              <Link href="/categories">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full sm:w-auto"
                >
                  View Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 pt-8 border-t border-muted">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Why Shop With Us?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <p className="font-medium">Secure Checkout</p>
                <p className="text-muted-foreground text-xs">
                  SSL encrypted & secure payment
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">🚚</span>
                </div>
                <p className="font-medium">Fast Delivery</p>
                <p className="text-muted-foreground text-xs">
                  Free shipping over ₹500
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold">💳</span>
                </div>
                <p className="font-medium">Multiple Payment Options</p>
                <p className="text-muted-foreground text-xs">
                  Cards, UPI, Wallets & more
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
