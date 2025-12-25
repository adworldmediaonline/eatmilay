import { ReactNode } from 'react';
import Header from './header';

interface RootLayoutProps {
  children: ReactNode;
  cartItemCount?: number;
}

export default function RootLayout({
  children,
  cartItemCount = 0,
}: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
