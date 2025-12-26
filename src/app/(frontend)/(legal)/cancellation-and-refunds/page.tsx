import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const returnsContent = {
  title: 'Returns & Refund',
  lastUpdated: 'January 15th, 2024',
  description:
    "We want you to be completely satisfied with your purchase. If you're not happy with your order, our hassle-free return and refund policy is here to help.",
  tableOfContents: [
    { id: 'return-policy', title: 'Return Policy Overview' },
    { id: 'return-conditions', title: 'Return Conditions' },
    { id: 'return-process', title: 'How to Return an Item' },
    { id: 'refund-policy', title: 'Refund Policy' },
    { id: 'refund-timeline', title: 'Refund Timeline' },
    { id: 'exchange-policy', title: 'Exchange Policy' },
    { id: 'non-returnable', title: 'Non-Returnable Items' },
    { id: 'damaged-defective', title: 'Damaged or Defective Products' },
    { id: 'return-shipping', title: 'Return Shipping' },
    { id: 'contact-us', title: 'Contact Us' },
  ],
};

export default async function ReturnsRefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={0} />

      <LegalPageLayout {...returnsContent}>
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Satisfaction is Our Priority
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At SumNSubstance, we stand behind the quality of our skincare
              products. We understand that skincare is personal, and what works
              for one person may not work for another. That's why we offer a
              comprehensive return and refund policy to ensure you're completely
              satisfied with your purchase.
            </p>
          </section>

          <section id="return-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Return Policy Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a generous return policy designed to give you confidence
              in your purchase:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-3">
                30-Day Return Window
              </h3>
              <p className="text-green-700">
                You have 30 days from the date of delivery to return any product
                for a full refund or exchange, provided it meets our return
                conditions.
              </p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>30-day return window from delivery date</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Full refund or exchange available for eligible items
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Free returns for defective or wrong products</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Customer-initiated returns may have return shipping costs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Original payment method refund within 5-7 business days
                </span>
              </li>
            </ul>
          </section>

          <section id="return-conditions">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Return Conditions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To ensure a smooth return process, please make sure your item
              meets these conditions:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Product Condition
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Products must be unused and in original condition
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Original packaging and seals must be intact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Products that have been opened but not used are acceptable
                      for hygiene products
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Required Items
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Original receipt or order confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      All included accessories, samples, or promotional items
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Return authorization number (obtained from customer
                      service)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="return-process">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. How to Return an Item
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these simple steps to return your product:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Contact Customer Service
                  </h3>
                  <p className="text-gray-700">
                    Email us at returns@sumnsubstance.com or call our support
                    team to initiate the return process and receive a return
                    authorization number.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Package Your Item
                  </h3>
                  <p className="text-gray-700">
                    Carefully pack your item in its original packaging. Include
                    the return authorization number and reason for return.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Ship the Item
                  </h3>
                  <p className="text-gray-700">
                    Ship the item back to our returns center using the provided
                    return label or shipping instructions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Receive Your Refund
                  </h3>
                  <p className="text-gray-700">
                    Once we receive and process your return, your refund will be
                    issued within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="refund-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Refund Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We offer full refunds for eligible returns processed within our
              return window:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Full Refund Eligibility
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Products returned within 30 days in original condition
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Defective or damaged products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Wrong products sent due to our error</span>
                  </li>
                </ul>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Refunds processed to original payment method</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Cash on Delivery orders refunded via bank transfer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Original shipping charges refunded for defective items
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Customer-initiated returns may deduct return shipping costs
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section id="refund-timeline">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Refund Timeline
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our refund processing times vary by payment method:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Credit/Debit Cards
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Processing:</strong> 2-3 business days
                  </p>
                  <p>
                    <strong>Bank Reflection:</strong> 5-7 business days
                  </p>
                  <p>
                    <strong>Total Time:</strong> 7-10 business days
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  UPI/Net Banking
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Processing:</strong> 1-2 business days
                  </p>
                  <p>
                    <strong>Bank Reflection:</strong> 3-5 business days
                  </p>
                  <p>
                    <strong>Total Time:</strong> 4-7 business days
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Cash on Delivery
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Processing:</strong> 3-5 business days
                  </p>
                  <p>
                    <strong>Bank Transfer:</strong> 5-7 business days
                  </p>
                  <p>
                    <strong>Total Time:</strong> 8-12 business days
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Digital Wallets
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Processing:</strong> 1-2 business days
                  </p>
                  <p>
                    <strong>Wallet Reflection:</strong> 2-4 business days
                  </p>
                  <p>
                    <strong>Total Time:</strong> 3-6 business days
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>Note:</strong> Refund times may be longer during peak
                seasons or due to bank processing delays. We'll keep you updated
                on the status of your refund.
              </p>
            </div>
          </section>

          <section id="exchange-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Exchange Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer exchanges for certain products within our return window:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Size or variant exchanges available for eligible products
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Exchange must be of equal or higher value</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Price difference must be paid for higher-value items
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Exchange processing takes 5-7 business days after receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Free exchange shipping for defective or wrong products
                </span>
              </li>
            </ul>
          </section>

          <section id="non-returnable">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Non-Returnable Items
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For hygiene and safety reasons, certain items cannot be returned:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3">
                Items That Cannot Be Returned
              </h3>
              <ul className="space-y-2 text-red-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Products that have been used or contaminated</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Items with broken seals or tampering evidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Custom or personalized products</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Products returned after 30-day window</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gift cards or promotional vouchers</span>
                </li>
              </ul>
            </div>
          </section>

          <section id="damaged-defective">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. Damaged or Defective Products
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a damaged or defective product, we'll make it right
              immediately:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Report damaged/defective items within 48 hours of delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Provide photos of the product and packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Immediate replacement or full refund offered</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Free return shipping provided</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Priority processing for defective item claims</span>
              </li>
            </ul>
          </section>

          <section id="return-shipping">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Return Shipping
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Return shipping costs depend on the reason for return:
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Free Return Shipping
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Defective or damaged products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Wrong product sent due to our error</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Quality issues or product recalls</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Customer-Paid Return Shipping
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Change of mind or personal preference</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Ordered wrong size or variant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Return shipping cost: ₹50-₹100 depending on location
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="contact-us">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Need help with returns or refunds? Our customer service team is
              here to assist you:
            </p>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Returns Email:</strong> returns@sumnsubstance.com
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
                <strong>Returns Address:</strong> SumNSubstance Returns Center,
                [Your Returns Address], India
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-700">
                <strong>Tip:</strong> Keep your order confirmation and tracking
                information handy when contacting us about returns. This helps
                us serve you faster!
              </p>
            </div>
          </section>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
}
