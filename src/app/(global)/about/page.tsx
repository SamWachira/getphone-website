import Link from 'next/link';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'About Us | GetPhone',
  description: 'Learn about GetPhone Limited, Africa\'s premier smartphone distributor.',
};

const coreValues = [
  { 
    id: 'RELIABILITY', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), 
    text: 'Consistent supply chains and authentic hardware guaranteed.' 
  },
  { 
    id: 'SCALE', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ), 
    text: 'Continuously expanding our footprint across the continent.' 
  },
  { 
    id: 'PARTNERSHIP', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ), 
    text: 'Building lasting alliances with OEMs and local retailers.' 
  },
  { 
    id: 'AGILITY', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), 
    text: 'Adapting swiftly to diverse African market dynamics.' 
  },
  { 
    id: 'INCLUSION', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), 
    text: 'Connecting underserved regions to global technology.' 
  },
  { 
    id: 'EXCELLENCE', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ), 
    text: 'Striving for peak service delivery in wholesale logistics.' 
  },
  { 
    id: 'TRANSPARENCY', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ), 
    text: 'Honesty and openness in our pricing and B2B processes.' 
  },
  { 
    id: 'INNOVATION', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ), 
    text: 'Leveraging smart finance where it accelerates adoption.' 
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <PageHero
        eyebrow="ABOUT GETPHONE"
        title="Building Africa's Smartphone Distribution Backbone"
        description="We connect global smartphone brands to African markets through reliable distribution, strong partnerships, and technology-driven supply chains that expand access and empower communities."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
              </svg>
            ),
            value: '5',
            label: 'Active Markets'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            ),
            value: 'Trusted',
            label: 'OEM Partnerships'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            ),
            value: 'Pan-African',
            label: 'Distribution Network'
          }
        ]}
      />

      {/* ── Gradient divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ═══ OUR STORY SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Text */}
            <div>
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                OUR STORY
              </span>
              <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-[1.15] mb-6">
                Connecting Brands.<br />Powering Possibilities.
              </h2>
              <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-6 font-medium">
                GetPhone Limited is a pan-African distribution company delivering trusted devices, innovative financing, and real impact across our markets.
              </p>
              <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-10 font-medium">
                We bridge the gap between global OEMs and local retailers, ensuring the right products reach the right people — anywhere in Africa.
              </p>
              <Link 
                href="/operations" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#224167] bg-[#FAFBFD] border border-gray-200 hover:border-[#25a93e] hover:text-[#25a93e] hover:bg-white transition-all px-6 py-3.5 rounded-xl group"
              >
                Learn More About Us
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right Column Map Card */}
            <div className="relative">
              <div className="bg-white rounded-[32px] p-4 md:p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
                <img 
                  src="/getphone_markets.webp" 
                  alt="GetPhone Pan-African Presence Map" 
                  className="w-full h-auto object-contain max-h-[420px] rounded-2xl hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gradient divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ═══ MISSION & VISION SECTION ═══ */}
      <section className="py-16 md:py-24 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card (Solid Blue) */}
            <div className="bg-[#0F223F] p-10 md:p-14 rounded-[32px] shadow-sm relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#25a93e]/10 rounded-full blur-[60px] animate-pulse-glow pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 text-[#25a93e] flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                  OUR MISSION
                </span>
                <p className="font-heading font-700 text-xl md:text-2xl text-white leading-relaxed">
                  To empower African markets by building unbreakable supply chains that deliver top-tier smartphone brands reliably and affordably.
                </p>
              </div>
            </div>

            {/* Vision Card (White / Pattern Grid) */}
            <div className="gradient-border-card bg-[#FAFBFD] p-10 md:p-14 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#25a93e]/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center mb-8 border border-[#25a93e]/5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                  OUR VISION
                </span>
                <p className="font-heading font-700 text-xl md:text-2xl text-[#224167] leading-relaxed">
                  To be the most efficient, trusted, and expansive technology distributor in Africa.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gradient divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ═══ CORE VALUES SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
              OUR FOUNDATION
            </span>
            <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed font-medium">
              The principles that guide our pan-African success and ensure we deliver value at every step of the supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div 
                key={value.id}
                className="animate-fade-in-up relative bg-white border border-gray-100 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:border-[#25a93e]/20 transition-all duration-300 flex flex-col group overflow-hidden"
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                <span className="absolute top-3 right-4 text-[2.5rem] font-extrabold text-primary/[0.04] font-heading leading-none select-none pointer-events-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-heading font-800 text-sm text-[#224167] tracking-wider uppercase">
                    {value.id}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mt-1">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gradient divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ═══ OUR IMPACT BANNER SECTION ═══ */}
      <section className="py-16 md:py-20 bg-[#F4FDF9] w-full border-b border-gray-100 relative overflow-hidden">
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-48 h-48 bg-[#25a93e]/[0.08] rounded-full blur-[80px] pointer-events-none" />
        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                OUR IMPACT
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] text-[#224167] leading-tight">
                Creating Access.<br />Driving Growth.
              </h2>
            </div>

            {/* Right Stats Block */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 lg:divide-x lg:divide-gray-200/60 sm:border-l sm:border-gray-200/0">
              {[
                {
                  val: '10,000+',
                  lbl: 'Retailers Served',
                  icon: (
                    <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  val: '5',
                  lbl: 'Markets Reached',
                  icon: (
                    <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  val: 'Millions',
                  lbl: 'Digital Access Enabled',
                  icon: (
                    <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )
                }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 lg:pl-6 first:pl-0 sm:pl-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-heading font-800 text-xl text-[#224167]">{stat.val}</div>
                    <div className="text-[0.75rem] font-bold text-gray-500 tracking-wide uppercase mt-0.5">{stat.lbl}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Ready to Expand Your Reach?"
        description="Join our extensive pan-African network. Whether you are a retailer, telecom operator, or enterprise, we have the hardware supply chain you need."
        primaryLabel="Partner With Us"
        primaryHref="/contact"
        secondaryLabel="View Our Devices"
        secondaryHref="/so/phones"
      />
    </div>
  );
}
