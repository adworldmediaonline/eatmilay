'use client';

import { useState } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  tableOfContents: Array<{
    id: string;
    title: string;
  }>;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  description,
  tableOfContents,
  children,
}: LegalPageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  console.log(sidebarOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 bg-white p-6 sm:p-8 lg:p-12">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-gray-600 text-sm mb-6">
                Last Updated {lastUpdated}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>

            {/* Table of Contents - Mobile */}
            <div className="lg:hidden mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Table of contents
                </h2>
                <div className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                    >
                      {index + 1}. {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">{children}</div>

            {/* Back to Top Button */}
            <div className="text-center pt-8 border-t border-gray-200 mt-12">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Back to top ↑
              </button>
            </div>
          </main>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 bg-white p-6 h-fit sticky top-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                Last Updated {lastUpdated}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Table of contents
              </h4>
              <div className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    {index + 1}. {item.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
