import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about GetPhone — eligibility, payments, devices, financing, and more.',
};

const generalFaq = [
  {
    question: 'What is GetPhone?',
    answer: 'GetPhone is a device financing company that helps people in Somalia access quality smartphones through affordable installment payment plans. We partner with Hormuud Telecom and ZTE to provide genuine devices with secure payments via the eGet Customer app (integrated with EVC Plus through Waafi).',
  },
  {
    question: 'How do I qualify for a phone?',
    answer: 'You need an active Hormuud phone number (which serves as your primary identity) and the deposit amount for your chosen device. Visit any Hormuud branch or GetPhone service point to apply — if you have an ID, you can provide it, but it is not mandatory for everyone.',
  },
  {
    question: 'How much deposit do I need?',
    answer: 'Deposit amounts vary by device model. Entry-level phones require a lower deposit, while premium devices require more. Visit a branch or contact us for current deposit amounts for each model.',
  },
  {
    question: 'Which phones are available?',
    answer: 'We currently offer the ZTE Blade A36 (entry-level), ZTE Blade A56 (mid-range), ZTE Blade A76 5G (advanced), and Nubia V80 Series (premium). All are genuine ZTE devices with full manufacturer warranty.',
  },
];

const paymentFaq = [
  {
    question: 'How do I make payments?',
    answer: 'All payments are made through the eGet Customer app, which is integrated with EVC Plus through Waafi. Payments are made manually according to your chosen schedule (daily or weekly). No bank account needed.',
  },
  {
    question: 'Can I pay daily or weekly?',
    answer: 'Yes, you choose your preferred payment frequency — daily or weekly — when setting up your plan. Both options are available on all 6, 9, and 12-month plans.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'We send friendly reminders first. If payments remain outstanding, device access may be temporarily restricted through the automated VDMS system. Once you make the payment, full access is restored immediately — no penalties or late fees.',
  },
  {
    question: 'Can I pay off my phone early?',
    answer: 'Absolutely. You can make larger payments or pay off the remaining balance at any time without penalties. Early payoff is always welcome.',
  },
];

const productFaq = [
  {
    question: 'Are the phones genuine?',
    answer: 'Yes. Every phone is sourced directly from ZTE through our exclusive supply agreement. All devices are brand new, genuine, and come with full manufacturer warranty.',
  },
  {
    question: 'Is the financing interest-free?',
    answer: 'Yes. GetPhone operates on ethical, Sharia-compliant financing principles. You pay 0% interest — the total cost is transparent and agreed upfront with no hidden fees or charges.',
  },
  {
    question: 'What daily benefits do I get?',
    answer: 'Every GetPhone customer receives 1 GB of free data and 30 minutes of free calls every single day for the duration of their payment plan. These benefits are included at no extra cost.',
  },
  {
    question: 'Where can I apply or visit?',
    answer: 'You can apply at any Hormuud branch, GetPhone service point, or authorized retail partner across Somalia. Our main locations are in Mogadishu, Hargeisa, and Kismayo, with many more partner outlets nationwide.',
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Answers & Clarity"
        title="Frequently Asked Questions"
        description="Everything you need to know about GetPhone, our financing model, and available devices."
        details={[
          { label: 'Topics', value: 'Eligibility, payments, devices and benefits' },
          { label: 'Model', value: 'Ethical, installment-based smartphone access' },
          { label: 'Need More', value: 'Direct support is one step away' },
        ]}
      />

      {/* ═══ GENERAL ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Getting Started"
              title="General Questions"
            />
            <FAQAccordion items={generalFaq} />
          </div>
        </div>
      </section>

      {/* ═══ PAYMENTS ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Payments & Financing"
              title="Payment Questions"
            />
            <FAQAccordion items={paymentFaq} />
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Products & Benefits"
              title="Device & Offer Questions"
            />
            <FAQAccordion items={productFaq} />
          </div>
        </div>
      </section>

      {/* ═══ STILL HAVE QUESTIONS ═══ */}
      <CTASection
        headline="Still Have Questions?"
        description="Our team is ready to help. Contact us directly and we'll get back to you within 24 hours."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Apply Now"
        secondaryHref="/phones"
      />
    </>
  );
}
