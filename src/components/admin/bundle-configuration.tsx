'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, X } from 'lucide-react';
import { BundleBadge } from '@/lib/validations/product';
import { Badge } from '@/components/ui/badge';

export interface VariantInput {
  id?: string;
  name: string;
  price: number;
  sku?: string | null;
  active?: boolean;
  bundles?: BundleInput[];
}

export interface BundleInput {
  id?: string;
  variantId?: string;
  label: string;
  quantity: number;
  sellingPrice: number;
  badge?: BundleBadge;
  isDefault?: boolean;
  active?: boolean;
  originalPrice?: number;
  savingsAmount?: number;
}

interface BundleConfigurationProps {
  enableBundlePricing: boolean;
  variants: VariantInput[];
  onEnableChange: (enabled: boolean) => void;
  onVariantsChange: (variants: VariantInput[]) => void;
}

export function BundleConfiguration({
  enableBundlePricing,
  variants,
  onEnableChange,
  onVariantsChange,
}: BundleConfigurationProps) {
  const handleAddVariant = () => {
    onVariantsChange([
      ...variants,
      {
        name: '',
        price: 0,
        sku: null,
        active: true,
        bundles: [],
      } as VariantInput,
    ]);
  };

  const handleVariantChange = (index: number, field: keyof VariantInput, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    onVariantsChange(updated);
  };

  const handleDeleteVariant = (index: number) => {
    onVariantsChange(variants.filter((_, i) => i !== index));
  };

  const handleAddBundle = (variantIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].bundles = [
      ...(updated[variantIndex].bundles || []),
      {
        label: '',
        quantity: 1,
        sellingPrice: 0,
        badge: BundleBadge.NONE,
        isDefault: false,
        active: true,
      } as BundleInput,
    ];
    onVariantsChange(updated);
  };

  const handleBundleChange = (
    variantIndex: number,
    bundleIndex: number,
    field: keyof BundleInput,
    value: any
  ) => {
    const updated = [...variants];
    const variant = updated[variantIndex];
    const bundle = (variant.bundles || [])[bundleIndex];
    
    // Calculate original price and savings when quantity or selling price changes
    if (field === 'quantity' || field === 'sellingPrice') {
      const quantity = field === 'quantity' ? value : bundle.quantity;
      const sellingPrice = field === 'sellingPrice' ? value : bundle.sellingPrice;
      const originalPrice = variant.price * quantity;
      const savingsAmount = originalPrice - sellingPrice;
      
      if (!updated[variantIndex].bundles) {
        updated[variantIndex].bundles = [];
      }
      updated[variantIndex].bundles[bundleIndex] = {
        ...bundle,
        [field]: value,
        originalPrice,
        savingsAmount,
      };
    } else {
      // Handle isDefault - only one bundle can be default per variant
      if (field === 'isDefault' && value === true) {
        // Unset other defaults in this variant
        (variant.bundles || []).forEach((b, i) => {
          if (i !== bundleIndex) {
            b.isDefault = false;
          }
        });
      }
      
      if (!updated[variantIndex].bundles) {
        updated[variantIndex].bundles = [];
      }
      updated[variantIndex].bundles[bundleIndex] = {
        ...bundle,
        [field]: value,
      };
    }
    
    onVariantsChange(updated);
  };

  const handleDeleteBundle = (variantIndex: number, bundleIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].bundles = (updated[variantIndex].bundles || []).filter(
      (_, i) => i !== bundleIndex
    );
    onVariantsChange(updated);
  };

  // Calculate original price and savings for bundles when variant price changes
  useEffect(() => {
    const updated = variants.map((variant) => ({
      ...variant,
      bundles: (variant.bundles || []).map((bundle) => {
        const originalPrice = variant.price * bundle.quantity;
        const savingsAmount = originalPrice - bundle.sellingPrice;
        return {
          ...bundle,
          originalPrice,
          savingsAmount,
        };
      }),
    }));
    onVariantsChange(updated);
  }, [variants.map(v => v.price).join(',')]);

  if (!enableBundlePricing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bundle & Save</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="enable-bundle">Enable Bundle Pricing</Label>
              <Switch
                id="enable-bundle"
                checked={enableBundlePricing}
                onCheckedChange={onEnableChange}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bundle & Save</CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="enable-bundle">Enable Bundle Pricing</Label>
            <Switch
              id="enable-bundle"
              checked={enableBundlePricing}
              onCheckedChange={onEnableChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {variants.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No variants configured</p>
            <Button type="button" onClick={handleAddVariant} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Variant
            </Button>
          </div>
        ) : (
          variants.map((variant, variantIndex) => (
            <Card key={variantIndex} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Variant {variantIndex + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`variant-active-${variantIndex}`} className="text-sm">
                      Active
                    </Label>
                    <Switch
                      id={`variant-active-${variantIndex}`}
                      checked={variant.active ?? true}
                      onCheckedChange={(checked) =>
                        handleVariantChange(variantIndex, 'active', checked)
                      }
                    />
                    {variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVariant(variantIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`variant-name-${variantIndex}`}>
                      Variant Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`variant-name-${variantIndex}`}
                      placeholder="e.g., 500 gm"
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(variantIndex, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`variant-price-${variantIndex}`}>
                      Base Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`variant-price-${variantIndex}`}
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={variant.price || ''}
                      onChange={(e) =>
                        handleVariantChange(
                          variantIndex,
                          'price',
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`variant-sku-${variantIndex}`}>SKU (Optional)</Label>
                    <Input
                      id={`variant-sku-${variantIndex}`}
                      placeholder="Variant SKU"
                      value={variant.sku || ''}
                      onChange={(e) =>
                        handleVariantChange(variantIndex, 'sku', e.target.value || null)
                      }
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Bundle Options</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddBundle(variantIndex)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Bundle
                    </Button>
                  </div>

                  {(!variant.bundles || variant.bundles.length === 0) ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No bundles configured for this variant
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {variant.bundles.map((bundle, bundleIndex) => {
                        const originalPrice = variant.price * bundle.quantity;
                        const savingsAmount = originalPrice - bundle.sellingPrice;

                        return (
                          <Card key={bundleIndex} className="bg-muted/50">
                            <CardContent className="pt-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">Bundle {bundleIndex + 1}</h5>
                                <div className="flex items-center gap-2">
                                  <Label
                                    htmlFor={`bundle-active-${variantIndex}-${bundleIndex}`}
                                    className="text-sm"
                                  >
                                    Active
                                  </Label>
                                  <Switch
                                    id={`bundle-active-${variantIndex}-${bundleIndex}`}
                                    checked={bundle.active ?? true}
                                    onCheckedChange={(checked) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'active',
                                        checked
                                      )
                                    }
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteBundle(variantIndex, bundleIndex)
                                    }
                                  >
                                    <X className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label
                                    htmlFor={`bundle-label-${variantIndex}-${bundleIndex}`}
                                  >
                                    Bundle Label <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id={`bundle-label-${variantIndex}-${bundleIndex}`}
                                    placeholder="e.g., Buy 1, Pack of 2"
                                    value={bundle.label}
                                    onChange={(e) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'label',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`bundle-quantity-${variantIndex}-${bundleIndex}`}
                                  >
                                    Quantity <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id={`bundle-quantity-${variantIndex}-${bundleIndex}`}
                                    type="number"
                                    min="1"
                                    value={bundle.quantity}
                                    onChange={(e) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'quantity',
                                        parseInt(e.target.value) || 1
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`bundle-selling-price-${variantIndex}-${bundleIndex}`}
                                  >
                                    Selling Price <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id={`bundle-selling-price-${variantIndex}-${bundleIndex}`}
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    placeholder="0.00"
                                    value={bundle.sellingPrice || ''}
                                    onChange={(e) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'sellingPrice',
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                  />
                                  {bundle.sellingPrice > 0 && bundle.sellingPrice >= originalPrice && (
                                    <p className="text-xs text-destructive mt-1">
                                      Selling price must be less than original price (₹{originalPrice.toFixed(2)})
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`bundle-badge-${variantIndex}-${bundleIndex}`}
                                  >
                                    Badge
                                  </Label>
                                  <Select
                                    value={bundle.badge || BundleBadge.NONE}
                                    onValueChange={(value) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'badge',
                                        value as BundleBadge
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={BundleBadge.NONE}>None</SelectItem>
                                      <SelectItem value={BundleBadge.BEST_SELLER}>
                                        Best Seller
                                      </SelectItem>
                                      <SelectItem value={BundleBadge.SUPER_SAVER}>
                                        Super Saver
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    Original Price (Auto-calculated)
                                  </Label>
                                  <p className="text-lg font-semibold line-through text-muted-foreground">
                                    ₹{originalPrice.toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    Savings Amount (Auto-calculated)
                                  </Label>
                                  <p className="text-lg font-semibold text-green-600">
                                    ₹{savingsAmount.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    id={`bundle-default-${variantIndex}-${bundleIndex}`}
                                    checked={bundle.isDefault ?? false}
                                    onChange={(e) =>
                                      handleBundleChange(
                                        variantIndex,
                                        bundleIndex,
                                        'isDefault',
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4"
                                  />
                                  <Label
                                    htmlFor={`bundle-default-${variantIndex}-${bundleIndex}`}
                                    className="text-sm cursor-pointer"
                                  >
                                    Set as Default Bundle
                                  </Label>
                                </div>
                                {(bundle.badge || BundleBadge.NONE) !== BundleBadge.NONE && (
                                  <Badge variant="secondary">
                                    {(bundle.badge || BundleBadge.NONE) === BundleBadge.BEST_SELLER
                                      ? 'Best Seller'
                                      : 'Super Saver'}
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <Button type="button" onClick={handleAddVariant} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </CardContent>
    </Card>
  );
}
