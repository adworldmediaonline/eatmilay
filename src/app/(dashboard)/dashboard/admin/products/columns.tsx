'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DeleteProductButton } from './delete-product-button';
import Link from 'next/link';
import Image from 'next/image';
import type { SerializedProductWithCategory } from '@/server/queries/product';

export const productColumns: ColumnDef<SerializedProductWithCategory>[] = [
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
    accessorKey: 'mainImage',
    header: 'Image',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center">
          {product.mainImage ? (
            <div className="relative h-10 w-10 rounded-md overflow-hidden">
              <Image
                src={product.mainImage.url}
                alt={product.mainImage.altText || product.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">/{product.slug}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <Badge variant="outline" className="font-normal">
          {category.name}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/admin/products/${product.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteProductButton
            productId={product.id}
            productName={product.name}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
