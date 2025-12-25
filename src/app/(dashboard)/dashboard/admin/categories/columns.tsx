'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Package, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DeleteCategoryButton } from './delete-category-button';
import Link from 'next/link';
import type { CategoryWithCount } from '@/server/queries/category';

export const categoryColumns: ColumnDef<CategoryWithCount>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-muted-foreground">
              /{category.slug}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: '_count.products',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const count = row.original._count.products;
      return (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{count}</span>
          <span className="text-sm text-muted-foreground">
            {count === 1 ? 'product' : 'products'}
          </span>
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
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/admin/categories/${category.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteCategoryButton
            categoryId={category.id}
            categoryName={category.name}
            productCount={category._count.products}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
