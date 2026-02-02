import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const shippingContent = {
  title: 'Shipping & Cancellation',
  lastUpdated: 'January 15th, 2024',
  description:
    'Everything you need to know about our shipping process, delivery timeframes, and cancellation policy for a seamless shopping experience.',
  tableOfContents: [
    { id: 'shipping-information', title: 'Shipping Information' },
    { id: 'delivery-timeframes', title: 'Delivery Timeframes' },
    { id: 'shipping-locations', title: 'Shipping Locations' },
    { id: 'shipping-charges', title: 'Shipping Charges' },
    { id: 'order-processing', title: 'Order Processing' },
    { id: 'cancellation-policy', title: 'Cancellation Policy' },
    { id: 'tracking-orders', title: 'Tracking Your Orders' },
    { id: 'damaged-packages', title: 'Damaged or Lost Packages' },
    { id: 'special-circumstances', title: 'Special Circumstances' },
    { id: 'contact-us', title: 'Contact Us' },
  ],
};

export default async function ShippingCancellationPage() {
  return (
    <div className="min-h-screen bg-white">

      <LegalPageLayout {...shippingContent}>
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At eatmilay, we are committed to delivering your skincare
              products safely and on time. We work with trusted logistics
              partners to ensure your products reach you in perfect condition.
              Learn more about our shipping options and cancellation policy
              below.
            </p>
          </section>

          <section id="shipping-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Shipping Information
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-2 text-lg">
                🎉 FREE Delivery PAN India
              </h3>
              <p className="text-green-700 font-medium">
                Enjoy free delivery on all orders above ₹699 across India. No hidden charges, no conditions—just free shipping to your doorstep!
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              At eatmilay, we're committed to delivering your favorite skincare products safely and swiftly across India. We work with trusted logistics partners to ensure your products reach you in perfect condition, every time.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Fast Processing:</strong> 100% of orders are shipped within one business day of order confirmation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Weekend Orders:</strong> Orders placed over the weekend are processed and dispatched on Mondays
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Secure Packaging:</strong> All products are carefully packaged with protective materials to prevent damage during transit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Real-Time Tracking:</strong> Receive shipment notifications via WhatsApp and SMS with tracking information and online tracking links
                </span>
              </li>
            </ul>
          </section>

          <section id="delivery-timeframes">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Delivery Timeframes
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We understand you're excited to receive your products! Here's what you can expect:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  Standard Shipping
                </h3>
                <p className="text-gray-700 mb-3">
                  Orders placed before 12:00 PM are typically received within <strong>5-7 working business days</strong> across India. Local deliveries may happen on the same day or the next day.
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Working days exclude Sundays and public holidays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Orders placed on Saturdays, Sundays, or public holidays are processed on the next working day (Monday or the first working day after)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>💡 Pro Tip:</strong> Place your order before 12:00 PM on weekdays for the fastest delivery experience!
              </p>
            </div>
          </section>

          <section id="shipping-locations">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Shipping Locations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We deliver to most locations across India with various payment
              options available:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Delivery to all serviceable pin codes across India</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Cash on Delivery (COD) available in most locations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>International shipping currently not available</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Check delivery availability by entering your pin code at
                  checkout
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>PO Box addresses not accepted for delivery</span>
              </li>
            </ul>
          </section>

          <section id="shipping-charges">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Shipping Charges
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our shipping charges are designed to be fair and transparent, with
              free shipping available for eligible orders:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Standard Shipping Rates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900">
                    Metro Cities
                  </div>
                  <div className="text-sm text-gray-600 mt-1">₹40</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900">
                    Tier 1 Cities
                  </div>
                  <div className="text-sm text-gray-600 mt-1">₹50</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900">
                    Tier 2/3 Cities
                  </div>
                  <div className="text-sm text-gray-600 mt-1">₹60</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900">
                    Remote Areas
                  </div>
                  <div className="text-sm text-gray-600 mt-1">₹80</div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Free Shipping:</strong> Enjoy free shipping on all
                prepaid orders above ₹899. COD orders are subject to standard
                shipping charges plus ₹20 handling fee.
              </p>
            </div>
          </section>

          <section id="order-processing">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Order Processing & Potential Delays
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to process and ship your orders as quickly as possible. However, certain circumstances may cause delays:
            </p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Payment Information Issues
                </h3>
                <p className="text-gray-700">
                  If we are unable to process your order due to inaccurate or incomplete payment information, your order processing may be delayed by an additional <strong>2 business days</strong>. Please ensure all payment details are correct at checkout.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Out-of-Stock Items
                </h3>
                <p className="text-gray-700">
                  Orders containing out-of-stock item(s) may take an additional <strong>7-15 business days</strong> to process and ship. We'll notify you immediately if any items in your order are temporarily unavailable and provide you with options.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Incorrect or Incomplete Address
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Important:</strong> If your package is returned to us due to an incorrect or incomplete address provided at checkout, you will be responsible for all delivery costs to re-deliver your order to the corrected address.
                </p>
                <p className="text-gray-700">
                  We are not responsible for the loss of your order if the address provided is incomplete or incorrect. Please double-check your shipping address before completing your purchase.
                </p>
              </div>
            </div>
          </section>

          <section id="cancellation-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Cancellation Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We understand that sometimes you may need to cancel your order.
              Here's our cancellation policy:
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Free Cancellation Window
                </h3>
                <p className="text-green-700">
                  Orders can be cancelled free of charge within 24 hours of
                  placing the order, provided they haven't been shipped.
                </p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Cancellation requests must be made via email or customer
                    support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Once shipped, orders cannot be cancelled but can be returned
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Prepaid order refunds processed within 5-7 business days
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    COD orders have no refund process for cancellations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Custom or personalized products cannot be cancelled once
                    production begins
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section id="tracking-orders">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. How Do I Know That My Order Has Been Shipped?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We keep you informed every step of the way! Once your order has been shipped, you will receive a shipment notification via:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>WhatsApp Notification:</strong> Instant shipment alert with tracking details
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>SMS Notification:</strong> Text message with tracking information and a direct link to track your package online
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Email Confirmation:</strong> Detailed shipping confirmation sent to your registered email address
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You can track your package in real-time using the tracking number provided. Simply click the tracking link in your notification or visit our website to check your order status.
            </p>
          </section>

          <section id="damaged-packages">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. Damaged or Delayed Packages
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Damaged Parcels
                </h3>
                <p className="text-gray-700">
                  If your parcel is received in damaged condition, please contact us immediately. We will provide a full refund or arrange to ship a new parcel at no additional cost to you. Your satisfaction is our priority!
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Delayed Parcels
                </h3>
                <p className="text-gray-700">
                  While we ensure timely dispatch of all orders, we cannot take responsibility for delays caused by courier partners or external factors beyond our control. In such cases, customers are requested to wait until the parcel is delivered. We recommend tracking your order using the provided tracking number and contacting the courier partner directly for delivery updates.
                </p>
              </div>
            </div>
          </section>

          <section id="special-circumstances">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Special Circumstances
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please note that delivery times may be affected by:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Festivals & Holidays:</strong> Extended delivery times
                  during Diwali, Holi, and other major festivals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Weather Conditions:</strong> Monsoons, cyclones, or
                  extreme weather may cause delays
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Peak Sale Periods:</strong> Higher order volumes
                  during sales may extend processing time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Force Majeure:</strong> Natural disasters, strikes, or
                  other unforeseen circumstances
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We will keep you informed of any delays and work to minimize their
              impact on your order delivery.
            </p>
          </section>

          <section id="contact-us">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Need help with shipping or have questions about your order? We're
              here to help:
            </p>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Email:</strong> shipping@eatmilay.com
              </p>
              <p>
                <strong>Customer Support:</strong> support@eatmilay.com
              </p>
              <p>
                <strong>Phone:</strong> +91-XXXXXXXXXX
              </p>
              <p>
                <strong>WhatsApp:</strong> +91-XXXXXXXXXX
              </p>
              <p>
                <strong>Support Hours:</strong> Monday to Saturday, 10:00 AM -
                7:00 PM
              </p>
              <p>
                <strong>Address:</strong> eatmilay Private Limited, [Your
                Business Address], India
              </p>
            </div>
          </section>
        </div>
      </LegalPageLayout>


    </div>
  );
}
