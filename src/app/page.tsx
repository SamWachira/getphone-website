import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';

/* ── Data ────────────────────────────────── */

const steps = [
  {
    num: '01',
    title: 'Choose Your Phone',
    desc: 'Browse our curated selection of quality ZTE smartphones designed for every need and budget.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pay a Deposit',
    desc: 'Make an affordable upfront deposit at any Hormuud branch or service point near you.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Pay in Installments',
    desc: 'Enjoy your phone immediately and pay the balance through the eGet Customer app, integrated with EVC Plus via Waafi.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Own It Fully',
    desc: 'Once all installments are complete, the phone is 100% yours — full ownership, no strings attached.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: 'Affordable Installment Plans',
    desc: 'Spread your payments over 6, 9, or 12 months with flexible daily or weekly installments that fit your income.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Quality Devices You Can Trust',
    desc: 'Every phone comes directly from ZTE, ensuring genuine hardware, reliable performance, and lasting durability.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Mobile Payments',
    desc: 'Pay through the eGet Customer app — integrated with EVC Plus via Waafi for simple, manual mobile payments.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Free Daily Connectivity',
    desc: 'Get 1 GB data and 30 minutes of calls every single day for a full year — included free with your phone.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M1.394 9.393a15.91 15.91 0 0121.212 0M5.636 12.636a9.955 9.955 0 0112.728 0" />
      </svg>
    ),
  },
  {
    title: 'Ethical, Sharia-Compliant',
    desc: '0% interest financing structured around ethical principles. Pay only for your device — no hidden fees or charges.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Full Warranty & Support',
    desc: 'Enjoy total peace of mind. All our devices come with a comprehensive manufacturer warranty and dedicated customer care.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const featuredPhones = [
  {
    name: 'ZTE Blade A36',
    slug: 'zte-blade-a36',
    category: 'Entry Level',
    image: '/a36.png',
    specs: ['6.75" HD+ Display', '64 GB Storage', '5000 mAh Battery', '4G LTE'],
    idealFor: 'Students',
  },
  {
    name: 'ZTE Blade A56',
    slug: 'zte-blade-a56',
    category: 'Mid-Range',
    image: '/a56.png',
    specs: ['13MP AI Camera', '128 GB Storage', '10W Fast Charge', '4G LTE'],
    idealFor: 'Professionals',
  },
  {
    name: 'ZTE Blade A76 5G',
    slug: 'zte-blade-a76',
    category: 'Advanced',
    image: '/a76.png',
    specs: ['50MP AI Camera', 'Up to 256 GB', 'Full 5G', 'Large Display'],
    idealFor: 'SME Owners',
  },
  {
    name: 'Nubia V80 Series',
    slug: 'nubia-v80-pro',
    category: 'Premium',
    image: '/v80.png',
    specs: ['Up to 108MP Camera', '6000 mAh Battery', '120Hz Display', '5G Ready'],
    idealFor: 'Power Users',
    featured: true,
  },
];

const faqPreview = [
  {
    question: 'How do the installment payments work?',
    answer: 'After paying an affordable deposit, you take your phone home immediately. The remaining balance is paid in small daily or weekly installments through the eGet Customer app (integrated with EVC Plus via Waafi).',
  },
  {
    question: 'What do I need to apply?',
    answer: 'You need an active Hormuud phone number (which serves as your primary identity) and the deposit amount for your chosen device. If you have an ID, you can provide it, but it is not mandatory for everyone.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'We send friendly reminders first. If payments remain outstanding, device access may be temporarily restricted until payment resumes. Once you pay, full access is restored immediately — no penalties.',
  },
  {
    question: 'Is the financing interest-free?',
    answer: 'Yes. GetPhone operates on ethical, Sharia-compliant financing principles. You pay 0% interest — the total cost is transparent and agreed upfront with no hidden charges.',
  },
];


/* ── Page ────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[calc(100vh-0px)] max-h-[800px] min-h-[500px] flex items-center overflow-hidden bg-primary">
        {/* Background image — desktop only */}
        <div
          className="absolute inset-0 hidden md:block opacity-90 lg:opacity-100"
          style={{
            backgroundImage: 'url(/herobg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="section-container px-5 lg:px-8 pt-40 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24 relative z-10">
          <div className="max-w-lg lg:max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent text-sm font-semibold mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Tartiib tartiib ubixi
            </div>

            <h1 className="font-heading font-800 text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] text-white mb-4 tracking-tight">
              Own a Smartphone
              <br />
              <span className="text-accent">the Smarter Way.</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-md leading-relaxed mb-7">
              GetPhone helps people and businesses in Somalia access quality smartphones through flexible installment plans, trusted telecom integration, and valuable daily connectivity benefits.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/phones" className="btn btn-primary text-sm !px-7 !py-3">
                View Phones
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/how-it-works" className="btn !border-2 !border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all text-sm !px-7 !py-3">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section
        className="section-padding bg-background w-full"
        style={{
          backgroundImage: 'url("/bg1.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="section-container">
          <SectionHeading
            label="Simple Process"
            title="How GetPhone Works"
            description="Four easy steps to smartphone ownership — lenient and inclusive credit scoring, no bank accounts, no complicated paperwork."
          />

          {/* Desktop timeline layout */}
          <div className="hidden lg:block">
            {/* Timeline bar */}
            <div className="relative mb-10">
              <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/20 via-accent/40 to-accent -translate-y-1/2" />
              <div className="grid grid-cols-4">
                {steps.map((step, i) => (
                  <div key={step.num} className="flex justify-center">
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-heading font-800 text-sm z-10 transition-all duration-300 ${i === steps.length - 1
                        ? 'bg-accent text-white shadow-lg shadow-accent/30'
                        : 'bg-white border-2 border-accent/30 text-accent'
                      }`}>
                      {step.num}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-4 gap-5">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`rounded-2xl px-5 py-7 text-center transition-all duration-300 ${i === steps.length - 1
                      ? 'bg-primary text-white shadow-xl shadow-primary/15'
                      : 'bg-white border border-border-light shadow-sm hover:shadow-md hover:-translate-y-1'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${i === steps.length - 1
                      ? 'bg-accent/20 text-accent'
                      : 'bg-accent/10 text-accent'
                    }`}>
                    {step.icon}
                  </div>
                  <h3 className={`font-heading font-700 text-[1.0625rem] mb-2 ${i === steps.length - 1 ? 'text-white' : 'text-primary'
                    }`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === steps.length - 1 ? 'text-white/65' : 'text-muted'
                    }`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet vertical layout */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-4 items-start">
                {/* Vertical timeline */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-800 text-xs ${i === steps.length - 1
                      ? 'bg-accent text-white'
                      : 'bg-white border-2 border-accent/30 text-accent'
                    }`}>
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-10 bg-accent/20 mt-2 md:hidden" />
                  )}
                </div>
                {/* Card */}
                <div className={`flex-1 rounded-xl px-5 py-4 ${i === steps.length - 1
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white border border-border-light shadow-sm'
                  }`}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${i === steps.length - 1 ? 'bg-accent/20 text-accent' : 'bg-accent/10 text-accent'
                      }`}>
                      {step.icon}
                    </div>
                    <h3 className={`font-heading font-700 text-[0.9375rem] ${i === steps.length - 1 ? 'text-white' : 'text-primary'
                      }`}>{step.title}</h3>
                  </div>
                  <p className={`text-sm leading-relaxed ml-12 ${i === steps.length - 1 ? 'text-white/65' : 'text-muted'
                    }`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY GETPHONE ═══ */}
      <section
        className="section-padding bg-background-alt w-full"
        style={{
          backgroundImage: 'url("/bg2.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="section-container">
          <SectionHeading
            label="Why Choose Us"
            title="Built Around What Matters to You"
            description="Every part of GetPhone is designed to make smartphone ownership accessible, affordable, and beneficial."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="card group px-6 py-7">
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-heading font-700 text-[1.0625rem] text-primary mb-2.5">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED DEVICES ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            label="Our Devices"
            title="Quality Smartphones for Every Need"
            description="Curated ZTE devices that balance performance, durability, and affordability for the Somali market."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPhones.map((phone) => (
              <div
                key={phone.name}
                className={`rounded-2xl p-6 flex flex-col transition-all duration-300 ${phone.featured
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'bg-white border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1'
                  }`}
              >
                <span className="inline-block self-start text-xs font-bold uppercase tracking-wider mb-3 text-accent">
                  {phone.category}
                </span>
                <h3 className={`font-heading font-800 text-lg mb-4 ${phone.featured ? 'text-white' : 'text-primary'}`}>
                  {phone.name}
                </h3>
                <div className={`w-full h-44 rounded-xl mb-5 flex items-center justify-center p-4 ${phone.featured ? 'bg-white/10' : 'bg-background-alt'
                  }`}>
                  <img src={phone.image} alt={phone.name} className="h-full w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
                </div>
                <ul className="space-y-2 mb-5 flex-1">
                  {phone.specs.map((s, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${phone.featured ? 'text-white/75' : 'text-muted'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className={`text-xs font-semibold mb-4 ${phone.featured ? 'text-white/50' : 'text-muted/60'}`}>
                  Ideal for: <span className={phone.featured ? 'text-accent' : 'text-primary'}>{phone.idealFor}</span>
                </div>
                <Link href={`/phones/${phone.slug}`} className={`btn w-full text-sm ${phone.featured ? 'btn-white' : 'btn-primary'}`}>
                  More about this Phone
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/phones" className="btn btn-secondary">
              View All Devices
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ OFFERS SPOTLIGHT ═══ */}
      <section
        className="section-padding relative overflow-hidden w-full"
        style={{
          backgroundImage: 'url("/bg3.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-primary/85" />

        <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-10">

          {/* Content Side */}
          <div className="w-full lg:w-[55%]">
            <SectionHeading
              label="Exclusive Benefits"
              title="1 Year of Free Connectivity"
              description="Every GetPhone customer enjoys incredible daily benefits included completely free while paying for their phone."
              light
              centered={false}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {[
                { val: '1 GB', label: 'Daily Data', desc: 'Browse, stream, and stay connected every day' },
                { val: '30 Min', label: 'Daily Calls', desc: 'Stay in touch with family, friends, and business' },
              ].map((offer) => (
                <div
                  key={offer.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col justify-center"
                >
                  <div className="text-4xl font-heading font-800 text-accent mb-2">{offer.val}</div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-white/70 mb-1.5">{offer.label}</div>
                    <p className="text-white/50 text-sm leading-relaxed">{offer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-[45%] relative h-80 sm:h-[400px] lg:h-[550px] flex items-center justify-center">
            {/* Subtle glow behind the image */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] scale-75" />

            <div className="absolute inset-0">
              <img
                src="/a56many.png"
                alt="GetPhone ZTE Devices"
                className="w-full h-full object-contain object-center z-10 relative drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ═══ PARTNER TRUST ═══ */}
      <section 
        className="section-padding relative overflow-hidden w-full"
        style={{
          backgroundImage: 'url("/bg4.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/50" />
        <div className="section-container relative z-10">
          <SectionHeading
            label="Strategic Partnerships"
            title="Backed by Somalia's Most Trusted Names"
            description="GetPhone's strength comes from unparalleled partnerships that ensure quality, reach, and seamless service."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Hormuud Telecom',
                logo: '/Hormuud.svg',
                role: 'Network & Distribution Partner',
                desc: 'Somalia\'s largest telecom provider powers our nationwide distribution, EVC Plus payments, and daily connectivity benefits.',
              },
              {
                name: 'ZTE Corporation',
                logo: '/ZTE.png',
                role: 'Hardware Partner',
                desc: 'Global smartphone manufacturer supplying quality, durable devices designed specifically for emerging market needs.',
              },
              {
                name: 'EVC Plus',
                logo: '/EVC-Plus.png',
                role: 'Payment Infrastructure',
                desc: 'Fully integrated mobile money payments enabling seamless daily and weekly installment collection across Somalia.',
              },
            ].map((partner) => (
              <div key={partner.name} className="card-elevated text-center px-6 py-8">
                <div className="h-14 md:h-16 flex items-center justify-center mx-auto mb-6 px-4">
                  <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="font-heading font-700 text-lg text-primary mb-1">{partner.name}</h3>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{partner.role}</span>
                <p className="text-muted text-sm leading-relaxed mt-3">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ PREVIEW ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            label="Common Questions"
            title="Frequently Asked Questions"
            description="Quick answers to help you understand how GetPhone works."
          />

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqPreview} />
            <div className="text-center mt-8">
              <Link href="/faq" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2">
                View all questions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <CTASection
        headline="Ready to Get Connected?"
        description="Take the first step toward owning a quality smartphone. Flexible payments, trusted devices, and daily connectivity benefits await."
        primaryLabel="Apply Now"
        primaryHref="/apply"
        secondaryLabel="Find a Branch"
        secondaryHref="/contact"
      />
    </>
  );
}
