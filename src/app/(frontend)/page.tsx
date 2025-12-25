import { getProducts } from '@/server/queries/product';
import { getReviewAggregates } from '@/server/queries/review';
import { FeaturedProductsV3 } from '../../components/home';
import HeroContent from '../../components/home/hero-content';

export default async function Home() {
  // Fetch real products from database
  const allProducts = await getProducts();

  // Take first 4 products for featured section
  const topProducts = allProducts.slice(0, 4);

  // Fetch review aggregates for each product in parallel
  const reviewAggregatesPromises = topProducts.map(product =>
    getReviewAggregates(product.id)
  );
  const reviewAggregates = await Promise.all(reviewAggregatesPromises);

  // Combine products with their review data
  const featuredProducts = topProducts.map((product, index) => ({
    ...product,
    isWishlisted: false, // Default values for frontend-only fields
    inStock: true,
    featured: true,
    reviewStats: reviewAggregates[index],
  }));

  return (
    <>
      <HeroContent />
      <FeaturedProductsV3 products={featuredProducts} />
    </>
  );
}
