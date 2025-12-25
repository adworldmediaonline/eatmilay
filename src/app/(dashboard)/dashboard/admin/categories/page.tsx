import { getCategories } from '@/server/queries/category';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Package } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/data-table/data-table';
import { categoryColumns } from './columns';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/categories/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first product category.
            </p>
            <Button asChild>
              <Link href="/dashboard/admin/categories/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable
          columns={categoryColumns}
          data={categories}
          searchKey="name"
          searchPlaceholder="Search categories..."
        />
      )}
    </div>
  );
}
