import { notFound } from 'next/navigation';
import { getOrderById } from '@/server/queries/order';
import { OrderDetailsContent } from '@/components/orders/order-details-content';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const order = await getOrderById(id);

    if (!order) {
      notFound();
    }

    return (
      <div className="container mx-auto py-6">
        <OrderDetailsContent order={order} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }
}
