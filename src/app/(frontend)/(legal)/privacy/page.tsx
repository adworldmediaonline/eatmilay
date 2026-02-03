import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const privacyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'January 27th, 2026',
  description:
    'This Privacy Policy describes how eatmilay (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.',
  tableOfContents: [
    { id: 'contact', title: 'Contact' },
    { id: 'collecting-personal-information', title: 'Collecting Personal Information' },
    { id: 'sharing-personal-information', title: 'Sharing Personal Information' },
    { id: 'behavioural-advertising', title: 'Behavioural Advertising' },
    { id: 'using-personal-information', title: 'Using Personal Information' },
    { id: 'retention', title: 'Retention' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'changes', title: 'Changes' },
    { id: 'complaints', title: 'Complaints' },
  ],
};

export default async function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">


      <LegalPageLayout {...privacyContent}>
        <div className="space-y-12">
          {/* Contact Section */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              After reviewing this policy, if you have additional questions, want more information about our privacy practices, or would like to make a complaint, please contact us by e-mail at <a href="mailto:support@eatmilay.com" className="text-primary hover:underline">support@eatmilay.com</a> or by mail using the details provided below:
            </p>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="text-gray-700 font-medium">
                eatmilay Private Limited<br />
                [Your Business Address]<br />
                [City], [State] [PIN Code], India
              </p>
            </div>
          </section>

          <section id="collecting-personal-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Collecting Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information about an identifiable individual (including the information below) as "Personal Information". See the list below for more information about what Personal Information we collect and why.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Device Information
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose of collection:</strong> To load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Disclosure for a business purpose:</strong> Shared with our analytics providers and messaging apps.
                </p>
                <p className="text-gray-700">
                  <strong>Personal Information collected:</strong> Version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Information
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose of collection:</strong> To provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Source of collection:</strong> Collected from you.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Disclosure for a business purpose:</strong> Shared with our payment processors (Razorpay) and logistics partners.
                </p>
                <p className="text-gray-700">
                  <strong>Personal Information collected:</strong> Name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Customer Support Information
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose of collection:</strong> To provide order/customer support.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Source of collection:</strong> Website and/or social media.
                </p>
                <p className="text-gray-700">
                  <strong>Personal Information collected:</strong> Name, email address, phone number, order details, and any information you provide when contacting our customer support team.
                </p>
              </div>
            </div>
          </section>

          <section id="using-personal-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Using Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use your Personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
            </p>
          </section>

          <section id="sharing-personal-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sharing Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:
            </p>
            <ul className="space-y-3 text-gray-700 mb-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We use trusted payment processors like <strong>Razorpay</strong> to securely process your payments. You can read more about how Razorpay uses your Personal Information here: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/privacy/</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We share information with our logistics partners to arrange for shipping and delivery of your orders.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                </span>
              </li>
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>We never sell your personal information to third parties for marketing purposes.</strong>
              </p>
            </div>
          </section>

          <section id="behavioural-advertising">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Behavioural Advertising
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:
            </p>
            <ul className="space-y-3 text-gray-700 mb-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We use <strong>Google Analytics</strong> to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners. We collect and share some of this information directly with our advertising partners, and in some cases through the use of cookies or other similar technologies (which you may consent to, depending on your location).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We use <strong>Facebook and Google ad services</strong> to show you personalized ads based on your interests and browsing behavior.
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              For more information about how targeted advertising works, you can visit the Network Advertising Initiative's ("NAI") educational page at <a href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                You can opt out of targeted advertising by:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>FACEBOOK</strong> - <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/settings/?tab=ads</a>
                </li>
                <li>
                  <strong>GOOGLE</strong> - <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.google.com/settings/ads/anonymous</a>
                </li>
              </ul>
              <p className="text-gray-700 mt-3">
                Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance's opt-out portal at: <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://optout.aboutads.info/</a>.
              </p>
            </div>
          </section>

          <section id="retention">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the 'Your rights' section below.
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
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have several rights regarding your personal information:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Access:</strong> Request a copy of the personal information we hold about you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Correction:</strong> Update or correct inaccurate personal information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Erasure:</strong> Request deletion of your personal information (subject to legal obligations)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Data Portability:</strong> Request your data in a machine-readable format
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided in the "Contact" section above.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Changes
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section id="complaints">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Complaints
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As noted above, if you would like to make a complaint, please contact us by e-mail or by mail using the details provided under "Contact" above.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority, or our supervisory authority. For India, you can file a complaint with the Data Protection Authority once it is established under the Digital Personal Data Protection Act, 2023.
            </p>
          </section>
        </div>
      </LegalPageLayout>


    </div>
  );
}
