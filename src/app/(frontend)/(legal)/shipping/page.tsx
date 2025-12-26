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
      <Header cartItemCount={0} />

      <LegalPageLayout {...shippingContent}>
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At SumNSubstance, we are committed to delivering your skincare
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
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer comprehensive shipping services across India to ensure
              your skincare products reach you safely and securely.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>We ship across India for all our skincare products</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Free shipping available on prepaid orders above ₹899
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All products are carefully packaged to prevent damage during
                  transit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We use trusted courier partners including Blue Dart, DTDC, and
                  India Post
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Tracking number provided via email and SMS once your order
                  ships
                </span>
              </li>
            </ul>
          </section>

          <section id="delivery-timeframes">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Delivery Timeframes
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our delivery timeframes vary based on your location and the
              shipping method selected:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Standard Delivery
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Metro Cities:</strong> 2-3 business days (Mumbai,
                      Delhi, Bangalore, Chennai, Kolkata, Hyderabad)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Tier 1 Cities:</strong> 3-4 business days (Pune,
                      Ahmedabad, Jaipur, Lucknow, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Tier 2/3 Cities:</strong> 4-6 business days
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Remote Areas:</strong> 5-8 business days (subject
                      to courier availability)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Express Delivery
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Available in select metro cities with next-day delivery
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Additional charges apply for express delivery</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Note:</strong> Delivery times may vary during festivals,
              peak seasons, and due to weather conditions.
            </p>
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
              5. Order Processing
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our order processing is designed to be quick and efficient:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Orders placed before 2:00 PM are processed the same day
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Orders placed after 2:00 PM are processed the next business
                  day
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Order confirmation email sent immediately after placing your
                  order
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Shipping confirmation with tracking details sent once order is
                  dispatched
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>No processing on Sundays and national holidays</span>
              </li>
            </ul>
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
              7. Tracking Your Orders
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Stay updated on your order status with our comprehensive tracking
              system:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Tracking number sent via email and SMS once order is shipped
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Real-time updates on order status through your account
                  dashboard
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Track packages on our website or courier partner's website
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Delivery notifications and updates via SMS and email
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Customer support available for tracking assistance</span>
              </li>
            </ul>
          </section>

          <section id="damaged-packages">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. Damaged or Lost Packages
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the rare event of package damage or loss:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Report damaged packages within 24 hours of delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Report undelivered packages within 7 days of expected delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Provide photos of damaged packaging and products if applicable
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We'll provide replacement or full refund as appropriate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>No questions asked policy for damaged or lost items</span>
              </li>
            </ul>
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
                <strong>Email:</strong> shipping@sumnsubstance.com
              </p>
              <p>
                <strong>Customer Support:</strong> support@sumnsubstance.com
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
                <strong>Address:</strong> SumNSubstance Private Limited, [Your
                Business Address], India
              </p>
            </div>
          </section>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
}
