import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const returnsContent = {
  title: 'Cancellation & Refund Policy',
  lastUpdated: 'January 27th, 2026',
  description:
    'Our cancellation and refund policy ensures a smooth process for order cancellations and returns. Please review the following information carefully.',
  tableOfContents: [
    { id: 'refund-policy', title: 'Refund Policy' },
    { id: 'partial-payment-refund', title: 'Partial Payment Refund Eligibility' },
    { id: 'return-policy', title: 'Return Policy' },
    { id: 'contact-us', title: 'Contact Us' },
  ],
};

export default async function ReturnsRefundPage() {
  return (
    <div className="min-h-screen bg-white">


      <LegalPageLayout {...returnsContent}>
        <div className="space-y-12">
          {/* Refund Policy Section */}
          <section id="refund-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Refund Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once the order is placed by making an online payment, the products will be dispatched in 24hrs. However, if the order wants to be cancelled, it has to be done within 24 hours from the time of ordering.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-4">
              <p className="text-gray-700 font-semibold mb-2">
                Important Cancellation Window
              </p>
              <p className="text-gray-700">
                If you fail to cancel within 24 hours, or if the product already gets dispatched from our warehouse, you won't be eligible for cancellation.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              To cancel your order, email us at <a href="mailto:support@eatmilay.com" className="text-primary hover:underline font-semibold">support@eatmilay.com</a>.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-green-800 mb-3">
                Refund Process
              </h3>
              <p className="text-green-700 mb-2">
                If your order is eligible for cancellation and is cancelled, the amount shall be refunded in the same mode as your mode of payment.
              </p>
              <p className="text-green-700">
                <strong>Refund Timeline:</strong> The refund might take 7 to 10 working days to get the amount in your account.
              </p>
            </div>
          </section>

          {/* Partial Payment Refund Section */}
          <section id="partial-payment-refund">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Partial Payment Refund Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For Cash on Delivery (COD) orders, the following refund policy applies:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Order Not Dispatched
                </h3>
                <p className="text-blue-700">
                  If you wish to cancel a COD order and it has not been dispatched, you may receive a partial payment refund.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h3 className="font-semibold text-orange-800 mb-3">
                  Order Already Dispatched
                </h3>
                <p className="text-orange-700 mb-2">
                  If the order has been dispatched and more than one hour has passed since placement, a non-refundable Rs.100 deduction will be made from the total order amount.
                </p>
                <p className="text-orange-700">
                  This deduction covers processing and dispatch costs.
                </p>
              </div>
            </div>
          </section>

          {/* Return Policy Section */}
          <section id="return-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Return Policy
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-4">
              <h3 className="font-semibold text-red-800 mb-3">
                2-Day Return Window for Damaged Items
              </h3>
              <p className="text-red-700 mb-2">
                Notify us at <a href="mailto:support@eatmilay.com" className="text-primary hover:underline font-semibold">support@eatmilay.com</a> within 2 Days of delivery if your product is damaged.
              </p>
              <p className="text-red-700">
                We accept returns exclusively for damaged items within this time frame.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Return Process
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Contact us within 2 days of delivery if your product is damaged
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Upon approval, follow the provided instructions for the return process
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Returns within 2 Days are accepted solely for damaged items
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> We appreciate your understanding that returns within 2 Days are accepted solely for damaged items. For any questions, contact our support team.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact-us">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For cancellations, refunds, or returns, please contact our customer support team:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Email:</strong> <a href="mailto:support@eatmilay.com" className="text-primary hover:underline">support@eatmilay.com</a>
                </p>
                <p>
                  <strong>Customer Support:</strong> <a href="mailto:support@eatmilay.com" className="text-primary hover:underline">support@eatmilay.com</a>
                </p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>Important:</strong> Please include your order number and reason for cancellation/return when contacting us. This helps us process your request faster.
              </p>
            </div>
          </section>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
}
