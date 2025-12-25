'use client';

import { useState } from 'react';
import { MoreHorizontal, Check, X, Flag, Eye, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateReviewStatus, deleteReviewAdmin } from '@/app/actions/review';
import { useRouter } from 'next/navigation';
import { ReviewDetailDialog } from './review-detail-dialog';
import { AdminReviewData } from '@/app/(dashboard)/dashboard/admin/reviews/columns';


interface ReviewActionsProps {
  review: AdminReviewData;
}

export function ReviewActions({ review }: ReviewActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleStatusChange = async (status: 'APPROVED' | 'REJECTED' | 'FLAGGED') => {
    setIsLoading(true);

    try {
      const result = await updateReviewStatus({
        id: review.id,
        status,
        moderatedBy: '', // Will be set by the server action
      });

      if (result.success) {
        toast.success(result.message || `Review ${status.toLowerCase()} successfully`);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update review status');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Status update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const result = await deleteReviewAdmin(review.id);

      if (result.success) {
        toast.success(result.message || 'Review deleted successfully');
        setShowDeleteDialog(false);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete review');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={isLoading}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDetailDialog(true)}
            className="cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {review.status !== 'APPROVED' && (
            <DropdownMenuItem
              onClick={() => handleStatusChange('APPROVED')}
              disabled={isLoading}
              className="cursor-pointer text-green-600 focus:text-green-600"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
          )}

          {review.status !== 'REJECTED' && (
            <DropdownMenuItem
              onClick={() => handleStatusChange('REJECTED')}
              disabled={isLoading}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          )}

          {review.status !== 'FLAGGED' && (
            <DropdownMenuItem
              onClick={() => handleStatusChange('FLAGGED')}
              disabled={isLoading}
              className="cursor-pointer text-orange-600 focus:text-orange-600"
            >
              <Flag className="mr-2 h-4 w-4" />
              Flag
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            disabled={isLoading}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this review. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Detail Dialog */}
      <ReviewDetailDialog
        review={review}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        onStatusChange={handleStatusChange}
        onDelete={() => setShowDeleteDialog(true)}
      />
    </>
  );
}

