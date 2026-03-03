import { Metadata } from 'next';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table/data-table';
import { orderColumns } from './columns';
import { getOrders } from '@/server/queries/order';
import { OrderAnalytics } from '@/components/orders/order-analytics';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Orders | Dashboard',
  description: 'Manage and track customer orders',
};

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    paymentStatus?: string;
    search?: string;
  }>;
}

async function OrdersContent({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    paymentStatus?: string;
    search?: string;
  }>;
}) {
  await connection();
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1');
  const limit = parseInt(resolvedSearchParams.limit || '10');
  const status = resolvedSearchParams.status?.split(',').filter(Boolean);
  const paymentStatus = resolvedSearchParams.paymentStatus
    ?.split(',')
    .filter(Boolean);
  const search = resolvedSearchParams.search;

  const { orders, analytics } = await getOrders({
    page,
    limit,
    status,
    paymentStatus,
    search,
  });

  return (
    <>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <OrderAnalytics analytics={analytics} />
      </Suspense>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={orderColumns}
            data={orders}
            searchKey="orderNumber"
            searchPlaceholder="Search orders..."
          />
        </CardContent>
      </Card>
    </>
  );
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track customer orders and payments
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
