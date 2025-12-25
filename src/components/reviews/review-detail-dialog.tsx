'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle, ThumbsUp, Calendar, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { AdminReviewData } from '@/app/(dashboard)/dashboard/admin/reviews/columns';

interface ReviewDetailDialogProps {
  review: AdminReviewData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: 'APPROVED' | 'REJECTED' | 'FLAGGED') => void;
  onDelete: () => void;
}

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'APPROVED':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'FLAGGED':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function ReviewDetailDialog({
  review,
  open,
  onOpenChange,
  onStatusChange,
  onDelete,
}: ReviewDetailDialogProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(var(--primary))]">
            Review Details
          </DialogTitle>
          <DialogDescription>
            Full review information and moderation actions
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Product Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {review.productImage && (
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={review.productImage}
                    alt={review.productName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {review.productName}
                </h3>
                {review.productSlug && (
                  <Link
                    href={`/products/${review.productSlug}`}
                    target="_blank"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Product
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>

            {/* User Info & Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.userImage} alt={review.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#2b3e1a] text-white">
                    {review.userInitials || review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  {review.userEmail && (
                    <p className="text-sm text-muted-foreground">
                      {review.userEmail}
                    </p>
                  )}
                  {review.isVerifiedPurchase && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>

              <Badge variant="outline" className={getStatusColor(review.status)}>
                {review.status}
              </Badge>
            </div>

            <Separator />

            {/* Rating & Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="font-semibold text-lg">{review.rating}/5</span>
              </div>
              {review.title && (
                <h4 className="font-bold text-lg mb-2">{review.title}</h4>
              )}
            </div>

            {/* Review Comment */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {review.comment}
              </p>
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div>
                <h5 className="font-semibold mb-3">Review Photos ({review.images.length})</h5>
                <div className="grid grid-cols-3 gap-3">
                  {review.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(idx)}
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || `Review image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">Created</p>
                  <p>{format(new Date(review.createdAt), 'PPp')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">Helpful Votes</p>
                  <p>{review.helpfulCount} helpful, {review.unhelpfulCount} not helpful</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4">
              {review.status !== 'APPROVED' && (
                <Button
                  onClick={() => {
                    onStatusChange('APPROVED');
                    onOpenChange(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Review
                </Button>
              )}
              {review.status !== 'REJECTED' && (
                <Button
                  onClick={() => {
                    onStatusChange('REJECTED');
                    onOpenChange(false);
                  }}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Reject Review
                </Button>
              )}
              {review.status !== 'FLAGGED' && (
                <Button
                  onClick={() => {
                    onStatusChange('FLAGGED');
                    onOpenChange(false);
                  }}
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Flag Review
                </Button>
              )}
              <div className="flex-1" />
              <Button
                onClick={() => {
                  onDelete();
                  onOpenChange(false);
                }}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Delete Review
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Image Lightbox */}
        {selectedImage !== null && review.images && (
          <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl">
              <div className="relative aspect-video w-full">
                <Image
                  src={review.images[selectedImage].url}
                  alt={review.images[selectedImage].altText || 'Review image'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}

