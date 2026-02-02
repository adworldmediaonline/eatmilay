import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import LegalPageLayout from '@/components/layout/legal-page-layout';

const termsContent = {
  title: 'Terms of Service',
  lastUpdated: 'January 27th, 2026',
  description:
    'These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content. Please read these Terms of Service carefully before accessing or using our website.',
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'online-store-terms', title: 'Online Store Terms' },
    { id: 'general-conditions', title: 'General Conditions' },
    { id: 'accuracy-information', title: 'Accuracy, Completeness and Timeliness of Information' },
    { id: 'modifications-prices', title: 'Modifications to the Service and Prices' },
    { id: 'products-services', title: 'Products or Services' },
    { id: 'billing-account', title: 'Accuracy of Billing and Account Information' },
    { id: 'optional-tools', title: 'Optional Tools' },
    { id: 'third-party-links', title: 'Third-Party Links' },
    { id: 'user-comments', title: 'User Comments, Feedback and Other Submissions' },
    { id: 'personal-information', title: 'Personal Information' },
    { id: 'errors-inaccuracies', title: 'Errors, Inaccuracies and Omissions' },
    { id: 'prohibited-uses', title: 'Prohibited Uses' },
    { id: 'disclaimer-warranties', title: 'Disclaimer of Warranties; Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'severability', title: 'Severability' },
    { id: 'termination', title: 'Termination' },
    { id: 'entire-agreement', title: 'Entire Agreement' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes-terms', title: 'Changes to Terms of Service' },
    { id: 'contact-information', title: 'Contact Information' },
    { id: 'discount-offers', title: 'Discount Offers' },
  ],
};

export default async function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">


      <LegalPageLayout {...termsContent}>
        <div className="space-y-12">
          {/* Overview Section */}
          <section id="overview">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This website is operated by eatmilay. Throughout the site, the terms "we", "us" and "our" refer to eatmilay. eatmilay offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-4">
              <p className="text-gray-700 font-semibold mb-2">
                Important: Please Read Carefully
              </p>
              <p className="text-gray-700">
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section id="online-store-terms">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 1 - Online Store Terms
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You must not transmit any worms or viruses or any code of a destructive nature.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  A breach or violation of any of the Terms will result in an immediate termination of your Services.
                </span>
              </li>
            </ul>
          </section>

          <section id="general-conditions">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 2 - General Conditions
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right to refuse Service to anyone for any reason at any time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                </span>
              </li>
            </ul>
          </section>

          <section id="accuracy-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 3 - Accuracy, Completeness and Timeliness of Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
            </p>
          </section>

          <section id="modifications-prices">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 4 - Modifications to the Service and Prices
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Prices for our products are subject to change without notice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </span>
              </li>
            </ul>
          </section>

          <section id="products-services">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 5 - Products or Services
            </h2>
            <ul className="space-y-3 text-gray-700 mb-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our <a href="/cancellation-and-refunds" className="text-primary hover:underline">Refund Policy</a>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or Services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or Service made on this site is void where prohibited.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We do not warrant that the quality of any products, Services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                </span>
              </li>
            </ul>
          </section>

          <section id="billing-account">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 6 - Accuracy of Billing and Account Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For more details, please review our <a href="/cancellation-and-refunds" className="text-primary hover:underline">Refund Policy</a>.
            </p>
          </section>

          <section id="optional-tools">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 7 - Optional Tools
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  We may also, in the future, offer new Services and/or features through the website (including the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service.
                </span>
              </li>
            </ul>
          </section>

          <section id="third-party-links">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 8 - Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Certain content, products and Services available via our Service may include materials from third-parties.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
            </p>
          </section>

          <section id="user-comments">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 9 - User Comments, Feedback and Other Submissions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If, at our request, you send certain specific submissions (for example contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
            </p>
          </section>

          <section id="personal-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 10 - Personal Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your submission of personal information through the store is governed by our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, which can be viewed here.
            </p>
          </section>

          <section id="errors-inaccuracies">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 11 - Errors, Inaccuracies and Omissions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
            </p>
            <p className="text-gray-700 leading-relaxed">
              We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
            </p>
          </section>

          <section id="prohibited-uses">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 12 - Prohibited Uses
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(a) for any unlawful purpose;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(b) to solicit others to perform or participate in any unlawful acts;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(f) to submit false or misleading information;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(h) to collect or track the personal information of others;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(i) to spam, phish, pharm, pretext, spider, crawl, or scrape;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(j) for any obscene or immoral purpose; or</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>(k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet.</span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
            </p>
          </section>

          <section id="disclaimer-warranties">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 13 - Disclaimer of Warranties; Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree that from time to time we may remove the Service for indefinite periods of time or cancel the Service at any time, without notice to you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and Services delivered to you through the Service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
              <p className="text-gray-700">
                In no case shall eatmilay, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, Service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the Service or any products procured using the Service, or for any other claim related in any way to your use of the Service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the Service or any content (or product) posted, transmitted, or otherwise made available via the Service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
              </p>
            </div>
          </section>

          <section id="indemnification">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 14 - Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend and hold harmless eatmilay and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
            </p>
          </section>

          <section id="severability">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 15 - Severability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 16 - Termination
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
            </p>
          </section>

          <section id="entire-agreement">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 17 - Entire Agreement
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service and any policies or operating rules posted by us on this site or in respect to the Service constitutes the entire agreement and understanding between you and us and governs your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
            </p>
          </section>

          <section id="governing-law">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 18 - Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
            </p>
          </section>

          <section id="changes-terms">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 19 - Changes to Terms of Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can review the most current version of the Terms of Service at any time at this page.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
            </p>
          </section>

          <section id="contact-information">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 20 - Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Questions about the Terms of Service should be sent to us at <a href="mailto:support@eatmilay.com" className="text-primary hover:underline">support@eatmilay.com</a>.
            </p>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="text-gray-700 font-semibold mb-3">Our contact information is posted below:</p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Company:</strong> eatmilay Private Limited
                </p>
                <p>
                  <strong>Address:</strong> [Your Business Address], [City], [State] [PIN Code], India
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:support@eatmilay.com" className="text-primary hover:underline">support@eatmilay.com</a>
                </p>
              </div>
            </div>
          </section>

          <section id="discount-offers">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Section 21 - Discount Offers
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
              <h3 className="font-semibold text-blue-800 mb-4">
                Discount Code Terms and Conditions
              </h3>
              <p className="text-blue-700 mb-4">
                The following terms and conditions apply to the use of discount codes for snack purchases on our platform:
              </p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Extra Discount Codes:</strong> These codes provide additional discounts on eligible snack products. These discounts are not applicable to Dryfruits and Gift Boxes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Exclusion of Dryfruits and Gift Boxes:</strong> Extra Discount Codes are not valid for Dryfruits and Gift Box purchases. Only snack products are eligible for these extra discounts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Maximum Discount:</strong> The maximum discount that can be claimed using an Extra Discount Code is ₹300 for snack products. No discount exceeding ₹300 will be applied, regardless of the total order value.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Code Expiry:</strong> Each discount code has an expiration date, after which it will no longer be valid for use. Please check the code's validity period before applying it to your order.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Single Use:</strong> Extra Discount Codes are typically for single use and cannot be combined with other discounts, promotions, or offers, unless explicitly stated otherwise.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Non-Transferable:</strong> Discount codes are non-transferable and can only be used by the account holder for whom they were issued.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>No Cash Value:</strong> These discount codes hold no cash value and cannot be exchanged for cash or any other form of compensation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Abuse of Codes:</strong> Any abuse or fraudulent use of discount codes may result in the suspension or termination of your account.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Amendment and Termination:</strong> We reserve the right to amend, modify, or terminate discount codes and their terms and conditions at any time, without prior notice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Contact Us:</strong> If you have any questions or concerns regarding the use of discount codes, please contact our customer support team for assistance.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </LegalPageLayout>


    </div>
  );
}
