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
    <div className="p-3 hover:bg-muted/50 rounded-lg transition-colors space-y-2">
      {/* Top Row: Image, Info, and Remove Button */}
      <div className="flex items-center gap-3">
        {/* Product Image */}
        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
          {item.product.mainImage ? (
            <Image
              src={item.product.mainImage.url}
              alt={item.product.mainImage.altText || item.product.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
          <p className="text-xs text-muted-foreground">
            {item.product.category.name}
          </p>
          <p className="text-sm font-medium">
            ₹{item.product.price.toLocaleString()}
          </p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive flex-shrink-0"
          onClick={onRemove}
          disabled={disabled}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Bottom Row: Quantity Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            disabled={disabled || item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 text-sm font-medium min-w-[2.5rem] text-center">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            disabled={disabled}
          >
            <Plus className="h-4 w-4" />
          </Button>
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
          className={`relative p-2 transition-colors duration-300 ${
            isScrolled
              ? 'text-gray-700 hover:text-[hsl(var(--primary))] hover:bg-gray-100'
              : 'text-white hover:text-[#ffffff] hover:bg-white/10'
          } ${className}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {isHydrated && itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-[#ffffff] text-[hsl(var(--primary))] hover:bg-[#ffffff]/90"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 max-w-[90vw]"
        sideOffset={8}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
            {isHydrated && items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

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
              <Button asChild onClick={() => setIsOpen(false)}>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="max-h-[400px]">
                <div className="space-y-2">
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

              <Separator className="my-4" />

              {/* Cart Summary */}
              {isHydrated && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      Total ({itemCount} item{itemCount !== 1 ? 's' : ''})
                    </span>
                    <span className="font-bold text-lg">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/cart">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Cart
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/checkout">Checkout</Link>
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
