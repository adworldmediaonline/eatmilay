import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary text-white pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="w-12 h-12 lg:w-16 lg:h-16" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-center mb-4">
            Contact Us
          </h1>
          <p className="text-lg lg:text-xl text-white/90 text-center max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed text-base lg:text-lg text-center">
            We would love to hear from you! At eatmilay, your feedback, questions, and concerns are important to us. Please feel free to reach out via any of the methods below:
          </p>
        </div>

        {/* Contact Methods */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Email Us
              </h3>
              <a
                href="mailto:care@milay.com"
                className="text-gray-700 hover:text-primary text-base lg:text-lg font-semibold underline underline-offset-4 transition-colors"
              >
                care@milay.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Call Us
              </h3>
              <a
                href="tel:+919873890047"
                className="text-gray-700 hover:text-primary text-base lg:text-lg font-semibold underline underline-offset-4 transition-colors"
              >
                +91 98738 90047
              </a>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="mb-12">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl lg:text-2xl font-bold text-primary">
                Business Hours
              </h3>
            </div>
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
              Our customer care team is available to assist you <span className="font-bold">Monday through Friday, 9:00 AM to 6:00 PM IST</span>. Whether you have a question about a product, need help with an order, or want to share your experience, we are here to help.
            </p>
          </div>
        </section>

        {/* Social Media */}
        <section className="mb-12">
          <div className="bg-gray-50 rounded-xl p-6 lg:p-8 text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4">
              Connect With Us
            </h3>
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
              You can also connect with us on our social media channels for the latest updates and news.
            </p>
          </div>
        </section>

        {/* Thank You Message */}
        <section className="bg-primary text-white rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Thank You
          </h2>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
            Thank you for choosing Milay – where your satisfaction is our priority.
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block text-primary hover:text-primary/80 font-semibold text-lg underline underline-offset-4 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

