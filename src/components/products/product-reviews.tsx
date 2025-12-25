'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ReviewData, ReviewAggregates } from '@/types/review';
import { ReviewDialog } from './review-dialog';
import { markReviewHelpful } from '@/app/actions/review';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductReviewsProps {
  productId: string;
  productName: string;
  reviews: ReviewData[];
  aggregates: ReviewAggregates;
  canWriteReview: boolean;
  isAuthenticated: boolean;
  onLoginRequired?: () => void;
}

export default function ProductReviews({
  productId,
  productName,
  reviews: initialReviews,
  aggregates,
  canWriteReview,
  isAuthenticated,
  onLoginRequired,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({});

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      toast.error('Please login to write a review');
      return;
    }

    if (!canWriteReview) {
      toast.error('You have already reviewed this product');
      return;
    }

    setShowReviewDialog(true);
  };

  const handleReviewSuccess = () => {
    // Refresh page to show new review
    window.location.reload();
  };

  const handleVote = async (reviewId: string, helpful: boolean) => {
    if (votingStates[reviewId]) return; // Prevent duplicate votes

    setVotingStates(prev => ({ ...prev, [reviewId]: true }));

    try {
      const result = await markReviewHelpful({ reviewId, helpful });

      if (result.success && result.data) {
        // Update local state optimistically
        setReviews(prev =>
          prev.map(review =>
            review.id === reviewId
              ? {
                  ...review,
                  helpfulCount: result.data!.helpfulCount,
                  unhelpfulCount: result.data!.unhelpfulCount,
                }
              : review
          )
        );
        toast.success('Thank you for your feedback!');
      } else {
        toast.error(result.error || 'Failed to record vote');
      }
    } catch (error) {
      toast.error('Failed to record vote');
      console.error('Vote error:', error);
    } finally {
      setVotingStates(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  // Calculate rating distribution percentages
  const getRatingPercentage = (rating: number) => {
    if (aggregates.totalReviews === 0) return 0;
    return Math.round(
      (aggregates.ratingDistribution[rating as 1 | 2 | 3 | 4 | 5] /
        aggregates.totalReviews) *
        100
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-xl lg:text-2xl font-bold text-primary">
          Customer Reviews
        </h3>
        {isAuthenticated && canWriteReview && (
          <Button
            onClick={handleWriteReview}
            className="bg-primary hover:bg-primary text-white font-semibold"
          >
            Write a Review
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            onClick={handleWriteReview}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white font-semibold"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="text-center lg:border-r lg:border-gray-200">
            <div className="text-4xl lg:text-5xl font-black text-primary mb-2 lg:mb-3">
              {aggregates.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2 lg:mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 lg:w-6 lg:h-6 ${
                    i < Math.round(aggregates.averageRating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 font-medium text-sm lg:text-base">
              Based on {aggregates.totalReviews.toLocaleString()} review
              {aggregates.totalReviews !== 1 ? 's' : ''}
            </p>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">
              {aggregates.recommendPercentage}% would recommend
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-2 lg:space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const percentage = getRatingPercentage(rating);
                return (
                  <div key={rating} className="flex items-center gap-3 lg:gap-4">
                    <div className="flex items-center gap-1 w-12 lg:w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 lg:h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 lg:h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs lg:text-sm text-gray-600 w-8 lg:w-12 font-medium">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sorting and Filters */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Individual Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-4 lg:space-y-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl lg:rounded-3xl p-4 lg:p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 lg:gap-4">
                {/* Avatar */}
                <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
                  <AvatarImage src={review.userImage} alt={review.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-white font-bold text-sm lg:text-lg">
                    {review.userInitials || review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2 lg:mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-base lg:text-lg">
                          {review.userName}
                        </h4>
                        {review.isVerifiedPurchase && (
                          <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs lg:text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Title */}
                  {review.title && (
                    <h5 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                      {review.title}
                    </h5>
                  )}

                  {/* Review Comment */}
                  <p className="text-gray-700 leading-relaxed mb-3 lg:mb-4 text-sm lg:text-base">
                    {review.comment}
                  </p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 lg:gap-3 mb-3 lg:mb-4">
                      {review.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={image.url}
                            alt={image.altText || `Review image ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                            sizes="150px"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful Voting */}
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                    <span className="text-xs lg:text-sm text-gray-600">
                      Was this helpful?
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(review.id, true)}
                        disabled={votingStates[review.id]}
                        className="text-xs lg:text-sm hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                      >
                        <ThumbsUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        Yes ({review.helpfulCount})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(review.id, false)}
                        disabled={votingStates[review.id]}
                        className="text-xs lg:text-sm hover:bg-red-50 hover:border-red-500 hover:text-red-700"
                      >
                        <ThumbsDown className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        No ({review.unhelpfulCount})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No reviews yet
          </h4>
          <p className="text-gray-600 mb-4">
            Be the first to review this product!
          </p>
          {isAuthenticated && canWriteReview && (
            <Button
              onClick={handleWriteReview}
              className="bg-primary hover:bg-primary text-white"
            >
              Write the First Review
            </Button>
          )}
        </div>
      )}

      {/* Review Dialog */}
      <ReviewDialog
        productId={productId}
        productName={productName}
        open={showReviewDialog}
        onOpenChange={setShowReviewDialog}
        onSuccess={handleReviewSuccess}
      />
    </div>
  );
}

