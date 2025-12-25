import { NextRequest, NextResponse } from 'next/server';
import { getFilteredProducts } from '@/server/queries/product';
import { getReviewAggregates } from '@/server/queries/review';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters = {
    search: searchParams.get('search') || undefined,
    categoryIds: searchParams.getAll('categories') || undefined,
    minPrice: searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: 12,
  };

  const { products, totalCount, hasMore } = await getFilteredProducts(filters);

  // Fetch review aggregates for each product
  const productsWithReviews = await Promise.all(
    products.map(async (product) => {
      const reviewAggregates = await getReviewAggregates(product.id);
      return {
        ...product,
        reviewStats: reviewAggregates,
      };
    })
  );

  return NextResponse.json({
    products: productsWithReviews,
    totalCount,
    hasMore,
  });
}
