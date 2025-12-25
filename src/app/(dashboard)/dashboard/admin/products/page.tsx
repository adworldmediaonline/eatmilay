import { getProducts } from '@/server/queries/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/data-table/data-table';
import { productColumns } from './columns';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your products</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/products/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first product.
            </p>
            <Button asChild>
              <Link href="/dashboard/admin/products/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={productColumns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search products..."
        />
      )}
    </div>
  );
}
