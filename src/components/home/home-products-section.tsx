'use client';

import { useState, useEffect } from 'react';
import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';
import ProductCard from '@/components/products/product-card';
import { ProductsHeader } from '@/components/products/products-header';
import type { SerializedProductWithCategory } from '@/lib/serializers';
import type { ReviewAggregates } from '@/types/review';

interface ProductWithReviews extends SerializedProductWithCategory {
  reviewStats?: ReviewAggregates;
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
  const addItem = useAddItem();

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

  // Fetch products when filters change
  useEffect(() => {
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

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      excerpt: product.excerpt || undefined,
      mainImage: product.mainImage,
      category: product.category,
    };

    addItem(cartProduct, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6">
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

            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  images: product.mainImage
                    ? [{ url: product.mainImage.url, alt: product.mainImage.altText }]
                    : [],
                  category: product.category?.name,
                  inStock: true,
                  rating: rating > 0 ? rating : undefined,
                  reviewCount: reviewCount > 0 ? reviewCount : undefined,
                }}
                onAddToCart={handleAddToCart}
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
