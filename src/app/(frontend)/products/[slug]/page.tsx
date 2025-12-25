import { Suspense } from 'react';
import { getProductBySlug } from '@/server/queries/product';
import { getReviewsByProduct, getReviewAggregates, getUserReview } from '@/server/queries/review';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './product-details-client';

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Fetch reviews and aggregates
  const [reviewsData, aggregates] = await Promise.all([
    getReviewsByProduct(product.id, { page: 1, limit: 20, sortBy: 'recent' }),
    getReviewAggregates(product.id),
  ]);

  // Check if user already reviewed this product
  let canWriteReview = true;
  if (session?.user) {
    const userReview = await getUserReview(product.id, session.user.id);
    canWriteReview = !userReview;
  }

  return (
    <ProductDetailsClient
      product={product}
      reviews={reviewsData.reviews}
      reviewAggregates={aggregates}
      canWriteReview={canWriteReview}
      isAuthenticated={!!session?.user}
    />
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsWrapper params={params} />
    </Suspense>
  );
}

async function ProductDetailsWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductContent slug={slug} />;
}
