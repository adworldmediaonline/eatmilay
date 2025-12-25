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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { updateProduct } from '@/app/actions/product';
import { updateProductSchema } from '@/lib/validations/product';
import { toast } from 'sonner';
import slugify from 'slugify';
import type { SerializedProductWithCategory } from '@/server/queries/product';
import type { CategoryWithCount } from '@/server/queries/category';
import { RichTextEditor } from '@/components/rich-text-editor';
import { ImageUpload } from '@/components/ui/image-upload';
type FormData = z.infer<typeof updateProductSchema>;

interface EditProductFormProps {
  product: SerializedProductWithCategory;
  categories: CategoryWithCount[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      excerpt: product.excerpt || '',
      description: product.description || '',
      tagline: product.tagline || '',
      whyLoveIt: product.whyLoveIt || '',
      whatsInside: product.whatsInside || '',
      howToUse: product.howToUse || '',
      ingredients: product.ingredients || '',
      metaTitle: product.metaTitle || '',
      metaDescription: product.metaDescription || '',
      metaKeywords: product.metaKeywords || '',
      mainImage: product.mainImage,
      additionalImages: product.additionalImages,
    },
  });

  const watchedName = form.watch('name');
  const previewSlug = watchedName
    ? slugify(watchedName, { lower: true, strict: true })
    : '';
  const hasNameChanged = watchedName !== product.name;

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await updateProduct(data);

      if (result.success) {
        toast.success('Product updated successfully!');
        router.push('/dashboard/admin/products');
      } else {
        toast.error(result.error);
      }
    } catch {
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
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                <span className="block space-y-1">
                  <span className="block">
                    Current slug:{' '}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      /{product.slug}
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

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Excerpt</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a short description (optional)"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Brief description for product cards and listings (max 300
                characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  {...field}
                  placeholder="Write your blog content here..."
                  size="lg"
                />
              </FormControl>
              <FormDescription>
                Enter the description of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Fields Section */}
        <div className="space-y-6">
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Content Fields</h3>

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Tagline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a catchy tagline..."
                      {...field}
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Brief, compelling tagline (max 100 characters) - {field.value?.length || 0}/100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whyLoveIt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why You'll Love It</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      {...field}
                      placeholder="Describe why customers will love this product..."
                      size="lg"
                    />
                  </FormControl>
                  <FormDescription>
                    Highlight the key benefits and features that make this product special
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsInside"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's Inside</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      {...field}
                      placeholder="Describe what's included in the product..."
                      size="lg"
                    />
                  </FormControl>
                  <FormDescription>
                    Detail what customers will receive with their purchase
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="howToUse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How to Use</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      {...field}
                      placeholder="Provide usage instructions and tips..."
                      size="lg"
                    />
                  </FormControl>
                  <FormDescription>
                    Step-by-step instructions on how to use the product effectively
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      {...field}
                      placeholder="List the ingredients and their benefits..."
                      size="lg"
                    />
                  </FormControl>
                  <FormDescription>
                    List ingredients and explain their benefits (for beauty/health products)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                  onChange={e =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Enter the price in dollars (e.g., 29.99)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category._count.products} product
                      {category._count.products !== 1 ? 's' : ''})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category this product belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Main Image Upload */}
        <FormField
          control={form.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image</FormLabel>
              <FormControl>
                <ImageUpload
                  variant="single"
                  value={field.value}
                  onChange={field.onChange}
                  maxFileSize={5 * 1024 * 1024} // 5MB
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Upload the primary image for this product (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Images Upload */}
        <FormField
          control={form.control}
          name="additionalImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Images</FormLabel>
              <FormControl>
                <ImageUpload
                  variant="multiple"
                  limit={10}
                  value={field.value || []}
                  onChange={field.onChange}
                  maxFileSize={5 * 1024 * 1024} // 5MB
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Upload additional product images (max 10 images, 5MB each)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SEO Fields Section */}
        <div className="space-y-6">
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">SEO Fields</h3>

            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SEO title for search engines"
                      {...field}
                      maxLength={60}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended: 50-60 characters ({field.value?.length || 0}/60)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SEO description for search engines"
                      {...field}
                      maxLength={160}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended: 150-160 characters ({field.value?.length || 0}/160)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="keyword1, keyword2, keyword3"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords for SEO (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Product'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/admin/products')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
