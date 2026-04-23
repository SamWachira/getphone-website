import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Partners & Institutional Solutions',
  description: 'Partner with GetPhone for institutional device programs, bulk procurement, and digital inclusion initiatives across Somalia.',
};

const partnerCategories = [
  {
    title: 'Telecom Partnerships',
    desc: 'Collaborate with GetPhone to expand device access through integrated telecom services, mobile money payments, and connectivity bundles.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M1.394 9.393a15.91 15.91 0 0121.212 0M5.636 12.636a9.955 9.955 0 0112.728 0"/>
      </svg>
    ),
  },
  {
    title: 'Device Manufacturing',
    desc: 'We welcome partnerships with manufacturers committed to providing quality, affordable smartphones for emerging markets.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: 'Retail & Distribution',
    desc: 'Join our distribution network to bring affordable smartphone financing to communities across Somalia through your retail presence.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
      </svg>
    ),
  },
  {
    title: 'NGOs & Development',
    desc: 'Partner with us to subsidize devices for vulnerable communities, accelerate digital inclusion, and support the DE4A initiative.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
      </svg>
    ),
  },
  {
    title: 'Institutional & Bulk Programs',
    desc: 'Equip your organization with bulk device procurement, managed payment plans, and dedicated support for large deployments.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    title: 'Public Sector & Gov',
    desc: 'Partner on government-led digital initiatives and provide civil servants with modern devices through structured programs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12h-15" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: 'Devices for Students',
    desc: 'Enable digital learning by equipping students with smartphones through subsidized installment programs.',
  },
  {
    title: 'Devices for Field Teams',
    desc: 'Provide reliable mobile devices for NGO field workers, health workers, and government staff.',
  },
  {
    title: 'Devices for Entrepreneurs',
    desc: 'Empower small business owners with smartphones for mobile payments, communication, and market access.',
  },
  {
    title: 'Community Inclusion Programs',
    desc: 'Support vulnerable communities with access to affordable smart technology and digital services.',
  },
];

const whyPartner = [
  { title: 'Nationwide Reach', desc: 'Access Hormuud\'s extensive distribution network across every region of Somalia.' },
  { title: 'Structured Payments', desc: 'Proven installment model with manual repayments via the eGet Customer app and low default rates.' },
  { title: 'Digital Inclusion Mission', desc: 'Align your organization\'s goals with a meaningful social impact initiative.' },
  { title: 'Trusted Partnerships', desc: 'Join an ecosystem backed by Hormuud Telecom and ZTE Corporation.' },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="Partner With GetPhone"
        description="Join us in expanding smartphone access across Somalia through institutional solutions, bulk programs, and development partnerships."
      />

      {/* ═══ PARTNERSHIP CATEGORIES ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            title="How We Can Work Together"
            description="We offer structured partnerships for organizations across multiple sectors."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerCategories.map((cat) => (
              <div key={cat.title} className="card group px-6 py-7">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-heading font-700 text-lg text-primary mb-2">{cat.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            title="Institutional Use Cases"
            description="Real-world programs that benefit from GetPhone's device financing platform."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {useCases.map((uc, i) => (
              <div key={i} className="card-elevated flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 font-heading font-800">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-700 text-primary mb-1">{uc.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY PARTNER ═══ */}
      <section className="section-padding bg-primary">
        <div className="section-container">
          <SectionHeading
            title="Why Partner With GetPhone"
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyPartner.map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h3 className="font-heading font-700 text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Interested in a Partnership?"
        description="Let's discuss how GetPhone can support your organization's device and connectivity needs."
        primaryLabel="Contact Business Team"
        primaryHref="/contact"
        secondaryLabel="Learn More"
        secondaryHref="/about"
      />
    </>
  );
}
