'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from 'nuqs';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import type { SerializedProductWithCategory } from '@/lib/serializers';
import type { CategoryWithCount } from '@/server/queries/category';
import type { ReviewAggregates } from '@/types/review';
import ProductsFilter from './products-filter';
import ProductsGrid from './products-grid';

interface ProductWithReviews extends SerializedProductWithCategory {
  reviewStats?: ReviewAggregates;
}

interface ProductsContentProps {
  initialProducts: ProductWithReviews[];
  categories: CategoryWithCount[];
  totalCount: number;
  hasMore: boolean;
  initialPage: number;
}

export default function ProductsContent({
  initialProducts,
  categories,
  totalCount,
  hasMore,
  initialPage,
}: ProductsContentProps) {
  const [products, setProducts] = useState<ProductWithReviews[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMoreProducts, setHasMoreProducts] = useState(hasMore);
  const [currentTotal, setCurrentTotal] = useState(totalCount);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Temporary filter state for the drawer
  const [tempFilters, setTempFilters] = useState({
    search: '',
    categories: [] as string[],
    minPrice: 0,
    maxPrice: 2000,
  });

  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  // Initialize temp filters when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      setTempFilters({
        search: filters.search || '',
        categories: filters.categories || [],
        minPrice: filters.minPrice || 0,
        maxPrice: filters.maxPrice || 2000,
      });
    }
  }, [isDrawerOpen, filters]);

  // Adapter function for temp filters
  const handleTempFiltersUpdate = (updates: {
    search?: string | null;
    categories?: string[] | null;
    minPrice?: number | null;
    maxPrice?: number | null;
  }) => {
    setTempFilters((prev) => ({
      search: updates.search !== undefined ? (updates.search || '') : prev.search,
      categories: updates.categories !== undefined ? (updates.categories || []) : prev.categories,
      minPrice: updates.minPrice !== undefined ? (updates.minPrice || 0) : prev.minPrice,
      maxPrice: updates.maxPrice !== undefined ? (updates.maxPrice || 2000) : prev.maxPrice,
    }));
  };

  // Refetch products when filters change
  useEffect(() => {
    const refetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        filters.categories.forEach((cat) => params.append('categories', cat));
        if (filters.minPrice !== null)
          params.set('minPrice', filters.minPrice.toString());
        if (filters.maxPrice !== null)
          params.set('maxPrice', filters.maxPrice.toString());
        params.set('page', '1');

        const response = await fetch(`/api/products/filter?${params.toString()}`);
        const data = await response.json();

        setProducts(data.products);
        setPage(1);
        setHasMoreProducts(data.hasMore);
        setCurrentTotal(data.totalCount);
      } catch (error) {
        console.error('Failed to refetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    // Optimized debounce for instant search feel
    const timeoutId = setTimeout(refetchProducts, 400);
    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.categories, filters.minPrice, filters.maxPrice]);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    filters.categories.forEach((cat) => params.append('categories', cat));
    if (filters.minPrice !== null)
      params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== null)
      params.set('maxPrice', filters.maxPrice.toString());
    params.set('page', nextPage.toString());

    const response = await fetch(`/api/products/filter?${params.toString()}`);
    const data = await response.json();

    setProducts([...products, ...data.products]);
    setPage(nextPage);
    setHasMoreProducts(data.hasMore);
    setLoading(false);
  };

  return (
    <>


      {/* Filter Drawer for Mobile */}
      <div className="mb-6 lg:hidden">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Filter className="h-4 w-4" />
              Filter Products
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Products</DrawerTitle>
              <DrawerDescription>
                Adjust search and filter options to find what you're looking for.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <ProductsFilter
                categories={categories}
                filters={tempFilters}
                setFilters={handleTempFiltersUpdate}
                isDrawerMode={true}
              />
            </div>
            <div className="border-t px-4 py-4 space-y-3">
              <Button
                variant="ghost"
                className="w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setTempFilters({
                    search: '',
                    categories: [],
                    minPrice: 0,
                    maxPrice: 2000,
                  });
                  // Immediately apply the cleared filters
                  setFilters({
                    search: null,
                    categories: null,
                    minPrice: null,
                    maxPrice: null,
                  });
                  setIsDrawerOpen(false);
                }}
              >
                Clear All Filters
              </Button>
              <div className="flex gap-3">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setFilters({
                      search: tempFilters.search ? tempFilters.search : null,
                      categories: tempFilters.categories.length > 0 ? tempFilters.categories : null,
                      minPrice: tempFilters.minPrice && tempFilters.minPrice !== 0 ? tempFilters.minPrice : null,
                      maxPrice: tempFilters.maxPrice && tempFilters.maxPrice !== 2000 ? tempFilters.maxPrice : null,
                    });
                    setIsDrawerOpen(false);
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <ProductsFilter
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </aside>
        <main className="lg:col-span-9">
          <ProductsGrid
            products={products}
            totalCount={currentTotal}
            hasMore={hasMoreProducts}
            loading={loading}
            onLoadMore={loadMore}
          />
        </main>
      </div>
    </>
  );
}
