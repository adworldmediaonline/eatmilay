'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { ReviewActions } from '@/components/reviews/review-actions';
import { formatDistanceToNow } from 'date-fns';

export interface AdminReviewData {
  id: string;
  productId: string;
  productName: string;
  productSlug?: string;
  productImage?: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  userInitials?: string;
  rating: number;
  title?: string;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  images?: Array<{ url: string; altText?: string }>;
  createdAt: Date;
  updatedAt: Date;
}

// Component to handle dropdown hydration
function ReviewActionsDropdown({ review }: { review: AdminReviewData }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div className="h-8 w-8" />;
  }

  return <ReviewActions review={review} />;
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

export const reviewColumns: ColumnDef<AdminReviewData>[] = [
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const review = row.original;
      return (
        <Link
          href={`/products/${review.productSlug}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          target="_blank"
        >
          {review.productImage && (
            <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src={review.productImage}
                alt={review.productName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          )}
          <span className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
            {review.productName}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const review = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={review.userImage} alt={review.userName} />
            <AvatarFallback className="bg-gradient-to-r from-[#233f1c] to-[#2b3e1a] text-white text-xs">
              {review.userInitials || review.userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{review.userName}</p>
            {review.userEmail && (
              <p className="text-xs text-muted-foreground truncate">
                {review.userEmail}
              </p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-medium">{rating}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'comment',
    header: 'Review',
    cell: ({ row }) => {
      const review = row.original;
      return (
        <div className="max-w-md">
          {review.title && (
            <p className="font-semibold text-sm mb-1 line-clamp-1">
              {review.title}
            </p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {review.comment}
          </p>
          {review.images && review.images.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              📷 {review.images.length} photo{review.images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'isVerifiedPurchase',
    header: 'Verified',
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerifiedPurchase') as boolean;
      const helpfulCount = row.original.helpfulCount;

      return (
        <div className="flex flex-col gap-1">
          {isVerified && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs w-fit">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {helpfulCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ThumbsUp className="w-3 h-3" />
              <span>{helpfulCount}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return (
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const review = row.original;
      return <ReviewActionsDropdown review={review} />;
    },
  },
];

