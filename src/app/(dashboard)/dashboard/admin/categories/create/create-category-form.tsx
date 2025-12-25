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
import { createCategory } from '@/app/actions/category';
import { toast } from 'sonner';
import slugify from 'slugify';
import { createCategorySchema } from '@/lib/validations/category';

type FormData = z.infer<typeof createCategorySchema>;

export function CreateCategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const watchedName = form.watch('name');
  const previewSlug = watchedName
    ? slugify(watchedName, { lower: true, strict: true })
    : '';

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await createCategory(data);

      if (result.success) {
        toast.success('Category created successfully!');
        router.push('/dashboard/admin/categories');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Error creating category:', error);
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
                {previewSlug && (
                  <span className="text-sm">
                    URL slug will be:{' '}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      /{previewSlug}
                    </code>
                  </span>
                )}
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
                Creating...
              </>
            ) : (
              'Create Category'
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
