import { Heart, Leaf, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary text-white pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 lg:w-16 lg:h-16 fill-current" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-center mb-4">
            Our Story
          </h1>
          <p className="text-lg lg:text-xl text-white/90 text-center max-w-2xl mx-auto">
            Discover the passion and purpose behind eatmilay.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Our Story */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              eatmilay was born out of a passion for creating effective, natural skincare solutions that truly nourish and enhance your skin's health. We believe that beauty comes not just from appearance but from the quality and purity of the products you use every day.
            </p>

            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              Our journey started with a commitment to harness the power of nature combined with scientific innovation. Each product is crafted with carefully selected ingredients to ensure maximum benefits without compromising on safety or integrity.
            </p>

            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              At eatmilay, we value transparency, quality, and sustainability. We strive to empower our customers with products that are gentle yet powerful, helping you embrace your natural beauty with confidence.
            </p>

            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              Join us on this journey to healthier skin and a happier you. Because at eatmilay, it's not just about what we make, it's about the story behind every bottle.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Transparency
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                We believe in being open about our ingredients and processes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Quality
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Every product is crafted with the highest standards of excellence.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                We care for the planet as much as we care for your skin.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-12">
          <div className="bg-primary text-white rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              To empower every individual with natural, effective skincare solutions that celebrate authentic beauty and promote healthier, happier skin for life.
            </p>
          </div>
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

