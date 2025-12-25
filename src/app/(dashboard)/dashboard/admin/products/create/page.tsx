import { getCategories } from '@/server/queries/category';
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
import { CreateProductForm } from './create-product-form';

export default async function CreateProductPage() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create Product
            </h1>
            <p className="text-muted-foreground">Add a new product</p>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              No categories available
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              You need to create at least one category before adding products.
            </p>
            <Button asChild>
              <Link href="/dashboard/admin/categories/create">
                Create Category First
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">Add a new product</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Enter the details for your new product. The slug will be
              automatically generated from the name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateProductForm categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
