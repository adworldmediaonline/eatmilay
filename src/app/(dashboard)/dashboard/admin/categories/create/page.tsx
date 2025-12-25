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
import { CreateCategoryForm } from './create-category-form';

export default function CreateCategoryPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
          <p className="text-muted-foreground">Add a new product category</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>
              Enter the details for your new category. The slug will be
              automatically generated from the name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateCategoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
