'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  MapPin,
  Check,
  Mail,
  Phone,
  Home,
  Building,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCartItems, useClearCart } from '@/store/cart-store';
import { toast } from 'sonner';
import { checkoutFormSchema, CheckoutFormData } from '@/lib/validations/order';
import { cn } from '@/lib/utils';

interface CheckoutFormProps {
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export function CheckoutForm({
  isProcessing,
  onProcessingChange,
  user,
}: CheckoutFormProps) {
  const cartItems = useCartItems();
  const clearCart = useClearCart();

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onTouched',
    defaultValues: {
      shippingAddress: {
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        isDefault: false,
      },
      shippingMethod: 'standard',
      paymentMethod: 'razorpay',
      orderNotes: '',
    },
  });


  const onSubmit = async (data: CheckoutFormData) => {
    try {
      onProcessingChange(true);
      await processOrder(data);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout. Please try again.');
    } finally {
      onProcessingChange(false);
    }
  };

  const processOrder = async (data: CheckoutFormData) => {
    try {
      // Create order payload
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customerInfo: {
          fullName: data.shippingAddress.fullName,
          email: data.shippingAddress.email,
          phone: data.shippingAddress.phone,
        },
        shippingAddress: data.shippingAddress,
        billingAddress: data.shippingAddress, // Same as shipping for now
        paymentMethod: data.paymentMethod,
        shippingMethod: data.shippingMethod,
        orderNotes: data.orderNotes,
        userId: user?.id,
      };

      // Create order via API
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();
      const order = orderResult.data;

      // Process payment with Razorpay
      await processRazorpayPayment(order);
    } catch (error) {
      console.error('Order processing error:', error);
      throw error;
    }
  };

  const processRazorpayPayment = async (order: {
    id: string;
    razorpayOrderId: string;
    total: number;
    orderNumber: string;
  }) => {
    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(order.total * 100),
          currency: 'INR',
          name: 'SumnSubstance',
          description: `Order #${order.orderNumber}`,
          order_id: order.razorpayOrderId,
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const verificationResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: order.id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (verificationResponse.ok) {
                clearCart();
                toast.success('Order placed successfully!');
                window.location.href = `/checkout/success?orderId=${order.id}`;
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.error('Payment verification failed. Please contact support.');
              window.location.href = `/checkout/failure?orderId=${order.id}`;
            }
          },
          prefill: {
            name: form.getValues('shippingAddress.fullName'),
            email: form.getValues('shippingAddress.email'),
            contact: form.getValues('shippingAddress.phone'),
          },
          theme: {
            color: 'hsl(var(--primary))',
          },
          modal: {
            ondismiss: () => {
              toast.error('Payment cancelled');
              onProcessingChange(false);
            },
          },
        };

        const razorpay = new (
          window as unknown as {
            Razorpay: new (options: unknown) => { open: () => void };
          }
        ).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway. Please try again.');
        onProcessingChange(false);
      };
    } catch (error) {
      console.error('Razorpay payment error:', error);
      throw error;
    }
  };

  const onError = (errors: Record<string, unknown>) => {
    console.log('Form validation errors:', errors);
    toast.error('Please fill in all required fields correctly');
    onProcessingChange(false);
  };

  // Field validation helper
  const isFieldValid = (fieldName: string) => {
    const fieldState = form.getFieldState(fieldName as keyof CheckoutFormData);
    return !fieldState.error && fieldState.isDirty;
  };


  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shippingAddress.fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter full name"
                            {...field}
                            className={cn(
                              isFieldValid('shippingAddress.fullName') && 'border-green-500'
                            )}
                          />
                          {isFieldValid('shippingAddress.fullName') && (
                            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                            className={cn(
                              isFieldValid('shippingAddress.email') && 'border-green-500'
                            )}
                          />
                          {isFieldValid('shippingAddress.email') && (
                            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="tel"
                            placeholder="Enter phone number"
                            {...field}
                            className={cn(
                              isFieldValid('shippingAddress.phone') && 'border-green-500'
                            )}
                          />
                          {isFieldValid('shippingAddress.phone') && (
                            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Address Line 1 *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter street address"
                            {...field}
                            className={cn(
                              isFieldValid('shippingAddress.addressLine1') && 'border-green-500'
                            )}
                          />
                          {isFieldValid('shippingAddress.addressLine1') && (
                            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Address Line 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apartment, suite, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="shippingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter city"
                              {...field}
                              className={cn(
                                isFieldValid('shippingAddress.city') && 'border-green-500'
                              )}
                            />
                            {isFieldValid('shippingAddress.city') && (
                              <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter state"
                              {...field}
                              className={cn(
                                isFieldValid('shippingAddress.state') && 'border-green-500'
                              )}
                            />
                            {isFieldValid('shippingAddress.state') && (
                              <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter postal code"
                              {...field}
                              className={cn(
                                isFieldValid('shippingAddress.postalCode') && 'border-green-500'
                              )}
                            />
                            {isFieldValid('shippingAddress.postalCode') && (
                              <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Order Notes (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="orderNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Any special instructions for your order?"
                          className="min-h-[100px] resize-none"
                          maxLength={500}
                          {...field}
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                          {field.value?.length || 0}/500
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full max-w-md h-12 text-lg font-semibold"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Order...
                </>
              ) : (
                <>
                  Complete Order
                  <Check className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
