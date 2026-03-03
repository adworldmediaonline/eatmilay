import { connection } from 'next/server';
import { Suspense } from 'react';
import { getFilteredProducts } from '@/server/queries/product';
import { getReviewAggregates } from '@/server/queries/review';
import HomeProductsSection from '../../components/home/home-products-section';

async function HomeContent() {
  await connection();

  const { products, totalCount } = await getFilteredProducts({
    sortBy: 'featured',
    availability: 'all',
    page: 1,
    limit: 12,
  });

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
    <section className="pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HomeProductsSection
          initialProducts={productsWithReviews}
          initialTotal={totalCount}
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-white pt-28">
      <Suspense
        fallback={
          <section className="pb-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-lg bg-muted" />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}
