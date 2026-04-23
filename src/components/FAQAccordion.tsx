'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 ${
              isOpen ? 'border-accent/30 bg-background-green shadow-sm' : 'border-border-light bg-white'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span className={`font-heading font-700 text-[0.9375rem] leading-snug ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                {item.question}
              </span>
              <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'bg-accent text-white rotate-180' : 'bg-background-alt text-muted'
              }`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 text-muted text-[0.9375rem] leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
