import { getFilteredProducts } from '@/server/queries/product';
import { getReviewAggregates } from '@/server/queries/review';
import HomeProductsSection from '../../components/home/home-products-section';

export default async function Home() {
  // Fetch initial products with default filters
  const { products, totalCount } = await getFilteredProducts({
    sortBy: 'featured',
    availability: 'all',
    page: 1,
    limit: 12,
  });

  // Fetch review aggregates for each product in parallel
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
    <div className="bg-white pt-28">
      {/* Products Grid */}
      <section className="pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HomeProductsSection
            initialProducts={productsWithReviews}
            initialTotal={totalCount}
          />
        </div>
      </section>
    </div>
  );
}
