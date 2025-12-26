import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const termsContent = {
  title: 'Terms & Conditions',
  lastUpdated: 'January 15th, 2024',
  description:
    'Please read these Terms and Conditions carefully before using our website or purchasing our products. By using our services, you agree to be bound by these terms.',
  tableOfContents: [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'definitions', title: 'Definitions' },
    { id: 'use-of-website', title: 'Use of Website' },
    { id: 'products-services', title: 'Products and Services' },
    { id: 'ordering-payments', title: 'Ordering and Payments' },
    { id: 'shipping-delivery', title: 'Shipping and Delivery' },
    { id: 'returns-refunds', title: 'Returns and Refunds' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'prohibited-uses', title: 'Prohibited Uses' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'modifications', title: 'Modifications' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact-information', title: 'Contact Information' },
  ],
};

export default async function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={0} />

      <LegalPageLayout {...termsContent}>
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Welcome to SumNSubstance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions ("Terms") govern your use of the
              SumNSubstance website and your purchase of our skincare products.
              By accessing our website or making a purchase, you agree to comply
              with and be bound by these Terms. Please read them carefully
              before using our services.
            </p>
          </section>

          <section id="acceptance">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  These Terms constitute a legally binding agreement between you
                  and SumNSubstance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  If you do not agree to these Terms, you must not use our
                  website or services
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Your continued use of our website constitutes acceptance of
                  any modifications to these Terms
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must be at least 18 years old to use our services or have
                  parental consent
                </span>
              </li>
            </ul>
          </section>

          <section id="definitions">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Definitions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For the purposes of these Terms, the following definitions apply:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      "Company" / "We" / "Us" / "Our"
                    </h3>
                    <p className="text-gray-700">
                      Refers to SumNSubstance Private Limited, the owner and
                      operator of this website
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      "User" / "You" / "Your"
                    </h3>
                    <p className="text-gray-700">
                      Refers to any individual accessing or using our website
                      and services
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">"Products"</h3>
                    <p className="text-gray-700">
                      Refers to the skincare products and related items sold
                      through our website
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">"Services"</h3>
                    <p className="text-gray-700">
                      Refers to the website, customer support, and related
                      services provided by us
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">"Website"</h3>
                    <p className="text-gray-700">
                      Refers to sumnsubstance.com and all associated domains and
                      subdomains
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="use-of-website">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Use of Website
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of our website is subject to the following conditions:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>You may use our website for lawful purposes only</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must provide accurate and complete information when
                  creating an account or placing orders
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You are responsible for maintaining the confidentiality of
                  your account credentials
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must not use our website in any way that could damage or
                  impair our services
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms
                </span>
              </li>
            </ul>
          </section>

          <section id="products-services">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Products and Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Information about our products and services:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All product descriptions, images, and specifications are
                  provided for informational purposes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We strive for accuracy but cannot guarantee that all
                  information is complete or error-free
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Product availability is subject to change without notice
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right to limit quantities or discontinue
                  products
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All products are subject to quality control and may be
                  recalled if necessary
                </span>
              </li>
            </ul>
          </section>

          <section id="ordering-payments">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Ordering and Payments
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Terms related to orders and payments:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Order Processing
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Orders are subject to acceptance and availability
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      We reserve the right to refuse or cancel orders at our
                      discretion
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Order confirmation does not guarantee product availability
                    </span>
                  </li>
                </ul>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Payment must be made in full before order processing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    We accept various payment methods including credit cards,
                    debit cards, UPI, and COD
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    All prices are in Indian Rupees (INR) and include applicable
                    taxes unless stated otherwise
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    We reserve the right to change prices without prior notice
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section id="shipping-delivery">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Shipping and Delivery
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Shipping and delivery terms:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Delivery times are estimates and may vary due to circumstances
                  beyond our control
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Risk of loss and title pass to you upon delivery to the
                  carrier
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must provide accurate shipping information and be
                  available to receive deliveries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Additional charges may apply for special delivery requests or
                  remote locations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We are not responsible for delays caused by customs, weather,
                  or other external factors
                </span>
              </li>
            </ul>
          </section>

          <section id="returns-refunds">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Returns and Refunds
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our return and refund policy summary:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Returns are subject to our Return and Refund Policy available
                  on our website
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Products must be returned within 30 days of delivery in
                  original condition
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Certain products may not be returnable for hygiene and safety
                  reasons
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Refunds will be processed to the original payment method
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Return shipping costs may be borne by the customer unless the
                  product is defective
                </span>
              </li>
            </ul>
          </section>

          <section id="user-accounts">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. User Accounts
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Account creation and management terms:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You may create an account to access additional features and
                  track orders
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You are responsible for maintaining accurate account
                  information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must keep your login credentials secure and confidential
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You are responsible for all activities that occur under your
                  account
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We may suspend or terminate accounts that violate these Terms
                </span>
              </li>
            </ul>
          </section>

          <section id="prohibited-uses">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Prohibited Uses
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not use our website for any of the following purposes:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Any unlawful purpose or to solicit others to perform
                    unlawful acts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    To violate any international, federal, provincial, or state
                    regulations, rules, laws, or local ordinances
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    To infringe upon or violate our intellectual property rights
                    or the intellectual property rights of others
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    To harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To submit false or misleading information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    To upload or transmit viruses or any other type of malicious
                    code
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section id="intellectual-property">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Protection of intellectual property rights:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All content on this website is owned by SumNSubstance and
                  protected by copyright laws
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Trademarks, logos, and brand names are the property of
                  SumNSubstance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You may not reproduce, distribute, or create derivative works
                  without written permission
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  User-generated content remains your property but grants us
                  usage rights
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We respect intellectual property rights and expect users to do
                  the same
                </span>
              </li>
            </ul>
          </section>

          <section id="disclaimers">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              11. Disclaimers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Important disclaimers regarding our services:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Our website and products are provided "as is" without
                    warranties of any kind
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    We do not guarantee that our website will be uninterrupted
                    or error-free
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Product results may vary and are not guaranteed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    We recommend consulting a dermatologist before using new
                    skincare products
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    We are not responsible for any adverse reactions to our
                    products
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section id="limitation-liability">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              12. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Limitations on our liability:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Our total liability shall not exceed the amount paid by you
                  for the specific product or service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We are not liable for indirect, incidental, or consequential
                  damages
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We are not responsible for delays or failures due to
                  circumstances beyond our control
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Some jurisdictions may not allow these limitations, so they
                  may not apply to you
                </span>
              </li>
            </ul>
          </section>

          <section id="privacy-policy">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              13. Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Our Privacy Policy explains how we collect, use, and protect
                  your information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  By using our services, you consent to our Privacy Policy
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We implement security measures to protect your personal
                  information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You have rights regarding your personal data as outlined in
                  our Privacy Policy
                </span>
              </li>
            </ul>
          </section>

          <section id="modifications">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              14. Modifications
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Changes to these Terms and Conditions:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right to modify these Terms at any time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Changes will be posted on this page with an updated "Last
                  Updated" date
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Your continued use of our services constitutes acceptance of
                  modifications
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>We encourage you to review these Terms periodically</span>
              </li>
            </ul>
          </section>

          <section id="governing-law">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              15. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Legal jurisdiction and applicable law:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>These Terms are governed by the laws of India</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Any disputes will be subject to the jurisdiction of Indian
                  courts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We will attempt to resolve disputes through mediation before
                  litigation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  If any provision of these Terms is invalid, the remaining
                  provisions remain in effect
                </span>
              </li>
            </ul>
          </section>

          <section id="contact-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              16. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Questions about these Terms and Conditions? Contact us:
            </p>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Email:</strong> legal@sumnsubstance.com
              </p>
              <p>
                <strong>Customer Support:</strong> support@sumnsubstance.com
              </p>
              <p>
                <strong>Phone:</strong> +91-XXXXXXXXXX
              </p>
              <p>
                <strong>Business Address:</strong> SumNSubstance Private
                Limited, [Your Business Address], India
              </p>
              <p>
                <strong>Support Hours:</strong> Monday to Saturday, 10:00 AM -
                7:00 PM
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-700">
                <strong>Note:</strong> For urgent matters related to product
                safety or adverse reactions, please contact us immediately at
                support@sumnsubstance.com or call our customer service line.
              </p>
            </div>
          </section>
        </div>
      </LegalPageLayout>

      <Footer />
    </div>
  );
}
