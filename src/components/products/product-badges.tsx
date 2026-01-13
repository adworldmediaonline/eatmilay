import { cn } from '@/lib/utils';

interface ProductBadgeProps {
  children: React.ReactNode;
  variant?: 'best-seller' | 'sharks-approved' | 'new' | 'sale';
  className?: string;
}

export function ProductBadge({ children, variant = 'best-seller', className }: ProductBadgeProps) {
  const variants = {
    'best-seller': 'bg-blue-600 text-white',
    'sharks-approved': 'bg-blue-600 text-white',
    'new': 'bg-green-600 text-white',
    'sale': 'bg-red-600 text-white',
  };

  return (
    <div
      className={cn(
        'px-3 py-1.5 rounded text-xs font-semibold shadow-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

interface PackBadgeProps {
  count: number;
  className?: string;
}

export function PackBadge({ count, className }: PackBadgeProps) {
  return (
    <div
      className={cn(
        'absolute top-2 right-2 bg-black text-white px-3 py-1.5 text-xs font-bold rounded-md shadow-lg',
        className
      )}
      style={{
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
      }}
    >
      PACK OF {count}
    </div>
  );
}
