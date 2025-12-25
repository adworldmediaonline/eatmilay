import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-3">
          <Skeleton className="h-48 w-full rounded-lg" />
        </aside>
        <main className="lg:col-span-9">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
