'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faq: FAQItem[];
}

export default function ProductFAQ({ faq }: ProductFAQProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div>
      <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4 lg:mb-6">
        Frequently Asked Questions
      </h3>
      <div className="space-y-3 lg:space-y-4">
        {faq.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl lg:rounded-2xl overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedFAQ(expandedFAQ === index ? null : index)
              }
              className="w-full px-4 lg:px-6 py-4 lg:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors touch-manipulation"
            >
              <span className="font-semibold text-primary text-sm lg:text-base pr-4">
                {item.question}
              </span>
              {expandedFAQ === index ? (
                <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {expandedFAQ === index && (
              <div className="px-4 lg:px-6 pb-4 lg:pb-5">
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
