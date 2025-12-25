// Image data interface
export interface ReviewImageData {
  url: string;
  publicId: string;
  altText?: string;
}

// Main review data interface
export interface ReviewData {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  userImage?: string;
  userInitials?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
  helpfulCount: number;
  unhelpfulCount: number;
  images?: ReviewImageData[];
  createdAt: Date;
  updatedAt: Date;
}

// Review aggregates for product
export interface ReviewAggregates {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  recommendPercentage: number;
}

// Review statistics
export interface ReviewStats {
  totalCount: number;
  averageRating: number;
  ratingBreakdown: Record<number, number>;
  verifiedPurchaseCount: number;
}

// Review form data
export interface ReviewFormData {
  rating: number;
  title?: string;
  comment: string;
  images?: ReviewImageData[];
}

// Review with user info (for display)
export interface ReviewWithUser extends ReviewData {
  product?: {
    id: string;
    name: string;
    slug: string;
  };
}

// Review moderation data (for admin)
export interface ReviewModerationData {
  id: string;
  productName: string;
  productSlug: string;
  userName: string;
  rating: number;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
  createdAt: Date;
  isVerifiedPurchase: boolean;
}

