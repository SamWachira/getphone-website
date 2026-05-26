import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how GetPhone makes smartphone ownership simple through deposit-based access and flexible repayment plans via EVC Plus.',
};

const processSteps = [
  {
    num: '01',
    title: 'Choose Your Device',
    desc: 'Visit any Hormuud branch or service point and browse our selection of ZTE smartphones. Our team will help you find the perfect phone for your needs and budget.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pay Your Deposit',
    desc: 'Make an affordable upfront deposit to secure your device. Deposit amounts vary by phone model and are designed to be accessible for all income levels.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Get Registered',
    desc: 'Complete a quick registration at any Hormuud shop using your active Hormuud number as your primary identity. Approval is fast and straightforward.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Take Your Phone Home',
    desc: 'Walk out with your new smartphone immediately, plus enjoy 1 GB of free daily data and 30 minutes of free daily calls from day one.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Pay in Installments',
    desc: 'Pay the remaining balance through the eGet Customer app (integrated with EVC Plus via Waafi). Payments are managed manually and securely.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const plans = [
  {
    duration: '6 Months',
    frequency: 'Daily or weekly payments',
    idealFor: 'Higher income earners who want to pay off quickly',
    deposit: 'Standard deposit',
    highlight: false,
  },
  {
    duration: '9 Months',
    frequency: 'Daily or weekly payments',
    idealFor: 'Professionals and small business owners',
    deposit: 'Standard deposit',
    highlight: true,
  },
  {
    duration: '12 Months',
    frequency: 'Daily or weekly payments',
    idealFor: 'Students and budget-conscious customers',
    deposit: 'Standard deposit',
    highlight: false,
  },
];

const financingFaq = [
  {
    question: 'Do I need a bank account?',
    answer: 'No. All payments are made through the eGet Customer app, which is integrated with EVC Plus through Waafi. We use lenient and inclusive credit scoring designed to help as many people as possible.',
  },
  {
    question: 'Is this interest-free financing?',
    answer: 'Yes. GetPhone operates on ethical, Sharia-compliant principles. You pay 0% interest — just the agreed total price of the phone, spread across your chosen payment plan.',
  },
  {
    question: 'Can I pay off my phone early?',
    answer: 'Yes. You are welcome to make larger payments or pay off the remaining balance early at any time without any penalties.',
  },
  {
    question: 'What if I miss a payment?',
    answer: 'We send reminders first. If payments remain outstanding, device access may be temporarily restricted. Once you pay, full access is restored immediately — there are no extra penalties for late payment.',
  },
  {
    question: 'How are payments collected?',
    answer: 'Payments are made manually through the eGet Customer app at your convenience, according to your schedule (daily or weekly). You receive confirmation after each payment.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How GetPhone Works"
        description="GetPhone makes smartphone ownership simple through deposit-based access and flexible repayment plans."
      />

      {/* ═══ STEP BY STEP ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            label="The Process"
            title="Five Simple Steps to Your New Phone"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {processSteps.map((step, i) => (
              <div key={step.num} className="flex gap-4 sm:gap-6 items-start">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                    {step.icon}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-3" />
                  )}
                </div>
                <div className="pt-2">
                  <span className="text-xs font-bold text-accent">{step.num}</span>
                  <h3 className="font-heading font-700 text-xl text-primary mb-2">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT PLANS ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            label="Payment Plans"
            title="Choose a Plan That Suits You"
            description="Flexible installment options designed to fit every budget and income level."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.duration}
                className={`rounded-2xl p-8 text-center transition-all duration-300 ${plan.highlight
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 md:scale-105'
                    : 'bg-white border border-border-light shadow-sm'
                  }`}
              >
                {plan.highlight && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-heading font-800 text-3xl mb-2 ${plan.highlight ? 'text-white' : 'text-primary'}`}>
                  {plan.duration}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/60' : 'text-muted'}`}>
                  {plan.frequency}
                </p>
                <div className={`w-full h-px mb-6 ${plan.highlight ? 'bg-white/15' : 'bg-border'}`} />
                <p className={`text-sm mb-2 ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>
                  <strong className={plan.highlight ? 'text-white' : 'text-primary'}>Deposit:</strong> {plan.deposit}
                </p>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>
                  <strong className={plan.highlight ? 'text-white' : 'text-primary'}>Best for:</strong> {plan.idealFor}
                </p>
                <Link href="/phones" className={`btn w-full ${plan.highlight ? 'btn-white' : 'btn-primary'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT METHOD ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                label="Payment Method"
                title="Secure eGet App Payments"
                centered={false}
              />
              <div className="space-y-4">
                {[
                  'Payments are made via the eGet Customer app on your chosen schedule',
                  'No bank visits, no paperwork — just simple mobile payments',
                  'Receive instant confirmation after every payment',
                  'Full payment history available on request',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <p className="text-muted text-[0.9375rem] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-heading font-700 text-xl text-white mb-3">eGet App Integration</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                The eGet Customer app is integrated with EVC Plus via Waafi, allowing you to pay your installments manually and securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSED PAYMENTS ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Good to Know"
              title="What Happens if I Miss a Payment?"
              description="We believe in fair, respectful handling — here's how our process works."
            />

            <div className="space-y-4">
              {[
                { step: 'Reminder', desc: 'You receive a friendly reminder via SMS to make your payment.', color: 'bg-accent/10 text-accent' },
                { step: 'Restricted Access', desc: 'If payment remains outstanding, device access may be temporarily restricted.', color: 'bg-orange-50 text-orange-500' },
                { step: 'Instant Restore', desc: 'Once payment is made, full device access is restored immediately — no penalties.', color: 'bg-accent/10 text-accent' },
              ].map((item, i) => (
                <div key={i} className="card flex items-start gap-4 !p-5">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0 font-heading font-800 text-sm`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-heading font-700 text-primary mb-1">{item.step}</h4>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ELIGIBILITY ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              label="Requirements"
              title="What You Need to Apply"
              description="The application process is simple and fast. Here's what you'll need."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Hormuud Identity', desc: 'An active Hormuud number serves as your primary identity. ID cards are used if available.' },
                { title: 'Active Hormuud Number', desc: 'A valid and active Hormuud number registered in your name.' },
                { title: 'Deposit Amount', desc: 'The upfront deposit for your chosen device.' },
                { title: 'Visit a Branch', desc: 'Complete registration at any Hormuud outlet.' },
              ].map((req, i) => (
                <div key={i} className="card-elevated flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-700 text-primary mb-1">{req.title}</h4>
                    <p className="text-muted text-sm">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            label="Financing FAQ"
            title="Questions About Payments"
          />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={financingFaq} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
