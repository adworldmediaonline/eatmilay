import { getCategoryById } from '@/server/queries/category';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EditCategoryForm } from './edit-category-form';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

async function CategoryContent({ id }: { id: string }) {
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Update the category information. The slug will be automatically
            updated if you change the name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditCategoryForm category={category} />
        </CardContent>
      </Card>

      {category.products.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Products in this Category</CardTitle>
            <CardDescription>
              This category contains {category.products.length} product
              {category.products.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {category.products.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toString()} • /{product.slug}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/admin/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground">Update category details</p>
        </div>
      </div>

      <Suspense fallback={
        <div className="max-w-2xl">
          <Skeleton className="h-96" />
        </div>
      }>
        <CategoryContent id={id} />
      </Suspense>
    </div>
  );
}
