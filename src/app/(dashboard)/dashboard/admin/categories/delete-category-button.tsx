'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteCategory } from '@/app/actions/category';
import { toast } from 'sonner';

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string;
  productCount: number;
}

export function DeleteCategoryButton({
  categoryId,
  categoryName,
  productCount,
}: DeleteCategoryButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteCategory({ id: categoryId });

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  // Don't allow deletion if category has products
  const canDelete = productCount === 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={!canDelete}
          className={
            !canDelete
              ? 'opacity-50'
              : 'hover:bg-destructive hover:text-destructive-foreground'
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete ? (
              <>
                Are you sure you want to delete the category "{categoryName}"?
                This action cannot be undone.
              </>
            ) : (
              <>
                Cannot delete category "{categoryName}" because it contains{' '}
                {productCount} product{productCount !== 1 ? 's' : ''}. Please
                move or delete the products first.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Category'
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
