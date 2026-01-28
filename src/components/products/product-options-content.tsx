'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BundleSelector } from '@/components/products/bundle-selector';
import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import type { SerializedProductWithCategory } from '@/server/queries/product';
import type { SerializedVariant, SerializedBundle } from '@/lib/serializers';

export interface ProductOptionsContentProps {
  product: SerializedProductWithCategory;
  /** 'inline' = no header (e.g. detail page); 'dialog' = compact header + link to product */
  variant?: 'inline' | 'dialog';
  showBuyNow?: boolean;
  onAfterAddToCart?: () => void;
  /** Optional id for the root element (e.g. add-to-cart-section). */
  id?: string;
}

export function ProductOptionsContent({
  product,
  variant = 'inline',
  showBuyNow = true,
  onAfterAddToCart,
  id,
}: ProductOptionsContentProps) {
  const addItem = useAddItem();
  const router = useRouter();

  const variants = (product as any).variants || [];
  const enableBundlePricing = !!(product as any).enableBundlePricing;

  const getDefaultBundle = (v: SerializedVariant | null): SerializedBundle | null => {
    if (!v?.bundles?.length) return null;
    return v.bundles.find((b) => b.isDefault) || v.bundles[0] || null;
  };

  const firstVariant = variants.length > 0 ? variants[0] : null;
  const initialDefaultBundle = enableBundlePricing ? getDefaultBundle(firstVariant) : null;

  const [selectedVariant, setSelectedVariant] = useState<SerializedVariant | null>(firstVariant);
  const [selectedBundle, setSelectedBundle] = useState<SerializedBundle | null>(initialDefaultBundle);
  const [quantity, setQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState(() => {
    if (initialDefaultBundle) return initialDefaultBundle.sellingPrice;
    if (firstVariant) return firstVariant.price;
    return product.price;
  });

  useEffect(() => {
    if (selectedBundle) {
      setDisplayPrice(selectedBundle.sellingPrice);
      setQuantity(1);
    } else if (selectedVariant) {
      setDisplayPrice(selectedVariant.price);
      setQuantity(1);
    } else {
      setDisplayPrice(product.price);
      setQuantity(1);
    }
  }, [selectedBundle, selectedVariant, product.price]);

  const handleAddToCart = () => {
    const finalPrice = selectedBundle ? selectedBundle.sellingPrice : displayPrice;
    const productName = selectedVariant
      ? `${product.name} - ${selectedVariant.name}`
      : product.name;
    const bundleLabel = selectedBundle ? ` (${selectedBundle.label})` : '';

    let cartPrice = finalPrice;
    let cartQuantity = quantity;

    if (selectedBundle) {
      cartPrice = selectedBundle.sellingPrice / selectedBundle.quantity;
      cartQuantity = selectedBundle.quantity * quantity;
    }

    const cartProduct = {
      id: product.id,
      name: productName + bundleLabel,
      slug: product.slug,
      price: cartPrice,
      excerpt: product.excerpt || undefined,
      mainImage: product.mainImage,
      category: product.category,
      bundleId: selectedBundle?.id,
      variantId: selectedVariant?.id,
    };

    addItem(cartProduct, cartQuantity);
    const quantityText = selectedBundle
      ? `${cartQuantity} ${cartQuantity === 1 ? 'unit' : 'units'} (${quantity} ${quantity === 1 ? 'pack' : 'packs'})`
      : `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
    toast.success(`${productName}${bundleLabel} - ${quantityText} added to cart!`);
    onAfterAddToCart?.();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const mainImage = product.mainImage;
  const isDialog = variant === 'dialog';

  const formContent = (
    <>
      {isDialog && (
        <div className="flex gap-4 pb-4 border-b border-gray-200">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {mainImage?.url && (
              <Image
                src={mainImage.url}
                alt={mainImage.altText || product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-lg font-bold text-primary line-clamp-2">{product.name}</h2>
            {product.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">{product.excerpt}</p>
            )}
            <Link
              href={`/products/${product.slug}`}
              className="text-sm font-medium text-primary hover:underline mt-2 inline-block"
            >
              View full details →
            </Link>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary">
            ₹{displayPrice.toFixed(2)}
          </span>
          {selectedBundle && selectedBundle.originalPrice > selectedBundle.sellingPrice && (
            <span className="text-lg sm:text-xl text-gray-400 line-through">
              ₹{selectedBundle.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {selectedBundle && selectedBundle.savingsAmount > 0 && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs sm:text-sm font-semibold text-green-700">
            Save ₹{selectedBundle.savingsAmount.toFixed(2)}
          </div>
        )}
        {!selectedBundle && selectedVariant && (
          <span className="text-sm text-gray-500">Per {selectedVariant.name.toLowerCase()}</span>
        )}
      </div>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="space-y-3 pb-2">
          <Label className="text-base font-semibold text-gray-900">Select Size/Variant:</Label>
          <div className="flex flex-wrap gap-2.5">
            {variants.map((v: SerializedVariant) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setSelectedVariant(v);
                    const def = enableBundlePricing ? getDefaultBundle(v) : null;
                    setSelectedBundle(def);
                    if (def) setQuantity(1);
                  }}
                  className={`px-5 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${isSelected
                    ? 'border-primary bg-primary text-white shadow-md shadow-primary/30 scale-105'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary/50 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bundle & Save */}
      {selectedVariant && enableBundlePricing && (
        <div className="pt-2">
          <BundleSelector
            key={selectedVariant.id}
            variant={selectedVariant}
            selectedBundleId={selectedBundle?.id}
            onBundleSelect={(bundle) => {
              setSelectedBundle(bundle);
              setQuantity(1);
            }}
          />
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700 text-sm sm:text-base">
            {selectedBundle ? 'Number of Packs:' : 'Quantity:'}
          </span>
          {selectedBundle && (
            <span className="text-xs text-gray-500">
              {selectedBundle.quantity} {selectedBundle.quantity === 1 ? 'unit' : 'units'} per pack
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5 w-fit">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-16 text-center">
            <span className="text-xl font-bold text-primary">{quantity}</span>
            {selectedBundle && (
              <div className="text-[10px] text-gray-500 mt-0.5">
                ({quantity * selectedBundle.quantity} {quantity * selectedBundle.quantity === 1 ? 'unit' : 'units'} total)
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg bg-white hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  const actionsBar = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="bg-primary hover:bg-primary text-white py-3 font-bold rounded-xl"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
      {showBuyNow && (
        <Button
          onClick={handleBuyNow}
          variant="outline"
          size="lg"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 font-bold rounded-xl"
        >
          Buy Now
        </Button>
      )}
    </div>
  );

  if (isDialog) {
    return (
      <div id={id} className="flex flex-col h-full min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-4 pr-2">
          {formContent}
        </div>
        <div className="shrink-0 pt-4 border-t bg-background mt-4">
          {actionsBar}
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="space-y-4">
      {formContent}
      <div className="pt-2">{actionsBar}</div>
    </div>
  );
}
