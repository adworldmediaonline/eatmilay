'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, TrendingDown } from 'lucide-react';
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

  // Calculate savings percentage
  const calculateSavingsPercent = (bundle: SerializedBundle) => {
    if (bundle.originalPrice <= bundle.sellingPrice) return 0;
    return Math.round((bundle.savingsAmount / bundle.originalPrice) * 100);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-base font-semibold text-gray-900">Bundle & Save</h3>
      </div>

      {/* Horizontal scrollable container for mobile, flex-wrap for desktop */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-x-visible">
        {variant.bundles.map((bundle) => {
          const isSelected = selectedId === bundle.id;
          const isSuperSaver =
            bundle.badge === 'SUPER_SAVER' ||
            (bundle.id === highestSavingsBundle.id && bundle.savingsAmount > 0);
          const savingsPercent = calculateSavingsPercent(bundle);

          return (
            <button
              key={bundle.id}
              onClick={() => handleBundleClick(bundle)}
              className={`group relative flex-shrink-0 w-[200px] sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-[220px] rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm'
                  : 'border-gray-200 bg-white hover:border-primary/40'
              }`}
            >
              <div className="p-3.5">
                {/* Header Row - Compact */}
                <div className="flex items-start justify-between gap-1.5 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <h4 className={`text-sm font-bold truncate ${
                        isSelected ? 'text-primary' : 'text-gray-900'
                      }`}>
                        {bundle.label}
                      </h4>
                      {bundle.badge === 'BEST_SELLER' && (
                        <Badge className="bg-orange-500 text-white text-[9px] px-1 py-0 h-4 leading-none">
                          Best
                        </Badge>
                      )}
                      {isSuperSaver && (
                        <Badge className="bg-green-600 text-white text-[9px] px-1 py-0 h-4 leading-none">
                          Save
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </div>

                {/* Price Row - Compact */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{bundle.sellingPrice.toFixed(2)}
                    </span>
                    {bundle.originalPrice > bundle.sellingPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{bundle.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Savings Row */}
                  <div className="flex items-center justify-between gap-1.5">
                    {bundle.savingsAmount > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">
                          ₹{bundle.savingsAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {savingsPercent > 0 && (
                      <span className="ml-auto px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">
                        {savingsPercent}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected indicator bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-b-lg" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
