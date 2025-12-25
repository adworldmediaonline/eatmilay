import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function EmptyCartState() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center">
        <CardContent className="p-12">
          {/* Empty Cart Icon */}
          <div className="relative mb-8">
            <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />

              {/* Floating sparkles */}
              <div className="absolute -top-2 -right-2 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary/60" />
              </div>
              <div className="absolute -bottom-1 -left-1 animate-pulse delay-300">
                <Heart className="h-4 w-4 text-pink-400/60" />
              </div>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              exploring our amazing products and find something you love!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/">
              <Button
                size="lg"
                className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
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
                <p className="font-medium">Quality Products</p>
                <p className="text-muted-foreground text-xs">
                  Premium quality guaranteed
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
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground text-xs">
                  Safe & secure checkout
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
