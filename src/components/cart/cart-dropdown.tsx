'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  useCartItemCount,
  useCartItems,
  useCartTotalPrice,
  useClearCart,
  useRemoveItem,
  useUpdateQuantity,
} from '@/store/cart-store';
import type { CartItem } from '@/types/cart';
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Individual cart item component
function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
  disabled,
}: {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="p-2 hover:bg-muted/30 rounded-lg transition-colors">
      <div className="flex items-start gap-2">
        {/* Product Image */}
        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
          {item.product.mainImage ? (
            <Image
              src={item.product.mainImage.url}
              alt={item.product.mainImage.altText || item.product.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Product Info & Controls */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Name and Remove */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-primary">
                {item.product.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.product.category.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-primary/10 hover:text-white flex-shrink-0"
              onClick={onRemove}
              disabled={disabled}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </span>
            <div className="flex items-center border border-primary/20 rounded-md bg-white">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-primary/10 text-white"
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={disabled || item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-2 text-sm font-semibold min-w-[2rem] text-center text-primary">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-primary/10 text-white"
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                disabled={disabled}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main cart dropdown component
export function CartDropdown({ className, isScrolled }: { className?: string; isScrolled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const items = useCartItems();
  const itemCount = useCartItemCount();
  const totalPrice = useCartTotalPrice();
  const updateQuantity = useUpdateQuantity();
  const removeItem = useRemoveItem();
  const clearCart = useClearCart();

  // Prevent hydration mismatch by only showing cart data after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative p-2 transition-colors duration-300 ${isScrolled
            ? 'text-primary hover:text-primary/80 hover:bg-gray-100'
            : 'text-white hover:text-white/80 hover:bg-white/10'
            } ${className}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {isHydrated && itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-white text-primary hover:bg-white/90"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] max-w-[calc(100vw-1rem)]"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-primary">Shopping Cart</h3>
            {isHydrated && items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-white hover:bg-primary/10 h-8 px-2 -mr-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          {!isHydrated ? (
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-32 mx-auto mb-4"></div>
                <div className="h-10 bg-muted rounded w-40 mx-auto"></div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild onClick={() => setIsOpen(false)} className="bg-primary hover:bg-primary/90">
                <Link href="/">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="max-h-[320px] -mx-4 px-4">
                <div className="space-y-2 pr-2">
                  {items.map(item => (
                    <CartItemComponent
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={quantity =>
                        handleUpdateQuantity(item.product.id, quantity)
                      }
                      onRemove={() => handleRemoveItem(item.product.id)}
                    />
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-3" />

              {/* Cart Summary */}
              {isHydrated && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-semibold text-sm text-gray-700">
                      Total ({itemCount} item{itemCount !== 1 ? 's' : ''})
                    </span>
                    <span className="font-bold text-xl text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-white h-11"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/cart" className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        View Cart
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-11"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/checkout" className="flex items-center justify-center">
                        Checkout
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
