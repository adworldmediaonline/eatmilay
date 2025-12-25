'use client';

export default function PromotionalStrip() {
  return (
    <div className="bg-[hsl(var(--primary))] text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-8 text-sm">
          <span>🚚 Free shipping on orders above ₹899</span>
          <span>💫 Get 20% off with code HURRY20</span>
          <span>🎁 Free sample with every order</span>
        </div>
      </div>
    </div>
  );
}
