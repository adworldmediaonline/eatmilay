'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { updateCategory } from '@/app/actions/category';
import { toast } from 'sonner';
import slugify from 'slugify';
import type { SerializedCategoryWithProducts } from '@/server/queries/category';
import { updateCategorySchema } from '@/lib/validations/category';

type FormData = z.infer<typeof updateCategorySchema>;

interface EditCategoryFormProps {
  category: SerializedCategoryWithProducts;
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
    },
  });

  const watchedName = form.watch('name');
  const previewSlug = watchedName
    ? slugify(watchedName, { lower: true, strict: true })
    : '';
  const hasNameChanged = watchedName !== category.name;

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await updateCategory(data);

      if (result.success) {
        toast.success('Category updated successfully!');
        router.push('/dashboard/admin/categories');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category name"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                <span className="block space-y-1">
                  <span className="block">
                    Current slug:{' '}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      /{category.slug}
                    </code>
                  </span>
                  {hasNameChanged && previewSlug && (
                    <span className="block">
                      New slug will be:{' '}
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        /{previewSlug}
                      </code>
                    </span>
                  )}
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Category'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/admin/categories')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
