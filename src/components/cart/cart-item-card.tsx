'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import type { CartItem } from '@/types/cart';
import {
  useUpdateQuantity,
  useRemoveItem,
  useCartLoading,
} from '@/store/cart-store';
import { toast } from 'sonner';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updateQuantity = useUpdateQuantity();
  const removeItem = useRemoveItem();
  const loading = useCartLoading();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      updateQuantity(item.product.id, newQuantity);
      toast.success('Quantity updated');
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.product.id);
    toast.success(`${item.product.name} removed from cart`);
  };

  const itemTotal = item.product.price * item.quantity;
  const isDisabled = loading || isUpdating;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Top Row: Product Info */}
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              {item.product.mainImage ? (
                <Image
                  src={item.product.mainImage.url}
                  alt={item.product.mainImage.altText || item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="group/link"
                  >
                    <h3 className="font-semibold text-lg leading-tight group-hover/link:text-primary transition-colors duration-200 flex items-center gap-2">
                      {item.product.name}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.product.category.name}
                    </Badge>
                  </div>

                  {item.product.excerpt && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {item.product.excerpt}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
                      disabled={isDisabled}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove "{item.product.name}"
                        from your cart?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRemoveItem}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Price Information */}
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">each</span>
                </div>

                {item.quantity > 1 && (
                  <div className="text-sm text-muted-foreground">
                    Total:{' '}
                    <span className="font-semibold text-foreground">
                      ₹{itemTotal.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Quantity Controls and Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-muted">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Quantity:
              </span>

              {/* Quantity Controls */}
              <div className="flex items-center border-2 border-muted rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-none hover:bg-muted border-r"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isDisabled || item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="w-16 h-10 flex items-center justify-center font-semibold bg-background">
                  {item.quantity}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-none hover:bg-muted border-l"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isDisabled}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Save for Later / Wishlist - Placeholder for future feature */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={isDisabled}
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Save for Later</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
