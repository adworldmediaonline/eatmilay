'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import type { SerializedVariant, SerializedBundle } from '@/lib/serializers';

interface BundleSelectorProps {
  variant: SerializedVariant;
  selectedBundleId?: string;
  onBundleSelect: (bundle: SerializedBundle) => void;
}

export function BundleSelector({
  variant,
  selectedBundleId,
  onBundleSelect,
}: BundleSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedBundleId);

  // Find default bundle or first bundle
  const defaultBundle = variant.bundles.find((b) => b.isDefault) || variant.bundles[0];

  useEffect(() => {
    if (!selectedId && defaultBundle) {
      setSelectedId(defaultBundle.id);
      onBundleSelect(defaultBundle);
    }
  }, [defaultBundle, selectedId, onBundleSelect]);

  const handleBundleClick = (bundle: SerializedBundle) => {
    setSelectedId(bundle.id);
    onBundleSelect(bundle);
  };

  if (!variant.bundles || variant.bundles.length === 0) {
    return null;
  }

  // Find bundle with highest savings for Super Saver badge
  const highestSavingsBundle = variant.bundles.reduce((prev, current) =>
    current.savingsAmount > prev.savingsAmount ? current : prev
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-primary">Bundle & Save</h3>
      <div className="grid gap-3">
        {variant.bundles.map((bundle) => {
          const isSelected = selectedId === bundle.id;
          const isSuperSaver =
            bundle.badge === 'SUPER_SAVER' ||
            (bundle.id === highestSavingsBundle.id && bundle.savingsAmount > 0);

          return (
            <Card
              key={bundle.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5'
                  : 'border border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => handleBundleClick(bundle)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-base">{bundle.label}</h4>
                      {bundle.badge === 'BEST_SELLER' && (
                        <Badge className="bg-orange-500 text-white">Best Seller</Badge>
                      )}
                      {isSuperSaver && (
                        <Badge className="bg-green-600 text-white">Super Saver</Badge>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-primary">
                        ₹{bundle.sellingPrice.toFixed(2)}
                      </span>
                      {bundle.originalPrice > bundle.sellingPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{bundle.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {bundle.savingsAmount > 0 && (
                      <p className="text-sm font-medium text-green-600">
                        You save ₹{bundle.savingsAmount.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
