import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const privacyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'January 15th, 2024',
  description:
    'This Privacy Policy will help you better understand how we collect, use, and share your personal information when you visit our website or make a purchase from us.',
  tableOfContents: [
    {
      id: 'information-we-collect',
      title: 'What Personal Information we collect',
    },
    {
      id: 'how-we-use-information',
      title: 'How we use your Personal Information',
    },
    { id: 'sharing-information', title: 'Sharing your Personal Information' },
    { id: 'cookies-tracking', title: 'Cookies and tracking' },
    { id: 'data-retention', title: 'Data retention' },
    { id: 'security', title: 'Security' },
    { id: 'your-rights', title: 'Your rights' },
    { id: 'minors', title: 'Minors' },
    { id: 'changes', title: 'Changes to this Privacy Policy' },
    { id: 'contact-us', title: 'Contact us' },
  ],
};

export default async function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={0} />

      <LegalPageLayout {...privacyContent}>
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This privacy policy sets out how SumNSubstance ("we", "us", or
              "our") collects, uses, and discloses any personal information that
              you give us or that we collect when you use our website or
              Services. SumNSubstance offers skincare products and services for
              customers looking to improve their skin health and appearance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using our website or Services, or by choosing to give us
              personal information, you consent to this Privacy Policy and the
              processing of your Personal Information it describes. If you do
              not agree with any terms of this Privacy Policy, please exercise
              the choices we describe in this Policy, or do not use the Services
              and do not give us any personal information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              SumNSubstance may change this policy from time to time by updating
              this page. You should check this page from time to time to ensure
              that you are happy with any changes. Your continued access to
              and/or use of our website or Services after any such changes
              constitutes your acceptance of, and agreement to this Privacy
              Policy, as revised.
            </p>
          </section>

          <section id="information-we-collect">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. What Personal Information we collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, make a purchase, or communicate with
              us, we collect various types of information.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Information you provide to us directly:
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Account Information:</strong> Name, email address,
                  phone number, shipping and billing addresses when you create
                  an account or place an order
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Payment Information:</strong> Credit card numbers,
                  payment method information (processed securely through our
                  payment processors)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Communication:</strong> Messages you send us through
                  contact forms, customer service inquiries, product reviews
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Profile Information:</strong> Skin type, preferences,
                  and other information you choose to provide
                </span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Information we collect automatically:
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Usage Data:</strong> Pages you visit, time spent on
                  our site, products viewed, search terms
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, device identifiers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Cookies and Similar Technologies:</strong> To enhance
                  your browsing experience and remember your preferences
                </span>
              </li>
            </ul>
          </section>

          <section id="how-we-use-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. How we use your Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and
              improve our services:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Order Processing:</strong> Process and fulfill your
                  orders, including shipping and customer service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Communication:</strong> Send order confirmations,
                  shipping updates, and important account information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Customer Support:</strong> Provide customer service
                  and respond to your inquiries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Personalization:</strong> Customize your shopping
                  experience and provide product recommendations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Marketing:</strong> Send promotional emails and
                  marketing communications (with your consent)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Improvement:</strong> Analyze usage patterns to
                  improve our products, services, and website functionality
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Legal Compliance:</strong> Comply with legal
                  obligations and protect against fraud
                </span>
              </li>
            </ul>
          </section>

          <section id="sharing-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Sharing your Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your personal information in certain limited
              circumstances:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Service Providers:</strong> Trusted third-party
                  companies that help us operate our business (payment
                  processors, shipping companies, email services)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or to protect our rights and safety
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Business Transfers:</strong> In connection with
                  mergers, acquisitions, or asset sales
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>With Your Consent:</strong> When you explicitly agree
                  to share your information
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>
                We never sell your personal information to third parties for
                marketing purposes.
              </strong>
            </p>
          </section>

          <section id="cookies-tracking">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Cookies and tracking
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your
              experience on our website:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Essential Cookies:</strong> Required for website
                  functionality, shopping cart, and secure areas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors use our website to improve performance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Marketing Cookies:</strong> Used to deliver
                  personalized advertisements and track their effectiveness
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences for future visits
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookie settings through your browser preferences.
              Note that disabling certain cookies may affect website
              functionality.
            </p>
          </section>

          <section id="data-retention">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Data retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this privacy policy, unless a
              longer retention period is required or permitted by law. When
              determining retention periods, we consider factors such as the
              nature of the information, potential risks from unauthorized use
              or disclosure, the purposes for processing, and applicable legal
              requirements.
            </p>
          </section>

          <section id="security">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. This includes
              encryption, secure servers, access controls, and regular security
              assessments. However, no method of transmission over the internet
              or electronic storage is 100% secure, so we cannot guarantee
              absolute security.
            </p>
          </section>

          <section id="your-rights">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Your rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have several rights regarding your personal information:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Access:</strong> Request a copy of the personal
                  information we hold about you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Correction:</strong> Update or correct inaccurate
                  personal information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information (subject to legal obligations)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications at any time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Data Portability:</strong> Request your data in a
                  machine-readable format
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information
              provided in the "Contact us" section below.
            </p>
          </section>

          <section id="minors">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Minors</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children
              under 18. If you are a parent or guardian and believe your child
              has provided us with personal information, please contact us
              immediately so we can delete such information.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Changes to this Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. We will notify you of any material changes by posting the
              updated policy on our website and updating the "Last Updated"
              date. We encourage you to review this policy periodically to stay
              informed about how we protect your information.
            </p>
          </section>

          <section id="contact-us">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. Contact us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> privacy@sumnsubstance.com
              </p>
              <p>
                <strong>Customer Service:</strong> support@sumnsubstance.com
              </p>
              <p>
                <strong>Phone:</strong> +91-XXXXXXXXXX
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
