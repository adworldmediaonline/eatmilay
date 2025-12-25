import { Suspense } from 'react';
import { getFilteredProducts } from '@/server/queries/product';
import { getCategories } from '@/server/queries/category';
import { getReviewAggregates } from '@/server/queries/review';
import ProductsSkeleton from './products-skeleton';
import ProductsContent from './products-content';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    categories?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  return (

    <div className="container mx-auto px-4 py-20">
      <Breadcrumb className="mb-6 hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsPageWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ProductsPageWrapper({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    categories?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const categoriesData = await getCategories();

  const filters = {
    search: params.search,
    categoryIds: Array.isArray(params.categories)
      ? params.categories
      : params.categories
        ? [params.categories]
        : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    page: params.page ? Number(params.page) : 1,
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

  return (
    <ProductsContent
      initialProducts={productsWithReviews}
      categories={categoriesData}
      totalCount={totalCount}
      hasMore={hasMore}
      initialPage={filters.page}
    />
  );
}
