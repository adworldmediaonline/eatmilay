'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { Star, Loader2 } from 'lucide-react';
import { createReviewSchema } from '@/lib/validations/review';
import { createReview } from '@/app/actions/review';
import { toast } from 'sonner';

type FormData = z.infer<typeof createReviewSchema>;

interface ReviewDialogProps {
  productId: string;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ReviewDialog({
  productId,
  productName,
  open,
  onOpenChange,
  onSuccess,
}: ReviewDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      productId,
      rating: 0,
      title: '',
      comment: '',
      images: undefined,
    },
  });

  const watchedRating = form.watch('rating');
  const watchedComment = form.watch('comment');

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await createReview(data);

      if (result.success) {
        toast.success(result.message || 'Review submitted successfully!');
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.error || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(var(--primary))]">
            Write a Review
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Share your experience with {productName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating Stars */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Your Rating *
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => field.onChange(rating)}
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110 touch-manipulation"
                          disabled={isSubmitting}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              rating <= (hoveredRating || field.value)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {watchedRating > 0 && (
                        <span className="text-sm text-gray-600 ml-2">
                          {watchedRating} star{watchedRating !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Title (Optional) */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sum up your experience in a few words"
                      {...field}
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/100 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Your Review *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience with this product. What did you like? What could be better?"
                      {...field}
                      rows={6}
                      maxLength={2000}
                      disabled={isSubmitting}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Minimum 10 characters</span>
                    <span>
                      {watchedComment?.length || 0}/2000
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Images (Optional) */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Photos (Optional)</FormLabel>
                  <FormControl>
                    <ImageUpload
                      variant="multiple"
                      limit={5}
                      value={field.value || []}
                      onChange={field.onChange}
                      maxFileSize={5 * 1024 * 1024} // 5MB
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload up to 5 photos (max 5MB each)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !watchedRating}
                className="flex-1 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white font-semibold py-3 rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


