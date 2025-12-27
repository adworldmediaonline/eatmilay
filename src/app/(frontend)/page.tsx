import { getProducts } from '@/server/queries/product';
import { getCategories } from '@/server/queries/category';
import { getReviewAggregates } from '@/server/queries/review';
import CategoriesCarousel from '../../components/home/categories-carousel';
import ProductsGridClient from '../../components/home/products-grid-client';

export default async function Home() {
  // Fetch categories and products in parallel
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  // Take first 8 products for home page
  const featuredProducts = allProducts.slice(0, 8);

  // Fetch review aggregates for each product in parallel
  const reviewAggregatesPromises = featuredProducts.map(product =>
    getReviewAggregates(product.id)
  );
  const reviewAggregates = await Promise.all(reviewAggregatesPromises);

  // Combine products with their review data
  const productsWithReviews = featuredProducts.map((product, index) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: undefined, // Can be added if you have discount pricing
    images: product.mainImage ? [{ url: product.mainImage.url, alt: product.mainImage.altText }] : [],
    rating: reviewAggregates[index]?.averageRating || 0,
    reviewCount: reviewAggregates[index]?.totalReviews || 0,
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },
    badges: [], // Can add product badges/features here
    isWishlisted: false,
    inStock: true,
    shortDescription: product.excerpt || undefined,
  }));

  return (
    <div className="bg-white">
      {/* Categories Carousel */}
      {/* <CategoriesCarousel categories={categories} /> */}

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          {/* <ProductsGridClient products={productsWithReviews} /> */}
        </div>
      </section>
    </div>
  );
}
