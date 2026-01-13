'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsHeaderProps {
  totalCount: number;
  sortBy?: string;
  availability?: string;
  priceRange?: string;
  onAvailabilityChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onPriceChange?: (value: string) => void;
}

export function ProductsHeader({
  totalCount,
  sortBy = 'featured',
  availability = 'all',
  priceRange = 'all',
  onAvailabilityChange,
  onSortChange,
  onPriceChange,
}: ProductsHeaderProps) {
  const getPriceDisplay = (range: string) => {
    switch (range) {
      case 'under-500':
        return 'Under ₹500';
      case '500-1000':
        return '₹500 - ₹1000';
      case '1000-2000':
        return '₹1000 - ₹2000';
      case 'above-2000':
        return 'Above ₹2000';
      default:
        return 'Price';
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6 pb-4 border-b">
      {/* Filter and Sort Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Left: Filter Options */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1">
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline-block shrink-0">
            Filter:
          </span>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1">
            <Select value={availability} onValueChange={onAvailabilityChange}>
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Availability</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={onPriceChange}>
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-xs sm:text-sm">
                <SelectValue placeholder={getPriceDisplay(priceRange)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Price</SelectItem>
                <SelectItem value="under-500">Under ₹500</SelectItem>
                <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                <SelectItem value="above-2000">Above ₹2000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right: Sort & Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline-block shrink-0">
            Sort by:
          </span>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap shrink-0 text-center sm:text-left">
              {totalCount} product{totalCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
