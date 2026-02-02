import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}


      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              eatmilay is more than a brand, it's a story of love, hope, and a commitment to healthy living. It all started in a small kitchen with a big dream. Our founder, Shivali Garg, a mother on a mission. She wanted to ensure her family enjoyed snacks that weren't just tasty but also truly nourishing.
            </p>

            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
              As she looked around, she realized the market was flooded with junk foods. Instead of settling for what was available, Shivali got to work in her kitchen. What started as a personal endeavor has now grown into eatmilay.
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section className="mb-12">
          <div className="bg-primary text-white rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
              Our Vision
            </h2>
            <div className="space-y-4">
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                At eatmilay, we dream of a world where healthy snacking is not just a choice, but a way of life. A world where every home, from bustling cities to quiet villages, embraces the joy of healthy snacks.
              </p>
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                We want to bring wholesome, India-inspired snacks to families everywhere, creating a global community united by the love of snacks that's both delicious and good for you.
              </p>
            </div>
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

