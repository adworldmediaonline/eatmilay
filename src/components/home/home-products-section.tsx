'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/products/product-card';
import { ProductOptionsDialog } from '@/components/products/product-options-dialog';
import { ProductsHeader } from '@/components/products/products-header';
import type { SerializedProductWithCategory, SerializedVariant, SerializedBundle } from '@/lib/serializers';
import type { ReviewAggregates } from '@/types/review';

interface ProductWithReviews extends SerializedProductWithCategory {
  reviewStats?: ReviewAggregates;
}

/**
 * Simple: Get secondary default bundle price for home page cards.
 */
function getDisplayPriceForProduct(p: ProductWithReviews): { price: number; originalPrice?: number } {
  const firstVariant = (p as { variants?: SerializedVariant[] }).variants?.[0];
  if (!firstVariant?.bundles?.length) {
    return { price: firstVariant?.price ?? p.price };
  }

  // Find secondary default bundle - use it directly
  const bundle = firstVariant.bundles.find((b) => b.isSecondaryDefault && b.active);
  if (bundle) {
    return {
      price: bundle.sellingPrice,
      originalPrice: bundle.originalPrice > bundle.sellingPrice ? bundle.originalPrice : undefined,
    };
  }

  // Fallback to primary default bundle
  const defaultBundle = firstVariant.bundles.find((b) => b.isDefault && b.active);
  if (defaultBundle) {
    return {
      price: defaultBundle.sellingPrice,
      originalPrice: defaultBundle.originalPrice > defaultBundle.sellingPrice ? defaultBundle.originalPrice : undefined,
    };
  }

  return { price: firstVariant.price ?? p.price };
}

interface HomeProductsSectionProps {
  initialProducts: ProductWithReviews[];
  initialTotal: number;
}

export default function HomeProductsSection({
  initialProducts,
  initialTotal,
}: HomeProductsSectionProps) {
  const [products, setProducts] = useState<ProductWithReviews[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotal);
  const [sortBy, setSortBy] = useState('featured');
  const [availability, setAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [optionsDialogOpen, setOptionsDialogOpen] = useState(false);
  const [optionsDialogSlug, setOptionsDialogSlug] = useState<string | null>(null);

  const openOptionsDialog = (slug: string) => {
    setOptionsDialogSlug(slug);
    setOptionsDialogOpen(true);
  };

  // Map price range to min/max prices
  const getPriceRange = (range: string): { minPrice?: number; maxPrice?: number } => {
    switch (range) {
      case 'under-500':
        return { maxPrice: 500 };
      case '500-1000':
        return { minPrice: 500, maxPrice: 1000 };
      case '1000-2000':
        return { minPrice: 1000, maxPrice: 2000 };
      case 'above-2000':
        return { minPrice: 2000 };
      default:
        return {};
    }
  };

  // Track if this is the initial mount to prevent unnecessary fetch
  const isInitialMountRef = React.useRef(true);

  // Fetch products when filters change (but not on initial mount)
  useEffect(() => {
    // Skip fetch on initial mount - use initialProducts from SSR
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (availability !== 'all') {
          params.set('availability', availability);
        }
        if (sortBy) {
          params.set('sortBy', sortBy);
        }
        const priceParams = getPriceRange(priceRange);
        if (priceParams.minPrice !== undefined) {
          params.set('minPrice', priceParams.minPrice.toString());
        }
        if (priceParams.maxPrice !== undefined) {
          params.set('maxPrice', priceParams.maxPrice.toString());
        }
        params.set('page', '1');
        params.set('limit', '12');

        const response = await fetch(`/api/products/filter?${params.toString()}`);
        const data = await response.json();

        setProducts(data.products);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [sortBy, availability, priceRange]);

  return (
    <div className="space-y-6">
      <ProductOptionsDialog
        open={optionsDialogOpen}
        onOpenChange={(open) => {
          setOptionsDialogOpen(open);
          if (!open) setOptionsDialogSlug(null);
        }}
        productSlug={optionsDialogSlug}
      />
      <ProductsHeader
        totalCount={totalCount}
        sortBy={sortBy}
        availability={availability}
        priceRange={priceRange}
        onSortChange={setSortBy}
        onAvailabilityChange={setAvailability}
        onPriceChange={setPriceRange}
      />

      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const rating = product.reviewStats?.averageRating || 0;
            const reviewCount = product.reviewStats?.totalReviews || 0;
            const { price, originalPrice } = getDisplayPriceForProduct(product);

            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price,
                  ...(originalPrice != null && { originalPrice }),
                  images: product.mainImage
                    ? [{ url: product.mainImage.url, alt: product.mainImage.altText }]
                    : [],
                  category: product.category?.name,
                  inStock: true,
                  rating: rating > 0 ? rating : undefined,
                  reviewCount: reviewCount > 0 ? reviewCount : undefined,
                }}
                showChooseOptions
                onChooseOptions={openOptionsDialog}
              />
            );
          })}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
