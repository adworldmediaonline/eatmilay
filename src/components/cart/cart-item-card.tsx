'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
      updateQuantity(item.product.id, newQuantity, item.product.variantId, item.product.bundleId);
      toast.success('Quantity updated');
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.product.id, item.product.variantId, item.product.bundleId);
    toast.success(`${item.product.name} removed from cart`);
  };

  const itemTotal = item.product.price * item.quantity;
  const isDisabled = loading || isUpdating;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border hover:border-primary/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {item.product.mainImage ? (
              <Image
                src={item.product.mainImage.url}
                alt={item.product.mainImage.altText || item.product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product Info - Flex Layout */}
          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Left: Name & Category */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.product.slug}`}
                className="group/link"
              >
                <h3 className="font-bold text-base lg:text-lg text-primary hover:text-primary/80 transition-colors line-clamp-1">
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mt-0.5">
                {item.product.category.name}
              </p>
              {item.product.excerpt && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {item.product.excerpt}
                </p>
              )}
            </div>

            {/* Center: Price */}
            <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
              <span className="text-lg font-bold text-primary">
                ₹{item.product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">each</span>
            </div>

            {/* Center-Right: Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 sm:hidden">Qty:</span>
              <div className="flex items-center border border-primary/30 rounded-lg bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10 text-white"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isDisabled || item.quantity <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>

                <div className="w-10 h-8 flex items-center justify-center font-bold text-sm text-primary">
                  {item.quantity}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10 text-white"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isDisabled}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Right: Total & Remove */}
            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">Total</span>
                <span className="text-xl font-bold text-primary">
                  ₹{itemTotal.toLocaleString()}
                </span>
              </div>

              {/* Remove Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-primary hover:bg-primary/10 hover:text-primary flex-shrink-0"
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
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
