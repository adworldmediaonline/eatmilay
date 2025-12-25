'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
  totalReviews?: number;
  averageRating?: number;
}

export default function ProductReviews({
  reviews,
  totalReviews = 1847,
  averageRating = 4.8,
}: ProductReviewsProps) {
  return (
    <div>
      <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4 lg:mb-6">
        Customer Reviews
      </h3>

      {/* Review Summary - Mobile optimized */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="text-center lg:border-r lg:border-gray-200">
            <div className="text-4xl lg:text-5xl font-black text-primary mb-2 lg:mb-3">
              {averageRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2 lg:mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-600 font-medium text-sm lg:text-base">
              Based on {totalReviews.toLocaleString()} reviews
            </p>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">
              97% would recommend
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-2 lg:space-y-3">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center gap-3 lg:gap-4">
                  <div className="flex items-center gap-1 w-12 lg:w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 lg:h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 lg:h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs lg:text-sm text-gray-600 w-8 lg:w-12 font-medium">
                    {rating === 5 ? '75%' : rating === 4 ? '20%' : '5%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Filters - Mobile optimized */}
      <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-white border-primary rounded-full px-3 lg:px-4 text-xs lg:text-sm whitespace-nowrap"
        >
          All Reviews
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-600 hover:border-primary hover:text-primary rounded-full px-3 lg:px-4 text-xs lg:text-sm whitespace-nowrap"
        >
          With Photos (47)
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-600 hover:border-primary hover:text-primary rounded-full px-3 lg:px-4 text-xs lg:text-sm whitespace-nowrap"
        >
          5 Stars (1,384)
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-600 hover:border-primary hover:text-primary rounded-full px-3 lg:px-4 text-xs lg:text-sm whitespace-nowrap"
        >
          Verified Purchase
        </Button>
      </div>

      {/* Individual Reviews - Mobile optimized */}
      <div className="space-y-4 lg:space-y-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-2xl lg:rounded-3xl p-4 lg:p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-3 lg:gap-6">
              {/* Avatar */}
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg flex-shrink-0">
                {review.user.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-base lg:text-lg truncate">
                        {review.user}
                      </h4>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 w-fit">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 lg:w-5 lg:h-5 ${
                              i < review.rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs lg:text-sm text-gray-500 font-medium">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm lg:text-base mb-3 lg:mb-4">
                  {review.comment}
                </p>

                {/* Review Photos - Mobile optimized */}
                <div className="flex gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">📸</span>
                  </div>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">📸</span>
                  </div>
                </div>

                {/* Review Actions - Mobile optimized */}
                <div className="flex items-center gap-4 lg:gap-6">
                  <button className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600 hover:text-primary transition-colors touch-manipulation">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V6a2 2 0 012-2h2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    <span className="hidden sm:inline">Helpful (23)</span>
                    <span className="sm:hidden">23</span>
                  </button>
                  <button className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600 hover:text-primary transition-colors touch-manipulation">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews - Mobile optimized */}
      <div className="text-center mt-6 lg:mt-8">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 lg:px-8 py-3 rounded-2xl font-semibold text-sm lg:text-base touch-manipulation"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  );
}
