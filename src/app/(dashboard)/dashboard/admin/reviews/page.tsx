import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table/data-table';
import { reviewColumns } from './columns';
import { getAllReviewsForAdmin, getReviewStats } from '@/server/queries/review';
import { Star, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reviews | Dashboard',
  description: 'Manage and moderate customer reviews',
};

interface ReviewsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    rating?: string;
    verified?: string;
    search?: string;
  }>;
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1');
  const limit = parseInt(resolvedSearchParams.limit || '20');
  const status = resolvedSearchParams.status?.split(',').filter(Boolean);
  const rating = resolvedSearchParams.rating?.split(',').map(Number).filter(Boolean);
  const verified = resolvedSearchParams.verified === 'true' ? true : resolvedSearchParams.verified === 'false' ? false : undefined;
  const search = resolvedSearchParams.search;

  const [{ reviews, totalCount }, stats] = await Promise.all([
    getAllReviewsForAdmin({
      page,
      limit,
      status,
      rating,
      isVerifiedPurchase: verified,
      search,
    }),
    getReviewStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">
          Manage and moderate customer reviews across all products
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reviews
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.thisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pending.toLocaleString()}</div>
            <p className="text-xs text-yellow-700">
              Awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Reviews
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.approved.toLocaleString()}</div>
            <p className="text-xs text-green-700">
              Published on site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">
              From approved reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={reviewColumns}
            data={reviews}
            searchKey="comment"
            searchPlaceholder="Search reviews..."
          />

          {totalCount > limit && (
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Showing {reviews.length} of {totalCount.toLocaleString()} reviews
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

