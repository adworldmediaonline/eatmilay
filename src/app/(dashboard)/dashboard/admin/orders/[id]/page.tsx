import { connection } from 'next/server';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/server/queries/order';
import { OrderDetailsContent } from '@/components/orders/order-details-content';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function OrderDetailsContentWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const order = await getOrderById(id);

    if (!order) {
      notFound();
    }

    return <OrderDetailsContent order={order} />;
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }
}

export default function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <OrderDetailsContentWrapper params={params} />
      </Suspense>
    </div>
  );
}
