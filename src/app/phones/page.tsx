import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';
import { phonesData } from '@/data/phones';

export const metadata: Metadata = {
  title: 'Phones & Devices',
  description: 'Explore our curated selection of quality ZTE smartphones — from entry-level to premium 5G devices, all available through flexible installment plans.',
};

const whyThesePhones = [
  {
    title: 'Durability',
    desc: 'Built to last in everyday conditions with quality materials and solid construction.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    title: 'Affordability',
    desc: 'Premium features at accessible price points, made even more accessible through installment plans.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Battery Life',
    desc: 'Massive 5,000–6,000 mAh batteries that keep you connected all day without constant charging.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/><path d="M7 12h4"/>
      </svg>
    ),
  },
  {
    title: 'Performance',
    desc: 'Smooth processors and ample storage for everyday apps, mobile money, and media.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
  },
  {
    title: 'Trusted Supply',
    desc: 'Direct from ZTE — every device is genuine with full manufacturer warranty and support.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Modern Connectivity',
    desc: 'Optimized for 4G and 5G networks to ensure fast, reliable mobile data and crystal-clear calls.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M1.394 9.393a15.91 15.91 0 0121.212 0M5.636 12.636a9.955 9.955 0 0112.728 0" />
      </svg>
    ),
  },
];

export default function PhonesPage() {
  return (
    <>
      <PageHero
        eyebrow="Device Catalog"
        title="Explore Our Devices"
        description="Quality smartphones designed for everyday needs, business productivity, and digital access across Somalia."
      />


      {/* ═══ DEVICES CATALOG ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            label="Device Catalog"
            title="Find the Right Phone for You"
            description="From budget-friendly entry-level phones to powerful premium devices — every model comes with flexible installment plans."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phonesData.map((phone) => (
              <div
                key={phone.slug}
                className={`rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                  phone.featured
                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                    : 'bg-white border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <span className="inline-block self-start text-xs font-bold uppercase tracking-wider mb-3 text-accent">
                  {phone.category}
                </span>
                <h3 className={`font-heading font-800 text-xl mb-4 ${phone.featured ? 'text-white' : 'text-primary'}`}>
                  {phone.name}
                </h3>
                <div className={`w-full h-48 rounded-xl mb-5 flex items-center justify-center p-4 ${
                  phone.featured ? 'bg-white/10' : 'bg-background-alt'
                }`}>
                  <img src={phone.images[0]} alt={phone.name} className="h-full w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
                </div>
                <ul className="space-y-2 mb-5 flex-1 break-words">
                  {[
                    `Storage: ${phone.specs.memory.split('\n')[0]}`,
                    `Battery: ${phone.specs.battery.split('\n')[0]}`,
                    `Camera: ${phone.specs.camera.split('\n')[0].replace('Rear: ', '')}`,
                  ].map((s, j) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${phone.featured ? 'text-white/75' : 'text-muted'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span className="flex-1">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className={`text-xs font-semibold mb-4 ${phone.featured ? 'text-white/50' : 'text-muted/60'}`}>
                  Best for: <span className={phone.featured ? 'text-accent' : 'text-primary'}>{phone.bestFor}</span>
                </div>
                <Link href={`/phones/${phone.slug}`} className={`btn w-full text-sm ${phone.featured ? 'btn-white' : 'btn-primary'}`}>
                  More about this Phone
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY THESE PHONES ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            label="Quality Promise"
            title="Why We Chose These Devices"
            description="We carefully selected phones that deliver the best value for the Somali market."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyThesePhones.map((item) => (
              <div key={item.title} className="card group px-5 py-6">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-700 text-primary mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Found the Right Phone?"
        description="Apply now and take it home today with a flexible installment plan."
        primaryLabel="Browse Devices"
        primaryHref="/phones"
        secondaryLabel="How It Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
