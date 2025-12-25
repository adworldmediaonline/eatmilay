'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CartItemCard } from '@/components/cart/cart-item-card';
import { CartSummary } from '@/components/cart/cart-summary';
import { EmptyCartState } from '@/components/cart/empty-cart-state';
import {
  useCartItems,
  useCartItemCount,
  useClearCart,
  useCartLoading,
  useCartError,
} from '@/store/cart-store';
import { toast } from 'sonner';

export function CartPageContent() {
  const items = useCartItems();
  const count = useCartItemCount();
  // const total = useCartTotalPrice(); // Unused variable
  const clearCart = useClearCart();
  const loading = useCartLoading();
  const error = useCartError();

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully');
  };

  // Show error state
  if (error) {
    return (
      <Card className="p-8 text-center">
        <div className="text-red-600 mb-4">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Cart Error</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </Card>
    );
  }

  // Show empty cart state
  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Cart Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Your Items</h2>
                  <p className="text-sm text-muted-foreground">
                    {count} {count === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
              </div>

              {/* Clear Cart Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove all items from your cart?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearCart}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear Cart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Separator />
          </CardContent>
        </Card>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map(item => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>

        {/* Continue Shopping */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Summary Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
