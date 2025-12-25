'use client';

import { Filter, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useDebouncedCallback } from 'use-debounce';
import type { CategoryWithCount } from '@/server/queries/category';

interface ProductsFilterProps {
  categories: CategoryWithCount[];
  filters: {
    search: string;
    categories: string[];
    minPrice: number | null;
    maxPrice: number | null;
  };
  setFilters: (updates: {
    search?: string | null;
    categories?: string[] | null;
    minPrice?: number | null;
    maxPrice?: number | null;
  }) => void;
  isDrawerMode?: boolean;
}

export default function ProductsFilter({
  categories,
  filters,
  setFilters,
  isDrawerMode = false,
}: ProductsFilterProps) {
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilters({ search: value || null });
  }, 200);

  const handlePriceChange = (values: number[]) => {
    setFilters({
      minPrice: values[0] || null,
      maxPrice: values[1] || null,
    });
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const current = filters.categories || [];
    setFilters({
      categories: checked
        ? [...current, categoryId]
        : current.filter((id) => id !== categoryId) || null,
    });
  };

  const handleSearchChange = (value: string) => {
    if (isDrawerMode) {
      setFilters({ search: value });
    } else {
      debouncedSearch(value);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Filter className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Search
        </h3>
        <Input
          type="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Categories Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3 flex-1">
                <Checkbox
                  id={category.id}
                  checked={filters.categories?.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={category.id}
                  className="cursor-pointer text-sm text-gray-700 flex-1"
                >
                  {category.name}
                </Label>
                <span className="text-xs text-gray-500">
                  ({category._count.products})
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Price Range
        </h3>
        <div className="space-y-3">
          <Slider
            min={0}
            max={2000}
            step={10}
            value={[filters.minPrice || 0, filters.maxPrice || 2000]}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>₹{filters.minPrice || 0}</span>
            <span>₹{filters.maxPrice || 2000}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
