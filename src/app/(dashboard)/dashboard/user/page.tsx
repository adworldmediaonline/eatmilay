import { getCategories } from '@/server/queries/category';
import { getProducts } from '@/server/queries/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, FolderOpen, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your categories and products
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Total categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Total products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Products/Category
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.length > 0
                ? Math.round((products.length / categories.length) * 10) / 10
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Products per category
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {products
                .reduce((sum, product) => sum + product.price, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined product value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage your product categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">No categories yet</p>
                <Button asChild>
                  <Link href="/dashboard/admin/categories/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Category
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {categories.length} categor
                    {categories.length !== 1 ? 'ies' : 'y'}
                  </span>
                  <Button size="sm" asChild>
                    <Link href="/dashboard/admin/categories">View All</Link>
                  </Button>
                </div>
                <div className="space-y-1">
                  {categories.slice(0, 3).map(category => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">
                        {category._count.products} products
                      </span>
                    </div>
                  ))}
                  {categories.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{categories.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">No products yet</p>
                {categories.length === 0 ? (
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a category first
                  </p>
                ) : (
                  <Button asChild>
                    <Link href="/dashboard/admin/products/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Product
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {products.length} product{products.length !== 1 ? 's' : ''}
                  </span>
                  <Button size="sm" asChild>
                    <Link href="/dashboard/admin/products">View All</Link>
                  </Button>
                </div>
                <div className="space-y-1">
                  {products.slice(0, 3).map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{product.name}</span>
                      <span className="text-muted-foreground">
                        ${product.price}
                      </span>
                    </div>
                  ))}
                  {products.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{products.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
