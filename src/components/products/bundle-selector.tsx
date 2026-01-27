'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles } from 'lucide-react';
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
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-base font-semibold text-gray-900">Bundle & Save</h3>
      </div>

      {/* Horizontal scrollable container for mobile, flex-wrap for desktop */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-x-visible">
        {variant.bundles.map((bundle) => {
          const isSelected = selectedId === bundle.id;
          const isSuperSaver =
            bundle.badge === 'SUPER_SAVER' ||
            (bundle.id === highestSavingsBundle.id && bundle.savingsAmount > 0);

          return (
            <button
              key={bundle.id}
              onClick={() => handleBundleClick(bundle)}
              className={`group relative flex-shrink-0 w-[200px] sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-[220px] rounded-md border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm'
                  : 'border-gray-200 bg-white hover:border-primary/40'
              }`}
            >
              <div className="p-4 flex flex-col h-full">
                {/* Top Row: Label and Checkmark - Horizontal */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
                    <h4 className={`text-sm font-bold ${
                      isSelected ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {bundle.label}
                    </h4>
                    {bundle.badge === 'BEST_SELLER' && (
                      <Badge className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 h-4 leading-none whitespace-nowrap">
                        Best
                      </Badge>
                    )}
                    {isSuperSaver && (
                      <Badge className="bg-green-600 text-white text-[9px] px-1.5 py-0.5 h-4 leading-none whitespace-nowrap">
                        Save
                      </Badge>
                    )}
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  )}
                </div>

                {/* Bottom Row: Prices - Horizontal Layout */}
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{bundle.sellingPrice.toFixed(2)}
                  </span>
                  {bundle.originalPrice > bundle.sellingPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{bundle.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Selected indicator bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-b-md" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
